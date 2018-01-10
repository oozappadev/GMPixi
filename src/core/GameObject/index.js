
var utils = require('./../../utils/core');
var Game = require('./../Game');

function GameObject(base, props, args) {
  return GameObject.create(base, props, args);
}

Object.defineProperty(GameObject, 'create', {
  enumerable: true,
  value: function create(base, props, args) {

    if(!props || typeof props !== 'object') {
      props = Object.create(null);
    }

    var construct = Object.create(null);
    var proto = Object.create(null);

    //get all the props that will be declared on the constructor
    if(props.construct && typeof props.construct === 'object') {
      for(var key in props.construct) {
        if(utils.isOneOf(key, ['room', 'roomlist', 'global'])) {
          continue;
        }
        (function(k, v) {
          Object.defineProperty(this, k, v);
        }).call(construct, key, Object.getOwnPropertyDescriptor(props.construct, key));
      }
    }

    //get all the props that will be declared on the prototype
    if(props.proto && typeof props.proto === 'object') {
      for(var key in props.proto) {
        if(utils.isOneOf(key, ["setup", "reset", "room_end", "update"])) {
          construct[key] = props.proto[key];
        }
        else if(utils.isOneOf(key, ['room', 'roomlist', 'global'])) {
          continue;
        }
        (function(k, v) {
          Object.defineProperty(this, k, v);
        }).call(proto, key, Object.getOwnPropertyDescriptor(props.proto, key));
      }
    }

    //others will be declared on the prototype
    for(var key in props) {
      if(utils.isOneOf(key, ['room', 'roomlist', 'global', 'proto', 'construct'])) {
        continue;
      }
      else if(utils.isOneOf(key, ["setup", "reset", "room_end", "update"])) {
        construct[key] = props[key];
      }

      (function(k, v) {
        Object.defineProperty(this, k, v);
      }).call(proto, key, Object.getOwnPropertyDescriptor(props, key));
    }

    function Class() {

      //calling super constructor
      if(typeof base === 'function') {
        base.call(this);
      }
      else if(base && typeof base === 'object' && base.constructor) {
        base.constructor.call(this);
      }

      //declare all constructive props
      for(var key in construct) {
        if(utils.isOneOf(key, ["setup", "reset", "room_end", "update"])) {
          continue;
        }
        (function(k, v) {
          Object.defineProperty(this, k, v);
        }).call(this, key, Object.getOwnPropertyDescriptor(construct, key));
      }


      function callAll(_this, method, val) {
        Object.defineProperty(_this, method, {
          enumerable: true,
          value: function meth() {
            if(Array.isArray(this.children)) {
              for(var i in this.children) {
                (function() {
                  if(typeof this.reset === 'function') {
                    this.reset.call(this);
                  }
                }).call(this.children[i]);
              }
            }
            if(typeof val === 'function') {
              val.call(this);
            }
          }.bind(_this)
        });
      }

      //creating the reserved methods
      callAll(this, "reset", construct.reset);
      callAll(this, "update", construct.update);
      callAll(this, "room_end",construct.room_end);

      //running the setup method
      if(typeof construct.setup === 'function') {
        construct.setup.call(this);
      }
    }

    Object.defineProperty(Class, 'prototype', {
      value: Object.create(base ? base.prototype || base.__proto__ || null : null)
    });

    for(var key in proto) {
      (function(k, v) {
        Object.defineProperty(this, k, v);
      }).call(Class.prototype, key, Object.getOwnPropertyDescriptor(proto, key));
    }

    Class.toString = function() {
      return "GameObject() { [varying code] }";
    }

    return appendGlobal(Class);
  }
});

var globalVar;

function appendGlobal(obj) {
  Object.defineProperty(obj, 'global', {
    enumerable: true,
    get: function() {
      return globalVar;
    }
  });

  Object.defineProperty(obj, 'room', {
    enumerable: true,
    get: function() {
      return globalVar.room;
    }
  });

  Object.defineProperty(obj, 'roomlist', {
    enumerable: true,
    get: function() {
      return globalVar.roomlist;
    }
  });
  
  return obj;
}

Object.defineProperty(GameObject, 'setGlobal', {
  enumerable: true,
  value: function setGlobal(gl) {
    if(gl && typeof gl === 'object') {
      globalVar = gl;
    }
  }
});

module.exports = GameObject;