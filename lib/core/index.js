
require('pixi.js');

var Core = {};

//get the utils and directly append it to the Core
var Utils = require('./Utils');
for(var k in Utils) {
    (function(key) {
        Object.defineProperty(Core, key, {
            enumerable: true,
            get: function() {
                return Utils[key];
            }
        });
    })(k);
}

//get Math
var math = require('./Math');
Object.defineProperty(Core, 'Math', {
    enumerable: true,
    get: function() {
        return math;
    }
});

//get Room
var Room = require('./Room');
Object.defineProperty(Core, 'Room', {
    enumerable: true,
    get: function() {
        return Room;
    }
});


module.exports = Core;
