
// Setup nconf to use (in-order), and item defined 
// in 4 will be overridden by the same definition in 1, 2 or 3 
//  1. Command-line arguments
//  2. Environment variables
//  3. Values in `config.json`
//  4. Default values   
//
var node_env = process.env['NODE_ENV'] || 'development';
var nconf = require('nconf'),
  env = nconf.argv().env().get('NODE_ENV') || 'development',
  defaults = require('./defaults'),
  filename = 'config/' + env + '.json';

nconf.file({
  'file': filename
});

nconf.defaults(defaults);

module.exports = nconf;

