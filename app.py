from flask import Flask, request, jsonify, render_template, session
from flask_cors import CORS
import json
import os
import random
import psycopg2
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

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
app.secret_key = os.getenv('FLASK_SECRET_KEY')

# --- Configuration Loading ---
app.config['OPENAI_API_KEY'] = os.getenv('OPENAI_API_KEY')
app.config['SUNO_API_KEY'] = os.getenv('SUNO_API_KEY')
app.config['ADMIN_USERNAME'] = os.getenv('ADMIN_USERNAME')
app.config['ADMIN_PASSWORD'] = os.getenv('ADMIN_PASSWORD')
app.config['PAYPAL_CLIENT_ID'] = os.getenv('PAYPAL_CLIENT_ID')
app.config['PAYPAL_CLIENT_SECRET'] = os.getenv('PAYPAL_CLIENT_SECRET')
app.config['SONG_PRICE'] = os.getenv('SONG_PRICE', '1.99')
app.config['PAYPAL_MODE'] = os.getenv('PAYPAL_MODE', 'sandbox')
app.config['PUBLIC_URL'] = os.getenv('PUBLIC_URL')
app.config['DATABASE_URL'] = os.getenv('DATABASE_URL')

openai = OpenAI(api_key=app.config['OPENAI_API_KEY'])
BASE_URL = "https://api.sunoapi.org/api/v1"

if app.config['PAYPAL_MODE'] == 'live':
    PAYPAL_API_BASE_URL = "https://api-m.paypal.com"
else:
    PAYPAL_API_BASE_URL = "https://api-m.sandbox.paypal.com"

# --- Data and Database Setup for Production ---
# The local preview directory is still useful for local dev, but on Render it will be ephemeral.
# We will generate previews on-the-fly instead of saving them long-term.
PREVIEW_DIR = os.path.join(basedir, 'previews') # Keep previews local, they are ephemeral anyway

def get_db():
    db_url = app.config.get('DATABASE_URL')
    if not db_url:
        logger.error("DATABASE_URL environment variable is not set.")
        raise ValueError("DATABASE_URL environment variable is not set. Cannot connect to the database.")
    db = psycopg2.connect(db_url)
    return db

def ensure_db_initialized():
    """Ensures the 'tasks' table exists in the database."""
    db = None
    cur = None
    try:
        db = get_db()
        cur = db.cursor()
        cur.execute("SELECT to_regclass('public.tasks');")
        result = cur.fetchone()
        if result[0] is None:
            logger.info("Table 'tasks' not found. Initializing database schema...")
            with open(os.path.join(basedir, 'schema.sql'), 'r') as f:
                cur.execute(f.read())
            db.commit()
            logger.info("Database schema initialized successfully.")
        else:
            logger.info("Database already initialized.")
    except Exception as e:
        logger.error(f"Error checking/initializing DB: {e}")
    finally:
        if cur: cur.close()
        if db: db.close()

@app.cli.command('init-db')
def init_db_command():
    """Creates the database tables."""
    ensure_db_initialized()

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
        # Determine the callback URL. Prioritize PUBLIC_URL for ngrok/production.
        if app.config['PUBLIC_URL']:
            callback_base = app.config['PUBLIC_URL']
        else:
            # Fallback to request context if PUBLIC_URL is not set (for local dev without callbacks)
            callback_base = request.url_root.rstrip('/')

        payload = {
            "prompt": prompt,
            "style": style,
            "title": title,
            "customMode": True,  # camelCase as per doc
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
                    api_msg = data.get('msg', data.get('message', f"Unknown API error. Full response: {data}"))
                    logger.error(f"API error: {api_msg}")
                    raise ValueError(f"API returned an error: {api_msg}")
                task_data = data.get('data')
                if task_data and 'taskId' in task_data:  # camelCase 'taskId'
                    task_id = task_data['taskId']
                    logger.info(f"Song generation started. Task ID: {task_id}")
                    return task_id
                else:
                    logger.error(f"API returned unexpected format: {data}")
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
def index():
    logger.debug("Rendering index page")
    return render_template('index.html')

@app.route('/generate_lyrics', methods=['POST'])
def generate_lyrics():
    logger.debug("Received POST request for /generate_lyrics")
    data = request.form
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
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": f"Generate {occasion} lyrics for {name}. Details: {details}. Style: {style}. 2 verses, chorus, rhyme, 100-150 words."}]
        )
        lyrics = response.choices[0].message.content
        session['lyrics'] = lyrics
        session['name'] = name
        session['style'] = style
        session['occasion'] = occasion
        session['details'] = details # Store details in session
        logger.info(f"Generated lyrics: {lyrics[:50]}...")
        return render_template('lyrics_preview.html', lyrics=lyrics)
    except Exception as e:
        logger.error(f"Exception in generate_lyrics: {str(e)}")
        return jsonify({"error": f"Failed to generate lyrics: {str(e)}"}), 500

def get_geolocation(ip_address):
    """Fetches country from an IP address using a free API."""
    # Do not query for local or private IP addresses
    if ip_address == '127.0.0.1' or ip_address.startswith('192.168.') or ip_address.startswith('10.'):
        return "Local"
    try:
        # Using a free, no-key-required API
        url = f"http://ip-api.com/json/{ip_address}?fields=country"
        response = requests.get(url, timeout=2)
        response.raise_for_status()
        data = response.json()
        country = data.get('country', 'Unknown')
        logger.info(f"Geolocation for {ip_address}: {country}")
        return country
    except requests.RequestException as e:
        logger.error(f"Could not get geolocation for IP {ip_address}: {e}")
        return "Unavailable"

@app.route('/generate_song', methods=['POST'])
def generate_song():
    logger.debug("Received POST request for /generate_song")
    name = session.get('name')
    style = session.get('style')
    lyrics = session.get('lyrics')
    occasion = session.get('occasion')
    details = session.get('details')
    logger.info(f"Generating song with: name={name}, style={style}, lyrics={lyrics[:50] if lyrics else None}..., occasion={occasion}")
    if not all([name, style, lyrics, occasion]):
        logger.error(f"Missing session data: name={name}, style={style}, lyrics={lyrics[:50] if lyrics else None}, occasion={occasion}")
        return jsonify({"error": f"Missing session data: name={name}, style={style}, lyrics={'present' if lyrics else 'missing'}, occasion={occasion}"}), 400
    
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
        db = get_db()
        cur = db.cursor()
        cur.execute(
            'INSERT INTO tasks (task_id, status, name, user_details, lyrics, occasion, style, ip_address, country, user_agent, referrer) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)',
            (task_id, 'pending', name, details, lyrics, occasion, style, user_ip, user_country, user_agent, referrer)
        )
        db.commit()
        cur.close()
        db.close()

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
            logger.info(f"Task {task_id} is complete and paid. Returning links.")
            return jsonify({"status": "completed", "links": links})
        
        # If complete but not paid, tell the frontend that the preview is available.
        # The frontend will then navigate to the song_preview page.
        logger.info(f"Task {task_id} is complete, preview is available.")
        return jsonify({"status": "completed_preview_available", "task_id": task_id})
    elif task['status'] == 'error':
        logger.error(f"Task {task_id} failed: {task['error_message']}")
        return jsonify({"status": "error", "error": task['error_message']}), 500
    else: # 'pending'
        logger.info(f"Task {task_id} still pending")
        return jsonify({"status": "pending"}), 202

@app.route('/song_preview/<task_id>')
def song_preview(task_id):
    """
    Displays the song preview and payment options.
    """
    logger.info(f"Rendering song preview page for task {task_id}")
    db = get_db()
    cur = db.cursor(cursor_factory=psycopg2.extras.DictCursor)
    cur.execute('SELECT * FROM tasks WHERE task_id = %s', (task_id,))
    task = cur.fetchone()
    cur.close()
    db.close()

    if not task:
        logger.error(f"Task not found for preview page: {task_id}")
        return "Task not found", 404

    # Ensure the task is ready for preview
    if task['status'] != 'complete' or not task['audio_links']:
        logger.warning(f"Attempted to access preview page for task {task_id} which is not ready.")
        return "Your song is not ready for preview yet. Please wait.", 400
    
    # Pass the list of full audio URLs (from Suno) to the template
    audio_links = json.loads(task['audio_links'])
    task_dict = dict(task)
    task_dict['preview_paths'] = audio_links # We'll reuse the 'preview_paths' variable name in the template

    return render_template('song_preview.html', task=task_dict, paypal_client_id=app.config['PAYPAL_CLIENT_ID'])

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
                "value": app.config['SONG_PRICE']
            },
            "description": f"Personalized Song: {task['name']}'s {task['occasion']}",
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

@app.route('/download', methods=['GET'])
def download():
    logger.debug("Received GET request for /download")
    task_id = request.args.get('task_id')
    if not task_id:
        logger.error("No task_id provided in /download request")
        return jsonify({"error": "Missing task identifier"}), 400

    try:
        # Decode the 'links' query parameter
        links_param = request.args.get('links')
        if not links_param:
            logger.error("No links provided in /download request")
            return jsonify({"error": "No links provided"}), 400
        
        # Decode URL-encoded JSON array
        links = json.loads(urllib.parse.unquote(links_param))
        if not isinstance(links, list) or not links:
            logger.error("Invalid or empty links parameter")
            return jsonify({"error": "Invalid or empty links parameter"}), 400
        
        # Validate URLs (basic check)
        for link in links:
            if not link.startswith('https://'):
                logger.error(f"Invalid audio URL: {link}")
                return jsonify({"error": f"Invalid audio URL: {link}"}), 400
        
        # Render the download page with links and session data
        logger.info(f"Rendering download page with {len(links)} audio links")
        return render_template('download.html', audio_links=links, session=session, task_id=task_id)
    except Exception as e:
        logger.error(f"Exception in download route: {str(e)}")
        return jsonify({"error": f"Failed to process download: {str(e)}"}), 500

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

@app.route('/terms')
def terms():
    logger.debug("Rendering terms page")
    return render_template('terms.html')

@app.route('/privacy')
def privacy():
    logger.debug("Rendering privacy page")
    return render_template('privacy.html')

# --- Admin Routes ---
@app.route('/admin')
@requires_auth
def admin_dashboard():
    logger.info(f"Admin user '{request.authorization.username}' accessed the dashboard.")
    db = get_db()
    cur = db.cursor(cursor_factory=psycopg2.extras.DictCursor)

    # Key Performance Indicators (KPIs)
    cur.execute('SELECT COUNT(id) FROM tasks'); total_tasks = cur.fetchone()[0]
    cur.execute("SELECT COUNT(id) FROM tasks WHERE status = 'complete'"); completed_tasks = cur.fetchone()[0]
    cur.execute("SELECT COUNT(id) FROM tasks WHERE status = 'error'"); failed_tasks = cur.fetchone()[0]
    
    # Order/Revenue KPIs
    cur.execute("SELECT COUNT(id) FROM tasks WHERE payment_status = 'paid'"); total_paid_orders = cur.fetchone()[0]
    try:
        song_price_float = float(app.config['SONG_PRICE'])
        total_revenue = total_paid_orders * song_price_float
    except (ValueError, TypeError):
        total_revenue = 0.0
        logger.error(f"Could not parse SONG_PRICE '{app.config['SONG_PRICE']}' to a float.")
        
    # Conversion Rate
    conversion_rate = (total_paid_orders / total_tasks * 100) if total_tasks > 0 else 0
        
    # Top 5 lists
    cur.execute('SELECT style, COUNT(id) as count FROM tasks WHERE style IS NOT NULL GROUP BY style ORDER BY count DESC LIMIT 5'); top_styles = cur.fetchall()
    cur.execute('SELECT occasion, COUNT(id) as count FROM tasks WHERE occasion IS NOT NULL GROUP BY occasion ORDER BY count DESC LIMIT 5'); top_occasions = cur.fetchall()
    cur.execute("SELECT country, COUNT(id) as count FROM tasks WHERE country NOT IN ('Local', 'Unknown', 'Unavailable') GROUP BY country ORDER BY count DESC LIMIT 5"); top_countries = cur.fetchall()
    
    # Recent Orders
    cur.execute("SELECT * FROM tasks WHERE payment_status = 'paid' ORDER BY paid_at DESC LIMIT 5"); recent_orders = cur.fetchall()

    cur.close()
    db.close()

    kpis = {
        'total_tasks': total_tasks,
        'completed_tasks': completed_tasks,
        'failed_tasks': failed_tasks,
        'total_paid_orders': total_paid_orders,
        'total_revenue': f"{total_revenue:.2f}",
        'conversion_rate': f"{conversion_rate:.2f}",
        'top_styles': top_styles,
        'top_occasions': top_occasions,
        'top_countries': top_countries
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
