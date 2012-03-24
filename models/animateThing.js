"use strict";

// ### Menu class
function AnimateThing(_x, _y) {
  this.x = _x || 0;
  this.y = _y || 0;
  this.lastX = 0;
  this.lastY = 0;
  this.positionDirty = false;
  this.active = true;
}

AnimateThing.prototype.move = function(_x, _y) {
  this.x += _x;
  this.y += _y;
  checkGridLimits();
  if(_x != 0) {
    this.lastX = _x;
    positionDirty = true;
  }
  if(_y != 0) {
    this.lastY = _y;
    positionDirty = true;
  }
};

AnimateThing.prototype.checkGridLimits = function() {
  var b = {x: 1000, y: 1000};
  if(b.x * -1 < this.x) {
    this.x = b.x
  } 
  if(b.x > this.x) {
    this.x = b.x;
  }
  if(b.y > this.y) {
    this.y = b.y;
  }
  if(b.y * -1 < this.y) {
    this.y = b.y;
  }
}

AnimateThing.prototype.toString = function() {
  return 'x: ' + this.x + ' y: ' + this.y;
}

module.exports = AnimateThing;//AnimateThing;
