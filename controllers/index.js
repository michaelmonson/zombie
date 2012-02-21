var config = require('../config')
  , jsConfig = require('../public/js/config.json')
  , natural = require('natural')
  , fs = require('fs')
  , env = require('confrodo').env
  , version = require('../public/js/version').version
  , files = fs.readdirSync(__dirname);

// Load each Controller module
files.forEach(function (file) {
  var name, match = /^([A-Za-z_]*)\.js$/.exec(file);
  if (match) {
    name = match[1];
    if (name === 'index') { return; } // Don't include this file
    exports[name] = require('./' + file);  // Load the controller 
  }
});

var initController = function(app, name) {
  var controller = exports[name];
  if (controller) {
    if (typeof(controller.init) === 'function') {
      controller.init(app);
    }
  }
};

var initHelpers = function(app) {
  new natural.NounInflector().attach();

  // Static Helpers
  app.helpers({
    version: version,
    env: env,
    jsConfig: jsConfig
  });

  // Dynamic Helpers
  app.dynamicHelpers({
    googleAnalyticsId: function () {
      return config.googleAnalyticsId;
    },
    url: function(req, res) {
      return req.url;
    },
    menu: function(req, res) {
      var menu;
      if (res.hasOwnProperty('menu')) {
         menu = res.menu;
      } else if (req.hasOwnProperty('user')) {
        menu = {
          "/": "Home",
          "/logout": "Logout"
        };
      } else {
        menu = {
          "/": "Home",
          "/register": "Register",
          "/login": "Login",
          "/auth/facebook": "<img src=\"/img/facebook-connect-button.png\" />"
        };
      }
      return menu;
    }
  });

};

// init each controller
exports.init = function(app) {
  Object.keys(exports).map(function(name){
    if (name === 'init') { return; } // not interested in ourselves
    if (name === 'root') { return; } // root goes last
    initController(app, name);
  });
  initController(app, 'root'); // root goes last
  initHelpers(app);
};

