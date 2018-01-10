
var Container = require('./../Container');
var GameObject = require('./../GameObject');

function Room(props) {
  Container.call(this);
  var _cls = new (GameObject(null, props));

  for(var key in _tmp) {
    (function(k, pr){
      Object.defineProperty(this, k, pr);
    }).call(this, key, Object.getOwnPropertyDescriptor(_tmp, key));
  }

}

Object.defineProperty(Room, 'prototype', {
  value: Object.create(Container.prototype)
});


module.exports = Room;

