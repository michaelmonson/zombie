"use strict";

var config = require('./config')
  , io = require('socket.io')
  , goodies = require('goodies')
  , util = require('util')
  , RedisClient = require("./lib/redis")
  , crypto = require('crypto')
  , app = require("./app")
  , io = io.listen(app)
  , node_hash = require('node_hash')
  , EXPIRE = 10
  , REFRESH = EXPIRE/2;

var genId = function() {
  var id = crypto.randomBytes(9).toString("base64");
  id = id.replace("+","0").replace("/","1");
  return id;
};
