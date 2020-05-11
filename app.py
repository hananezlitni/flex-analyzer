#!flask/bin/python3.8
from flask import Flask, request, jsonify, render_template, send_static_file
from flask_cors import CORS
from scripts import solver 
from random import *

application = Flask(__name__, static_url_path='')
cors = CORS(application, resources={r"/*": {"origins": "*"}})

#print(sys.path)

@application.route("/")
def index():
    return app.send_static_file('index.html')

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
