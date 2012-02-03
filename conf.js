var nconf = require("nconf")
  , env;

// Setup nconf to use (in-order), and item defined 
// in 4 will be overridden by the same definition in 1, 2 or 3 
//  1. Command-line arguments
//  2. Environment variables
//  3. Values in `config.json`
//  4. Default values   
nconf.argv().env();

env = nconf.get('NODE_ENV') || 'development';

nconf.file({
  file: __dirname + '/config/config-' + env + '.json'
});
nconf.defaults({
  "YOUR-REPO-NAME": {
    'port': '80'
  }
});
