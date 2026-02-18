from flask import Flask, send_from_directory, request

app = Flask('__name__')

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/groups.html')
def groups():
    return send_from_directory('.', 'groups.html')

@app.route('/spot.html')
def spot():
    return send_from_directory('.', 'spot.html')



app.run()