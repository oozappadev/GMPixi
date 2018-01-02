
var logic = Object.create(null);
var core = require('./../core');

Object.defineProperty(logic, 'or', {
  enumerable: true,
  value: function or() {
    if(arguments.length < 1) {
      return false;
    }
    for(var k in arguments) {
      if(arguments[k]) {
        return true;
      }
    }
    return false;
  }
});

Object.defineProperty(logic, 'orValue', {
  enumerable: true,
  value: function orValue() {
    for(var k in arguments) {
      if(arguments[k]) {
        return arguments[k];
      }
    }
    return core.undefined;
  }
})


Object.defineProperty(logic, 'and', {
  enumerable: true,
  value: function and() {
    for(var k in arguments) {
      if(!arguments[k]) {
        return false;
      }
    }
    return true;
  }
});

Object.defineProperty(logic, 'xor', {
  enumerable: true,
  value: function xor(a, b) {
    return (!a && b) || (a && !b) ? true : false;
  }
});

Object.defineProperty(logic, 'xnor', {
  enumerable: true,
  value: function xnor(a, b) {
    return !logic.xor(a, b);
  }
});

module.exports = logic;