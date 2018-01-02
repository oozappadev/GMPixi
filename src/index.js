

var GMPixi = require('./core');

var utils = require('./utils');
for(var key in utils) {
  (function(k, v) {
    Object.defineProperty(GMPixi, k, {
      enumerable: true,
      get: function() {
        return v;
      }
    });
  })(key, utils[key]);
}

Object.defineProperty(GMPixi, 'data', {
  enumerable: true,
  value: require('./data')
});


global.GMPixi = GMPixi;


