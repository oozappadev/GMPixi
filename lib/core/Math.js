
var math = {};
var Utils = require('./Utils');

Object.defineProperty(math, 'pi', {
  enumerable: true,
  value: function(m) {
    m = Number(m);
    if(Number.isNaN(m)) {
      throw TypeError('Input cannot be converted to number.');
    }
    return Math.PI * m;
  }
});


Object.defineProperty(math, 'canBeNumber', {
  enumerable: true,
  value: function(obj) {
    return !Number.isNaN(Number(obj));
  }
});


Object.defineProperty(math, 'toNumber', {
  enumerable: true,
  value: function(obj, defVal) {
    return math.canBeNumber(obj) ? Number(obj) : defVal;
  }
});

Object.defineProperty(math, 'random', {
  enumerable: true,
  value: function(min, max, isInt) {
    if(math.canBeNumber(min)) min = Number(min);
    else throw TypeError('Minimum value cannot be converted to number!');

    if(math.canBeNumber(max)) max = Number(max);
    else throw TypeError('Maximum value cannot be converted to number!');

    if(min > max) throw Error('Minimum value cannot exceed maximum value!');

    var rand = Math.random() * (max - min) + min;
    return isInt ? Math.floor(rand) : rand;
  }
});

Object.defineProperty(math, 'clamp', {
  enumerable: true,
  value: function(val, min, max) {
    if(math.canBeNumber(val)) val = Number(val);
    else throw TypeError('Input value cannot be converted to number!');

    if(math.canBeNumber(min)) min = Number(min);
    else throw TypeError('Minimum value cannot be converted to number!');

    if(math.canBeNumber(max)) max = Number(max);
    else throw TypeError('Maximum value cannot be converted to number!');

    return min < max ? (val > max ? max : val < min ? min : val) 
        : min === max ? min
        : (val > min ? val : val < max ? val 
        : Math.abs(val - min) < Math.abs(val - max) ? min : max);

  }
});


Object.defineProperty(math, 'between', {
  enumerable: true,
  value: function(val, min, max) {
    if(math.canBeNumber(val)) val = Number(val);
    else throw TypeError('Input value cannot be converted to number!');

    if(math.canBeNumber(min)) min = Number(min);
    else throw TypeError('Minimum value cannot be converted to number!');

    if(math.canBeNumber(max)) max = Number(max);
    else throw TypeError('Maximum value cannot be converted to number!');

    if(min > max) {
      var tmp = min;
      min = max;
      max = tmp;
    }

    return Math.max(val, min) === val && Math.min(val, max) === val;
  }
});

Object.defineProperty(math, 'normalizeRad', {
  enumerable: true,
  value: function(val) {
    if(math.canBeNumber(val)) val = Number(val);
    else throw TypeError('Input value cannot be converted to number!');
    while(val < 0 || val >= math.pi(2)) {
      val += (val < 0 ? 1 : -1) * math.pi(2);
    }
    return val;
  }
});


Object.defineProperty(math, 'normalizeDeg', {
  enumerable: true,
  value: function(val) {
    if(math.canBeNumber(val)) val = Number(val);
    else throw TypeError('Input value cannot be converted to number!');
    while(val < 0 || val >= 360) {
      val += (val < 0 ? 1 : -1) * 360;
    }
    return val;
  }
});


Object.defineProperty(math, 'rad', {
  enumerable: true,
  value: function(val, normalize) {
    if(math.canBeNumber(val)) val = Number(val);
    else throw TypeError('Input value cannot be converted to number!');

    val *= Math.PI / 180;

    return Utils.checkThenSet(normalize, false, Boolean) 
        ? math.normalizeRad(val)
        : val;
  }
});

Object.defineProperty(math, 'deg', {
  enumerable: true,
  value: function(val, normalize) {
    if(math.canBeNumber(val)) val = Number(val);
    else throw TypeError('Input value cannot be converted to number!');

    val *= 180 / Math.PI;
    console.log(Utils.checkThenSet(normalize, false, Boolean));
    return Utils.checkThenSet(normalize, false, Boolean) 
        ? math.normalizeDeg(val)
        : val;
  }
});


Object.defineProperty(math, 'next', {
  enumerable: true,
  value: function(val, inc, min, max) {
    if(math.canBeNumber(val)) val = Number(val);
    else throw TypeError('Input value cannot be converted to number!');

    if(math.canBeNumber(inc)) inc = Number(inc);
    else throw TypeError('Increment value cannot be converted to number!');

    if(math.canBeNumber(min)) min = Number(min);
    else throw TypeError('Minimum value cannot be converted to number!');

    if(math.canBeNumber(max)) max = Number(max);
    else throw TypeError('Maximum value cannot be converted to number!');

    if(min > max) throw Error('Minimum value cannot exceed maximum value!');

    val += inc;

    return inc > 0 ? (val > max ? min : math.clamp(val, min, max))
        : (val < min ? max : math.clamp(val, min, max));

  }
});


Object.defineProperty(math, 'truncate', {
  enumerable: true,
  value: function truncate(num, dp) {
    if(math.canBeNumber(num)) num = Number(num);
    else throw TypeError('Input value cannot be converted to number!');

    dp = math.toNumber(dp, 0);

    var dp10 = Math.pow(10, Math.floor(dp));
    return Math.floor(num * dp10) / dp10;
  }
});



Object.defineProperty(math, 'round', {
  enumerable: true,
  value: function round(num, dp) {
    if(math.canBeNumber(num)) num = Number(num);
    else throw TypeError('Input value cannot be converted to number!');

    dp = math.toNumber(dp, 0);

    var dp10 = Math.pow(10, Math.floor(dp));
    return Math.round(num * dp10) / dp10;
  }
});

module.exports = math;