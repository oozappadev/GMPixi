

require("pixi.js");
var math = require("./Math");

function Container(props) {
  PIXI.Container.call(this);
}

Object.defineProperty(Container, 'prototype', {
  value: Object.create(PIXI.Container.prototype)
});

Object.defineProperty(Container.prototype, '_pre_update', {
  value: function() {
    for(var k in this.children) {
      var c = this.children[k];
      if(c._update) {
        if(typeof c._update.pre === 'function') {
          c._update.pre.call(c);
        }
      }
      else if(c.update) {
        if(typeof c.update.pre === 'function') {
          c.update.pre.call(c);
        }
      }
    }
  }
});

Object.defineProperty(Container.prototype, '_update', {
  value: function() {
    for(var k in this.children) {
      var c = this.children[k];
      if(c._update) {
        if(typeof c._update.during === 'function') {
          c._update.during.call(c);
        }
      }
      else if(c.update) {
        if(typeof c.update.during === 'function') {
          c.update.during.call(c);
        }
      }
    }
  }
});

Object.defineProperty(Container.prototype, '_post_update', {
  value: function() {
    for(var k in this.children) {
      var c = this.children[k];
      if(c._update) {
        if(typeof c._update.post === 'function') {
          c._update.post.call(c);
        }
      }
      else if(c.update) {
        if(typeof c.update.post === 'function') {
          c.update.post.call(c);
        }
      }
    }
  }
});

Object.defineProperty(Container.prototype, '_reset', {
  value: function() {
    for(var k in this.children) {
      var c = this.children[k];
      if(c._reset) {
        if(typeof c._reset === 'function') {
          c._reset.call(c);
        }
      }
      else if(c.reset) {
        if(typeof c.reset === 'function') {
          c.reset.call(c);
        }
      }
    }
  }
});


Object.defineProperty(Container.prototype, '_room_end', {
  value: function() {
    for(var k in this.children) {
      var c = this.children[k];
      if(c._room_end) {
        if(typeof c._room_end === 'function') {
          c._room_end.call(c);
        }
      }
      else if(c.room_end) {
        if(typeof c.room_end === 'function') {
          c.room_end.call(c);
        }
      }
    }
  }
});

Object.defineProperty(Container.prototype, 'add', {
  value: function(opt) {
    if(opt.obj) {
      throw ReferenceError("There is no object to add.");
    }
    
    this.addChild(opt.obj);
    
    //SET OBJECT POSITION
    //if option.position is set
    if(opt.position) {
      var p = opt.position;
      
      //if it is an object (object/array)
      if(typeof p === 'object') {
        
        //object else  array
        if(p.x) {
          if(Number.isNaN(p.x = Number(p.x))) {
            throw TypeError("Position x cannot convert to number.");
          }
            opt.obj.x = p.x;
        }
        else if(p[0]) {
          if(Number.isNaN(p[0] = Number(p[0]))) {
            throw TypeError("Position x cannot convert to number.");
          }
            opt.obj.x = p[0];
        }
        
        //object else array
        if(p.y) {
          if(Number.isNaN(p.y = Number(p.y))) {
            throw TypeError("Position y cannot convert to number.");
          }
          opt.obj.y = p.y;
        }
        else if(p[1]) {
          if(Number.isNaN(p[1] = Number(p[1]))) {
            throw TypeError("Position y cannot convert to number.");
          }
          opt.obj.y = p[1];
        }
      }
      
      //if a number/string
      else if(!Number.isNaN(p = Number(p))) {
        opt.obj.position.set(p, p);
      }
    }
    else {
      if(opt.x) {
        if(Number.isNaN(opt.x = Number(opt.x))) {
          throw TypeError("Position x cannot convert to number.");
        }
          opt.obj.x = opt.x;
      }

      if(opt.y) {
        if(Number.isNaN(opt.y = Number(opt.y))) {
          throw TypeError("Position y cannot convert to number.");
        }
        opt.obj.y = opt.y;
      }
    }
    
    
    
  }
});

Object.defineProperty(Container.prototype, )