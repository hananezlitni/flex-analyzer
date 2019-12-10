#!flask/bin/python3.8
from flask import Flask, request, jsonify
from flask_cors import CORS
import solver
from random import *

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

#print(sys.path)

@app.route('/', methods=["POST"])
def random_number():
    A = (request.data).decode("utf-8")

    output = solver.solveLP(A)

    print(output)

    result = {
        'output': output
    } 

    return result

if __name__ == "__main__":
    app.run(host='127.0.0.1', port=5000, debug=True)
