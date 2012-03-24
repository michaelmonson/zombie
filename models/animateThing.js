"use strict";

var world = require('../lib/world');

// ### Menu class
function AnimateThing() {
  this.x = 0;
  this.y = 0;
}

/*
 * N, NE, E, SE, S, SW, W, NW 
 */
AnimateThing.prototype.move = function(direction) {
  direction = direction || "n";
  direction.toLowerCase();
  
  switch(direction) {
    case 'n':
      this.y++;
      break;
    case 'ne':
      this.y++;
      this.x++;
      break;
    case 'e':
      this.x++;
      break;
    case 'se':
      this.x++;
      this.y--;
      break;
    case 's':
      this.y--;
      break;
    case 'sw':
      this.y--;
      this.x--;
      break;
    case 'w':
      this.x--;
      break;
    case 'nw':
      this.x--;
      this.y++;
      break;
  }
  checkGridLimits();
};

AnimateThing.prototype.checkGridLimits = function() {
  if(world.minX < this.x) {
    this.x = world.minX
  } 
  if(world.maxX > this.x) {
    this.x = world.maxX;
  }
  if(world.maxY > this.y) {
    this.y = world.maxY;
  }
  if(world.minY < this.y) {
    this.y = world.minY;
  }
}

module.exports = AnimateThing;
