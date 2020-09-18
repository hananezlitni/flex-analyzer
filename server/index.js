const express = require("express");
const bodyParser = require("body-parser");
var cors = require('cors')
const router = express.Router();
const app = express();

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

router.post('/',(req, res) => {
  var aMatrix = req.body.aMatrix;

  const spawn = require('child_process').spawn;
  const ls = spawn('python3', ['scripts/solver.py', aMatrix], ['-l']);
  var result = ''
  //var i = 0
  
  ls.stdout.on('data', (data) => {
    result = JSON.stringify(`${data}`.split('\n')[1])
    console.log(`stdout: ${data}`);
  });
  
  ls.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });
  
  ls.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
    res.send(result)
    res.end("end");
  });
});

app.listen(3001,() => {
  console.log("Started on PORT 3001");
})

app.use('/', router)
module.exports = app

// Start standalone server if directly running
/*if (require.main === module) {
  const port = process.env.PORT || 3001
  app.listen(port, () => {
    console.log(`API server listening on port ${port}`)
    const A = '["0,0,-4,-4,0,0,-2,-2,-6,-6,-2,-2,0,0,-4,-4,0,0,0,0,-4,-4,0,0,64","0,-2,0,-2,0,-2,0,-2,0,-2,0,-2,-1,-3,-1,-3,-1,-3,0,-2,0,-2,0,-2,53","0,0,0,0,-1,-1,0,0,0,0,-1,-1,0,0,0,0,-1,-1,-4,-4,-4,-4,-5,-5,123","1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0"]'
    const spawn = require('child_process').spawn;
    const ls = spawn('python3', ['scripts/solver.py', A]);
    
    ls.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });
    
    ls.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`);
    });
    
    ls.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
    });
  })
}*/