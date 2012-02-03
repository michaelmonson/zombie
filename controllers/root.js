
// Init the base routes of the application
exports.home = function (req, res) {
  res.render('home');
};

exports.logout = function (req, res) {
  req.logout();
  res.redirect('/');
};

exports.init = function (app) {
  app.get('/', exports.home);
  app.get('/logout', exports.logout);
}

