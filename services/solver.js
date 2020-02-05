import axios from 'axios'

export function solveLPinPython(A) {
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