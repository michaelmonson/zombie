
var conf = require('../config'),
  fs = require('fs'),
  files = fs.readdirSync(__dirname), 
  root = {};

// Load each Controller module
files.forEach(function (file) {
  var name, match = /^([a-z_]*)\.js$/.exec(file);
  if ( match ) {
    name = match[1];
    if(name === 'index') { return; } // Don't include this file
    exports[name] = require('./' + file);  // Load the controller 
  }
});

function initController(app, name) {
  var controller = exports[name];
  if (controller) {
    if (typeof(controller.init) === 'function') {
      controller.init(app);
    }
  }
}

// init each controller
exports.init = function(app) {
  Object.keys(exports).map(function(name){
    if (name === 'init') { return; } // not interested in ourselves
    if (name === 'root') { return; } // root goes last
    initController(app, name);
  });
  initController(app, 'root'); // root goes last
}


