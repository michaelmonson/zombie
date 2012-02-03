
var config = require('../config'),
    defaults = require('../config/defaults'),
    test = require('../config/test'),
    prod = require('../config/production'),
    dev = require('../config/development'),
    should = require('should');

describe('config', function() {
	
  describe('defaults', function () {
    it("should have env", function () {
      var env = defaults['env'];
      should.exist(env);
      env.should.equal("defaults");
    });
    it("should have default", function () {
      var val = defaults['default'];
      should.exist(val);
      val.should.equal("from defaults");
    });
  });

  describe('development', function () {
    it("should have env", function () {
      var env = dev['env'];
      should.exist(env);
      env.should.equal("development");
    });
  });

  describe('test', function () {
    it("should have env", function () {
      var env = test['env'];
      should.exist(env);
      env.should.equal("test");
    });
  });

  describe('production', function () {
    it("should have env", function () {
      var env = prod['env'];
      should.exist(env);
      env.should.equal("production");
    });
  });

});
