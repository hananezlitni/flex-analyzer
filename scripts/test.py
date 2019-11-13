#!flask/bin/python
from flask import Flask, jsonify

app = Flask(__name__, static_folder = "./dist/static", template_folder = "./dist")

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/test', methods=['GET'])
def print_msg():
    return 'Hello, from Flask!'