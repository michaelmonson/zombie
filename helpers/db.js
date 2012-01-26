
var mongoose = require('mongoose')
  , util = require('util')
  , nconf = require('nconf');

var connect = function() {
  var mongo_config = nconf.get('mongodb');
  if (mongo_config) {
    // Start the mongo connection
    mongoose.connect(mongo_config.host,
      mongo_config.database,
      mongo_config.port);
  }
};

exports.connect = connect;

