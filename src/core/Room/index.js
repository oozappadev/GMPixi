
var Container = require('./../Container');
var GameObject = require('./../GameObject');

function Room(props) {
  Container.call(this);
  var _cls = GameObject(null, props);
  var _tmp = new _cls();

  for(var key in _tmp) {
    (function(k){
      var pr = Object.getOwnPropertyDescriptor(_tmp, k);
      Object.defineProperty(this, k, pr);
    }).call(this, key);
  }

}

Object.defineProperty(Room, 'prototype', {
  value: Object.create(Container.prototype)
});


module.exports = Room;

