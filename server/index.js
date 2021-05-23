const { loadNuxt, build } = require('nuxt')
const express = require("express");
const bodyParser = require("body-parser");
var cors = require('cors')
const router = express.Router();
const app = express();
const isDev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 3000

require('newrelic');

// CORS
app.use(cors())

// Parse API data
app.use(bodyParser.json({
  limit: '50mb'
}));

app.use(bodyParser.urlencoded({
  limit: '50mb',
  parameterLimit: 100000,
  extended: true 
}));

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