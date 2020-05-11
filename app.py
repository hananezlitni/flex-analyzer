#!flask/bin/python3.8
from flask import Flask, request, jsonify
from flask_cors import CORS
from scripts import solver 
from random import *

application = Flask(__name__)
cors = CORS(application, resources={r"/*": {"origins": "*"}})

#print(sys.path)

@application.route('/', methods=["POST"])
def app():
    A = (request.data).decode("utf-8")

    output = solver.solveLP(A)

    result = {
        'output': output
    } 

    return result

if __name__ == "__main__":
    port = int(os.environ.get('PORT', 8000))
    application.run(host='127.0.0.1', port=port)
    #application.run(debug=True)
