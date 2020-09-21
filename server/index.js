//current problem: stdout is asynchronous and result is returned before full data is received
//should use callback function

const { loadNuxt, build } = require('nuxt')
const express = require("express");
const bodyParser = require("body-parser");
var cors = require('cors')
const router = express.Router();
const app = express();
const isDev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 3000

// CORS
app.use(cors())

// Parse API data
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

// Render Nuxt on the server
async function start() {
  // We get Nuxt instance
  const nuxt = await loadNuxt(isDev ? 'dev' : 'start')

  // Render every route with Nuxt.js
  app.use(nuxt.render)

  // Build only in dev mode with hot-reloading
  if (isDev) {
    build(nuxt)
  }
  // Listen the server
  app.listen(port, '0.0.0.0')
  console.log('Server listening on `localhost:' + port + '`.')
}

// POST request to Python solver
router.post('/', async(req, res) => {
  // Allow CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');

  await compute(req, res)
});

async function compute (req, res) {
  return new Promise((resolve, reject) => {
    // Pass aMatrix and receive data
    var aMatrix = req.body.aMatrix;
    const spawn = require('child_process').spawn;
    const ls = spawn('python3', ['scripts/solver.py', aMatrix], ['-l']);
    var result = ''
    
    ls.stdout.on('data', (data) => {
      result =  `${data}`.split('\n')[1] //JSON.stringify(`${data}`.split('\n')[1])
      console.log(`stdout: ${data}`);
      console.log("result (from stdout): " + result)
    });
    
    ls.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`);
    });
    
    ls.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
      console.log("result (from onclose): " + result)
      res.send(result)
      res.end("end");
    });
  });
}


start()
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