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

  var aMatrix = req.body.aMatrix;

  // Pass aMatrix and receive data
  run_script('scripts/solver.py', aMatrix)

  function run_script(file, args) {
    let {PythonShell} = require('python-shell')
    let options = {
      mode: 'text',
      pythonOptions: ['-u'], // get print results in real-time
      args: [args]
    }
    var scriptOutput = "";

    try {
      PythonShell.run(file, options, function (err, results) { 
        console.log("error: " + err);
        scriptOutput = results
        console.log("Final output: " + scriptOutput)
        res.json(scriptOutput)
      });
    } catch(e) {
      console.log("error: " + e)
    }
  }  
});

start()
app.listen(3001,() => {
  console.log("Started on PORT 3001");
})
app.use('/', router)
module.exports = app


//Using callback function
/*var child_process = require('child_process')

  run_script('python3', ['scripts/solver.py', aMatrix], function(output, exit_code) {
      console.log('Full output of script: ',output);
      console.log('process exit with code: ' + exit_code)
      res.json(output)
  });

  function run_script(command, args, callback) {
    var child = child_process.spawn(command, args)

    var scriptOutput = "";

    child.stdout.on('data', function(data) {
      console.log('stdout: ' + `${data}`.split('\n')[1])
      scriptOutput += `${data}`.split('\n')[1]
    })

    child.stderr.on('data', function(data) {
        console.log('stderr: ' + data);
        scriptOutput += `${data}`.split('\n')[1]
    });

    child.on('close', function(code) {
      callback(scriptOutput, code);
    })
  }*/

//Using stdout.pipe()
/*const spawn = require('child_process').spawn;
  const ls = await spawn('python3', ['scripts/solver.py', aMatrix], ['-l']);
  var result = ''
  
  ls.stdout.on('data', async(data) => {
    console.log(`stdout: ${data}`);
    result = `${data}`.split('\n')[1]
    console.log("RESULT: " + result)
    stdout.pipe(res)
  });
  
  ls.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });

  ls.on('close', (code) => {
    if (code === 0) {
      console.log(`child process exited with code ${code}`);
      res.send(result)
    } else {
        console.log(`error: child process exited with code ${code}`)
    }
  });*/