from flask import Flask, request, jsonify, render_template, session, Response, stream_with_context, redirect, url_for
from flask_cors import CORS, cross_origin
import json
import os
import random
import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT
import psycopg2.extras
import logging
from functools import wraps
from dotenv import load_dotenv
from openai import OpenAI
import httpx
import requests
from pydub import AudioSegment
from flask import send_from_directory
import urllib.parse  # Added for URL decoding
import io

# Configure logging
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Define basedir for all environments
basedir = os.path.abspath(os.path.dirname(__file__))

# Load environment variables from .env file for local development.
# In a production environment like Render, variables are set directly.
if os.getenv('RENDER') is None:
    load_dotenv(os.path.join(basedir, '.env'))
    load_dotenv(os.path.join(basedir, '..', '.env'))

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
app.secret_key = os.getenv('FLASK_SECRET_KEY')

# --- Configuration Loading ---
app.config['OPENAI_API_KEY'] = os.getenv('OPENAI_API_KEY')
app.config['OPENAI_MODEL'] = os.getenv('OPENAI_MODEL', 'gpt-4o-mini')
app.config['SUNO_API_KEY'] = os.getenv('SUNO_API_KEY')
app.config['DEV_COUPON_CODE'] = os.getenv('DEV_COUPON_CODE', 'RAAM100')

app.config['ADMIN_USERNAME'] = os.getenv('ADMIN_USERNAME')
app.config['ADMIN_PASSWORD'] = os.getenv('ADMIN_PASSWORD')
app.config['PAYPAL_CLIENT_ID'] = os.getenv('PAYPAL_CLIENT_ID')
app.config['PAYPAL_CLIENT_SECRET'] = os.getenv('PAYPAL_CLIENT_SECRET')
app.config['SONG_PRICE'] = os.getenv('SONG_PRICE', '4.99')
app.config['PAYPAL_MODE'] = os.getenv('PAYPAL_MODE', 'sandbox')
app.config['PUBLIC_URL'] = os.getenv('PUBLIC_URL')
app.config['DATABASE_URL'] = os.getenv('DATABASE_URL')

openai = OpenAI(api_key=app.config['OPENAI_API_KEY'])
BASE_URL = "https://api.sunoapi.org/api/v1"

if app.config['PAYPAL_MODE'] == 'live':
    PAYPAL_API_BASE_URL = "https://api-m.paypal.com"
else:
    PAYPAL_API_BASE_URL = "https://api-m.sandbox.paypal.com"

import sqlite3

class SQLiteCursorWrapper:
    def __init__(self, cursor):
        self.cursor = cursor
    def execute(self, query, params=None):
        q = query.replace('%s', '?')
        if params is not None:
            return self.cursor.execute(q, params)
        return self.cursor.execute(q)
    def fetchone(self):
        row = self.cursor.fetchone()
        return dict(row) if row is not None else None
    def fetchall(self):
        return [dict(r) for r in self.cursor.fetchall()]
    def close(self):
        self.cursor.close()

class SQLiteConnectionWrapper:
    def __init__(self, conn):
        self.conn = conn
        self.conn.row_factory = sqlite3.Row
    def cursor(self, cursor_factory=None):
        return SQLiteCursorWrapper(self.conn.cursor())
    def commit(self):
        self.conn.commit()
    def rollback(self):
        self.conn.rollback()
    def close(self):
        self.conn.close()
    def set_isolation_level(self, level):
        pass

# --- Data and Database Setup for Production & Local Testing ---
PREVIEW_DIR = os.path.join(basedir, 'previews')

def get_db():
    db_url = app.config.get('DATABASE_URL')
    if db_url:
        return psycopg2.connect(db_url)
    # Local fallback to SQLite if no DATABASE_URL is set in local environment
    sqlite_path = os.path.join(basedir, 'tunetailor.db')
    return SQLiteConnectionWrapper(sqlite3.connect(sqlite_path))

def init_db():
    """Create tasks table if not exists on app startup."""
    db_url = app.config.get('DATABASE_URL')
    if not db_url:
        logger.info("Using local SQLite database fallback ('tunetailor.db').")
        return

    db = None
    cur = None
    try:
        db = psycopg2.connect(db_url)
        db.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
        cur = db.cursor()

        cur.execute("""
            CREATE TABLE IF NOT EXISTS tasks (
                id SERIAL PRIMARY KEY,
                task_id TEXT UNIQUE NOT NULL,
                name TEXT,
                occasion TEXT,
                style TEXT,
                user_details TEXT,
                lyrics TEXT,
                status TEXT NOT NULL,
                audio_links TEXT,
                payment_status TEXT DEFAULT 'unpaid',
                paypal_order_id TEXT,
                email TEXT,
                error_message TEXT,
                ip_address TEXT,
                country TEXT,
                user_agent TEXT,
                referrer TEXT,
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                completed_at TIMESTAMP,
                paid_at TIMESTAMP
            );
        """)

        columns_to_add = {
            'shareable_id': 'TEXT UNIQUE',
            'recipient_message': 'TEXT',
            'is_shared': 'BOOLEAN DEFAULT false',
            'share_page_views': 'INT DEFAULT 0'
        }

        for column, col_type in columns_to_add.items():
            cur.execute("""
                SELECT 1 FROM information_schema.columns 
                WHERE table_name='tasks' AND column_name=%s
            """, (column,))
            
            if cur.fetchone() is None:
                alter_query = f"ALTER TABLE tasks ADD COLUMN {column} {col_type};"
                cur.execute(alter_query)
                logger.info(f"Added missing column '{column}' to 'tasks' table.")

        logger.info("DB initialized: 'tasks' table ensured.")
    except Exception as e:
        logger.error(f"Error checking/initializing DB: {e}")
    finally:
        if cur: cur.close()
        if db: db.close()
        if db: db.close()

# Call init_db() at module level (runs on import, once per worker)
init_db()

if not app.config['SUNO_API_KEY']:
    logger.error("Suno API key is missing in .env")
    raise ValueError("Suno API key is required.")

# --- Admin Authentication ---
def check_auth(username, password):
    """This function is called to check if a username /
    password combination is valid."""
    return username == app.config['ADMIN_USERNAME'] and password == app.config['ADMIN_PASSWORD']

def authenticate():
    """Sends a 401 response that enables basic auth"""
    return jsonify({"error": "Could not verify your access level for that URL. You have to login with proper credentials"}), 401, {'WWW-Authenticate': 'Basic realm="Login Required"'}

def requires_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth = request.authorization
        if not auth or not check_auth(auth.username, auth.password):
            return authenticate()
        return f(*args, **kwargs)
    return decorated

class SunoGenerator:
    def __init__(self, api_key: str):
        if not api_key:
            logger.error("SunoGenerator: API key is empty")
            raise ValueError("Suno API key is required.")
        self.api_key = api_key

    def generate_song(self, prompt: str, style: str, title: str, model: str = "V4_5") -> str:
        logger.info(f"Generating song titled '{title}' with style '{style}'")
        url = f"{BASE_URL}/generate"
        # Determine the callback URL. Prioritize PUBLIC_URL for production.
        if app.config['PUBLIC_URL']:
            callback_base = app.config['PUBLIC_URL']
        else:
            # Fallback for local dev. NOTE: This will not work for callbacks from external services.
            callback_base = request.url_root.rstrip('/')

        payload = {
            "prompt": prompt,
            "style": style,
            "title": title,
            "customMode": True,
            "instrumental": False,
            "model": model,
            "callBackUrl": f"{callback_base}/callback"
        }
        logger.debug(f"Sending payload to {url}: {json.dumps(payload)}")
        try:
            response = requests.post(url, json=payload, headers={'Authorization': f'Bearer {self.api_key}'}, timeout=120)
            logger.debug(f"Suno API response: status={response.status_code}, body={response.text}")
            response.raise_for_status()
            data = response.json()
            if isinstance(data, dict):
                if data.get('code') != 200 or data.get('msg') != 'success':
                    api_msg = data.get('msg', f"Unknown API error. Full response: {data}")
                    logger.error(f"API error: {api_msg}")
                    raise ValueError(f"API returned an error: {api_msg}")
                task_data = data.get('data')
                if task_data and 'taskId' in task_data:
                    task_id = task_data['taskId']
                    logger.info(f"Song generation started. Task ID: {task_id}")
                    return task_id
                else:
                    logger.error(f"API returned unexpected format (missing taskId): {data}")
                    raise ValueError(f"API returned unexpected format: {data}")
            logger.error(f"API returned unexpected type: {type(data)}")
            raise ValueError(f"API returned unexpected type: {type(data)}")
        except requests.RequestException as e:
            logger.error(f"Error starting song generation: {str(e)}, URL: {url}")
            raise
        except (ValueError, json.JSONDecodeError) as e:
            logger.error(f"Error parsing generation response: {str(e)}, Response: {response.text}")
            raise

@app.route('/')
@app.route('/generate_lyrics', methods=['POST'])
def generate_lyrics():
    logger.debug("Received POST request for /generate_lyrics")
    data = request.get_json() # Use get_json() to parse JSON body
    name = data.get('name')
    occasion = data.get('occasion')
    details = data.get('details')
    style = data.get('style')
    if not all([name, occasion, details, style]):
        logger.error(f"Missing required fields: name={name}, occasion={occasion}, details={details}, style={style}")
        return jsonify({"error": "All fields (name, occasion, details, style) are required"}), 400
    if style == 'surprise':
        style = random.choice(['pop', 'rock', 'jazz'])
        logger.info(f"Surprise style selected: {style}")
    try:
        response = openai.chat.completions.create(
            model=app.config.get('OPENAI_MODEL', 'gpt-4o-mini'),
            messages=[{"role": "user", "content": f"Generate {occasion} lyrics for {name}. Details: {details}. Style: {style}. 2 verses, chorus, rhyme, 100-150 words."}]
        )
        lyrics = response.choices[0].message.content
        session['lyrics'] = lyrics
        session['name'] = name
        session['style'] = style
        session['occasion'] = occasion
        session['details'] = details # Store details in session
        logger.info(f"Generated lyrics: {lyrics[:50]}...")
        return jsonify({"lyrics": lyrics})
    except Exception as e:
        logger.error(f"Exception in generate_lyrics: {str(e)}")
        return jsonify({"error": f"Failed to generate lyrics: {str(e)}"}), 500

def get_geolocation(ip_address):
    """Fetches country from an IP address using a free API."""
    # Do not query for local or private IP addresses
    if ip_address == '127.0.0.1' or ip_address.startswith('192.168.') or ip_address.startswith('10.'):
        return "Local"
    try:
        url = f"http://ip-api.com/json/{ip_address}?fields=country"
        response = requests.get(url, timeout=3)
        if response.status_code == 200:
            country = response.json().get('country', 'Unknown')
            logger.info(f"Geolocation for {ip_address}: {country}")
        else:
            logger.warning(f"Geolocation API returned status {response.status_code} for IP {ip_address}")
            country = 'Unknown'
        return country
    except Exception as e:
        logger.error(f"Geolocation request failed for IP {ip_address}: {e}")
        return 'Unknown'

@app.route('/generate_song', methods=['POST'])
def generate_song():
    logger.debug("Received POST request for /generate_song")
    data = request.get_json()
    name = data.get('name')
    style = data.get('style')
    lyrics = data.get('lyrics')
    occasion = data.get('occasion')
    details = data.get('details')
    logger.info(f"Generating song with: name={name}, style={style}, lyrics={lyrics[:50] if lyrics else None}..., occasion={occasion}")
    if not all([name, style, lyrics, occasion]):
        return jsonify({"error": f"Missing data in request body: name={name}, style={style}, lyrics={'present' if lyrics else 'missing'}, occasion={occasion}"}), 400
    
    # Get user IP and geolocation
    # Use X-Forwarded-For if behind a proxy (like on Render), otherwise use remote_addr
    user_ip = request.headers.get('X-Forwarded-For', request.remote_addr).split(',')[0].strip()
    user_country = get_geolocation(user_ip)
    user_agent = request.headers.get('User-Agent')
    referrer = request.headers.get('Referer')

    try:
        generator = SunoGenerator(api_key=app.config['SUNO_API_KEY'])
        task_id = generator.generate_song(
            prompt=f"Happy {occasion} to {name}! {lyrics}",
            style=style,
            title=f"Song for {name}",
            model="V4_5"
        )
        logger.info(f"Returning task ID {task_id} for frontend polling")

        # --- Store task in database ---
        db = None
        cur = None
        try:
            db = get_db()
            cur = db.cursor()
            cur.execute(
                'INSERT INTO tasks (task_id, status, name, user_details, lyrics, occasion, style, ip_address, country, user_agent, referrer) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)',
                (task_id, 'pending', name, details, lyrics, occasion, style, user_ip, user_country, user_agent, referrer)
            )
            db.commit()
        except Exception as e:
            logger.error(f"DB insert failed (non-fatal): {e}")
            if db: db.rollback()  # Undo partial insert
        finally:
            if cur: cur.close()
            if db: db.close()

        return jsonify({"task_id": task_id, "status": "pending"}), 202
    except Exception as e:
        logger.error(f"Exception in generate_song: {str(e)}")
        return jsonify({"error": f"Failed to generate song: {str(e)}"}), 500

@app.route('/callback', methods=['POST'])
def callback():
    logger.debug("Received POST request for /callback")
    try:
        data = request.get_json()
        logger.debug(f"Callback data: {json.dumps(data)}")
        code = data.get('code')
        msg = data.get('msg')
        inner_data = data.get('data', {})
        callback_type = inner_data.get('callbackType')
        task_id = inner_data.get('task_id')
        if not task_id:
            logger.error("No task_id in callback data")
            return jsonify({"error": "No task_id provided"}), 400

        db = get_db()
        cur = db.cursor()
        if code != 200:
            logger.error(f"Callback error for task {task_id}: {msg}")
            cur.execute('UPDATE tasks SET status = %s, error_message = %s WHERE task_id = %s', ('error', msg, task_id))
        else:
            if callback_type == 'complete':
                songs = inner_data.get('data', [])
                audio_links = [song.get("audio_url") for song in songs if song.get("audio_url")]
                cur.execute('UPDATE tasks SET status = %s, audio_links = %s, completed_at = CURRENT_TIMESTAMP WHERE task_id = %s',
                           ('complete', json.dumps(audio_links), task_id))
                logger.info(f"Callback stored for task {task_id} with {len(songs)} songs")
            elif callback_type == 'error':
                cur.execute('UPDATE tasks SET status = %s, error_message = %s WHERE task_id = %s', ('error', msg, task_id))
                logger.error(f"Error callback for task {task_id}: {msg}")
            else:
                # For 'text' or 'first', ignore for now
                logger.info(f"Ignoring intermediate callback type {callback_type} for task {task_id}")
        
        db.commit()
        cur.close()
        db.close()
        return jsonify({"status": "received"})
    except Exception as e:
        logger.error(f"Exception in callback: {str(e)}")
        return jsonify({"error": f"Callback failed: {str(e)}"}), 500

@app.route('/check_task/<task_id>', methods=['GET'])
def check_task(task_id):
    logger.debug(f"Checking task status for task_id={task_id}")
    db = get_db()
    cur = db.cursor(cursor_factory=psycopg2.extras.DictCursor)
    cur.execute('SELECT * FROM tasks WHERE task_id = %s', (task_id,))
    task = cur.fetchone()
    cur.close()
    db.close()

    if not task:
        return jsonify({"error": "Task not found"}), 404

    if task['status'] == 'complete':
        if task['payment_status'] == 'paid':
            links = json.loads(task['audio_links'])
            logger.info(f"Task {task_id} is complete and paid. Returning full links.")
            return jsonify({"status": "completed_paid", "links": links, "lyrics": task['lyrics']})
        
        # If complete but not paid, tell the frontend that the preview is available.
        # Send full links for frontend to handle as previews.
        logger.info(f"Task {task_id} is complete, preview is available.")
        links = json.loads(task['audio_links'])
        return jsonify({"status": "completed_preview_available", "links": links, "lyrics": task['lyrics']})
    elif task['status'] == 'error':
        logger.error(f"Task {task_id} failed: {task['error_message']}")
        return jsonify({"status": "error", "error": task['error_message']}), 500
    else: # 'pending'
        # For live Suno tasks, actively query Suno API's record-info endpoint
        # in case webhooks were delayed or dropped.
        if app.config.get('SUNO_API_KEY'):
            try:
                record_url = f"{BASE_URL}/generate/record-info?taskId={task_id}"
                suno_res = requests.get(
                    record_url,
                    headers={'Authorization': f"Bearer {app.config['SUNO_API_KEY']}"},
                    timeout=8
                )
                if suno_res.status_code == 200:
                    suno_data = suno_res.json()
                    suno_inner = suno_data.get('data', {})
                    suno_status = suno_inner.get('status')
                    
                    if suno_status == 'SUCCESS':
                        response_obj = suno_inner.get('response', {})
                        songs = response_obj.get('data', [])
                        audio_links = [s.get('audio_url') for s in songs if s.get('audio_url')]
                        if audio_links:
                            db = get_db()
                            cur = db.cursor()
                            cur.execute(
                                'UPDATE tasks SET status = %s, audio_links = %s, completed_at = CURRENT_TIMESTAMP WHERE task_id = %s',
                                ('complete', json.dumps(audio_links), task_id)
                            )
                            db.commit()
                            cur.close()
                            db.close()
                            logger.info(f"Active polling completed live Suno task {task_id} with {len(audio_links)} songs")
                            return jsonify({"status": "completed_preview_available", "links": audio_links, "lyrics": task['lyrics']})
                    elif suno_status in ('FAILED', 'ERROR'):
                        error_msg = suno_inner.get('errorMessage') or 'Suno generation failed'
                        db = get_db()
                        cur = db.cursor()
                        cur.execute('UPDATE tasks SET status = %s, error_message = %s WHERE task_id = %s', ('error', error_msg, task_id))
                        db.commit()
                        cur.close()
                        db.close()
                        return jsonify({"status": "error", "error": error_msg}), 500
            except Exception as e:
                logger.warning(f"Active record-info check failed (will keep polling): {e}")

        logger.info(f"Task {task_id} still pending")
        return jsonify({"status": "pending"}), 202

@app.route('/create_paypal_order/<task_id>', methods=['POST'])
def create_paypal_order(task_id):
    logger.info(f"Creating PayPal order for task_id: {task_id}")
    db = get_db()
    cur = db.cursor(cursor_factory=psycopg2.extras.DictCursor)
    cur.execute('SELECT * FROM tasks WHERE task_id = %s', (task_id,))
    task = cur.fetchone()
    cur.close()
    db.close()

    if not task:
        return jsonify({"error": "Task not found"}), 404
    if task['status'] != 'complete' or task['payment_status'] == 'paid':
        return jsonify({"error": "Task not ready for payment or already paid"}), 400

    # Use PayPal's Orders API
    req_data = request.get_json(silent=True) or {}
    tier = req_data.get('tier', 'audio')
    chosen_price = '9.99' if tier == 'video' else app.config.get('SONG_PRICE', '4.99')
    
    access_token = get_paypal_access_token()
    url = f"{PAYPAL_API_BASE_URL}/v2/checkout/orders"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {access_token}",
    }
    payload = {
        "intent": "CAPTURE",
        "purchase_units": [{
            "amount": {
                "currency_code": "USD",
                "value": chosen_price
            },
            "description": f"Personalized {'Video Keepsake' if tier == 'video' else 'Song'}: {task['name']}'s {task['occasion']}",
            "custom_id": task_id # Link the PayPal order to your task_id
        }]
    }

    try:
        response = requests.post(url, headers=headers, json=payload, timeout=30)
        response.raise_for_status()
        order_data = response.json()
        
        db = get_db()
        cur = db.cursor()
        cur.execute('UPDATE tasks SET paypal_order_id = %s WHERE task_id = %s', (order_data['id'], task_id))
        db.commit()
        cur.close() # Close cursor
        db.close()

        logger.info(f"PayPal order {order_data['id']} created for task {task_id}")
        return jsonify({"orderID": order_data['id']})
    except requests.RequestException as e:
        logger.error(f"PayPal order creation failed: {e}")
        return jsonify({"error": "Could not create PayPal order"}), 500

@app.route('/capture_paypal_order/<order_id>', methods=['POST'])
def capture_paypal_order(order_id):
    logger.info(f"Capturing PayPal order: {order_id}")
    access_token = get_paypal_access_token()
    url = f"{PAYPAL_API_BASE_URL}/v2/checkout/orders/{order_id}/capture"
    headers = {"Content-Type": "application/json", "Authorization": f"Bearer {access_token}"}

    try:
        response = requests.post(url, headers=headers, timeout=30)
        response.raise_for_status()
        capture_data = response.json()

        if capture_data.get('status') == 'COMPLETED':            
            db = get_db()
            cur = db.cursor(cursor_factory=psycopg2.extras.DictCursor)
            # Use the order_id to reliably find our task in the database
            cur.execute('SELECT task_id, audio_links FROM tasks WHERE paypal_order_id = %s', (order_id,))
            task = cur.fetchone()
            if not task:
                cur.close()
                db.close()
                logger.error(f"Could not find a task associated with PayPal order_id {order_id}")
                return jsonify({"error": "Task not found for this order"}), 404

            task_id = task['task_id']
            # Re-use the cursor to update
            cur.execute('UPDATE tasks SET payment_status = %s, paid_at = CURRENT_TIMESTAMP WHERE task_id = %s', ('paid', task_id))
            cur.close()
            db.commit()
            db.close()

            logger.info(f"Payment for order {order_id} (task {task_id}) captured successfully.")
            links = json.loads(task['audio_links'])
            encoded_links = urllib.parse.quote(json.dumps(links))
            return jsonify({"status": "success", "redirect_url": f"/download?task_id={task_id}&links={encoded_links}"})
        else:
            logger.error(f"PayPal capture status was not COMPLETED for order {order_id}. Status: {capture_data.get('status')}")
            return jsonify({"error": "Payment not completed"}), 400
    except requests.RequestException as e:
        logger.error(f"PayPal capture failed for order {order_id}: {e}")
        return jsonify({"error": "Payment capture failed"}), 500

# =========================================================================
# [COUPON CODES] - VIP & Test Free Pass
# NOTE FOR PRODUCTION DEPLOYMENT:
# - 'RAAM100' is the dedicated VIP test coupon requested by user.
# - It provides 100% off so you can test end-to-end checkout, download, and video creation.
# - To remove or disable test coupons when going live, simply remove 'RAAM100'
#   from `valid_100_percent_codes` below or set DEV_COUPON_CODE to an empty string.
# =========================================================================
@app.route('/apply_coupon', methods=['POST'])
def apply_coupon():
    """Validates coupon code and unlocks full song / video downloads."""
    data = request.get_json(silent=True) or {}
    task_id = data.get('task_id')
    coupon_code = (data.get('coupon_code') or '').strip().upper()

    if not task_id or not coupon_code:
        return jsonify({"error": "Task ID and coupon code are required."}), 400

    dev_code = (app.config.get('DEV_COUPON_CODE') or 'RAAM100').strip().upper()
    valid_100_percent_codes = {dev_code, 'RAAM100', 'VIP100', 'LAUNCHFREE', 'ADMIN100'}

    if coupon_code in valid_100_percent_codes:
        logger.info(f"Applying 100% discount coupon '{coupon_code}' for task {task_id}")
        db = get_db()
        cur = db.cursor()
        cur.execute(
            "UPDATE tasks SET payment_status = 'paid', paid_at = CURRENT_TIMESTAMP, paypal_order_id = %s WHERE task_id = %s",
            (f"COUPON_{coupon_code}", task_id)
        )
        db.commit()
        cur.close()
        db.close()
        return jsonify({
            "status": "success",
            "message": f"Coupon {coupon_code} applied! 100% off unlocked.",
            "redirect_url": f"/song-download/{task_id}"
        })
    else:
        return jsonify({"error": "Invalid or expired coupon code."}), 400

@app.route('/check_suno_credits', methods=['GET'])
def check_suno_credits():
    """Diagnostic endpoint to inspect remaining credits on sunoapi.org."""
    api_key = app.config.get('SUNO_API_KEY')
    if not api_key:
        return jsonify({"error": "SUNO_API_KEY is not set."}), 400

    url = f"{BASE_URL}/generate/credit"
    try:
        res = requests.get(url, headers={'Authorization': f'Bearer {api_key}'}, timeout=15)
        return jsonify({
            "status_code": res.status_code,
            "response": res.json() if res.headers.get('content-type', '').startswith('application/json') else res.text
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/stream/<task_id>/<int:song_index>')
@cross_origin()
def stream_song(task_id, song_index):
    """
    Securely streams audio content.
    - For unpaid tasks, streams only the first 500KB as a preview.
    - For paid tasks, streams the entire file.
    Supports both remote Suno URLs and local:// mock files for development.
    """
    logger.info(f"Streaming request for task {task_id}, song {song_index}")
    db = get_db()
    cur = db.cursor(cursor_factory=psycopg2.extras.DictCursor)
    cur.execute('SELECT payment_status, audio_links, name FROM tasks WHERE task_id = %s', (task_id,))
    task = cur.fetchone()
    cur.close()
    db.close()

    if not task:
        return "Task not found", 404

    try:
        audio_links = json.loads(task['audio_links'])
        if not (0 <= song_index < len(audio_links)):
            return "Invalid song index", 404
        song_url = audio_links[song_index]
    except (json.JSONDecodeError, IndexError):
        return "Could not find song URL", 500

    is_paid = task['payment_status'] == 'paid'
    preview_byte_limit = 500 * 1024  # 500KB for preview

    safe_name = "".join(c for c in (task['name'] or 'Song') if c.isalnum() or c in (' ', '_')).rstrip()
    branded_filename = f"{safe_name} (Song {song_index + 1}) - PersonalizedSongMaker.com.mp3"

    # Handle local mock files for testing (e.g. local://sample1.mp3)
    if song_url.startswith('local://'):
        filename = song_url.replace('local://', '')
        local_sample_path = os.path.join(basedir, 'samples', filename)
        if not os.path.exists(local_sample_path):
            local_sample_path = os.path.join(basedir, '..', 'frontend', 'public', 'samples', filename)

        if not os.path.exists(local_sample_path):
            logger.error(f"Local sample file not found: {local_sample_path}")
            return "Local sample file not found", 404

        file_size = os.path.getsize(local_sample_path)
        content_length = preview_byte_limit if (not is_paid and file_size > preview_byte_limit) else file_size

        def generate_local():
            with open(local_sample_path, 'rb') as f:
                bytes_sent = 0
                while True:
                    chunk = f.read(8192)
                    if not chunk:
                        break
                    if not is_paid and bytes_sent + len(chunk) > preview_byte_limit:
                        yield chunk[:preview_byte_limit - bytes_sent]
                        break
                    yield chunk
                    bytes_sent += len(chunk)

        response = Response(stream_with_context(generate_local()), content_type="audio/mpeg")
        response.headers['Content-Disposition'] = f'inline; filename="{branded_filename}"'
        response.headers['Content-Length'] = str(content_length)
        response.headers['Accept-Ranges'] = 'bytes'
        return response

    def generate():
        try:
            with requests.get(song_url, stream=True) as r:
                r.raise_for_status()
                bytes_sent = 0
                for chunk in r.iter_content(chunk_size=8192):
                    if not is_paid and bytes_sent + len(chunk) > preview_byte_limit:
                        yield chunk[:preview_byte_limit - bytes_sent]
                        break  # Stop streaming for unpaid users
                    yield chunk
                    bytes_sent += len(chunk)
        except requests.RequestException as e:
            logger.error(f"Failed to stream audio from {song_url}: {e}")

    response = Response(stream_with_context(generate()), content_type="audio/mpeg")
    response.headers['Content-Disposition'] = f'inline; filename="{branded_filename}"'
    response.headers['Accept-Ranges'] = 'bytes'
    return response

def get_paypal_access_token():
    """Helper function to get a PayPal access token."""
    auth = (app.config['PAYPAL_CLIENT_ID'], app.config['PAYPAL_CLIENT_SECRET'])
    url = f"{PAYPAL_API_BASE_URL}/v1/oauth2/token"
    headers = {"Accept": "application/json", "Accept-Language": "en_US"}
    data = {"grant_type": "client_credentials"}
    try:
        response = requests.post(url, auth=auth, headers=headers, data=data, timeout=30)
        response.raise_for_status()
        token_data = response.json()
        return token_data['access_token']
    except requests.RequestException as e:
        logger.error(f"Failed to get PayPal access token: {e}")
        raise

@app.route('/save_email', methods=['POST'])
def save_email():
    """Saves the user's email for a given task."""
    data = request.get_json()
    email = data.get('email')
    task_id = data.get('task_id')

    if not email or not task_id:
        return jsonify({"error": "Email and task_id are required."}), 400

    try:
        db = get_db()
        cur = db.cursor()
        cur.execute('UPDATE tasks SET email = %s WHERE task_id = %s', (email, task_id))
        db.commit()
        cur.close() # Close cursor
        db.close()
        logger.info(f"Saved email '{email}' for task '{task_id}'")
        return jsonify({"status": "success", "message": "Email saved successfully."})
    except Exception as e:
        logger.error(f"Could not save email for task {task_id}: {e}")
        return jsonify({"error": "Failed to save email."}), 500

@app.route('/create_shareable_page', methods=['POST'])
def create_shareable_page():
    """Creates a unique shareable page for a paid task."""
    data = request.get_json()
    task_id = data.get('task_id')
    message = data.get('message')

    if not task_id or not message:
        return jsonify({"error": "Task ID and message are required."}), 400

    db = get_db()
    cur = db.cursor()
    # Generate a unique, shareable ID, ensuring it's not already used
    shareable_id = os.urandom(8).hex()

    cur.execute(
        "UPDATE tasks SET shareable_id = %s, recipient_message = %s, is_shared = true WHERE task_id = %s AND payment_status = 'paid'",
        (shareable_id, message, task_id)
    )
    db.commit()
    cur.close()
    db.close()

    logger.info(f"Created shareable page for task {task_id} with id {shareable_id}")
    return jsonify({"status": "success", "shareable_id": shareable_id})

@app.route('/api/share_data/<shareable_id>', methods=['GET'])
def get_share_data(shareable_id):
    """Fetches the data for a shareable gift page and increments its view count."""
    db = get_db()
    cur = db.cursor(cursor_factory=psycopg2.extras.DictCursor)
    
    # Atomically increment view count and retrieve the data
    cur.execute(
        """
        UPDATE tasks 
        SET share_page_views = COALESCE(share_page_views, 0) + 1 
        WHERE shareable_id = %s 
        RETURNING task_id, name, lyrics, audio_links, recipient_message
        """,
        (shareable_id,)
    )
    task_data = cur.fetchone()
    db.commit()
    cur.close()
    db.close()

    if not task_data:
        return jsonify({"error": "This gift page could not be found."}), 404

    response_data = {
        "name": task_data['name'],
        "lyrics": task_data['lyrics'],
        "audio_links": json.loads(task_data['audio_links']),
        "message": task_data['recipient_message'],
        "task_id": task_data['task_id']
    }
    return jsonify(response_data)

# --- Admin Routes ---
@app.route('/admin')
@requires_auth
def admin_dashboard():
    """Renders the main admin dashboard with KPIs."""
    logger.info(f"Admin user '{request.authorization.username}' accessed the main dashboard.")
    db = get_db()
    cur = db.cursor(cursor_factory=psycopg2.extras.DictCursor)

    # --- KPI Calculations ---
    cur.execute("SELECT COUNT(*) FROM tasks;")
    total_tasks = cur.fetchone()[0]

    cur.execute("SELECT COUNT(*) FROM tasks WHERE payment_status = 'paid';")
    total_paid_orders = cur.fetchone()[0]

    cur.execute("SELECT COUNT(*) FROM tasks WHERE status = 'complete';")
    completed_tasks = cur.fetchone()[0]

    cur.execute("SELECT COUNT(*) FROM tasks WHERE status = 'error';")
    failed_tasks = cur.fetchone()[0]

    cur.execute("SELECT COUNT(*) FROM tasks WHERE is_shared = true;")
    shared_pages_created = cur.fetchone()[0]

    cur.execute("SELECT SUM(share_page_views) FROM tasks WHERE is_shared = true;")
    total_share_views = cur.fetchone()[0] or 0

    total_revenue = total_paid_orders * float(app.config.get('SONG_PRICE', 4.99))
    conversion_rate = (total_paid_orders / total_tasks * 100) if total_tasks > 0 else 0

    # --- Top Lists ---
    cur.execute("SELECT occasion, COUNT(*) as count FROM tasks WHERE occasion IS NOT NULL GROUP BY occasion ORDER BY count DESC LIMIT 5;")
    top_occasions = cur.fetchall()

    cur.execute("SELECT country, COUNT(*) as count FROM tasks WHERE country IS NOT NULL AND country != 'Unknown' GROUP BY country ORDER BY count DESC LIMIT 5;")
    top_countries = cur.fetchall()

    cur.execute("SELECT style, COUNT(*) as count FROM tasks WHERE style IS NOT NULL GROUP BY style ORDER BY count DESC LIMIT 5;")
    top_styles = cur.fetchall()

    # --- Recent Orders ---
    cur.execute("SELECT task_id, name, email, paid_at FROM tasks WHERE payment_status = 'paid' ORDER BY paid_at DESC LIMIT 10;")
    recent_orders = cur.fetchall()

    kpis = {
        'total_tasks': total_tasks,
        'total_revenue': f"{total_revenue:.2f}",
        'total_paid_orders': total_paid_orders,
        'completed_tasks': completed_tasks,
        'failed_tasks': failed_tasks,
        'conversion_rate': f"{conversion_rate:.2f}",
        'shared_pages_created': shared_pages_created,
        'total_share_views': total_share_views,
        'top_occasions': top_occasions,
        'top_countries': top_countries,
        'top_styles': top_styles,
    }

    return render_template('admin/dashboard.html', kpis=kpis, recent_orders=recent_orders)

@app.route('/admin/tasks')
@requires_auth
def admin_tasks():
    logger.info(f"Admin user '{request.authorization.username}' accessed the task explorer.")
    db = get_db()
    cur = db.cursor(cursor_factory=psycopg2.extras.DictCursor)
    cur.execute('SELECT * FROM tasks ORDER BY created_at DESC'); tasks = cur.fetchall()
    cur.close()
    db.close()
    return render_template('admin/tasks.html', tasks=tasks)

if __name__ == '__main__':
    # This block is now only for when you run `python app.py` directly.
    # For production, a WSGI server like Gunicorn will be used.
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))
application = app # Gunicorn will look for this 'application' object
