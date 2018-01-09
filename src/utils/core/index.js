
var core = Object.create(null);

Object.defineProperty(core, 'undefined', {
  enumerable: true
});

Object.defineProperty(core, 'equals', {
  enumerable: true,
  value: function is(obj, value) {
    if(Array.isArray(value)) {
      if(Array.isArray(obj) && obj.length === value.length) {
        for(var i in obj) {
          if(!core.equals(obj[i], value[i])) {
            return false;
          }
        }
        return true;
      }
      return false;
    }

    return obj === value;
  }
});

Object.defineProperty(core, 'isOneOf', {
  enumerable: true,
  value: function isOneOf(obj, values) {
    if(Array.isArray(values)) {
      for(var k in values) {
        if(core.equals(obj, values[k])) {
          return true;
        }
      }
      return false;
    }
    return obj === values;
  }
});

Object.defineProperty(core, 'isA', {
  enumerable: true,
  value: function isA(obj, type) {
    if(Array.isArray(type)) {
      for(var k in type) {
        if(core.isA(obj, type[k])) {
          return true;
        }
      }
      return false;
    }

    if(typeof type === 'undefined') {
      return typeof type === typeof obj;
    }

    if(typeof obj === 'undefined') {
      return false;
    }

    if(type === null) {
      return obj === type;
    }

    if(typeof type === 'string') {
      return typeof obj === type;
    }

    if(
      type === String
      || type === Boolean
      || type === Number
    ) {
      return obj.constructor === type;
    }

    return obj instanceof type;

  }
});


module.exports = core;