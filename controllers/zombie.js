var util = require('util')
  , model = require('../models');

exports.init = function(app) {
  app.get('/zombie', function (req, res) {
    res.render('zombie');
  });
}
