"use strict";

var ifitAuth = require('ifit-auth')
  , login = require('ifit-auth').requireLoggedIn;

// Init the base routes of the application
var home = function (req, res) {
  res.render('home');
};

var logout = function (req, res) {
  ifitAuth.logout(req, res, false);
  res.redirect('/');
};

var secret = function (req, res) {
  var me = {};
  // if you need data from /me in the browser, just make an XHR to https://[AUTH_URI]/me
  ifitAuth.me(req.headers, function(_me, _res) {
    if(!_me) return;
    me = _me;
    console.log(me.email);
  });
  res.render('secret');
};

var test = function(req, res, next) {
  console.log(req.session);
  next();
}

exports.init = function (app) {
  app.get('/', home);
  app.get('/secret', test, login, secret);
  app.get('/logout', logout);
}

