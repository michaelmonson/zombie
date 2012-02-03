
// Not Found Error Type
function NotFound(msg){
  this.name = 'NotFound';
  Error.call(this, msg);
  Error.captureStackTrace(this, arguments.callee);
};
NotFound.prototype.__proto__ = Error.prototype;

function onNotFound(req, res, next){
  res.render('errors/404', { 
    locals: { 
      url: req.url,
      title: '404 - Not Found'
    },
    'status': 404 
  });
}

function onError(err, req, res, next){
  if (req.headerSent) {
    console.log("headerSent");
  }
  if (err instanceof NotFound) {
    onNotFound(req, res);
  } else {
    res.render('errors/500', { locals: { 
      title : 'The Server Encountered an Error',
      error: err},
      'status': 500 });
  }
};

function init(app) {
  app.get('/500', function(req, res){
    throw new Error('keyboard cat!');
  });

  //setup the errors
  app.error(onError);

  app.use(onNotFound);
}

exports.NotFound = NotFound;
exports.onNotFound = onNotFound;
exports.onError = onError;
exports.init = init;


