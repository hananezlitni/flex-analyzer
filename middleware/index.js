/*const express = require('express')
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const app = express()


app.post('/upload', upload.single('file'), function (err, req, res, next ) { 
    if (err) { 
      console.log(req);
      console.log(req.file);
      console.error(err);
      return res.sendStatus(500);
    }
    next()
    }, function (req, res, next) {
        d3.csv(req.file.path, (data) => {
            console.log(data)
        })
    }
);

app.listen(3001, () => console.log(`Example app listening on port 3000!`))*/

