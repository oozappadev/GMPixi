
/* global Function */

var Utils = require('./Utils');
var math = require('./Math');
var Room = require('./Room');

function Game(d) {
    window.setTimeout(init.bind(this), 0);
}

function init(d) {
    //create details object if not exists
    d = Utils.checkThenSet(d, {}, Object);
    
    //create roomlist object if not exists
    d.roomlist = Utils.checkThenSet(d.roomlist, {}, Object);
    
    //adds room count in roomlist
    var _room_count = 0;
    Object.defineProperty(d.roomlist, 'count', {
        get: function() {
            return _room_count;
        }
    });
    
    //create room data object if not exists
    d.room = Utils.checkThenSet(d.room, {}, Object);
    
    /*
     * Room in-game variables
     */
    
    /*
     * Room steps
     */
    var _room_steps = 0;
    Object.defineProperty(this.room, 'steps', {
        enumerable: true,
        get: function() {
            return _room_steps;
        }
    });
    
    /*
     * Room Current
     */
    var _room_current = null;
    Object.defineProperty(this.room, 'current', {
        enumerable: true,
        get: function() {
            return _room_current;
        }
    });
    
    //function used to change current room using room's name
    var changeRoomByName = function(rname, reset, override) {
        if(!this.roomlist.hasOwnProperty(rname)) {
            throw ReferenceError('Destination room does not exist: ' + rname);
        }
        changeRoomByObject(this.roomlist[rname], reset, override);
    }.bind(this);
    
    //function used to change current room using the room's instance
    var changeRoomByObject = function(roomObj, reset, override) {
        
        reset = Utils.checkThenSet(reset, true, Boolean);
        override = Utils.checkThenSet(reset, {}, Object);
        
        if(this.room.current !== null 
                && Utils.checkType(this.room.current.room_end, Function)) {
            this.room.current.room_end();
        }
        
        //call the reset function
        Utils.checkThenSet(roomObj._reset, 
                Utils.checkThenSet(roomObj.reset, function() {}, Function), 
                Function).call(roomObj);
        
        for(var k in override) {
            (function(ky) {
                roomObj[ky] = override[ky];
            })(k);
        }
        
        _room_current = roomObj;
    }.bind(this);
    
    //function used to change the current room
    Object.defineProperty(this.room, 'change', {
        enumerable: true,
        value: function(rm, reset, override) {
            if(Utils.checkType(rm, Room)) {
                changeRoomByObject(rm, reset, override);
            }
            else {
                changeRoomByName(rm.toString(), reset, override);
            }
        }.bind(this)
    });
    
    
    /*
     * Room display variables
     */
    //getter for the parent element
    
    
    //getter for the width
    Object.defineProperty(this.room, 'width', {
        enumerable: true,
        get: function() {
            return math.clamp(math.toNumber(d.room.width, 0), 
                    0, Number.MAX_SAFE_INTEGER);
        }
    });
    
    //getter for the height
    Object.defineProperty(this.room, 'height', {
        enumerable: true,
        get: function() {
            return math.clamp(math.toNumber(d.room.width, 0), 
                    0, Number.MAX_SAFE_INTEGER);
        }
    });
    
    
}


Object.defineProperty(Game, 'prototype', {
    value: Object.create(null)
});

Object.defineProperty(Game.prototype, 'room', {
    enumerable: true,
    value: Object.create(null)
});

Object.defineProperty(Game.prototype, 'roomlist', {
    enumerable: true,
    value: Object.create(null)
});


module.exports = Game;