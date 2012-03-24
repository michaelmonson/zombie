"use strict";

var events = require('events'),
    AnimateThing = require('./animateThing');

function rand_dir() {
  return Math.floor(Math.random()*3) - 1;
}

function Zombie(x, y) {
  AnimateThing.call(this, x, y);
}
Zombie.prototype = new AnimateThing();
module.exports = Zombie;

Zombie.prototype.attacked = function() {
  this.active = false;
};

Zombie.prototype.turn_right = function() {
  if (this.lastX == 1 && this.lastY > -1) {
    this.lastY --;
  } else if (this.lastY == -1 && this.lastX > -1) {
    this.lastX --;
  } else if (this.lastX == -1 && this.lastY < 1) {
    this.lastY ++;
  } else if (this.lastY == 1 && this.lastX < 1) {
    this.lastX ++;
  }
};

Zombie.prototype.turn_left = function() {
  if (this.lastY == 1 && this.lastX > -1) {
    this.lastX --;
  } else if (this.lastX == -1 && this.lastY > -1) {
    this.lastY --;
  } else if (this.lastY == -1 && this.lastX < 1) {
    this.lastX ++;
  } else if (this.lastX == 1 && this.lastY < 1) {
    this.lastY ++;
  }
};

Zombie.prototype.change_direction = function() {
  var r = Math.random() * 100;
  if (r < 20) { // turn left
    this.turn_left();
  } 
  if (r > 80) { // turn right
    this.turn_right();
  } 
}

Zombie.prototype.update_direction = function() {
  if (this.target) {

  } else {
    this.change_direction();
  }
};

Zombie.prototype.shuffle = function() {
  this.update_direction();
  this.move(this.lastX, this.lastY);
};

