var utils = require("./../../utils");

var object = Object.create(null);

Object.defineProperty(object, "create", {
  enumerable: true,
  value: function(base, props, args) {
    
    //create the constructor
    function Class() {
      
      //call the base class if defined
      if(typeof base === 'function') {
        o.base.apply(this);
      }
      else if (typeof base === 'object' && base !== null) {
        o.base.constructor.apply(this, args);
      }
      
      //calling the setup function if defined
      if(typeof o.setup === 'function') {
        o.setup.call(this);
      }
    }
    
    Class.prototype = Object.create((base && base.prototype) || null);
    
    if(!props || typeof props !== 'object') {
      props = {};
    }
    
    if(typeof props === 'object') {
      for(var k in props) {
        if(utils.isOneOf(k, ["update", "reset", "room_end"])) {
          continue;
        }
        (function(key, value) {
          Class.prototype[key] = value;
        })(k, props[k]);
      }
    }
    
    Object.defineProperty(Class.prototype, 'update', {
      enumerable: true,
      value: function() {
        if(Array.isArray(this.children)) {
          for(var k in this.children) {
            (function() {
              if(typeof this.update === 'function') {
                this.update.call(this);
              }
            }).call(this.children[k]);
          }
        }
        if(typeof props.update === 'function') {
          props.update.call(this);
        }
      }
    });
    
    Object.defineProperty(Class.prototype, 'reset', {
      enumerable: true,
      value: function() {
        if(Array.isArray(this.children)) {
          for(var k in this.children) {
            (function() {
              if(typeof this.reset === 'function') {
                this.reset.call(this);
              }
            }).call(this.children[k]);
          }
        }
        if(typeof props.reset === 'function') {
          props.reset.call(this);
        }
      }
    });
    
    Object.defineProperty(Class.prototype, 'room_end', {
      enumerable: true,
      value: function room_end() {
        if(Array.isArray(this.children)) {
          for(var k in this.children) {
            (function() {
              if(typeof this.room_end === 'function') {
                this.room_end.call(this);
              }
            }).call(this.children[k]);
          }
        }
        if(typeof props.room_end === 'function') {
          props.room_end.call(this);
        }
      }
    });

    Object.defineProperty(Class.prototype, 'global', {
      enumerable: true,
      get: function() {
        return globalVar;
      } 
    });

    Object.defineProperty(Class.prototype, 'room', {
      enumerable: true,
      get: function() {
        return globalVar.room.current;
      }
    });

    Object.defineProperty(Class.prototype, 'roomlist', {
      enumerable: true,
      get: function() {
        return globalVar.roomlist;
      }
    });
    
    return Class;
  }
});


function add() {
  if(!arguments[0]) {
    throw ReferenceError("Room name is undefined or is null.");
  }

  var rname = null;

  if(typeof arguments[0] === 'object') {
    var Room = require('./Room');
    if(arguments[0] instanceof Room) {
      var _room = arguments[0];

      if(typeof _room.name !== 'string') {
        throw TypeError("Room name must be a string in room object.");
      }

      if(typeof this.roomlist[_room.name] !== 'undefined') {
        throw Error("Room name already taken: " + _room.name);
      }

      rname = _room.name;
    }
    else {
      var props = arguments[0];
      
      if(!props.name) {
        throw ReferenceError("Room name is undefined.");
      }

      if(typeof props.name !== 'string') {
        props.name = props.name.toString();
      }

      if(typeof this.roomlist[props.name] !== 'undefined') {
        throw Error("Room name already taken: " + props.name);
      }

      var _room = Room.create(props);
    }
  }
  else {
    if(!arguments[1] || typeof arguments[1] !== 'object') {
      throw TypeError("Room must be an object.");
    }

    rname = typeof arguments[1] !== 'string' ? arguments[1].toString() : arguments[1];
    if(typeof this.roomlist[rname] !== 'undefined') {
      throw Error("Room name already taken: " + props.name);
    }

    var Room = require('./Room');
    if(arguments[1] instanceof Room) {
      var _room = arguments[1];
    }
    else {
      var _room = Room.create(arguments[1]);
    }
  }

  this.roomlist[rname] = _room;
  localVar.count++;

  return this.roomlist[rname];
}

function remove(rname) {
  if(!rname) {
    throw TypeError("Room name is undefined or is null.");
  }

  if(typeof this.roomlist[rname] === 'undefined') {
    return false;
  }

  delete this.roomlist[rname];
  return true;
}

function change(room, reset, override, createNew) {
  if(!room) {
    throw TypeError("Room must be of type room or string.");
  }

  var _room;
  if(room instanceof Room) {
    _room = room;
  }
  else {
    room = room.toString();
    if(typeof this.roomlist[room] === 'undefined') {
      throw ReferenceError("Room to change not found.");
    }

    _room = this.roomlist[room];
  }

  if(typeof reset === undefined || reset || typeof _room.reset === 'function') {
    _room.reset.call(_room);
  }

  if(override && typeof override === 'object') {
    for(var k in override) {
      if(typeof _room[k] === 'undefined' && !createNew) {
        continue;
      }
      _room[k] = override[k];
    }
  }

  localVar.room.current = _room;
  return _room;
}

var globalVar = Object.create(null);
var localVar = {
  roomlist: {
    count: 0
  },
  room: {
    current: null
  }
};

Object.defineProperty(globalVar, 'roomlist', {
  enumerable: true,
  value: Object.defineProperties(Object.create(null), {
    count: {
      get: function() {
        return localVar.roomlist.count;
      }
    },
    length: {
      get: function() {
        return localVar.roomlist.count;
      }
    },
    add: {
      get: function() {
        return add.bind(globalVar);
      }
    },
    insert: {
      get: function() {
        return globalVar.roomlist.add;
      }
    },
    remove: {
      get: function() {
        return remove.bind(globalVar);
      }
    },
    delete: {
      get: function() {
        return globalVar.roomlist.remove;
      }
    },
    change: {
      get: function() {
        return change.bind(globalVar);
      }
    },
    set: {
      get: function() {
        return globalVar.roomlist.change;
      }
    },
    current: {
      get: function() {
        return localVar.room.current;
      }
    }
  })
});

Object.defineProperty(globalVar, 'room', {
  enumerable: true,
  value: Object.defineProperties(Object.create(null), {
    current: {
      get: function() {
        return localVar.room.current;
      }
    },
    add: {
      get: function() {
        return globalVar.roomlist.add;
      }
    },
    insert: {
      get: function() {
        return globalVar.roomlist.insert;
      }
    },
    remove: {
      get: function() {
        return globalVar.roomlist.remove;
      }
    },
    delete: {
      get: function() {
        return globalVar.roomlist.delete;
      }
    },
    change: {
      get: function() {
        return globalVar.roomlist.change;
      }
    },
    set: {
      get: function() {
        return globalVar.roomlist.set;
      }
    }
  })
});

Object.defineProperty(object, 'global', {
  get: function() {
    return globalVar;
  }
});

module.exports = object;