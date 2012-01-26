exports.init = function(app) {
  // Not Found Error Type
  function NotFound(msg){
    this.name = 'NotFound';
    Error.call(this, msg);
    Error.captureStackTrace(this, arguments.callee);
  }
  NotFound.prototype.__proto__ = Error.prototype;

  // 500 Page
  app.use(function(err, req, res, next) {
    throw err;
  });

  // 404 page
  app.use(function(req, res) {
    throw new NotFound;
  });

  //setup the errors
  app.error(function(err, req, res, next) {
     var defaultError = "An error occured.";
    if (err instanceof NotFound) {
      res.render('errors/404', { locals: { 
        title : '404 - Not Found'
      },status: 404 });
    } else {
      if (typeof err == "object") {
         if (err.hasOwnProperty("message")) {
            message = err.message;
         } else {
            message = defaultError;
         }
         if (err.hasOwnProperty("log")) {
            log = err.log;
         } else {
            log = message;
         }
      } else if (typeof err == "string") {
         message = err;
         log = err;
      } else {
         message = defaultError;
         log = defaultError;
      }
      res.render('errors/500', { locals: { 
        title : 'The Server Encountered an Error',
        error: message},
        status: 500 });
      console.log("ERROR: " + log);
    }
  });
}
