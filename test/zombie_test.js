

var should = require('should'),
    Zombie = require('../models/zombie');

describe("zombie", function() {
  var zombie;
  beforeEach(function() {
    zombie = new Zombie(10,20);
  });
  it("should have a location", function() {
    zombie.should.have.property('x',10);
    zombie.should.have.property('y',20);
  });
  it("should be active", function(){
    zombie.should.have.property('active');
    zombie.active.should.be.ok;
  });
  it("should have a direction", function () {
    zombie.should.have.property('direction');
  });
  
  describe("a player is nearby", function() {
    it("should target the player");
    it("should move in the direction of the player");
  });
  describe("a targeted player is adjacent", function() {
    it("should attack the player");
  });
  describe("hears shot", function() {
    it("should move in the direction of the shot");
  });
  describe("without stimulus", function() {
    it("should ramble in a random direction", function() {
      var x = zombie.x, y = zombie.y, diff;
      zombie.shuffle();
      diff = Math.abs(zombie.x - x) + Math.abs(zombie.y - y);
      diff.should.be.above(0);
    });
    describe("with a last move in a direction", function() {
      it("should pick a random direction similar to the last direction");
    });
  });
  it("should turn left", function () {
    zombie.direction = {x: 1, y: 1};
    zombie.turn_left(); zombie.direction.should.equal({x: 0, y: 1});
    zombie.turn_left(); zombie.direction.should.equal({x: -1, y: 1});
    zombie.turn_left(); zombie.direction.should.equal({x: -1, y: 0});
    zombie.turn_left(); zombie.direction.should.equal({x: -1, y: -1});
    zombie.turn_left(); zombie.direction.should.equal({x: 0, y: -1});
    zombie.turn_left(); zombie.direction.should.equal({x: 1, y: -1});
    zombie.turn_left(); zombie.direction.should.equal({x: 1, y: 0});
    zombie.turn_left(); zombie.direction.should.equal({x: 1, y: 1});
  });
  describe("is attacked", function() {
    it("should die", function(){
      zombie.attacked();
      zombie.should.have.property('active');
      zombie.active.should.not.be.ok;
    });
  });
});
