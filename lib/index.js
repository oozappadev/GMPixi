
require('pixi.js');

if(typeof window.GMPixi === 'undefined') {
    Object.defineProperty(window, 'GMPixi', {
        enumerable: true,
        value: {}
    });
}


var core = require('./core');
for(var k in core) {
    (function(key) {
        Object.defineProperty(window.GMPixi, key, {
            enumerable: true,
            get: function() {
                return core[key];
            }
        });
    })(k);
}


if(typeof window.GMPixi.data === 'undefined') {
    Object.defineProperty(window.GMPixi, 'data', {
        enumerable: true,
        value: {}
    });
} 
var data = require('./data');
for(var k in data) {
    (function(key) {
        Object.defineProperty(window.GMPixi.data, key, {
            enumerable: true,
            get: function() {
                return data[key];
            }
        });
    })(k);
}
