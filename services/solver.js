import axios from 'axios'

export function solveLPinPython(A) {
    /*let A = [
        '-2, -2, 0, -1, -1, 1',
        '-3, 0, -5, -5, -2, 1',
        '-1, -3, -1, 0, -3, 1',
        '1, 1, 1, 1, 1, 0'
    ]*/

    const path = `http://localhost:5000/`
    const data = A;
    const axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
        }
    }

    return axios.post(path, data, axiosConfig).then(response => {
        return response.data
    }).catch(error => {
        console.log(error)
    })
}


/*const SimpleSimplex = require('simple-simplex');



function solveLP(serverRateVector, arrivalRates) {  
    let objective = {}
    let constraints = []
    let A = []

    A = serverRateVector.reduce((prev, next) => next.map((item, i) =>
    (prev[i] || []).concat(next[i])
    ), [])

    A = A.map((row) => row.map((entry) => entry === 0? 0 : entry * -1))	
    
    for (var i = 0; i < arrivalRates.length; i++) {
        A[i].push(arrivalRates[i])
    }

    A.push(new Array(A[0].length).fill(1))
    A[A.length - 1][A[A.length - 1].length - 1] = 0

    console.log("A")
    console.log(A)

    for (var i = 0; i < A[0].length; i++) {
        if (i === A[0].length - 1) {
            objective["gamma"] = 1
        } else {
            objective["x" + (i + 1)] = 0
        }
    }

    console.log("Objective")
    console.log(objective)

    for (var i = 0; i < A.length; i++) {
        let constraint = {}

        constraint["namedVector"] = buildNamedVector(i, A)
        constraint["constraint"] = '<='

        if (i === A.length - 1) {
            constraint["constant"] = 1
        } else {
            constraint["constant"] = 0
        }

        constraints.push(constraint)
    }

    console.log("Constraints")
    console.log(constraints)

    const solver = new SimpleSimplex({
        objective: objective,
        constraints: constraints,
        optimizationType: 'max',
    });

    console.log("Solver")
    console.log(solver)
    
    const result = solver.solve({
        methodName: 'simplex',
    });

    return result
}

function buildNamedVector(i, A) {
    let namedVector = {}

	for (var j = 0; j < A[0].length; j++) {
		if (j === A[0].length - 1) {
			namedVector["gamma"] = A[i][j]
		} else {
            namedVector["x" + (j + 1)] = A[i][j]
        }
    }
    
    return namedVector
}

export default solveLP;*/