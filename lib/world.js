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
  setInterval(zombieTick, 100);
  setInterval(personTick, 100);
  createPerson(1);
}

function populateZombies() {
  for(var i = 0; i < 100; i++) {
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

function createPerson(id) {
  var x = Math.floor(Math.random() * bounds.x);
  var y = Math.floor(Math.random() * bounds.x);
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
  for (var id in people) {
    var person = people[id];
    person.move(1, 1);
  }
  //printPeople();
}

function zombieTick() {
  moveZombies()
  printZombies();
}

function moveZombies() {
  zombies.forEach(function(zombie) {
    zombie.shuffle();
  });
}

exports.personUpdate = function(id, x, y) {
  var person = people[person.id];
  if(!person) return;
  person.move(x, y);
}

exports.newConnection = function(id) {
  createPerson(id);
}

exports.zombieUpdate = function() {
  return zombies;
}

exports.peopleUpdate = function() {
  return people;
}

