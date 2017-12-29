
function Point(x, y) {
  if(Number.isNaN(x = Number(x)) || Number.isNaN(y = Number(y))) {
    throw TypeError("Point's input cannot convert to number.");
  }
  
  var pt = {
    x: 0,
    y: 0
  };

  Object.defineProperties(this, {
    x: {
      enumerable: true,
      get: function() {
        return pt.x;
      },
      set: function(val) {
        if(!Number.isNaN(val)) {
          x = val;
        }
      }
    },
    y: {
      enumerable: true,
      get: function() {
        return pt.y;
      },
      set: function(val) {
        if(!Number.isNaN(val)) {
          y = val;
        }
      }
    }
  })
}

Object.defineProperty(Point, 'prototype', {
  value: Object.defineProperties(Object.create(null), {
    displacement: {
      enumerable: true,
      value: function displacement(x, y) {
        var pt = Point.convertTo(x, y);
        return Math.sqrt(Math.pow(pt.x - this.x, 2) + Math.pow(pt.y - this.y, 2));
      }
    },
    slope: {
      enumerable: true,
      value: function slope(x, y) {
        var pt = Point.convertTo(x, y);
        return (pt.y - this.y) / (pt.x - this.x);
      }
    },
    distance: {
      enumerable: true,
      get: function() {
        return this.displacement;
      }
    },
    angle: {
      enumerable: true,
      value: function displacement(x, y) {
        var pt = Point.convertTo(x, y);
        return Math.atan2(pt.y - this.y, pt.x - this.x);
      }
    }
  })
});

Object.defineProperty(Point, 'convertTo', {
  enumerable: true,
  value: function convertTo() {
    var a = arguments[0];
    if(typeof a[0] === 'undefined' || a === null) {
      return null;
    }

    var x, y;
    if(Array.isArray(a)) {
      if(a.length < 2) {
        return null;
      }

      if(Number.isNaN(x = Number(a[0])) || Number.isNaN(y = Number(a[1]))) {
        return null;
      }
    }
    else if(typeof a === 'object') {
      if(a instanceof Point) {
        return a;
      }
      if(Number.isNaN(x = Number(a.x)) || Number.isNaN(y = Number(a.y))) {
        return null;
      }
    }
    else {
      if(Number.isNaN(x = Number(a))) {
        return null;
      }
      var b = arguments[1];
      if(Number.isNaN(y = Number(b))) {
        return null;
      }
    }

    return new Point(x, y);
  }
});


