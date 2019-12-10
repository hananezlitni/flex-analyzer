export function buildMatrixA(serverRates, arrivalRates) {
    let A = []
    
    /* Build A */
    A = serverRates.reduce((prev, next) => next.map((item, i) => (prev[i] || []).concat(next[i])), [])

    A = A.map((row) => row.map((entry) => entry === 0 ? 0 : entry * -1))	
    
    for (var i = 0; i < arrivalRates.length; i++) {
        A[i].push(arrivalRates[i])
    }

    A.push(new Array(A[0].length).fill(1))
    A[A.length - 1][A[A.length - 1].length - 1] = 0

    A = A.map((row) => row.join())

    return A
}