import axios from 'axios'

export function solveLPinPython(A) {
    const path =  `http://localhost:3001` //`https://flexibility-structure-analyzer.herokuapp.com`
    const data = A;
    const axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
        }
    }

    return axios.post(path, { 'aMatrix': JSON.stringify(data) }, axiosConfig).then(response => {
        console.log("Success POST Request")
        let output = response.data.split('\n')[1]
        console.log(output)
        return output
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
