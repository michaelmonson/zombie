
var mongoose = require('mongoose')
  , util = require('util')
  , nconf = require('nconf');

var connect = function() {
  var mongoConfig = nconf.get('YOUR-REPO-NAME').mongodb;
  if (mongoConfig) {
    // Start the mongo connection
    mongoose.connect(mongoConfig.host,
                     mongoConfig.database,
                     mongoConfig.port);
  }
};

exports.connect = connect;

