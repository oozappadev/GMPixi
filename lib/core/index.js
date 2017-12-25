
require('pixi.js');

var Core = {};

/******************************************************************************
 ******************************************************************************
 *****                             UTILITIES                              *****
 *****                                                                    *****
 *****                General purpose functions and constants.            *****
 ******************************************************************************
 ******************************************************************************/


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


/******************************************************************************
 *****                          GAME UTILITIES                            ***** 
 *****                                                                    *****
 *****     General objects, functions and constants for gaming needs.     *****
 ******************************************************************************/
var object = require('./Object');
Object.defineProperty(Core, 'Object', {
  enumerable: true,
  get: function() {
    return object;
  }
});

var Container = require('./Container');
Object.defineProperty(Core, 'Container', {
  enumerable: true,
  get: function() {
    return Container;
  }
});

var Room = require('./Room');
Object.defineProperty(Core, 'Room', {
 enumerable: true,
 get: function() {
   return Room;
 }
});

var Game = require('./Game');
Object.defineProperty(Core, 'Game', {
 enumerable: true,
 get: function() {
   return Game;
 }
});

module.exports = Core;
