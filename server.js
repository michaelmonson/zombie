var cluster = require('cluster')
  , os = require('os')
  , config = require('./config')
  , cpus = os.cpus().length
  , startup
  , count
  , autoRestart
  , undeadCount = 0
  , app;

var spawnWorker = function(app, autoRestart) {
  // autoRestart defaults to true
  autoRestart = (typeof autoRestart === "boolean" ? autoRestart : true);
  var worker = cluster.fork();
  // tell the worker what to do
  worker.send(app);
  console.log("worker started with pid " + worker.pid);
  ++undeadCount;
  worker.on('exit', function(code, signal) {
    if (signal) {
      console.log(app + " worker " + worker.pid + " died with signal " + signal + ".");
    } else if (code) {
      console.log(app + " worker " + worker.pid + " died with code " + code + ".");
    } else {
      console.log(app + " worker " + worker.pid + " died.");
    }
    --undeadCount;
    if (undeadCount == 0) {
      console.log("No workers remaining, commiting suicide.");
      process.exit();
    }
  });
  if (autoRestart) {
    undeadCount = Infinity;
    // auto restart workers on death
    worker.on('exit', function(code, signal) {
      console.log("Starting another " + app + " worker.");
      spawnWorker(app, autoRestart);
    });
  }
};

if (cluster.isMaster) {
  // get workers from config
  for (var app in config.workers) {
    if (config.workers.hasOwnProperty(app)) {
      // get the number of workers to spwan
      if (typeof config.workers[app] === "object") {
        eval("count = " + config.workers[app]["count"]);
        autoRestart = config.workers[app]["autoRestart"];
      } else {
        eval("count = " + config.workers[app]);
        autoRestart = true;
      }
      console.log("Spawning " + count + " " + app + " workers.");
      // launch them
      for (var i = 0; i < count; i++) {
        spawnWorker(app, autoRestart);
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
