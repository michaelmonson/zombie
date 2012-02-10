// Setup config

var confrodo = require('confrodo') // one ring to rule them all
  , filename = __dirname + '/' + confrodo.env + '.json'
  , defaults = {}
  , config = confrodo(defaults, filename, "ARGV");

module.exports = config;
