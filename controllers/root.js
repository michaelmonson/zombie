"use strict";

var ifitAuth = require('ifit-auth')
  , login = ifitAuth.requireLoggedIn;

// Init the base routes of the application
var home = function (req, res) {
  console.log('hai');
  res.render('world');
};

var logout = function (req, res) {
  ifitAuth.logout(req, res, false);
  res.redirect('/');
};

exports.init = function (app) {
  app.get('/', home);
  app.get('/logout', logout);
}

