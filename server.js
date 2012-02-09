var cluster = require('cluster')
  , os = require('os')
  , nconf = require('./config')
  , app;

if (nconf.get('env') !== 'development' && cluster.isMaster) {
  // Fork workers.
  var numCPUs = os.cpus().length;
  console.log("Forking " + numCPUs + " workers.");
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Restart any workers that die
  cluster.on('death', function(worker) {
    console.log('worker ' + worker.pid + ' died, starting another');
    cluster.fork();
  });
} else {
  // Start the web server
  app = require("./app");
}
