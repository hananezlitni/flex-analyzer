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
        //console.log("Success POST Request")
        let output = response.data[3]
        //console.log(output)
        return output
    }).catch(error => {
        console.log(error)
    })
}