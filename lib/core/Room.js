
var object = require("./Object");
var container = require("./Container");

var Room = object.create(container);

Object.defineProperty(Room, 'create', {
  enumerable: true,
  value: function(props) {
    return object.create(Room, props);
  }
});

module.exports = Room;

