#!flask/bin/python3.8
import os
from flask import Flask, request, jsonify, render_template, send_from_directory
from flask_cors import CORS
from scripts import solver 
from random import *

application = Flask(__name__)
cors = CORS(application, resources={r"/*": {"origins": "*"}})

#print(sys.path)

@application.route("/")
def index():
    return render_template('index.html') #send_from_directory('./static/', 'index.html')

@application.errorhandler(404)
def not_found_error(error):
    return render_template('index.html')

#@application.route('/static/<path:filename>')
#def serve_static(filename):
#    root_dir = os.path.dirname(os.getcwd())
#    return send_from_directory(os.path.join(root_dir, 'static/_nuxt'), filename)

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
