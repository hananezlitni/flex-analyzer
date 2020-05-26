#!flask/bin/python3.8
import os
from flask import Flask, request, jsonify, render_template, send_from_directory, send_static_file
from flask_cors import CORS
from scripts import solver 
from random import *

application = Flask(__name__, static_folder="static")
cors = CORS(application, resources={r"/*": {"origins": "*"}})

#print(sys.path)

#@application.route("/")
#def index():
#    return render_template('index.html')

#@application.route('/', defaults={'path': ''})
#@application.route('/<path:path>')           
#def index(path):
#    return render_template('index.html')

@application.route("/")
def index():
    return application.send_static_file('../client/index.html')

@application.route('/<path:path>')
def serve_page(path):
    return send_from_directory('static', path)

@application.route('/', methods=["POST"])
def app():
    A = (request.data).decode("utf-8")

    output = solver.solveLP(A)

    result = {
        'output': output
    } 

    return result

if __name__ == "__main__":
    application.run(debug=True)
