#!flask/bin/python3.8
import os
from flask import Flask, request, jsonify, render_template, send_from_directory
from flask_cors import CORS
from scripts import solver 
from random import *

application = Flask(__name__, static_folder="./static/dist",
                            template_folder="./static/dist")
cors = CORS(application, resources={r"/*": {"origins": "*"}})

#print(sys.path)

@application.route("/")
def index():
    return render_template("/server/index.spa.html")

#def index():
#    root_dir = os.path.dirname(os.getcwd())
#    return send_from_directory(os.path.join(root_dir, 'static', 'dist', 'client'))

#@application.route('/', defaults={'path': ''})
#@application.route('/<path:path>')
#def serve(path):
#     path_dir = os.path.abspath("/static")
#     if path != "" and os.path.exists(os.path.join(path_dir, path)):
#         return send_from_directory(os.path.join(path_dir), path)
#     else:
#         return application.send_static_file('index.html')

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
