
var utils = require('./../../utils/core');
var Game = require('./../Game');

var gl;

Object.defineProperty(GameObject, 'global', {
  enumerable: true,
  set: function(val) {
    if(this instanceof Game && val && typeof val === 'object') {
      gl = val;
    }
  }
});

function GameObject(obj) {
  if(this instanceof GameObject) {
    throw SyntaxError("Game Object cannot be called as a constructor.");
  }

  if(!obj || typeof obj !== 'object') {
    throw TypeError("Game object must be an object.");
  }

  var reset = update = room_end = utils.undefined;

  if(typeof obj.reset === 'function') {
    reset = obj.reset;
    if(!(delete obj.reset)) {
      throw Error("Game object's reset cannot be overriden.");
    }
    obj.reset = function() {
      if(Array.isArray(this.children)) {
        for(var c in this.children) {
          (function(){
            typeof this.reset === 'function' && this.reset.call(this);
          }).call(this.children[c]);
        }
      }
    }.bind(obj);
  }

  if(typeof obj.update === 'function') {
    update = obj.update;
    if(!(delete obj.update)) {
      throw Error("Game object's update cannot be overriden.");
    }
    obj.update = function() {
      if(Array.isArray(this.children)) {
        for(var c in this.children) {
          (function(){
            typeof this.update === 'function' && this.update.call(this);
          }).call(this.children[c]);
        }
      }
    }.bind(obj);
  }

  if(typeof obj.room_end === 'function') {
    room_end = obj.room_end;
    if(!(delete obj.room_end)) {
      throw Error("Game object's room_end cannot be overriden.");
    }
    obj.room_end = function() {
      if(Array.isArray(this.children)) {
        for(var c in this.children) {
          (function(){
            typeof this.room_end === 'function' && this.room_end.call(this);
          }).call(this.children[c]);
        }
      }
    }.bind(obj);
  }

  if(!delete obj.room) {
    throw Error("Game object's room cannot be overridden.");
  }
  else {
    Object.defineProperty(obj, 'room', {
      enumerable: true,
      configurable: true,
      writable: true,
      get: function() {
        return gl.room;
      }
    })
  }

  if(!delete obj.roomlist) {
    throw Error("Game object's roomlist cannot be overridden.");
  }
  else {
    Object.defineProperty(obj, 'roomlist', {
      enumerable: true,
      configurable: true,
      writable: true,
      get: function() {
        return gl.roomlist;
      }
    })
  }

  if(!delete obj.global) {
    throw Error("Game object's global cannot be overridden.");
  }
  else {
    Object.defineProperty(obj, 'room', {
      enumerable: true,
      configurable: true,
      writable: true,
      get: function() {
        return gl;
      }
    })
  }

  return obj;
}


Object.defineProperty(GameObject, 'prepend', {
  enumerable: true,
  value: function create(base, props, args) {

    //setting default values
    if(typeof base === 'undefined') {
      base = null;
    }
    if(!props || typeof props !== 'object') {
      props = Object.create(null);
    }
    if(!Array.isArray(args)) {
      args = [args];
    }

    //sorting props as construct or proto 
    var proto = Object.create(null);
    var construct = Object.create(null);
    var special = Object.create(null);

    //special & global keys
    var splkeys = ["reset", "update", "room_end", "setup"];
    var glkeys = ["room", "roomlist", "global"];

    //setter function
    function set(obj, k, pr) {
      Object.defineProperty(obj, k, pr);
    }

    // for prototype first
    if(props.proto && typeof props.proto === 'object') {
      for(var k in props.proto) {
        if(utils.isOneOf(k, splkeys)) {
          set(special, k, Object.getOwnPropertyDescriptor(props.proto, k));
        }
        else if(utils.isOneOf(glkeys)) {
          continue;
        }
        set(proto, k, Object.getOwnPropertyDescriptor(props.proto, k));
      }
    }

    // for prototype first
    if(props.proto && typeof props.proto === 'object') {
      for(var k in props.proto) {
        if(utils.isOneOf(k, splkeys)) {
          set(special, k, Object.getOwnPropertyDescriptor(props.proto, k));
        }
        else if(utils.isOneOf(glkeys)) {
          continue;
        }
        set(proto, k, Object.getOwnPropertyDescriptor(props.proto, k));
      }
      delete props.proto;
    }

    // for constructor next
    if(props.construct && typeof props.construct === 'object') {
      for(var k in props.construct) {
        if(utils.isOneOf(k, splkeys)) {
          set(special, k, Object.getOwnPropertyDescriptor(props.construct, k));
        }
        else if(utils.isOneOf(glkeys)) {
          continue;
        }
        set(construct, k, Object.getOwnPropertyDescriptor(props.construct, k));
      }
      delete props.construct;
    }

    // for others will be going to prototype
    var invalid = glkeys.concat(["construct", "proto"]);
    if(props && typeof props === 'object') {
      for(var k in props) {
        if(utils.isOneOf(k, splkeys)) {
          set(special, k, Object.getOwnPropertyDescriptor(props.construct, k));
        }
        else if(utils.isOneOf(k, invalid)) {
          continue;
        }
        set(proto, k, Object.getOwnPropertyDescriptor(props, k));
      }
      delete props;
    }


  }
});


module.exports = GameObject;