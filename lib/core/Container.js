

require("pixi.js");
var object = require("./Object");


var props = {
  add: {
    enumerable: true,
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
      return opt.returnObject ? opt.obj : this;
    }
  }
};


module.exports = object.create({
  base: PIXI.Container,
  props: props
});