const SimpleSimplex = require('simple-simplex');

/*let serverRateVector = [
	[2,3,1],
	[2,0,3],
	[0,5,1],
	[1,5,0],
	[1,2,3]
]*/

function solveLP(serverRateVector, arrivalRates) {  
    let objective = {}
    let constraints = []
    let A = []

    /* Build A */
    A = serverRateVector.reduce((prev, next) => next.map((item, i) =>
    (prev[i] || []).concat(next[i])
    ), [])

    A = A.map((row) => row.map((entry) => entry === 0? 0 : entry * -1))	
    
    for (var i = 0; i < arrivalRates.length; i++) {
        A[i].push(arrivalRates[i])
    }

    A.push(new Array(A[0].length).fill(1))
    A[A.length - 1][A[A.length - 1].length - 1] = 0

    /* Build objective function */
    for (var i = 0; i < A[0].length; i++) {
        if (i === A[0].length - 1) {
            objective["gamma"] = 1
        } else {
            objective["x" + (i + 1)] = 0
        }
    }

    /* Build constraints */
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

    /* Initialize a solver */
    const solver = new SimpleSimplex({
        objective: objective,
        constraints: constraints,
        optimizationType: 'max',
    });
    
    /* Call the solve method with a method name */
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

export default solveLP;