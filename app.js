var everyauth = require('everyauth')
  , express = require('express')
  , mongooseAuth = require('mongoose-auth')
  , connectRedis = require('connect-redis')
  , config = require('./config')
  , io = require('socket.io')
  , util = require('util')
  , model = require('./models')
  , controllers = require('./controllers')
  , app = express.createServer();

module.exports = app;

app.configure('development', function() {
  var re = /img|images/;
  app.use(function(req, res, next) {
    if (req.url.match(re)) {
      res.header("Cache-Control", "max-age=3600, must-revalidate");
    } else {
      res.header("Cache-Control", "no-cache");
      res.header("Pragma", "no-cache");
      res.header("Expires", "Thu, 19 Nov 1981 08:52:00 GMT");
    }
    next();
  });
});

app.configure('test', 'production', function() {
  var re = /build/
    , date = new Date();

  date.setDate(date.getDate() + 365*5);
  date = date.toGMTString();

  app.use(function(req, res, next) {
    if (req.url.match(re)) {
      res.header("Cache-Control", "public");
      res.header("Vary", "Accept-Encoding");
      res.header("Expires", date);
    }
    next();
  });
});

app.use(express.static(__dirname + "/public"));
app.use(express.bodyParser());
app.use(express.cookieParser());

// basic session for dev
app.configure('development', function() {
  app.use(express.session({secret: config.sessionSecret}));
});

// testing and production should use
// redis for the session store
app.configure('test', 'production', function() {
  var RedisStore = connectRedis(express)
    , store = new RedisStore(config.redis);
  app.use(express.session({secret: config.sessionSecret, store: store}));
});

// Config for every environment
app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  mongooseAuth.helpExpress(app);
});

// login and registration magic
app.use(mongooseAuth.middleware());

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

console.log('Listening on http://localhost:' + config.port +
            ' in ' + config.env + ' mode.');
