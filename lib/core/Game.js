
require('pixi.js');

var Room = require('./Room');
var object = require('./Object');

function Game(o) {
  if(typeof o !== 'object') {
    throw TypeError("Game setting must be a key-value pairs.");
  }
  
  var gl = object.global;

  //setting the room's width and height
  Object.defineProperties(gl.room, {
    defaultWidth: {
      enumerable: true,
      value: Number.isNaN(o.width = Number(o.width)) ? 480 : o.width 
    },
    defaultHeight: {
      enumerable: true,
      value: Number.isNaN(o.height = Number(o.height)) ? 360 : o.height
    },
    width: {
      enumerable: true,
      get: function() {
        return gl.renderer.width;
      }
    },
    height: {
      enumerable: true,
      get: function() {
        return gl.renderer.height;
      }
    },
    options: {
      enumerable: true,
      get: function() {
        return o.options && typeof o.options === 'object' ? o.options : { background: "#000000" };
      }
    },
    renderer: {
      enumerable: true,
      get: function() {
        return gl.renderer;
      }
    }
  });

  Object.defineProperty(gl, 'renderer', {
    enumerable: true,
    value: (function(r) {
      try {
        switch(r.toString().toLowerCase()) {
          case "canvas":
          case "c":
            return new PIXI.CanvasRenderer(gl.room.defaultWidth, gl.room.defaultHeight, gl.room.options);
          case "webgl":
          case "gl":
          case "web":
          case "wgl":
          case "wg":
            return new PIXI.WebGLRenderer(gl.room.defaultWidth, gl.room.defaultHeight, gl.room.options);
        }
      }
      catch(e) {}
      return PIXI.autoDetectRenderer(gl.room.defaultWidth, gl.room.defaultHeight, gl.room.options);
    })(o.renderer)
  });

  if(!o.rooms || typeof o.rooms !== 'object')  {
    o.rooms = Object.create(null);
  }

  var _def = null;
  var _first = null;
  for(var n in o.rooms) {
    if(_first === null) {
      _first = n;
    }
    else if(_def === null) {
      _def = n;
    }
    
    gl.roomlist.add(n, o.rooms[n]);
  }

  

  if(_def || _first) {
    gl.room.set(_def || _first);
  }

  function update() {
    if(gl.room.current) {
      if(gl.room.current.update === 'function') {
        gl.room.current.upate.call(gl.room.current);
      }
      gl.renderer.render(gl.room.current);
    }
    requestAnimationFrame(update);
  }

  this.global = gl;

  update();
}

module.exports = Game;

