
var Shape = require('./Shape');
var Point = require('./Point');

function Circle(x, y, r) {

  try {
    Shape.call(this, x, y);
  }
  catch(e) {
    throw TypeError("Circle's positions cannot convert to number.");
  }

  if(Number.isNaN(r = Number(r))) {
    throw TypeError("Circle's radius cannot convert to number.");
  }

  
  Object.definePropert
}

Object.defineProperty(Rectangle, 'prototype', {
  value: Object.defineProperties(Object.create(Shape.prototype), {
    width: {
      enumerable: true,
      get: function() {
        return this.dimension.width;
      }
    },
    height: {
      enumerable: true,
      get: function() {
        return this.dimension.height;
      }
    },
    perimeter: {
      enumerable: true,
      get: function() {
        return 2 * (this.width + this.height);
      }
    },
    area: {
      enumerable: true,
      get: function() {
        return this.width * this.height;
      }
    },
    center: {
      enumerable: true,
      get: function() {
        return new Point(x + this.width/2, y + this.height/2);
      }
    },
    corners: {
      enumerable: true,
      get: function() {
        return [
          this.location,
          new Point(x + this.width, y),
          new Point(x + this.width, y + this.height),
          new Point(x, y + this.height)
        ];
      }
    },
    corner: {
      enumerable: true,
      value: function corner(side) {
        side = Math.floor(Number(side));
        if(Math.isNaN(side) || !(side >= 0 && side <= 3)) {
          throw Error("Unknown side");
        }
        return new Point(
          side % 3 === 0 ? x : x + this.width,
          side < 2 ? y : y + this.height 
        );
      }
    },
    diagonal: {
      enumerable: true,
      get: function() {
        return Math.sqrt(Math.pow(this.width, 2) + Math.pow(this.height, 2));
      }
    }
  })
});