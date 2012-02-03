
require('inflections');
var mongoose = require('mongoose'),
    nconf = require('../config'),
    fs = require('fs'), 
    files = fs.readdirSync(__dirname), 
    mongo_config = nconf.get('mongodb') || {},
    db = mongoose.connect(
      mongo_config.host || 'localhost',
      mongo_config.database || 'workout_development',
      mongo_config.port || 27017
    );

// Load each Model module
files.forEach(function(file) {
  var name, model, match = /^([a-z_]*)\.js$/.exec(file);
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

