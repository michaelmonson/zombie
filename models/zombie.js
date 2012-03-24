var AnimateThing = require('./animateThing');

function Zombie(_x, _y) {
  AnimateThing.call(this, _x, _y);
}

Zombie.prototype = new AnimateThing();

module.exports = Zombie;
