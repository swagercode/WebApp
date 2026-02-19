from flask import Flask, send_from_directory, request, g, jsonify
import sqlite3
import os

app = Flask('__name__')

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

@app.route('/groups.html')
def groups():
    return send_from_directory('.', 'groups.html')

@app.route('/spot.html')
def spot_page():
    return send_from_directory('.', 'spot.html')

@app.route('/api/spot')
def spot():
    id = request.args.get('id', '')
    if not id:
        return jsonify({'error': 'Missing ID'}), 400

    g.cur.execute('''
        SELECT * FROM spots WHERE id=?;
    ''', (id, ))

    rows = g.cur.fetchall()
    if not rows:
        return jsonify({'error': 'Not found'})

    return jsonify(dict(rows))

@app.route('/api/add_spot', methods=['POST'])
def add_spot():
    data: dict = request.get_json()

    REQUIRED_KEYS: set[str] = {'name', 'description', 'address', 'hours', 'phone', 'rating', 'tags'}

    if not data or set(data.keys()) != REQUIRED_KEYS:
        return jsonify({'error': 'Please fill all fields'}), 400

    g.cur.execute('''
        INSERT INTO spots (name, description, address, hours, phone, rating, tags) VALUES (?, ?, ?, ?, ?, ?, ?);
    ''', (data['name'], data['description'], data['address'], data['hours'], data['phone'], data['rating'], data['tags']))
    g.db.commit()

    return jsonify({'success': 'Spot added'})

app.run()