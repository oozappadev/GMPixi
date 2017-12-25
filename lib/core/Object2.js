
var utils = require("./Utils");


var object = Object.create(null);

function setProp(obj, key, prop) {
  if(typeof prop === "object") {
    if(utils.xor(prop.value, utils.or(typeof prop.get === 'function' 
                || typeof prop.set === 'function'))) {
      
      prop.configurable = prop.configurable ? true : false;
      prop.enumerable = prop.enumerable ? true : false;
      prop.writable = prop.writable ? true : false;
      
      Object.defineProperty(obj, key, prop);
      
    }
    else {
      Object.defineProperty(obj, key, {
        enumerable: true,
        writable: true,
        configurable: true,
        value: prop
      });
    }
  }
  else {
    obj[k] = prop;
  }
  
}

Object.defineProperty(object, "create", {
  enumerable: true,
  value: function(o) {
    
    //create options object if nothing is passed
    if(typeof o === 'undefined') {
      o = {};
    }
    
    //create the constructor
    function Class() {
      
      //call the base class if defined
      if(typeof o.base === 'function') {
        o.base.call(this);
      }
      
      //calling the setup function if defined
      if(typeof o.setup === 'function') {
        o.setup.call(this);
      }
    }
    
    Class.prototype = Object.create(
            o.base && o.base.prototype && typeof o.base.prototype === 'object'
                ? o.base.prototype 
                : null);
    
    if(!o.props) {
      o.props = {};
    }
    
    if(typeof o.props === 'object') {
      for(var k in o.props) {
        if(utils.checkValue(k, ["update", "reset", "room_end"])) {
          continue;
        }
        (function(key, value) {
          setProp(Class.prototype, key, value);
        })(k, o.props[k]);
      }
    }
    
    Object.defineProperty(Class.prototype, 'update', {
      enumerable: true,
      value: function() {
        if(this.children.constructor === Array) {
          for(var k in this.children) {
            (function() {
              if(typeof this.update === 'function') {
                this.update.call(this);
              }
            }).call(this.children[k]);
          }
        }
        this.update();
      }
    });
    
    Object.defineProperty(Class.prototype, 'reset', {
      enumerable: true,
      value: function() {
        if(this.children.constructor === Array) {
          for(var k in this.children) {
            (function() {
              if(typeof this.reset === 'function') {
                this.reset.call(this);
              }
            }).call(this.children[k]);
          }
        }
      }
    });
    
    Object.defineProperty(Class.prototype, 'room_end', {
      enumerable: true,
      value: function() {
        if(this.children.constructor === Array) {
          for(var k in this.children) {
            (function() {
              if(typeof this.room_end === 'function') {
                this.room_end.call(this);
              }
            }).call(this.children[k]);
          }
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




