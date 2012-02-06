
// Init the base routes of the application
var home = function (req, res) {
  res.render('home');
};

var logout = function (req, res) {
  req.logout();
  res.redirect('/');
};

exports.init = function (app) {
  app.get('/', home);
  app.get('/logout', logout);
}

