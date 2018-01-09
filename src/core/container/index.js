
var GameObject = require('./../GameObject');
var math = require('./../../utils/math');
require('pixi.js');

function Container() {
  PIXI.Container.apply(this, arguments);
}

Object.defineProperty(Container, 'prototype', {
  value: Object.create(PIXI.Container.prototype)
});

Object.defineProperties(Container.prototype, {
  add: {
    enumerable: true,
    value: function add(obj, props) {
      return this.addTo(obj, this, props);
    }
  },
  addTo: {
    enumerable: true,
    value: function addTo(obj, container, props) {
      if(!(obj instanceof PIXI.DisplayObject)) {
        throw TypeError("Adding object must be a displayable object.");
      }

      if(!(container instanceof PIXI.Container)) {
        throw TypeError("Container object must be a container.");
      }

      if(!props || typeof props !== 'object') {
        props = Object.create(null);
      }

      //setting width and height first
      if(!Number.isNaN(props.width = Number(props.width)) && typeof obj.width !== 'undefined') {
        obj.width = props.width;
      }

      if(!Number.isNaN(props.height = Number(props.height)) && typeof obj.height !== 'undefined') {
        obj.height = props.height;
      }

      //setting the scale
      if(props.scale && typeof props.scale === 'object') {
        if(!Number.isNaN(props.scale.x = Number(props.scale.x)) && typeof obj.scale.x !== 'undefined') {
          obj.scale.x = props.scale.x;
        }
        
        if(!Number.isNaN(props.scale.y = Number(props.scale.y)) && typeof obj.scale.y !== 'undefined') {
          obj.scale.y = props.scale.y;
        }

      }
      else if(!Number.isNaN(props.scale = Number(props.scale))) {
        obj.scale.set(props.scale);
      }


      //setting the anchor
      if(props.anchor && typeof props.anchor === 'object') {
        if(!Number.isNaN(props.anchor.x = Number(props.anchor.x)) && typeof obj.anchor.x !== 'undefined') {
          obj.anchor.x = props.anchor.x;
        }
        
        if(!Number.isNaN(props.anchor.y = Number(props.anchor.y)) && typeof obj.anchor.y !== 'undefined') {
          obj.anchor.y = props.anchor.y;
        }

      }
      else if(!Number.isNaN(props.anchor = Number(props.anchor))) {
        obj.anchor.set(props.anchor);
      }

      //setting the pivot
      if(props.pivot && typeof props.pivot === 'object') {
        if(!Number.isNaN(props.pivot.x = Number(props.pivot.x)) && typeof obj.pivot.x !== 'undefined') {
          obj.pivot.x = props.pivot.x;
        }
        
        if(!Number.isNaN(props.pivot.y = Number(props.pivot.y)) && typeof obj.pivot.y !== 'undefined') {
          obj.pivot.y = props.pivot.y;
        }

      }
      else if(!Number.isNaN(props.pivot = Number(props.pivot))) {
        obj.pivot.set(props.pivot);
      }

      //setting the skew
      if(props.skew && typeof props.skew === 'object') {
        if(!Number.isNaN(props.skew.x = Number(props.skew.x)) && typeof obj.skew.x !== 'undefined') {
          obj.skew.x = props.skew.x;
        }
        
        if(!Number.isNaN(props.skew.y = Number(props.skew.y)) && typeof obj.skew.y !== 'undefined') {
          obj.skew.y = props.skew.y;
        }
      }
      else if(!Number.isNaN(props.skew = Number(props.skew))) {
        obj.skew.set(props.skew);
      }

      if(!Number.isNaN(props.rotation = Number(props.rotation))) {
        obj.rotation = props.rotation;
      }

      if(!Number.isNaN(props.alpha = Number(props.alpha))) {
        obj.alpha = props.alpha;
      }

      //setting the position
      if(props.position && typeof props.position === 'object') {
        if(!Number.isNaN(props.position.x = Number(props.position.x))) {
          obj.x = props.position.x;
        }
        else if(!Number.isNaN(props.x = Number(props.x))) {
          obj.x = props.x;
        }
        
        if(!Number.isNaN(props.position.y = Number(props.position.y))) {
          obj.y = props.position.y;
        }
        else if(!Number.isNaN(props.y = Number(props.y))) {
          obj.y = props.y;
        }
      }
      else if(!Number.isNaN(props.x) || !Number.isNaN(props.y)){
        if(!Number.isNaN(props.x = Number(props.x))) {
          obj.x = props.x;
        }

        if(!Number.isNaN(props.y = Number(props.y))) {
          obj.y = props.y;
        }
      }
      else if(!Number.isNaN(props.position)){
        obj.position.set(props.position, props.position);
      }

      container.addChild(obj);
      return obj;
    }
  }
});

module.exports = Container;