
var Container = require('./../Container');
var GameObject = require('./../GameObject');

function Room(props) {
  Container.call(this);
  var setup = (props.construct && props.construct.setup) || (props.proto && props.proto.setup) || props.setup || null;

  props.construct && delete props.constructor.setup;
  props.proto && delete props.proto.setup;
  props && delete props.setup;

  var _cls = new (GameObject(null, props));

  for(var key in _cls) {
    (function(k, pr){
      Object.defineProperty(this, k, pr);
    }).call(this, key, Object.getOwnPropertyDescriptor(_cls, key));
  }

  if(typeof setup === 'function') {
    setup.call(this);
  }
}

Object.defineProperty(Room, 'prototype', {
  value: Object.create(Container.prototype)
});


module.exports = Room;

