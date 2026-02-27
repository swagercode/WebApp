from flask import Flask, redirect, send_from_directory, request, g, jsonify, flash, url_for, Response
import os, uuid, sqlite3

app = Flask('__name__')
app.config['MAX_CONTENT_LENGTH'] = 1000 * 1000
app.config['SECRET_KEY'] = os.urandom(12)

SPOTS_IMAGE_FOLDER = "./spots-images"
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

def allowed_file(filename: str) -> bool:
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def dict_factory(cursor, row):
    fields = [column[0] for column in cursor.description]
    return {key: value for key, value in zip(fields, row)}

@app.before_request
def before_request():
    g.db = sqlite3.connect('spots.db')
    g.db.row_factory = sqlite3.Row
    g.cur = g.db.cursor()

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
    id = request.args.get('id', '')
    if not id:
        return jsonify({'error': 'Missing ID'}), 400
    g.cur.execute('''
        SELECT * FROM spots WHERE id=?;
    ''', (id, ))
    spot = g.cur.fetchone()
    if not spot:
        return jsonify({'error': 'Not found'})
    return jsonify(dict(spot))

@app.route('/api/search-spot')
def search_spot():
    term = request.args.get('term', '')
    if not term:
        flash("No search term")
        return jsonify({'error': 'No search term'}), 405
    g.cur.execute('''
        SELECT s.name, s.rating, s.id, s.pictures
        FROM spots_fts 
        JOIN spots AS s ON s.id = spots_fts.rowid
        WHERE spots_fts
        MATCH ? 
        ORDER BY bm25(spots_fts)
        LIMIT 10;
    ''', (term + '*',))
    spots = g.cur.fetchall()
    spots_dicts = [dict(row) for row in spots]
    if not spots:
        flash('No results')
        return jsonify({'ok': 'No results'}), 200
    return jsonify(spots_dicts), 200

@app.route('/api/add-spot', methods=['POST'])
def add_spot() -> Response:
    data: dict = request.get_json()
    REQUIRED_KEYS: set[str] = {'name', 'description', 'address', 'hours', 'phone', 'rating', 'tags', 'pictures'}
    if not data or set(data.keys()) != REQUIRED_KEYS:
        flash('Please fill out all fields')
        return jsonify({'error': 'Not all fields filled'}), 405
    for field in data.values():
        if not field:
            flash('Please fill out all fields')
            return jsonify({'error': 'Not all fields filled'}), 405
    pictures: str = ''
    if type(data['pictures']) == list:
        pictures = ','.join(data['pictures'])
    else:
        flash('Pictures should return a list')
        return jsonify({'error': 'Pictures not in list'}), 405
    g.cur.execute('''
        INSERT INTO spots (name, description, address, hours, phone, rating, tags, pictures) VALUES (?, ?, ?, ?, ?, ?, ?, ?);
    ''', (data['name'], data['description'], data['address'], data['hours'], data['phone'], data['rating'], data['tags'], pictures))
    g.db.commit()
    return redirect(url_for('spot_add_success'))

@app.route('/api/upload-image', methods=['POST'])
def upload():
    if 'file' not in request.files:
        return jsonify({'error': 'No  file included'})
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'Empty file name'})
    if not file:
        return jsonify({'error': 'No file included'})
    if allowed_file(file.filename):
        ext = file.filename.rsplit('.', 1)[1].lower()
        filename = f'{uuid.uuid4()}.{ext}'
        if not os.path.isdir(SPOTS_IMAGE_FOLDER):
            os.mkdir(SPOTS_IMAGE_FOLDER)
        file.save(os.path.join(SPOTS_IMAGE_FOLDER, filename))
        return jsonify({'success': 'File uploaded successfully', 'filename': filename})
    else:
        return jsonify({'error': f'Invalid file path. Please choose from the following file types: {ALLOWED_EXTENSIONS}'})

@app.route('/api/download-image')
def download_image():
    name = request.args.get('name', '')
    if not name:
        return jsonify({'error': 'Missing name'}), 400
    return send_from_directory(SPOTS_IMAGE_FOLDER, name)

@app.route('/spot-add-success')
def spot_add_success():
    return send_from_directory('.', 'spot_add_success.html')

app.run()