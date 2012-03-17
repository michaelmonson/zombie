"use strict";

var config = require('../config')
  , jsConfig = require('../config').javascript
  , natural = require('natural')
  , fs = require('fs')
  , env = require('confrodo').env
  , version = require('../public/js/version').version
  , menu = require('../lib/menu');

loadDir(__dirname);

function loadDir(path) {
  var files = fs.readdirSync(path);
  files.forEach(function inspectFile(file) {
    var fullPath = path + '/' + file;
    var stats = fs.statSync(fullPath);
    if (stats.isFile()) {
      matchFile(fullPath.replace(__dirname, ''));
    } else if (stats.isDirectory()) {
      loadDir(fullPath);
    }
  });
}

function matchFile(file) {
  var match = /^(.*?\/([A-Za-z_]*))\.js$/.exec(file);
  if (match) {
    if (file === '/index.js') { return; } // Don't include this file
    exports[match[2]] = require('.' + file);  // Load the controller 
  }
}

function initController(app, name) {
  var controller = exports[name];
  if (controller) {
    if (typeof(controller.init) === 'function') {
      controller.init(app);
    }
  }
};

function initHelpers(app) {
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
    session: function(req, res) {
      return req.session;
    },
    url: function(req, res) {
      return req.url;
    },
    menu: function(req, res) {
      return (res.menu ? res.menu.getItems() : [])
    },
    topMenu: function(req, res) {
      return (res.topMenu ? res.topMenu.getItems() : []);
    },
    lowerMenu: function(req, res) {
      return (res.lowerMenu ? res.lowerMenu.getItems() : []);
    }
  });

};

// init each controller
exports.init = function init(app) {
  Object.keys(exports).map(function(name){
    if (name === 'init') { return; } // not interested in ourselves
    if (name === 'root') { return; } // root goes second to last
    if (name === 'errors') { return; } // errors goes last
    initController(app, name);
  });
  initController(app, 'root');
  initController(app, 'errors');
  initHelpers(app);
};

