"use strict";

// ### Menu class
function AnimateThing(_x, _y) {
  this.x = _x || 0;
  this.y = _y || 0;
  this.lastX = Math.random() > .5 ? -1 : 1;
  this.lastY = Math.random() > .5 ? -1 : 1;
  this.positionDirty = false;
  this.active = true;
  
}

AnimateThing.prototype.checkGridLimits = function() {
  var b = {x: 1000, y: 1000};
  if(this.x > b.x) {
    this.x = b.x
  } 
  if(this.x < -b.x) {
    this.x = -b.x;
  }
  if(this.y > b.y) {
    this.y = b.y;
  }
  if(this.y < -b.y) {
    this.y = -b.y;
  }
}

AnimateThing.prototype.move = function(_x, _y) {
  this.x += _x;
  this.y += _y;
  this.checkGridLimits();
  if(_x != 0) {
    this.lastX = _x;
    this.positionDirty = true;
  }
  if(_y != 0) {
    this.lastY = _y;
    this.positionDirty = true;
  }
};

AnimateThing.prototype.toString = function() {
  return 'x: ' + this.x + ' y: ' + this.y;
}

module.exports = AnimateThing;//AnimateThing;
