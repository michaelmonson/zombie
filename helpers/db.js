
var mongoose = require('mongoose')
  , nconf = require('nconf');

exports.connect = function() {
  var mongo_config = nconf.get('mongodb');
  if ( mongo_config ) {
    // Start the mongo connection
    mongoose.connect(mongo_config.host,
      mongo_config.database,
      mongo_config.port);
  }
    
  // Start the redis connection
  // TODO
}
