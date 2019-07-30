import * as axios from 'axios';

const BASE_URL = '/';

function upload(formData) {
    axios.post(BASE_URL,
          formData, {
            headers: {
              'Content-Type': 'text/csv'
            }
          }
        ).then(function () {
          console.log('SUCCESS!!');
        })
        .catch(function () {
          console.log('FAILURE!!');
        });

    axios.get(BASE_URL).then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })

    /*axios.post('/', {
        file: formData
    })
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });*/

    /*const url = `${BASE_URL}`;

    return axios.post(url, formData)
        // get data
        .then(x => console.log(x.data))
        // add url field
        .then(x => x.map(p => Object.assign({},
            p, { url: `${BASE_URL}/${p.id}` })));*/
}

export { upload }