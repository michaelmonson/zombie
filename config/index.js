// Setup config to use in order:
//  1. Command-line arguments
//  2. Environment variables
//  3. Values in `config.json`

var optimist = require('optimist')
  , argv = optimist.argv
  , env
  , filename
  , config;

if (argv.hasOwnProperty('env')) {
  env = argv.env;
} else if (typeof process.env.NODE_ENV === 'string') {
  env = process.env.NODE_ENV;
} else {
  env = 'development';
}

filename = __dirname + '/' + env;
config = require(filename);
for (var i in argv) {
  if (i !== '_' && i !== '$0' && argv.hasOwnProperty(i)) {
    config[i] = argv[i];
  }
}
config.env = env;

module.exports = config;
