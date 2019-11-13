#!flask/bin/python
from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/test', methods=['GET'])
def print_msg():
    return 'Hello, from Flask!'