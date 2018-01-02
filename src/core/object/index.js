
var utils = require('./../../utils');

function GameObject(props) {

  if(!props || typeof props !== 'object') {
    props = Object.create(null);
  }

  for(var key in props) {
    (function(k, v){
      parseProps(this, k, v);
    }).call(this, key, props[key]);
  }
  
  if(typeof props.setup === 'function') {
    props.setup.call(this);
  }
}

function parseProps(_this, k, v) {
  if(k === 'setup') {
    return;
  }
  if(k === 'update') {
    Object.defineProperty(_this, k, {
      enumerable: true,
      value: function update() {
        if(Array.isArray(this.children)) {
          for(var k in this.children) {
            if(typeof this.children[k].update === 'function') {
              this.children[k].update.call(this.children[k]);
            }
          }
        }
        if(typeof v === 'function') {
          v.call(this);
        }
      }.bind(_this)
    });
  }
  else if(k === 'reset') {
    Object.defineProperty(_this, 'reset', {
      enumerable: true,
      value: function reset() {
        if(Array.isArray(this.children)) {
          for(var k in this.children) {
            if(typeof this.children[k].reset === 'function') {
              this.children[k].reset.call(this.children[k]);
            }
          }
        }
        if(typeof v === 'function') {
          v.call(this);
        }
      }.bind(_this)
    })
  }
  else if(k === 'room_end') {
    Object.defineProperty(_this, 'room_end', {
      enumerable: true,
      value: function room_end() {
        if(Array.isArray(this.children)) {
          for(var k in this.children) {
            if(typeof this.children[k].room_end === 'function') {
              this.children[k].room_end.call(this.children[k]);
            }
          }
        }
        if(typeof v === 'function') {
          v.call(this);
        }
      }.bind(_this)
    })
  }
  else {
    _this[k] = v;
  }
}

Object.defineProperty(GameObject, 'prototype', {
  enumerable: true,
  value: Object.defineProperties(Object.create(null), {
    
  })
});

Object.defineProperty(GameObject, 'create', {
  enumerable: true,
  value: function create(base, props, args) {
    
    
    function BaseObject() {
      base.apply(this, args);
    }

    Object.defineProperty(gameObject, 'prototype', {
      value: Object.create(base.prototype || null)
    });

    function DerivedObject() {
      BaseObject.apply(this)
    }
  }
});

module.exports = GameObject;
