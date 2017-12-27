
var math = Object.create(null);

Object.defineProperty(Math );

Object.defineProperty(math, 'random', {
  enumerable: true,
  value: function random(min, max, isInt, exempt) {
    if(typeof min === 'undefined') {
      return Math.random();
    }

    if(Number.isNaN(min = Number(min))) {
      throw TypeError("Math random's minimum cannot convert to number.");
    }

    if(Number.isNaN(max = Number(max))) {
      throw TypeError("Math random's maximum cannot convert to number.");
    }

    isInt = isInt ? true : false;

    if(typeof exempt === 'undefined') {
      exempt = [];
    }
    else if(Array.isArray(exempt)) {
      for(var i in exempt) {
        var t = Number(exempt[i]);
        if(Number.isNaN(t)) {
          throw TypeError("A math random's exempted number cannot convert to number.");
        }
        exempt[i] = t;
      }
    }

  }
});

