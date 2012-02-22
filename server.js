var cluster = require('cluster')
  , os = require('os')
  , config = require('./config')
  , cpus = os.cpus().length
  , startup
  , count
  , app;

var spawnWorker = function(app, autoRestart) {
  // autoRestart defaults to true
  autoRestart = (typeof autoRestart === "boolean" ? autoRestart : true);
  var worker = cluster.fork();
  // tell the worker what to do
  worker.send(app);
  if (autoRestart) {
    // auto restart workers on death
    worker.on('exit', function(code, signal) {
      console.log(app + " worker " + worker.pid + " died, starting another.");
      spawnWorker(app, autoRestart);
    });
  }
};

if (cluster.isMaster) {
  // get workers from config
  for (var app in config.workers) {
    if (config.workers.hasOwnProperty(app)) {
      // get the number of workers to spwan
      eval("count = " + config.workers[app]);
      console.log("Spawning " + count + " " + app + " workers.");
      // launch them
      for (var i = 0; i < count; i++) {
        spawnWorker(app);
      }
    }
  }
} else {
  // workers wait to here from the server to know what to do
  startup = function(msg) {
    // stop listening after getting marching orders
    process.removeListener("message", startup);
    // start the app
    app = require("./" + msg);
  };
  process.addListener("message", startup);
}
