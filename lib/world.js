var Zombie = require('../models/zombie')
  , zombies = []
  , people = [];

var bounds = exports.bounds = {
  x: 1000,
  y: 1000
}

exports.create = function create() {
  populateZombies();
  printZombies();
}

function populateZombies() {
  for(var i = 0; i < 10; i++) {
    spawnZombie();
  }
}

function spawnZombie() {
  var x = Math.floor(Math.random() * bounds.x);
  var y = Math.floor(Math.random() * bounds.x);
  if(Math.random() > .5) {
    x = x * -1;
  }
  if(Math.random() > .5) {
    y = y * -1;
  }
  var zombie = new Zombie(x, y);
  zombies.push(zombie);
}

function printZombies() {
  var zombie;
  for(var i = 0; i < zombies.length; i++) {
    zombie = zombies[i]; 
    console.log(zombie);
  }
}