
var natural = require('natural'),
  nconf = require('nconf'),
  fs = require('fs');

// Start up the routes
exports.init = function(app) {
  loadRoutes(app);
  initHelpers(app);
  initRootRoutes(app);
}

// Get a list of all route and init each one
function loadRoutes(app) {
  // load up all the routes
  fs.readdir(__dirname, function(err, files){
    if (err) throw err;
    files.forEach(function(file){
      loadRoute(app, file);
    });
  });
}

// Load and initialize an individual route file
function loadRoute(app, file) {
  var name, route, match = /^([a-z_]*)\.js$/.exec(file);
  if ( match ) {
    name = match[1];
    if(name == 'index') return; // Don't include this file

    // Load the route and call the init function if there is one
    var route = require('./' + name);  
    Object.keys(route).map(function(action){
      switch(action) {
        case 'init':
          route.init(app);
          break;
      }
    });
  }
}

// Dynamic Helpers
function initHelpers(app) {
  new natural.NounInflector().attach();
  app.dynamicHelpers ({
    googleAnalyticsId: function () {
      return nconf.get('YOUR-REPO-NAME').googleAnalyticsId;
    }
  });
}

// Init the base routes of the application
function initRootRoutes(app) {
  app.get('/', function (req, res) {
    res.render('home');
  });

  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });
}
