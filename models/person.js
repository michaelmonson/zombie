"use strict";

var events = require('events')
  , AnimateThing = require('./animateThing');

function Person(x, y, _id) {
  AnimateThing.call(this, x, y);
  this.id = _id;
}

Person.prototype = new AnimateThing();

module.exports = Person;