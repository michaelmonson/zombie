
var should = require('should'),
    Thing = require('../models/animateThing');

describe('AnimateThing', function () {
  var thing;
  beforeEach(function() {
    thing = new Thing(10,20);
  });
  it("should have a location", function() {
    thing.should.have.property('x',10);
    thing.should.have.property('y',20);
  });
  it("should have a last direction", function() {
    thing.should.have.property('lastX');
    thing.should.have.property('lastY');
  });
  it("should be active", function(){
    thing.should.have.property('active');
    thing.active.should.be.ok;
  });
  it("should move", function(){
    thing.move(1,1);
    thing.should.have.property('x',11);
    thing.should.have.property('y',21);
  });
  describe('checkGridLimits', function(){
    it('should not move valid coordinates', function() {
      thing.checkGridLimits();
      thing.should.have.property('x',10);
      thing.should.have.property('y',20);
    });
    it('should bound to valid coordinates', function() {
      thing.x = 1001;
      thing.y = 1001;
      thing.checkGridLimits();
      thing.should.have.property('x',1000);
      thing.should.have.property('y',1000);
      thing.x = -1001;
      thing.y = -1001;
      thing.checkGridLimits();
      thing.should.have.property('x',-1000);
      thing.should.have.property('y',-1000);
    });
  });
 
});
