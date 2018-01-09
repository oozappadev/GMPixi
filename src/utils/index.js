

var utils = Object.create(null);

var core = require('./core');
for(var key in core) {
  (function(k, v) {
    Object.defineProperty(utils, k, {
      enumerable: true,
      get: function() {
        return v;
      }
    });
  })(key, core[key]);
}


Object.defineProperty(utils, 'format', {
  enumerable: true,
  value: require("./format")
});

Object.defineProperty(utils, 'array', {
  enumerable: true,
  value: require('./array')
});

Object.defineProperty(utils, 'math', {
  enumerable: true,
  value: require('./math')
});

Object.defineProperty(utils, 'vector', {
  enumerable: true,
  value: require('./vector')
});

Object.defineProperty(utils, 'logic', {
  enumerable: true,
  value: require('./logic')
});

module.exports = utils;

