import axios from 'axios'

export function solveLPinPython(A) {
    const path = `https://flexibility-structure-analyzer.herokuapp.com` //`http://localhost:3001`
    const data = A;
    const axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
        }
    }

    return axios.post(path, { 'aMatrix': JSON.stringify(data) }, axiosConfig).then(response => {
        console.log("SUCCESS POST REQUEST")
        console.log(response.data)
        return response.data
    }).catch(error => {
        console.log(error)
    })
}















    /*const path = `http://127.0.0.1:8000` 
    const data = A;
    const axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
        }
    }

    return axios.post(path, data, axiosConfig).then(response => {
        console.log("SUCCESS POST REQUEST")
        console.log(response.data)
        return response.data
    }).catch(error => {
        console.log(error)
    })*/
