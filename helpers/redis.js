var redis = require('redis')
  , util = require('util')
  , nconf = require('../config')
  , config = nconf.get('YOUR-REPO-NAME')
  , defaults = {
      port: 6379,
      host: "127.0.0.1",
      options: {}
    }
  , redisConf = config.redis || defaults;

/***************************
 * RedisError class
 ***************************/
var RedisError = function(error, log) {
  Error.apply(this, arguments); // call parent constructor
  this.message = error;
  this.log = log || error;
};

// extend Error for magical stack traces
RedisError.prototype = new Error();

/***************************
 * RedisClient class
 ***************************/
var RedisClient = function() {
  this.client = null;

  var port = redisConf.port
    , host = redisConf.host
    , options = redisConf.options
    , self = this; // keep reference to this for closures

  // create a client and make appropriate bindings
  var createClient = function() {
    self.client = redis.createClient(port, host, options);

    // throw errors for express to catch
    self.client.on("error", function(err) {
      throw new RedisError("A database error occurred. Check the logs.",
                           "REDIS ERROR: " + err);
    });

   self.client.on("end", function() {
      // If the client closes, open a new one.
      createClient.call(self);
    });
  };
  createClient();

};

RedisClient.prototype.getClient = function() {
  return this.client;
};

RedisClient.prototype.error = function(err, log) {
  throw new RedisError(err, log);
};

var methods = [
   "auth"
 , "end"
 , "get"
 , "hgetall"
 , "hkeys"
 , "hset"
 , "hmset"
 , "mget"
 , "mset"
 , "multi"
 , "on"
 , "print"
 , "publish"
 , "send_command"
 , "set"
 , "subscribe"
 , "quit"
];

// wrap client methods
for (var i = 0, l = methods.length; i < l; ++i) {
  var method = methods[i];
  RedisClient.prototype[method] = (function() {
    var lmethod = method;
    return function() {
      this.client[lmethod].apply(this.client, arguments);
    };
  })();
};

exports.RedisClient = RedisClient;
