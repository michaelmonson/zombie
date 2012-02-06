var mongoose = require('mongoose')
  , inflections = require('inflections')
  , nconf = require('../config')
  , config = nconf.get('YOUR-REPO-NAME')
  , fs = require('fs')
  , files = fs.readdirSync(__dirname)
  , defaults
  , mongoConfig
  , db;

defaults = {
  host: 'localhost',
  database: 'YOUR-REPO-NAME',
  port: 27017
};

mongoConfig = config.mongodb || defaults

db = mongoose.connect(mongoConfig.host,
                      mongoConfig.database,
                      mongoConfig.port);

// Load each Model module
files.forEach(function(file) {
  var name, model, match = /^([a-z_]+)\.js$/.exec(file);
  if(file === 'index.js') { return; } // Don't include this file
  if (match) {
    name = match[1].classify().toString();
    model = require('./' + file);
    if (model instanceof mongoose.Schema) {
      model = mongoose.model(name, model);
    }
    module.exports[name] = model; 
  }
});

exports.db = db;

exports.disconnect = function disconnect(callback){
  var callback = callback || function() {};
  mongoose.connection.close(callback);
};

exports.drop = function drop(callback){
  var callback = callback || function() {};
  mongoose.connection.db.executeDbCommand( {dropDatabase:1}, callback);
};

