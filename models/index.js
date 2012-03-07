"use strict";

var mongoose = require('mongoose')
  , inflections = require('inflections')
  , config = require('../config')
  , fs = require('fs')
  , files = fs.readdirSync(__dirname)
  , defaults
  , db;

defaults = {
  host: 'localhost',
  database: 'YOUR-REPO-NAME',
  port: 27017
};

// Get the mongo config from the config file where possible

var mongoUri = (function () {
  var mongoConfig = config.mongodb || defaults
    , uri = 'mongodb://';

  // Check if there is a username and password
  if(mongoConfig.username && mongoConfig.password) {
    uri += mongoConfig.username
      + ':' + mongoConfig.password + '@';
  }

  // Create the mongo Uri to connect to
  uri += mongoConfig.host
    + ':' + mongoConfig.port
    + '/' + mongoConfig.database;

  return uri;
})();

// Create an individual connection to the database.  You MUST use
// createConnection, as connect() is shared globally.
exports.db = db = mongoose.createConnection(mongoUri, function(err) {
  if(err) {
    console.log('connection error: ' + require('util').inspect(err));
  }
});

// Event when the db is connected
db.once('open', function ()  {
  console.log('opened connection to mongo db: ' + mongoUri);
});

// Load each Model module
files.forEach(function(file) {
  var name
    , model
    , match = /^([A-Za-z_]+)\.js$/.exec(file);
  if(file === 'index.js') { return; } // Don't include this file
  if (match) {
    name = match[1].camelize().toString();
    model = require('./' + file);
    if (model instanceof mongoose.Schema) {
      model = db.model(name, model);
    }
    module.exports[name] = model;
  }
});

