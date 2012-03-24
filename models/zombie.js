"use strict";

var events = require('events'),
    AnimateThing = require('./animateThing');

function rand_dir() {
  return Math.floor(Math.random()*3) - 1;
}

function random_direction() {
  return { x: rand_dir(), y: rand_dir() };
}

function Zombie(x, y) {
  AnimateThing.call(this, x, y);
  this.direction = random_direction();
  this.active = true;
  this.x = x;
  this.y = y;
}
Zombie.prototype = new AnimateThing();
module.exports = Zombie;

Zombie.prototype.attacked = function() {
  this.active = false;
};

Zombie.prototype.turn_left = function() {
  var d = this.direction;
  if (d.y == 1 && d.x > -1) {
    d.x --;
  }
};

Zombie.prototype.turn_right = function() {
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
  this.move(this.direction);
};

