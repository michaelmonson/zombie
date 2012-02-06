
var everyauth = require('everyauth')
  , express = require('express')
  , mongooseAuth = require('mongoose-auth')
  , nconf = require('./config') 
  , config = nconf.get('YOUR-REPO-NAME')
  , io = require('socket.io')
  , util = require('util')
  , model = require('./models')
  , controllers = require('./controllers')
  , app = express.createServer();

module.exports = app;

app.use(express.static(__dirname + "/public"));
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({secret : 'esoognom'}));
// app.use(mongooseAuth.middleware()); // this line is failing.

// Config for every environment
app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
//  mongooseAuth.helpExpress(app); // so is this line
});

// Config for dev and test environments
app.configure('development', 'test', function() {
  everyauth.debug = true;
  app.use(express.errorHandler({
    dumpExceptions : true,
    showStack : true
  }));
});

// Config for production environments
app.configure('production', function() {
  app.use(express.errorHandler());
});

// Setup the controllers (routes)
controllers.init(app);

// Start the server
app.listen(config.port);

//Setup Socket.IO
var io = io.listen(app);
io.sockets.on('connection', function(socket) {
  console.log('Client Connected');
  socket.on('message', function(message) {
    socket.broadcast.send(message);
    socket.send(message);
  });
  socket.on('disconnect', function() {
    console.log('Client Disconnected.');
  });
});

console.log('Listening on http://localhost:' + config.port);
