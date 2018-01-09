

var Point = require('./Point');

function Shape(x, y) {
  if(Number.isNaN(x = Number(x))) {
    throw TypeError("Shape's x cannot convert to number.");
  }

  if(Number.isNaN(y = Number(y))) {
    throw TypeError("Shape's y cannot convert to number.");
  }

  _loc = new Point(x, y);

  Object.defineProperty(this, 'location', {
    enumerable: true,
    get: function() {
      return _loc;
    },
    set: function(inp) {
      if(!inp) {
        return;
      }
      var x, y;
      if(Array.isArray(inp)) {
        _loc.set(inp[0], inp[1])
      }
      else if(typeof inp === 'object') {
        _loc.set(inp.x, inp.y);
      }
    }
  });
};

Object.defineProperty(Shape, 'prototype', {
  enumerable: true,
  value: Object.defineProperties(Object.create(null), {
    x: {
      enumerable: true,
      get: function() {
        return this.location.x;
      }
    },
    y: {
      enumerable: true,
      get: function() {
        return this.location.y;
      }
    }
  })
});

module.exports = Shape;

