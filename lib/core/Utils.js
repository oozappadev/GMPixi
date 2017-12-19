
//creates the returning object
var Utils = {};

/**
 * Check if the given object is a given type or one of the given types.
 * @param {Mixed} obj the object to be checked
 * @param {Mixed|Array|Undefined} type the type used to compare
 * @returns {Boolean} true if the object is a type of the given type, or if
 *      object is defined when given type is undefined, else false
 */
Object.defineProperty(Utils, 'checkType', {
  enumerable: true,
  value: function(obj, type) {
    try {
        //get the typeof each arguments
      var _obj = typeof obj;
      var _type = typeof type;

      //if obj is undefined return false
      if(_obj === 'undefined') return false;

      //if type is undefined, will check if the obj is defined or not,
      //obj is defined because it passes the first check, so return true
      if(_type === 'undefined') return true;

      //function checker
      function check(o, t) {
        //if ever type is undefined, always return false
        if(typeof t === 'undefined') return false;

        if(o === null || t === null) {
          return o === t;
        }
        else {
          //check checker is string
          if(typeof t === "string") {
            return typeof o === t.toLowerCase();
          }
          //check if o is an object or not
          else if(typeof o === 'object') {
          //return true if only checking for Object
          //return true/false if user-defined Object
          return t === Object ? true : o instanceof t;
          }
          else {
            //return based on constructor if native type
            return obj.constructor === t;
          }
        }
      }

      //check if the object will be compared to one or many
      if(type.constructor === Array) {
        for(var k in type) {
          if(check(obj, type[k])) return true;
        }
      }
      else {
        return check(obj, type);
      }

    }
    catch(error) {}

    //if there are errors (like obj property is undefined) return always false
    return false;
  }
});

/**
 * Check if the given object is equal to the specified value.
 * @param {Mixed} obj the reference object
 * @param {Mixed|Array|Undefined} val the other object to be compared with
 * @param {Boolean} asArray if true, will check if obj is equals to one of the 
 * value in the val, if false, will check if the values of obj equal to values
 * of val.
 * @returns {Boolean} true if specified 
 */
Object.defineProperty(Utils, 'checkValue', {
  enumerable: true,
  value: function(obj, val, asArray) {

    if(Utils.checkType(val, Array)) {
      if(Utils.checkType(asArray, Boolean) ? asArray : false) {
        if(Utils.checkType(obj, Array)) {
          if(obj.length !== val.length) return false;
          for(var k in val) {
            if(obj[k] === val[k]) return true;
          }
        }
        else {
          return false;
        }
      }
      else {
        for(var k in val) {
          if(obj === val[k]) return true;
        }
      }
    }
    else {
      return obj === val;
    }
    return false;

  }
});


/**
 * 
 */
Object.defineProperty(Utils, 'checkThenSet', {
  enumerable: true,
  value: function(obj, defVal, types) {
    return Utils.checkType(obj, types) ? obj : defVal;
  }
});


Object.defineProperty(Utils, 'xor', {
  enumerable: true,
  value: function(c1, c2) {
    c1 = c1 ? true : false;
    c2 = c2 ? true : false;
    
    return (c1 && !c2) || (c2 && !c1);
  }
});

Object.defineProperty(Utils, 'xnor', {
  enumerable: true,
  value: function(c1, c2) {
    return !Utils.xor(c1, c2);
  }
});

Object.defineProperty(Utils, 'or', {
  enumerable: true,
  value: function() {
    var r = false;
    for(var k=0; k<arguments.length; ++k) {
      r = r || (arguments[k] ? true : false);
    }
    return r;
  }
});


Object.defineProperty(Utils, 'and', {
  enumerable: true, 
  value: function() {
    if(arguments.length <= 0) {
      return false;
    }
    for(var k=0; k<arguments.length; ++k) {
      if(!arguments[0]) {
        return false;
      }
    }
    
    return true;
  }
});

module.exports = Utils;
