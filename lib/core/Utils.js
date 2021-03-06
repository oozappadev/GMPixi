
//creates the returning object
var Utils = {};

/**
 * Check if the given object is a given type or one of the given types.
 * @param {Any} obj the object to be checked
 * @param {Any|Array|Undefined} type the type used to compare
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

Object.defineProperty(Utils, 'checkThenSet', {
    enumerable: true,
    value: function(obj, defVal, types) {
        return Utils.checkType(obj, types) ? obj : defVal;
    }
});


module.exports = Utils;
