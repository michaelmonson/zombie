/*
 * Set up environmental configuration here, for example database events and functions
 *
 * (C) 2011 Paul Covell (paul@done.com)
 * MIT LICENSE
 *
 */
process.env['NODE_ENV'] = 'test';

var conf = require('../../config'),
    models = require('../../models'),
    Runner = require('kyuri').runner;
    Browser = require('zombie'), 
    app = require('../../server'),
    site = "http://localhost:" + conf.get('port');

Browser.site = site;

Runner.on('beforeTest', function (done) {
  models.drop(done);
});

Runner.on('beforeBackground', function (done) {
  done();
});

Runner.on('afterTest', function (done) {
  models.drop(done);
});

