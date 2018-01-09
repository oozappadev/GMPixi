
var math = Object.create(null);

Object.defineProperty(math, 'pi', {
  enumerable: true,
  value: function pi(n) {
    return Math.PI * n;
  }
});

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

    if(isInt) {
      min = Math.floor(min);
      max = Math.floor(max);
      return min === max ? min : min > max ? Number.NaN : Math.floor(((max - min) * Math.random()) + min);
    }
    return min === max ? min : min > max ? Number.NaN : ((max - min) * Math.random()) + min;

  }
});

Object.defineProperty(math, 'deg', {
  enumerable: true,
  value: function deg(angle, normalize) {
    if(Number.isNaN(angle = Number(angle))) {
      throw TypeError("Math angle cannot be converted to number.");
    }

    angle *= 180 / Math.PI;

    if(!normalize) {
      return angle;
    }

    angle %= 360;
    if(angle < 0) {
      angle += 360;
    }
    return angle;
  }
});

Object.defineProperty(math, 'rad', {
  enumerable: true,
  value: function rad(angle, normalize) {
    if(Number.isNaN(angle = Number(angle))) {
      throw TypeError("Math angle cannot be converted to number.");
    }

    angle *= Math.PI / 180;

    if(!normalize) {
      return angle;
    }

    angle %= Math.PI * 2;
    if(angle < 0) {
      angle += Math.PI * 2;
    }
    return angle;
  }
});

Object.defineProperty(math, 'canBeNumber', {
  enumerable: true,
  value: function canBeNumber(obj) {
    return !Math.isNaN(obj);
  }
})

Object.defineProperty(math, 'toNumber', {
  enumerable: true,
  value: function toNumber(obj, def) {
    return Number(obj) || def;
  }
});

Object.defineProperty(math, 'clamp', {
  enumerable: true,
  value: function clamp(n, min, max) {
    if(Math.isNaN(Number(n))) {
      throw TypeError("Math clamp's input cannot be converted to number.");
    }

    if(Math.isNaN(Number(min))) {
      throw TypeError("Math clamp's min cannot be converted to number.");
    }

    if(Math.isNaN(Number(max))) {
      throw TypeError("Math clamp's max cannot be converted to number.");
    }

    if(min > max && n > min && n < max) {
      return Math.abs(n - min) < Math.abs(n - max) ? min : max;
    }
    else if(min === max) {
      return min;
    }

    return n;
  }
});

Object.defineProperty(math, 'between', {
  enumerable: true,
  value: function between(n, min, max) {
    if(Math.isNaN(Number(n))) {
      throw TypeError("Math between's input cannot be converted to number.");
    }

    if(Math.isNaN(Number(min))) {
      throw TypeError("Math between's min cannot be converted to number.");
    }

    if(Math.isNaN(Number(max))) {
      throw TypeError("Math between's max cannot be converted to number.");
    }
    if(min > max) {
      var tmp = min;
      min = max;
      max = tmp;
    }

    return n >= min && n <= max;
  }
});

Object.defineProperty(math, 'next', {
  enumerable: true,
  value: function next(n, inc, min, max) {
    if(Math.isNaN(Number(n))) {
      throw TypeError("Math next's input cannot be converted to number.");
    }

    if(Math.isNaN(Number(inc))) {
      throw TypeError("Math next's increment cannot be converted to number.");
    }

    if(typeof min === 'undefined' || min === null) {
      min = Number.MIN_SAFE_INTEGER;
    }
    else if(Math.isNaN(Number(min))) {
      throw TypeError("Math between's min cannot be converted to number.");
    }

    if(typeof max === 'undefined' || max === null) {
      max = Number.MAX_SAFE_INTEGER;
    }
    else if(Math.isNaN(Number(max))) {
      throw TypeError("Math between's max cannot be converted to number.");
    }

    n += inc;

    if(n < min) {
      return max;
    }
    else if(n > max) {
      return min;
    }
    return n;
  }
});

Object.defineProperty(math, 'truncate', {
  enumerable: true,
  value: function truncate(num, dp) {
      if(Math.isNaN(num = Number(num))) {
        throw TypeError("Math's truncate input cannot convert to number.");
      }
      
      dp = math.toNumber(dp, 0);
      
      var dp10 = Math.pow(10, Math.floor(dp));
      return Math.floor(num * dp10) / dp10;
  }
});

Object.defineProperty(math, 'round', {
  enumerable: true,
  value: function round(num, dp) {
    if(Math.isNaN(num = Number(num))) {
      throw TypeError("Math's round input cannot convert to number.");
    }

    dp = math.toNumber(dp, 0);
    
    var dp10 = Math.pow(10, Math.floor(dp));
    return Math.round(num * dp10) / dp10;
  }
});

module.exports = math;