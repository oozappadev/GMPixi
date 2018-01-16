
var Container = require('./../Container');

function Room(props) {
  Container.call(this, props, Array.prototype.slice.call(arguments, 1));
}

Object.defineProperty(Room, 'prototype', {
  value: Object.create(Container.prototype)
});


module.exports = Room;

