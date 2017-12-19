

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
            utils.checkType(o.base.prototype, ["function", "object"]) 
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
    
    return Class;
  }
});

module.exports = object;




