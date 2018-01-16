
require('pixi.js');

var Room = require('./../Room');

function Game(props) {
  if(!props || typeof props !== 'object') {
    props = Object.create(null);
  }

  // creating the renderer
  var renderer;
  switch(props.renderer) {
    case 'canvas': case 'c':
      renderer = new PIXI.CanvasRenderer(
        props.width || 480,
        props.height || 320,
        props.option || { background: 0x000000 }
      );
      break;
    case 'webgl': case 'gl': case 'wg': case 'wgl':
      renderer = new PIXI.WebGLRenderer(
        props.width || 480,
        props.height || 320,
        props.option || { background: 0x000000 }
      );
      break;
    default:
      renderer = PIXI.autoDetectRenderer(
        props.width || 480,
        props.height || 320,
        props.option || { background: 0x000000 }
      );
      break;
  }

  var local = {
    room: {
      current: null
    },
    roomlist: {
      count: 0
    }
  }


  var gl = Object.defineProperties(Object.create(null), {
    // room properties
    room: {
      enumerable: true,
      value: Object.defineProperties(Object.create(null), {
        width: {
          enumerable: true,
          get: function() {
            return renderer.width;
          }
        },
        height: {
          enumerable: true,
          get: function() {
            return renderer.height;
          }
        },
        change: {
          enumerable: true,
          get: function() {
            return gl.roomlist.change;
          }
        },
        goto: {
          enumerable: true,
          get: function() {
            return gl.roomlist.goto;
          }
        },
        add: {
          enumerable: true,
          get: function() {
            return gl.roomlist.add;
          }
        },
        remove: {
          enumerable: true,
          get: function() {
            return gl.roomlist.remove;
          }
        }
      })
    },
    roomlist: {
      enumerable: true,
      value: Object.defineProperties(Object.create(null), {
        count: {
          get: function() {
            return local.roomlist.count;
          }
        },
        add: {
          value: function add(rname, props) {
            return addRoom(rname, props, gl.roomlist, local.roomlist);
          }
        },
        remove: {
          value: function remove(room) {
            return removeRoom(room, gl.roomlist, local.room.current);
          }
        },
        goto: {
          value: function goto(rm, reset, override) {
            gotoRoom(rm, reset, override, gl.roomlist, local.room);
          }
        },
        change: {
          get: function() {
            return gl.roomlist.goto;
          }
        }
      })
    }
  });

}

function addRoom(name, props, list, rmlist) {

  name = name.toString();

  // check if list contains the name
  if(typeof list[name] !== 'undefined') {
    throw ReferenceError("Room name already exists or is invalid.");
  }

  var _room;
  if(props instanceof Room) {
    _room = props;
  }
  else if(props && typeof props === 'object') {
    _room = new Room(props);
  }
  else {
    _room = new Room();
  }

  _room.name = name;

  if(_room.name !== name) {
    throw ReferenceError("Cannot set property to the room: name");
  }

  rmlist.count++;
  return list[name] = _room;
}

function removeRoom(rm, list, curr) {
  var name;
  if(rm instanceof Room) {
    name = rm.name;
  }
  else if(typeof rm === 'string') {
    name = rm;
  }
  else {
    name = rm.toString();
  }

  if(list[name] === curr) {
    throw Error("Cannot remove active room.");
  }

  if(typeof list[name] !== 'undefined') {
    if(delete list[name]) {
      list.count--;
      return true;
    }
    return false;
  }

  return false;
}

function gotoRoom(rm, reset, overrride, list, room) {
  var _room;
  if(rm instanceof Room) {
    if(typeof list[rm.name] !== 'undefined') {
      _room = rm.name;
    }
    else {
      throw ReferenceError("Room is not in the list of rooms.");
    }
  }
  else {
    rm = rm.toString();
    if(typeof list[rm.name] === 'undefined') {
      throw ReferenceError("Room not found.");
    }
    _room = rm;
  }

  if(room.current !== null) {
    room.current.room_end && room.current.room_end.call(room.current);
  }

  room.current = list[_room];

  reset && room.current.reset && room.current.reset.call(room.current);

  if(override && typeof override === 'object'){
    for(var key in override) {
      (function(k, v) {
        room.current[k] = v;
      }).call(room.current, key, override[key]);
    }
  } 

  return true;
}

module.exports = Game;
