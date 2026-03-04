from flask import (
    Flask, redirect, send_from_directory, request, g, jsonify, flash, url_for, Response
)
import os
import uuid
import psycopg
import logging
import sys
from dotenv import load_dotenv

load_dotenv()

level_name = os.getenv('LOG_LEVEL', 'INFO').upper()
level = getattr(logging, level_name, logging.INFO)
logging.basicConfig(
    level=level,
    stream=sys.stdout,
    format="%(asctime)s [%(levelname)s], %(name)s: %(message)s",
)
logger = logging.getLogger("main")

app = Flask('__name__')
app.config['MAX_CONTENT_LENGTH'] = 1000 * 1000  # 1MB max upload
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', os.urandom(12))

DB_URL = os.getenv('DB_URL')
SPOTS_IMAGES_PATH = os.getenv('SPOTS_IMAGES_PATH', './spots-images')
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}


def allowed_file(filename: str) -> bool:
    """Check if filename is an allowed extension."""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.before_request
def before_request():
    # Example debug account for dev
    if app.debug:
        g.user_id = 1
    try:
        g.db = psycopg.connect(DB_URL)
        g.db.row_factory = psycopg.rows.dict_row
        g.cur = g.db.cursor()
    except Exception as e:
        logger.error(f'Failed to connect: {e}')        
        return jsonify({'error': 'Database connection failed'}), 500


@app.teardown_request
def teardown_request(exception=None):
    db = g.pop('db', None)
    if db is not None:
        db.close()


@app.route('/')
def index():
    return send_from_directory('.', 'index.html')


@app.route('/groups')
def groups():
    return send_from_directory('.', 'groups.html')


@app.route('/spot')
def spot_page():
    return send_from_directory('.', 'spot.html')


@app.route('/add-spot')
def add_spot_page():
    return send_from_directory('.', 'add_spot.html')


@app.route('/api/spot')
def spot():
    spot_id = request.args.get('id', '')
    if not spot_id:
        return jsonify({'error': 'Missing ID'}), 400
    g.cur.execute(
        "select * from spots where id=%s;",
        (spot_id,)
    )
    spot = g.cur.fetchone()
    if not spot:
        return jsonify({'error': 'Not found'})
    spot_dict = dict(spot)
    tags = spot_dict.get('tags')
    if isinstance(tags, str):
        s = tags.strip('{}')
        if not s:
            return jsonify({'error': 'No tags'}), 500
        spot_dict['tags'] = [x.strip().strip('""') for x in s.split(',')]
    return jsonify(spot_dict)


@app.route('/api/search-spot')
def search_spot():
    term = request.args.get('term', '')
    if not term:
        logger.warning('search_spot: missing term')
        flash('No search term')
        return jsonify({'error': 'No search term'}), 405

    g.cur.execute(
        '''
        select s.name, s.id, s.pictures,
        ts_rank(s.search_vector, query) as rank
        from spots s,
            to_tsquery('english', %s) query
        where s.search_vector @@ query
        order by rank desc
        limit 10;
        ''',
        (term + ':*',)
    )
    spots = g.cur.fetchall()
    spots_dicts = [dict(row) for row in spots]
    if not spots:
        return jsonify({'ok': 'No results'}), 200
    logger.info('search_spot: term=%r results=%d', term, len(spots_dicts))
    return jsonify(spots_dicts), 200


@app.route('/api/add-spot', methods=['POST'])
def add_spot() -> Response:
    data = request.get_json()
    print(data)
    REQUIRED_KEYS = {'name', 'description', 'address', 'tags', 'pictures'}

    if not data or set(data.keys()) != REQUIRED_KEYS:
        return jsonify({'error': 'Not all fields filled'}), 405
    for field in data.values():
        if not field:
            return jsonify({'error': 'Not all fields filled'}), 405
    if not isinstance(data.get('pictures'), list):
        return jsonify({'error': 'Pictures not in list'}), 405

    g.cur.execute(
        '''
        insert into spots (name, description, address, tags, pictures)
        values (%s, %s, %s, %s, %s) returning id;
        ''',
        (
            data['name'],
            data['description'],
            data['address'],
            data['tags'],
            data['pictures']
        )
    )
    g.db.commit()
    spot_id = g.cur.fetchone()['id']
    return redirect(url_for('spot_add_success', id=spot_id)), 301


@app.route('/api/upload-image', methods=['POST'])
def upload():
    if 'file' not in request.files:
        return jsonify({'error': 'No  file included'}), 405
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'Empty file name'}), 405
    if not file:
        return jsonify({'error': 'No file included'}), 405
    if allowed_file(file.filename):
        ext = file.filename.rsplit('.', 1)[1].lower()
        filename = f'{uuid.uuid4()}.{ext}'
        if not os.path.isdir(SPOTS_IMAGES_PATH):
            os.mkdir(SPOTS_IMAGES_PATH)
        file.save(os.path.join(SPOTS_IMAGES_PATH, filename))
        return jsonify({'success': 'File uploaded successfully', 'filename': filename}), 200
    else:
        return jsonify({
            'error': f'Invalid file path. Please choose from the following file types: {ALLOWED_EXTENSIONS}'
        }), 405


@app.route('/api/download-image')
def download_image():
    name = request.args.get('name', '')
    if not name:
        return jsonify({'error': 'Missing name'}), 400
    return send_from_directory(SPOTS_IMAGES_PATH, name)


@app.route('/spot-add-success')
def spot_add_success():
    return send_from_directory('.', 'spot_add_success.html')

@app.route('/favicon.ico')
def serve_favicon():
    return send_from_directory('.', 'favicon.ico')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)