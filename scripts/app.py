#!/usr/bin/env python
from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/test')
def print_msg():
    return 'Hello, from Flask!'

if __name__ == '__main__':
    app.run(debug=True)