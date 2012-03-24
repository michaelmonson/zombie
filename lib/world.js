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
  setInterval(tick, 1000);
}

function populateZombies() {
  for(var i = 0; i < 1; i++) {
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
  zombies.forEach(function(zombie) {
    console.log(zombie);
  })
}

function tick() {
  // printZombies();
}

function moveZombies() {
  
}

exports.zombieUpdate = function() {
  return zombies;
}
