
var fs = require('fs'), 
  files = fs.readdirSync(__dirname); 
require('inflections');
    
files.forEach(function(file) {
  if (file === 'index.js') { 
    return;
  }
  var name, match = /^([a-z_]*)\.js$/.exec(file);
  if (match) {
    name = match[1].classify();
    module.exports[name] = require('./' + file);
  }
});

