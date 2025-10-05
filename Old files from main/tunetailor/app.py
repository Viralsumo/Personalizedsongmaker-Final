from flask import Flask, request, jsonify, render_template, session
from flask_cors import CORS
import requests
import json
import time
import os
import random
import logging
from dotenv import load_dotenv
import openai

# Configure logging
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

load_dotenv()
app = Flask(__name__)
CORS(app)
app.secret_key = os.getenv('FLASK_SECRET_KEY')
openai.api_key = os.getenv('OPENAI_API_KEY')
SUNO_API_KEY = os.getenv('SUNO_API_KEY')
BASE_URL = "https://api.sunoapi.org/api/v1"

if not SUNO_API_KEY:
    logger.error("Suno API key is missing in .env")
    raise ValueError("Suno API key is required.")

class SunoGenerator:
    def __init__(self, api_key: str):
        if not api_key:
            logger.error("SunoGenerator: API key is empty")
            raise ValueError("Suno API key is required.")
        self.session = requests.Session()
        self.session.headers.update({'Authorization': f'Bearer {api_key}'})

    def generate_song(self, prompt: str, style: str, title: str, model: str = "V4_5") -> str:
        logger.info(f"Generating song titled '{title}' with style '{style}'")
        url = f"{BASE_URL}/generate"
        payload = {
            "prompt": prompt,
            "style": style,
            "title": title,
            "customMode": True,
            "instrumental": False,
            "model": model,
            "callBackUrl": "http://localhost/callback"
        }
        logger.debug(f"Sending payload: {json.dumps(payload)}")
        try:
            response = self.session.post(url, json=payload, timeout=120)
            logger.debug(f"Suno API response: status={response.status_code}, body={response.text}")
            response.raise_for_status()
            data = response.json()
            if isinstance(data, dict):
                if data.get('code') != 200:
                    api_msg = data.get('msg', f"Unknown API error. Full response: {data}")
                    logger.error(f"API error: {api_msg}")
                    raise ValueError(f"API returned an error: {api_msg}")
                task_data = data.get('data')
                if task_data and 'taskId' in task_data:
                    task_id = task_data['taskId']
                    logger.info(f"Song generation started. Task ID: {task_id}")
                    return task_id
                else:
                    logger.error(f"API returned unexpected format: {data}")
                    raise ValueError(f"API returned unexpected format: {data}")
            logger.error(f"API returned unexpected type: {type(data)}")
            raise ValueError(f"API returned unexpected type: {type(data)}")
        except requests.RequestException as e:
            logger.error(f"Error starting song generation: {str(e)}")
            raise
        except (ValueError, json.JSONDecodeError) as e:
            logger.error(f"Error parsing generation response: {str(e)}")
            logger.error(f"Response content: {response.text if 'response' in locals() else 'No response'}")
            raise

    def poll_for_completion(self, task_id: str, max_retries: int = 60, retry_interval: int = 10) -> list:
        logger.info(f"Polling for song completion with task_id={task_id}")
        url = f"{BASE_URL}/generate/record-info?taskId={task_id}"
        for i in range(max_retries):
            try:
                logger.debug(f"Polling URL: {url}")
                response = self.session.get(url, timeout=60)
                logger.debug(f"Polling response: status={response.status_code}, body={response.text}")
                response.raise_for_status()
                results = response.json()
                if not isinstance(results, dict):
                    logger.warning(f"Unexpected response format: {type(results)}")
                    time.sleep(retry_interval)
                    continue
                if results.get('code') != 200:
                    api_msg = results.get('msg', f"Unknown API error. Full response: {results}")
                    logger.error(f"API error: {api_msg}")
                    time.sleep(retry_interval)
                    continue
                data = results.get("data")
                if data is None:
                    logger.warning(f"No data in response: {results}")
                    time.sleep(retry_interval)
                    continue
                if data.get('status') == "SUCCESS":
                    suno_data = data.get("response", {}).get("sunoData", [])
                    if not suno_data:
                        logger.warning(f"No sunoData in response: {data}")
                        time.sleep(retry_interval)
                        continue
                    completed_songs = [song for song in suno_data if song.get("audioUrl")]
                    if completed_songs:
                        logger.info(f"All {len(completed_songs)} songs are complete!")
                        return completed_songs
                    logger.warning(f"No audio URLs in sunoData: {suno_data}")
                    time.sleep(retry_interval)
                    continue
                logger.info(f"Task status: {data.get('status', 'unknown')} ({i+1}/{max_retries})")
                time.sleep(retry_interval)
            except requests.RequestException as e:
                logger.error(f"Error polling for status: {str(e)}. Retrying in {retry_interval}s...")
                time.sleep(retry_interval)
            except json.JSONDecodeError:
                logger.error(f"Failed to decode JSON from polling response. Retrying in {retry_interval}s...")
                time.sleep(retry_interval)
        logger.error(f"Polling timed out after {max_retries * retry_interval // 60} minutes.")
        raise TimeoutError(f"Polling timed out after {max_retries * retry_interval // 60} minutes.")

@app.route('/')
def index():
    logger.debug("Rendering index page")
    return render_template('index.html')

@app.route('/generate_lyrics', methods=['POST'])
def generate_lyrics():
    logger.debug("Received POST request for /generate_lyrics")
    data = request.form
    name = data['name']
    occasion = data['occasion']
    details = data['details']
    style = data['style']
    if not all([name, occasion, details, style]):
        logger.error("Missing required fields")
        return jsonify({"error": "All fields are required"}), 400
    if style == 'surprise':
        style = random.choice(['pop', 'rock', 'jazz'])
        logger.info(f"Surprise style selected: {style}")
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": f"Generate {occasion} lyrics for {name}. Details: {details}. Style: {style}. 2 verses, chorus, rhyme, 100-150 words."}]
        )
        lyrics = response.choices[0].message.content
        session['lyrics'] = lyrics
        session['name'] = name
        session['style'] = style
        session['occasion'] = occasion
        logger.info(f"Generated lyrics: {lyrics[:50]}...")
        return render_template('lyrics_preview.html', lyrics=lyrics)
    except Exception as e:
        logger.error(f"Exception in generate_lyrics: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/generate_song', methods=['POST'])
def generate_song():
    logger.debug("Received POST request for /generate_song")
    name = session.get('name', 'User')
    style = session.get('style', 'pop')
    lyrics = session.get('lyrics', 'Default lyrics')
    occasion = session.get('occasion', 'Celebration')
    logger.info(f"Generating song with: name={name}, style={style}, lyrics={lyrics[:50]}..., occasion={occasion}")
    if not all([name, style, lyrics, occasion]):
        logger.error("Missing session data")
        return jsonify({"error": "Missing session data"}), 400
    try:
        generator = SunoGenerator(api_key=SUNO_API_KEY)
        task_id = generator.generate_song(
            prompt=f"Happy {occasion} to {name}! {lyrics}",
            style=style,
            title=f"Song for {name}",
            model="V4_5"
        )
        completed_songs = generator.poll_for_completion(task_id)
        download_links = [song.get("audioUrl") for song in completed_songs if song.get("audioUrl")]
        if not download_links:
            logger.error("No audio URLs found")
            return jsonify({"error": "No audio URLs generated"}), 500
        logger.info(f"Download links: {download_links}")
        return render_template('download.html', links=download_links)
    except Exception as e:
        logger.error(f"Exception in generate_song: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/terms')
def terms():
    logger.debug("Rendering terms page")
    return render_template('terms.html')

@app.route('/privacy')
def privacy():
    logger.debug("Rendering privacy page")
    return render_template('privacy.html')

if __name__ == '__main__':
    app.run(debug=True)
else:
    application = app