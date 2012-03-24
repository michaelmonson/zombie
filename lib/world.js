var Zombie = require('../models/zombie')
  , Person = require('../models/person')
  , zombies = []
  , people = {};

var bounds = exports.bounds = {
  x: 1000,
  y: 1000
}

exports.create = function create() {
  populateZombies();
  setInterval(zombieTick, 1000);
  setInterval(personTick, 1000);
  //createPerson(1);
}

function populateZombies() {
  for(var i = 0; i < 1; i++) {
    spawnZombie();
  }
}

function spawnZombie() {
  var x = Math.floor(Math.random() * bounds.x);
  var y = Math.floor(Math.random() * bounds.y);
  var zombie = new Zombie(x, y);
  zombies.push(zombie);
}

function createPerson(id) {
  var x = Math.floor(Math.random() * bounds.x);
  var y = Math.floor(Math.random() * bounds.y);
  var person = new Person(x, y, id);
  people[person.id] = person;
}

function printZombies() {
  zombies.forEach(function(zombie) {
    console.log(zombie);
  })
}

function printPeople() {
  for (var id in people) {
    var person = people[id];
    console.log(person);
  }
}

function personTick() {
  // for (var id in people) {
    // var person = people[id];
    // person.move(1, 1);
  // }
  //printPeople();
}

function zombieTick() {
  moveZombies()
  // printZombies();
}

function moveZombies() {
  zombies.forEach(function(zombie) {
    zombie.shuffle();
  });
}

function checkCollision(person) {
  zombies.forEach(function(zombie) {
    var diffX = Math.abs(zombie.x - person.x);
    var diffY = Math.abs(zombie.y - person.y);
    if(diffX < 5 && diffY < 5) {
      return zombie;
    }
  });
  return null;
}

function cleanupZombies() {
  for(var i = zombies.length -1; i >= 0; i++) {
    var zombie = zombies[i];
    if(zombie && !zombie.active) {
      zombies.splice(i, 1);
    }
  }
}

exports.personUpdate = function(id, x, y) {
  console.log(id);
  var person = people[id];
  console.log('person: ' + person);
  if(!person) return;
  person.move(x, y);
}

exports.newConnection = function(id) {
  console.log('create: ' + id);
  createPerson(id);
}

exports.zombieUpdate = function() {
  //cleanupZombies();
  return zombies;
}

exports.peopleUpdate = function() {
  return people;
}

