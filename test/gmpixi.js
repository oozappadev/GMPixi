/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {


var core = Object.create(null);

Object.defineProperty(core, 'undefined', {
  enumerable: true
});

Object.defineProperty(core, 'equals', {
  enumerable: true,
  value: function is(obj, value) {
    if(Array.isArray(value)) {
      if(Array.isArray(obj) && obj.length === value.length) {
        for(var i in obj) {
          if(!core.equals(obj[i], value[i])) {
            return false;
          }
        }
        return true;
      }
      return false;
    }

    return obj === value;
  }
});

Object.defineProperty(core, 'isOneOf', {
  enumerable: true,
  value: function isOneOf(obj, values) {
    if(Array.isArray(values)) {
      for(var k in values) {
        if(core.equals(obj, values[k])) {
          return true;
        }
      }
      return false;
    }
    return obj === values;
  }
});

Object.defineProperty(core, 'isA', {
  enumerable: true,
  value: function isA(obj, type) {
    if(Array.isArray(type)) {
      for(var k in type) {
        if(core.isA(obj, type[k])) {
          return true;
        }
      }
      return false;
    }

    if(typeof type === 'undefined') {
      return typeof type === typeof obj;
    }

    if(typeof obj === 'undefined') {
      return false;
    }

    if(type === null) {
      return obj === type;
    }

    if(typeof type === 'string') {
      return typeof obj === type;
    }

    if(
      type === String
      || type === Boolean
      || type === Number
    ) {
      return obj.constructor === type;
    }

    return obj instanceof type;

  }
});


module.exports = core;

/***/ }),
/* 1 */
/***/ (function(module, exports) {


// Convert an oject of data into a URL query string

var Query = Object.create(null);

function parseToQuery(key, obj) {
  switch(typeof obj) {
    case 'undefined':
      return encodeURIComponent(key);
    case 'object':
      if(obj === null) {
        return encodeURIComponent(key) + "=null";
      }
      else if(Array.isArray(obj)) {
        var str = "";
        for(var i=0; i<obj.length; ++i) {
          var v = obj[i];
          switch(typeof v) {
            case 'undefined':
              str += encodeURIComponent(key) + "[]";
              break;
            case 'object':
              if(v === null) {
                str += encodeURIComponent(key) + "[]=null";
              }
              else {
                str += encodeURIComponent(key) + "[]=" + encodeURIComponent(JSON.stringify(v));
              }
              break;
            default:
              str += encodeURIComponent(key) + "[]=" + encodeURIComponent(v.toString());
              break;
          }
          if(i < obj.length - 1) {
            str += "&";
          }
        }
        return str || key + "[]";
      }
      return encodeURIComponent(key) + "=" + encodeURIComponent(JSON.stringify(obj));
    default: 
      return encodeURIComponent(key) + "=" + encodeURIComponent(obj.toString());
  }
  
}

Object.defineProperty(Query, 'stringify', {
  enumerable: true,
  value: function stringify(q) {
    

    if(!q || typeof q !== 'object') {
      return "";
    }

    var queryString = "";


    for(var k in q) {
      queryString += parseToQuery(k, q[k]) + "&";
    }

    queryString = queryString.substring(0, queryString.length - 1);

    return queryString ? "?" + queryString : "";
  }
});

Object.defineProperty(Query, 'parse', {
  enumerable: true,
  value: function parse(str) {
    if(typeof str !== 'string') {
      return "";
    }

    if(str.indexOf("?") > -1) {
      str = str.substring(str.indexOf("?") + 1, str.length);
    }

    var obj = {};
    while(str !== "") {
      var o;
      if(str.indexOf("&") < 0) {
        o = str;
        str = "";
      }
      else {
        o = str.substring(0, str.indexOf("&"));
      }

      str = str.substring(str.indexOf("&") + 1, str.length);

      var key;
      var val;
      if(o.indexOf("=") > 0) {
        key = decodeURIComponent(o.substring(0, o.indexOf("=")));
        val = decodeURIComponent(o.substring(o.indexOf("=") + 1, o.length));
      }
      else {
        key = o;
        val = "";
      }

      if(val.toLowerCase() === 'false' || val.toLowerCase() === 'true') {
        val = Boolean(val);
      }
      else if(val !== "" && !Number.isNaN(Number(val))) {
        val = Number(val);
      }
      else {
        try {
          var tmp = JSON.parse(val);
          val = tmp;
        }
        catch(e) {}
      }

      if(key.indexOf("[]") > 0) {
        key = key.substring(0, key.indexOf("[]"));
        obj[key] = obj[key] || [];
        obj[key].push(val);
      }
      else {
        obj[key] = val;
      }

    }

    return obj;
  }
})

module.exports = Query;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {

var GMPixi = __webpack_require__(4);

var utils = __webpack_require__(6);
for(var key in utils) {
  (function(k, v) {
    Object.defineProperty(GMPixi, k, {
      enumerable: true,
      get: function() {
        return v;
      }
    });
  })(key, utils[key]);
}

Object.defineProperty(GMPixi, 'data', {
  enumerable: true,
  value: __webpack_require__(13)
});


global.GMPixi = GMPixi;



/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 3 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {


var Game = __webpack_require__(5);


module.exports = Game;

/***/ }),
/* 5 */
/***/ (function(module, exports) {


function Game() {

}


module.exports = Game;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {



var utils = Object.create(null);

var core = __webpack_require__(0);
for(var key in core) {
  (function(k, v) {
    Object.defineProperty(utils, k, {
      enumerable: true,
      get: function() {
        return v;
      }
    });
  })(key, core[key]);
}


Object.defineProperty(utils, 'format', {
  enumerable: true,
  value: __webpack_require__(7)
});

Object.defineProperty(utils, 'array', {
  enumerable: true,
  value: __webpack_require__(8)
});

Object.defineProperty(utils, 'math', {
  enumerable: true,
  value: __webpack_require__(9)
});

Object.defineProperty(utils, 'vector', {
  enumerable: true,
  value: __webpack_require__(10)
});

Object.defineProperty(utils, 'logic', {
  enumerable: true,
  value: __webpack_require__(12)
});

module.exports = utils;



/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {


var Format = Object.create(null);

Object.defineProperty(Format, 'query', {
  enumerable: true,
  value: __webpack_require__(1)
});

module.exports = Format;


/***/ }),
/* 8 */
/***/ (function(module, exports) {


var array = Object.create(null);



Object.defineProperty(array, 'randomize', {
  enumerable: true,
  value: function randomize(obj) {
    function shuffleArray(array) {
      for (var i = array.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var temp = array[i];
          array[i] = array[j];
          array[j] = temp;
      }
    }

    if(typeof obj === 'string') {
      var str = obj.split();
      shuffleArray(str);
      return str.join();
    }
    else if(Array.isArray(obj)) {
      shuffleArray(obj);
      return obj;
    }
    
    throw TypeError("Array randomize's input must be an array or string.");
  }
});

Object.defineProperty(array, 'shuffle', {
  enumerable: true,
  get: function() {
    return array.randomize;
  }
});

module.exports = array;







module.exports = array;

/***/ }),
/* 9 */
/***/ (function(module, exports) {


var math = Object.create(null);

Object.defineProperty(math, 'pi', {
  enumerable: true,
  value: function pi(n) {
    return Math.PI * n;
  }
});

Object.defineProperty(math, 'random', {
  enumerable: true,
  value: function random(min, max, isInt, exempt) {
    if(typeof min === 'undefined') {
      return Math.random();
    }

    if(Number.isNaN(min = Number(min))) {
      throw TypeError("Math random's minimum cannot convert to number.");
    }

    if(Number.isNaN(max = Number(max))) {
      throw TypeError("Math random's maximum cannot convert to number.");
    }

    isInt = isInt ? true : false;

    if(isInt) {
      min = Math.floor(min);
      max = Math.floor(max);
      return min === max ? min : min > max ? Number.NaN : Math.floor(((max - min) * Math.random()) + min);
    }
    return min === max ? min : min > max ? Number.NaN : ((max - min) * Math.random()) + min;

  }
});

Object.defineProperty(math, 'deg', {
  enumerable: true,
  value: function deg(angle, normalize) {
    if(Number.isNaN(angle = Number(angle))) {
      throw TypeError("Math angle cannot be converted to number.");
    }

    angle *= 180 / Math.PI;

    if(!normalize) {
      return angle;
    }

    angle %= 360;
    if(angle < 0) {
      angle += 360;
    }
    return angle;
  }
});

Object.defineProperty(math, 'rad', {
  enumerable: true,
  value: function rad(angle, normalize) {
    if(Number.isNaN(angle = Number(angle))) {
      throw TypeError("Math angle cannot be converted to number.");
    }

    angle *= Math.PI / 180;

    if(!normalize) {
      return angle;
    }

    angle %= Math.PI * 2;
    if(angle < 0) {
      angle += Math.PI * 2;
    }
    return angle;
  }
});

Object.defineProperty(math, 'canBeNumber', {
  enumerable: true,
  value: function canBeNumber(obj) {
    return !Math.isNaN(obj);
  }
})

Object.defineProperty(math, 'toNumber', {
  enumerable: true,
  value: function toNumber(obj, def) {
    return Number(obj) || def;
  }
});

Object.defineProperty(math, 'clamp', {
  enumerable: true,
  value: function clamp(n, min, max) {
    if(Math.isNaN(Number(n))) {
      throw TypeError("Math clamp's input cannot be converted to number.");
    }

    if(Math.isNaN(Number(min))) {
      throw TypeError("Math clamp's min cannot be converted to number.");
    }

    if(Math.isNaN(Number(max))) {
      throw TypeError("Math clamp's max cannot be converted to number.");
    }

    if(min > max && n > min && n < max) {
      return Math.abs(n - min) < Math.abs(n - max) ? min : max;
    }
    else if(min === max) {
      return min;
    }

    return n;
  }
});

Object.defineProperty(math, 'between', {
  enumerable: true,
  value: function between(n, min, max) {
    if(Math.isNaN(Number(n))) {
      throw TypeError("Math between's input cannot be converted to number.");
    }

    if(Math.isNaN(Number(min))) {
      throw TypeError("Math between's min cannot be converted to number.");
    }

    if(Math.isNaN(Number(max))) {
      throw TypeError("Math between's max cannot be converted to number.");
    }
    if(min > max) {
      var tmp = min;
      min = max;
      max = tmp;
    }

    return n >= min && n <= max;
  }
});

Object.defineProperty(math, 'next', {
  enumerable: true,
  value: function next(n, inc, min, max) {
    if(Math.isNaN(Number(n))) {
      throw TypeError("Math next's input cannot be converted to number.");
    }

    if(Math.isNaN(Number(inc))) {
      throw TypeError("Math next's increment cannot be converted to number.");
    }

    if(typeof min === 'undefined' || min === null) {
      min = Number.MIN_SAFE_INTEGER;
    }
    else if(Math.isNaN(Number(min))) {
      throw TypeError("Math between's min cannot be converted to number.");
    }

    if(typeof max === 'undefined' || max === null) {
      max = Number.MAX_SAFE_INTEGER;
    }
    else if(Math.isNaN(Number(max))) {
      throw TypeError("Math between's max cannot be converted to number.");
    }

    n += inc;

    if(n < min) {
      return max;
    }
    else if(n > max) {
      return min;
    }
    return n;
  }
});

Object.defineProperty(math, 'truncate', {
  enumerable: true,
  value: function truncate(num, dp) {
      if(Math.isNaN(num = Number(num))) {
        throw TypeError("Math's truncate input cannot convert to number.");
      }
      
      dp = math.toNumber(dp, 0);
      
      var dp10 = Math.pow(10, Math.floor(dp));
      return Math.floor(num * dp10) / dp10;
  }
});

Object.defineProperty(math, 'round', {
  enumerable: true,
  value: function round(num, dp) {
    if(Math.isNaN(num = Number(num))) {
      throw TypeError("Math's round input cannot convert to number.");
    }

    dp = math.toNumber(dp, 0);
    
    var dp10 = Math.pow(10, Math.floor(dp));
    return Math.round(num * dp10) / dp10;
  }
});

module.exports = math;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {




var vector = Object.create(null);

Object.defineProperty(vector, 'Point', {
  enumerable: true,
  value: __webpack_require__(11)
});

Object.defineProperty(vector, 'point', {
  enumerable: true,
  value: function(x, y) {
    return new vector.Point(x, y);
  }
});





/***/ }),
/* 11 */
/***/ (function(module, exports) {


function Point(x, y) {
  if(Number.isNaN(x = Number(x)) || Number.isNaN(y = Number(y))) {
    throw TypeError("Point's input cannot convert to number.");
  }
  
  var pt = {
    x: 0,
    y: 0
  };

  Object.defineProperties(this, {
    x: {
      enumerable: true,
      get: function() {
        return pt.x;
      },
      set: function(val) {
        if(!Number.isNaN(val)) {
          x = val;
        }
      }
    },
    y: {
      enumerable: true,
      get: function() {
        return pt.y;
      },
      set: function(val) {
        if(!Number.isNaN(val)) {
          y = val;
        }
      }
    }
  })
}

Object.defineProperty(Point, 'prototype', {
  value: Object.defineProperties(Object.create(null), {
    set: {
      enumerable: true,
      value: function set() {
        var a = arguments[0];
        if(typeof a === 'undefined' || a === null) {
          return;
        }

        var x, y;
        if(Array.isArray(a)) {
          if(Number.isNaN(x = Number(a[0])) || Number.isNaN(y = Number(a[1]))) {
            return;
          }
        }
        else if(typeof a === 'object') {
          if(Number.isNaN(x = Number(a.x)) || Number.isNaN(y = Number(a.y))) {
            return;
          }
        }
        else {
          if(Number.isNaN(x = Number(a)) || Number.isNaN(y = Number(arguments[1]))) {
            return;
          }
        }
        this.x = x;
        this.y = y;
      }
    },
    displacement: {
      enumerable: true,
      value: function displacement(x, y) {
        var pt = Point.convertTo(x, y);
        return Math.sqrt(Math.pow(pt.x - this.x, 2) + Math.pow(pt.y - this.y, 2));
      }
    },
    slope: {
      enumerable: true,
      value: function slope(x, y) {
        var pt = Point.convertTo(x, y);
        return (pt.y - this.y) / (pt.x - this.x);
      }
    },
    distance: {
      enumerable: true,
      get: function() {
        return this.displacement;
      }
    },
    angle: {
      enumerable: true,
      value: function displacement(x, y) {
        var pt = Point.convertTo(x, y);
        return Math.atan2(pt.y - this.y, pt.x - this.x);
      }
    }
  })
});

Object.defineProperty(Point, 'convertTo', {
  enumerable: true,
  value: function convertTo() {
    var a = arguments[0];
    if(typeof a[0] === 'undefined' || a === null) {
      return null;
    }

    var x, y;
    if(Array.isArray(a)) {
      if(a.length < 2) {
        return null;
      }

      if(Number.isNaN(x = Number(a[0])) || Number.isNaN(y = Number(a[1]))) {
        return null;
      }
    }
    else if(typeof a === 'object') {
      if(a instanceof Point) {
        return a;
      }
      if(Number.isNaN(x = Number(a.x)) || Number.isNaN(y = Number(a.y))) {
        return null;
      }
    }
    else {
      if(Number.isNaN(x = Number(a))) {
        return null;
      }
      var b = arguments[1];
      if(Number.isNaN(y = Number(b))) {
        return null;
      }
    }

    return new Point(x, y);
  }
});




/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {


var logic = Object.create(null);
var core = __webpack_require__(0);

Object.defineProperty(logic, 'or', {
  enumerable: true,
  value: function or() {
    if(arguments.length < 1) {
      return false;
    }
    for(var k in arguments) {
      if(arguments[k]) {
        return true;
      }
    }
    return false;
  }
});

Object.defineProperty(logic, 'orValue', {
  enumerable: true,
  value: function orValue() {
    for(var k in arguments) {
      if(arguments[k]) {
        return arguments[k];
      }
    }
    return core.undefined;
  }
})


Object.defineProperty(logic, 'and', {
  enumerable: true,
  value: function and() {
    for(var k in arguments) {
      if(!arguments[k]) {
        return false;
      }
    }
    return true;
  }
});

Object.defineProperty(logic, 'xor', {
  enumerable: true,
  value: function xor(a, b) {
    return (!a && b) || (a && !b) ? true : false;
  }
});

Object.defineProperty(logic, 'xnor', {
  enumerable: true,
  value: function xnor(a, b) {
    return !logic.xor(a, b);
  }
});

module.exports = logic;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {


var data = Object.create(null);

Object.defineProperty(data, 'Cookie', {
  enumerable: true,
  value: __webpack_require__(14)
});

Object.defineProperty(data, 'Json', {
  enumerable: true,
  value: __webpack_require__(15)
})

module.exports = data;



/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {


var Cookie = Object.create(null);

var undefined = __webpack_require__(0).undefined;

Object.defineProperty(Cookie, 'enabled', {
  enumerable: true,
  get: function() {
    if(!navigator.cookieEnabled) {
      return false;
    }

    var ck = "gmpixi_test_cookie_" + Math.random() + + "_" + Date.now() + "=1";
    document.cookie = ck;
    var result = document.cookie.indexOf(ck) >= 0;
    document.cookie = ck + ";expires=Thu, 01-Jan-1970 00:00:01 GMT";

    return result;
  }
});

Object.defineProperty(Cookie, 'set', {
  enumerable: true,
  value: function set(key, value, expires, path) {
    if(!Cookie.enabled) {
      return false;
    }

    if(!key && typeof key !== 'string') {
      throw TypeError("Cookie key must be a string.");
    }

    if(typeof value === 'undefined') {
      value = "undefined";
    }
    else if(value === null) {
      value = "null";
    }
    else if(typeof value === 'object') {
      value = JSON.stringify(value);
    }
    else {
      value = value.toString();
    }

    var ck = key + "=" + value + ";";
    if(typeof expires !== 'undefined' && expires !== null) {
      if(!(expires instanceof Date)) {
        if(typeof expires !== 'number' && Number.isNaN(expires = Number(expires))) {
          throw TypeError("Cookie expiration must be a date, number or undefined/null.");
        }
        expires = new Date(Date.now() + expires);
      }
      ck += "expires=" + expires.toUTCString() + ";";
    }

    if(!path) {
      if(typeof path !== 'string') {
        path = path.toString();
      }
      ck += path + ";";
    }

    document.cookie = ck;
    return document.cookie.indexOf(key + "=" + value) >= 0;
  }
});

Object.defineProperty(Cookie, 'insert', {
  enumerable: true,
  get: function() {
    return Cookie.set;
  }
});

Object.defineProperty(Cookie, 'add', {
  enumerable: true,
  get: function() {
    return Cookie.set;
  }
});

Object.defineProperty(Cookie, 'get', {
  enumerable: true,
  value: function get(key, defaultValue, createDefault, expires, path) {
    if(!Cookie.enabled) {
      return defaultValue;
    }

    if(typeof key !== 'string') {
      throw TypeError("Cookie key must be a string.");
    }
    
    var name = key + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            var result = c.substring(name.length, c.length);
            switch(result) {
              case "null": return null;
              case "undefined": return undefined;
              default: return result;
            }
        }
    }
    
    createDefault && Cookie.set(key, defaultValue, expires, path);

    return defaultValue;
  }
});

Object.defineProperty(Cookie, 'select', {
  enumerable: true,
  get: function() {
    return Cookie.get;
  }
});

Object.defineProperty(Cookie, 'unset', {
  enumerable: true,
  value: function unset(key, path) {
    var ck = key + "=1;expires=Thu, 01 Jan 1970 00:00:00 UTC;" + (path ? path.toString() : "");
    document.cookie = ck; 
  }
});

Object.defineProperty(Cookie, 'delete', {
  enumerable: true,
  get: function() {
    return Cookie.unset;
  }
});

module.exports = Cookie;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {



var query = __webpack_require__(1).stringify;

function Json(type, path, params, success, fail, timeout) {
  if(typeof type !== "string") {
    throw TypeError("Json request type must be a string");
  }
  
  if(type.toLowerCase() !== 'post' && type.toLowerCase() !== 'get') {
    throw TypeError("Json request type must be a 'post' or 'get' only.");
  }

  if(typeof path !== "string") {
    throw TypeError("Json request path must be a string.");
  }



  if(typeof params === 'undefined' || params === null) {
    params = {};
  }
  else if(typeof params === 'string') {
    try {
      params = JSON.parse(params);
    }
    catch(e) {
      throw SyntaxError("Json request param must be parseable to json.");
    }
  }
  else if(typeof params !== 'object') {
    throw TypeError("Json request param must be an object.");
  }

  var xmlhttp = window.XMLHttpRequest 
      ? new XMLHttpRequest() 
      : new ActiveXObject("Microsoft.XMLHTTP");

  xmlhttp.overrideMimeType("application/json");

  function addOnStateChange() {
    xmlhttp.onreadystatechange = function() {
      if(xmlhttp.readyState === XMLHttpRequest.DONE) {
        if(xmlhttp.status === 200) {
          var rcv;
          try {
            var rcv = JSON.parse(xmlhttp.responseText);
          }
          catch(e) {
            rcv = xmlhttp.responseText;
          }
          typeof success === 'function' && success(rcv, xmlhttp, xmlhttp.status);
        }
        else {
          typeof fail === 'function' && fail(xmlhttp, xmlhttp.status);
        }
      }
    };
  }


  xmlhttp.timeout = Number(timeout) || 10000;
  xmlhttp.ontimeout = function() {
    typeof fail === 'function' && fail(xmlhttp, xmlhttp.status);
  }

  try {
    var p = query(params);
    if(type === 'get') {
      xmlhttp.open("GET", path + p);
      addOnStateChange();
      xmlhttp.send();
    }
    else {
      xmlhttp.open("POST", path);
      xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      addOnStateChange();
      xmlhttp.send(p.substring(1, p.length));
    }
  }
  catch(e) {
    return e;
  }
  
  return true;
}

Object.defineProperty(Json, 'get', {
  enumerable: true,
  value: function get(path, params, success, fail, timeout) {
    return Json('get', path, params, success, fail, timeout);
  }
});

Object.defineProperty(Json, 'post', {
  enumerable: true,
  value: function post(path, params, success, fail, timeout) {
    return Json('post', path, params, success, fail, timeout);
  }
});


module.exports = Json;


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZGY4MTc2NjNkODMyYmU2MjhhMTYiLCJ3ZWJwYWNrOi8vLy4vdXRpbHMvY29yZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi91dGlscy9mb3JtYXQvUXVlcnkuanMiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy93ZWJwYWNrL2J1aWxkaW4vZ2xvYmFsLmpzIiwid2VicGFjazovLy8uL2NvcmUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9HYW1lLmpzIiwid2VicGFjazovLy8uL3V0aWxzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3V0aWxzL2Zvcm1hdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi91dGlscy9hcnJheS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi91dGlscy9tYXRoL2luZGV4LmpzIiwid2VicGFjazovLy8uL3V0aWxzL3ZlY3Rvci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi91dGlscy92ZWN0b3IvUG9pbnQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vdXRpbHMvbG9naWMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGF0YS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kYXRhL0Nvb2tpZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kYXRhL0pzb24vaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7OztBQzVEQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLENBQUM7OztBQUdELHNCOzs7Ozs7O0FDbEZBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGNBQWM7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOzs7Ozs7Ozs7QUNsSUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7O0FBR0Q7Ozs7Ozs7Ozs7QUN0QkE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDRDQUE0Qzs7QUFFNUM7Ozs7Ozs7O0FDbkJBOzs7QUFHQSxzQjs7Ozs7OztBQ0hBOztBQUVBOzs7QUFHQTs7Ozs7Ozs7O0FDSkE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDs7Ozs7Ozs7O0FDekNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7Ozs7Ozs7O0FDUEE7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxPQUFPO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7Ozs7Ozs7O0FBUUEsdUI7Ozs7Ozs7QUM3Q0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVELHNCOzs7Ozs7Ozs7QUM3TUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7QUNkRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7OztBQ3RJRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7OztBQUdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRCx1Qjs7Ozs7OztBQ3pEQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7Ozs7Ozs7OztBQ1pBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7O0FBRTdCO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG1DQUFtQztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1EQUFtRDtBQUNuRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1DQUFtQztBQUNuQyxrQkFBa0IsY0FBYztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsc0NBQXNDO0FBQzdELHlCO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOzs7Ozs7Ozs7QUN6SUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7OztBQUdEIiwiZmlsZSI6ImdtcGl4aS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDIpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGRmODE3NjYzZDgzMmJlNjI4YTE2IiwiXHJcbnZhciBjb3JlID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb3JlLCAndW5kZWZpbmVkJywge1xyXG4gIGVudW1lcmFibGU6IHRydWVcclxufSk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoY29yZSwgJ2VxdWFscycsIHtcclxuICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gIHZhbHVlOiBmdW5jdGlvbiBpcyhvYmosIHZhbHVlKSB7XHJcbiAgICBpZihBcnJheS5pc0FycmF5KHZhbHVlKSkge1xyXG4gICAgICBpZihBcnJheS5pc0FycmF5KG9iaikgJiYgb2JqLmxlbmd0aCA9PT0gdmFsdWUubGVuZ3RoKSB7XHJcbiAgICAgICAgZm9yKHZhciBpIGluIG9iaikge1xyXG4gICAgICAgICAgaWYoIWNvcmUuZXF1YWxzKG9ialtpXSwgdmFsdWVbaV0pKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBvYmogPT09IHZhbHVlO1xyXG4gIH1cclxufSk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoY29yZSwgJ2lzT25lT2YnLCB7XHJcbiAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICB2YWx1ZTogZnVuY3Rpb24gaXNPbmVPZihvYmosIHZhbHVlcykge1xyXG4gICAgaWYoQXJyYXkuaXNBcnJheSh2YWx1ZXMpKSB7XHJcbiAgICAgIGZvcih2YXIgayBpbiB2YWx1ZXMpIHtcclxuICAgICAgICBpZihjb3JlLmVxdWFscyhvYmosIHZhbHVlc1trXSkpIHtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gb2JqID09PSB2YWx1ZXM7XHJcbiAgfVxyXG59KTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb3JlLCAnaXNBJywge1xyXG4gIGVudW1lcmFibGU6IHRydWUsXHJcbiAgdmFsdWU6IGZ1bmN0aW9uIGlzQShvYmosIHR5cGUpIHtcclxuICAgIGlmKEFycmF5LmlzQXJyYXkodHlwZSkpIHtcclxuICAgICAgZm9yKHZhciBrIGluIHR5cGUpIHtcclxuICAgICAgICBpZihjb3JlLmlzQShvYmosIHR5cGVba10pKSB7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmKHR5cGVvZiB0eXBlID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICByZXR1cm4gdHlwZW9mIHR5cGUgPT09IHR5cGVvZiBvYmo7XHJcbiAgICB9XHJcblxyXG4gICAgaWYodHlwZW9mIG9iaiA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmKHR5cGUgPT09IG51bGwpIHtcclxuICAgICAgcmV0dXJuIG9iaiA9PT0gdHlwZTtcclxuICAgIH1cclxuXHJcbiAgICBpZih0eXBlb2YgdHlwZSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgcmV0dXJuIHR5cGVvZiBvYmogPT09IHR5cGU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYoXHJcbiAgICAgIHR5cGUgPT09IFN0cmluZ1xyXG4gICAgICB8fCB0eXBlID09PSBCb29sZWFuXHJcbiAgICAgIHx8IHR5cGUgPT09IE51bWJlclxyXG4gICAgKSB7XHJcbiAgICAgIHJldHVybiBvYmouY29uc3RydWN0b3IgPT09IHR5cGU7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG9iaiBpbnN0YW5jZW9mIHR5cGU7XHJcblxyXG4gIH1cclxufSk7XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBjb3JlO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vdXRpbHMvY29yZS9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcclxuLy8gQ29udmVydCBhbiBvamVjdCBvZiBkYXRhIGludG8gYSBVUkwgcXVlcnkgc3RyaW5nXHJcblxyXG52YXIgUXVlcnkgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xyXG5cclxuZnVuY3Rpb24gcGFyc2VUb1F1ZXJ5KGtleSwgb2JqKSB7XHJcbiAgc3dpdGNoKHR5cGVvZiBvYmopIHtcclxuICAgIGNhc2UgJ3VuZGVmaW5lZCc6XHJcbiAgICAgIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQoa2V5KTtcclxuICAgIGNhc2UgJ29iamVjdCc6XHJcbiAgICAgIGlmKG9iaiA9PT0gbnVsbCkge1xyXG4gICAgICAgIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQoa2V5KSArIFwiPW51bGxcIjtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIGlmKEFycmF5LmlzQXJyYXkob2JqKSkge1xyXG4gICAgICAgIHZhciBzdHIgPSBcIlwiO1xyXG4gICAgICAgIGZvcih2YXIgaT0wOyBpPG9iai5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgdmFyIHYgPSBvYmpbaV07XHJcbiAgICAgICAgICBzd2l0Y2godHlwZW9mIHYpIHtcclxuICAgICAgICAgICAgY2FzZSAndW5kZWZpbmVkJzpcclxuICAgICAgICAgICAgICBzdHIgKz0gZW5jb2RlVVJJQ29tcG9uZW50KGtleSkgKyBcIltdXCI7XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ29iamVjdCc6XHJcbiAgICAgICAgICAgICAgaWYodiA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgc3RyICs9IGVuY29kZVVSSUNvbXBvbmVudChrZXkpICsgXCJbXT1udWxsXCI7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc3RyICs9IGVuY29kZVVSSUNvbXBvbmVudChrZXkpICsgXCJbXT1cIiArIGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeSh2KSk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgIHN0ciArPSBlbmNvZGVVUklDb21wb25lbnQoa2V5KSArIFwiW109XCIgKyBlbmNvZGVVUklDb21wb25lbnQodi50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmKGkgPCBvYmoubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICBzdHIgKz0gXCImXCI7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzdHIgfHwga2V5ICsgXCJbXVwiO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQoa2V5KSArIFwiPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KG9iaikpO1xyXG4gICAgZGVmYXVsdDogXHJcbiAgICAgIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQoa2V5KSArIFwiPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KG9iai50b1N0cmluZygpKTtcclxuICB9XHJcbiAgXHJcbn1cclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShRdWVyeSwgJ3N0cmluZ2lmeScsIHtcclxuICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gIHZhbHVlOiBmdW5jdGlvbiBzdHJpbmdpZnkocSkge1xyXG4gICAgXHJcblxyXG4gICAgaWYoIXEgfHwgdHlwZW9mIHEgIT09ICdvYmplY3QnKSB7XHJcbiAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBxdWVyeVN0cmluZyA9IFwiXCI7XHJcblxyXG5cclxuICAgIGZvcih2YXIgayBpbiBxKSB7XHJcbiAgICAgIHF1ZXJ5U3RyaW5nICs9IHBhcnNlVG9RdWVyeShrLCBxW2tdKSArIFwiJlwiO1xyXG4gICAgfVxyXG5cclxuICAgIHF1ZXJ5U3RyaW5nID0gcXVlcnlTdHJpbmcuc3Vic3RyaW5nKDAsIHF1ZXJ5U3RyaW5nLmxlbmd0aCAtIDEpO1xyXG5cclxuICAgIHJldHVybiBxdWVyeVN0cmluZyA/IFwiP1wiICsgcXVlcnlTdHJpbmcgOiBcIlwiO1xyXG4gIH1cclxufSk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoUXVlcnksICdwYXJzZScsIHtcclxuICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gIHZhbHVlOiBmdW5jdGlvbiBwYXJzZShzdHIpIHtcclxuICAgIGlmKHR5cGVvZiBzdHIgIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG5cclxuICAgIGlmKHN0ci5pbmRleE9mKFwiP1wiKSA+IC0xKSB7XHJcbiAgICAgIHN0ciA9IHN0ci5zdWJzdHJpbmcoc3RyLmluZGV4T2YoXCI/XCIpICsgMSwgc3RyLmxlbmd0aCk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIG9iaiA9IHt9O1xyXG4gICAgd2hpbGUoc3RyICE9PSBcIlwiKSB7XHJcbiAgICAgIHZhciBvO1xyXG4gICAgICBpZihzdHIuaW5kZXhPZihcIiZcIikgPCAwKSB7XHJcbiAgICAgICAgbyA9IHN0cjtcclxuICAgICAgICBzdHIgPSBcIlwiO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIG8gPSBzdHIuc3Vic3RyaW5nKDAsIHN0ci5pbmRleE9mKFwiJlwiKSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHN0ciA9IHN0ci5zdWJzdHJpbmcoc3RyLmluZGV4T2YoXCImXCIpICsgMSwgc3RyLmxlbmd0aCk7XHJcblxyXG4gICAgICB2YXIga2V5O1xyXG4gICAgICB2YXIgdmFsO1xyXG4gICAgICBpZihvLmluZGV4T2YoXCI9XCIpID4gMCkge1xyXG4gICAgICAgIGtleSA9IGRlY29kZVVSSUNvbXBvbmVudChvLnN1YnN0cmluZygwLCBvLmluZGV4T2YoXCI9XCIpKSk7XHJcbiAgICAgICAgdmFsID0gZGVjb2RlVVJJQ29tcG9uZW50KG8uc3Vic3RyaW5nKG8uaW5kZXhPZihcIj1cIikgKyAxLCBvLmxlbmd0aCkpO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIGtleSA9IG87XHJcbiAgICAgICAgdmFsID0gXCJcIjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYodmFsLnRvTG93ZXJDYXNlKCkgPT09ICdmYWxzZScgfHwgdmFsLnRvTG93ZXJDYXNlKCkgPT09ICd0cnVlJykge1xyXG4gICAgICAgIHZhbCA9IEJvb2xlYW4odmFsKTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIGlmKHZhbCAhPT0gXCJcIiAmJiAhTnVtYmVyLmlzTmFOKE51bWJlcih2YWwpKSkge1xyXG4gICAgICAgIHZhbCA9IE51bWJlcih2YWwpO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICB2YXIgdG1wID0gSlNPTi5wYXJzZSh2YWwpO1xyXG4gICAgICAgICAgdmFsID0gdG1wO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaChlKSB7fVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZihrZXkuaW5kZXhPZihcIltdXCIpID4gMCkge1xyXG4gICAgICAgIGtleSA9IGtleS5zdWJzdHJpbmcoMCwga2V5LmluZGV4T2YoXCJbXVwiKSk7XHJcbiAgICAgICAgb2JqW2tleV0gPSBvYmpba2V5XSB8fCBbXTtcclxuICAgICAgICBvYmpba2V5XS5wdXNoKHZhbCk7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgb2JqW2tleV0gPSB2YWw7XHJcbiAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG9iajtcclxuICB9XHJcbn0pXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFF1ZXJ5O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3V0aWxzL2Zvcm1hdC9RdWVyeS5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcclxuXHJcbnZhciBHTVBpeGkgPSByZXF1aXJlKCcuL2NvcmUnKTtcclxuXHJcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcclxuZm9yKHZhciBrZXkgaW4gdXRpbHMpIHtcclxuICAoZnVuY3Rpb24oaywgdikge1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEdNUGl4aSwgaywge1xyXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB2O1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9KShrZXksIHV0aWxzW2tleV0pO1xyXG59XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoR01QaXhpLCAnZGF0YScsIHtcclxuICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gIHZhbHVlOiByZXF1aXJlKCcuL2RhdGEnKVxyXG59KTtcclxuXHJcblxyXG5nbG9iYWwuR01QaXhpID0gR01QaXhpO1xyXG5cclxuXHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGc7XHJcblxyXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxyXG5nID0gKGZ1bmN0aW9uKCkge1xyXG5cdHJldHVybiB0aGlzO1xyXG59KSgpO1xyXG5cclxudHJ5IHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcclxuXHRnID0gZyB8fCBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCkgfHwgKDEsZXZhbCkoXCJ0aGlzXCIpO1xyXG59IGNhdGNoKGUpIHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxyXG5cdGlmKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpXHJcblx0XHRnID0gd2luZG93O1xyXG59XHJcblxyXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXHJcbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXHJcbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZztcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL3dlYnBhY2svYnVpbGRpbi9nbG9iYWwuanNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXHJcbnZhciBHYW1lID0gcmVxdWlyZSgnLi9HYW1lJyk7XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBHYW1lO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vY29yZS9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcclxuZnVuY3Rpb24gR2FtZSgpIHtcclxuXHJcbn1cclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEdhbWU7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vY29yZS9HYW1lLmpzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxyXG5cclxudmFyIHV0aWxzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcclxuXHJcbnZhciBjb3JlID0gcmVxdWlyZSgnLi9jb3JlJyk7XHJcbmZvcih2YXIga2V5IGluIGNvcmUpIHtcclxuICAoZnVuY3Rpb24oaywgdikge1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHV0aWxzLCBrLCB7XHJcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHY7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0pKGtleSwgY29yZVtrZXldKTtcclxufVxyXG5cclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eSh1dGlscywgJ2Zvcm1hdCcsIHtcclxuICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gIHZhbHVlOiByZXF1aXJlKFwiLi9mb3JtYXRcIilcclxufSk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkodXRpbHMsICdhcnJheScsIHtcclxuICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gIHZhbHVlOiByZXF1aXJlKCcuL2FycmF5JylcclxufSk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkodXRpbHMsICdtYXRoJywge1xyXG4gIGVudW1lcmFibGU6IHRydWUsXHJcbiAgdmFsdWU6IHJlcXVpcmUoJy4vbWF0aCcpXHJcbn0pO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KHV0aWxzLCAndmVjdG9yJywge1xyXG4gIGVudW1lcmFibGU6IHRydWUsXHJcbiAgdmFsdWU6IHJlcXVpcmUoJy4vdmVjdG9yJylcclxufSk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkodXRpbHMsICdsb2dpYycsIHtcclxuICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gIHZhbHVlOiByZXF1aXJlKCcuL2xvZ2ljJylcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHV0aWxzO1xyXG5cclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi91dGlscy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcclxudmFyIEZvcm1hdCA9IE9iamVjdC5jcmVhdGUobnVsbCk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoRm9ybWF0LCAncXVlcnknLCB7XHJcbiAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICB2YWx1ZTogcmVxdWlyZSgnLi9RdWVyeScpXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBGb3JtYXQ7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vdXRpbHMvZm9ybWF0L2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxyXG52YXIgYXJyYXkgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xyXG5cclxuXHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoYXJyYXksICdyYW5kb21pemUnLCB7XHJcbiAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICB2YWx1ZTogZnVuY3Rpb24gcmFuZG9taXplKG9iaikge1xyXG4gICAgZnVuY3Rpb24gc2h1ZmZsZUFycmF5KGFycmF5KSB7XHJcbiAgICAgIGZvciAodmFyIGkgPSBhcnJheS5sZW5ndGggLSAxOyBpID4gMDsgaS0tKSB7XHJcbiAgICAgICAgICB2YXIgaiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChpICsgMSkpO1xyXG4gICAgICAgICAgdmFyIHRlbXAgPSBhcnJheVtpXTtcclxuICAgICAgICAgIGFycmF5W2ldID0gYXJyYXlbal07XHJcbiAgICAgICAgICBhcnJheVtqXSA9IHRlbXA7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZih0eXBlb2Ygb2JqID09PSAnc3RyaW5nJykge1xyXG4gICAgICB2YXIgc3RyID0gb2JqLnNwbGl0KCk7XHJcbiAgICAgIHNodWZmbGVBcnJheShzdHIpO1xyXG4gICAgICByZXR1cm4gc3RyLmpvaW4oKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYoQXJyYXkuaXNBcnJheShvYmopKSB7XHJcbiAgICAgIHNodWZmbGVBcnJheShvYmopO1xyXG4gICAgICByZXR1cm4gb2JqO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICB0aHJvdyBUeXBlRXJyb3IoXCJBcnJheSByYW5kb21pemUncyBpbnB1dCBtdXN0IGJlIGFuIGFycmF5IG9yIHN0cmluZy5cIik7XHJcbiAgfVxyXG59KTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShhcnJheSwgJ3NodWZmbGUnLCB7XHJcbiAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIGFycmF5LnJhbmRvbWl6ZTtcclxuICB9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBhcnJheTtcclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gYXJyYXk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi91dGlscy9hcnJheS9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcclxudmFyIG1hdGggPSBPYmplY3QuY3JlYXRlKG51bGwpO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KG1hdGgsICdwaScsIHtcclxuICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gIHZhbHVlOiBmdW5jdGlvbiBwaShuKSB7XHJcbiAgICByZXR1cm4gTWF0aC5QSSAqIG47XHJcbiAgfVxyXG59KTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShtYXRoLCAncmFuZG9tJywge1xyXG4gIGVudW1lcmFibGU6IHRydWUsXHJcbiAgdmFsdWU6IGZ1bmN0aW9uIHJhbmRvbShtaW4sIG1heCwgaXNJbnQsIGV4ZW1wdCkge1xyXG4gICAgaWYodHlwZW9mIG1pbiA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgcmV0dXJuIE1hdGgucmFuZG9tKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYoTnVtYmVyLmlzTmFOKG1pbiA9IE51bWJlcihtaW4pKSkge1xyXG4gICAgICB0aHJvdyBUeXBlRXJyb3IoXCJNYXRoIHJhbmRvbSdzIG1pbmltdW0gY2Fubm90IGNvbnZlcnQgdG8gbnVtYmVyLlwiKTtcclxuICAgIH1cclxuXHJcbiAgICBpZihOdW1iZXIuaXNOYU4obWF4ID0gTnVtYmVyKG1heCkpKSB7XHJcbiAgICAgIHRocm93IFR5cGVFcnJvcihcIk1hdGggcmFuZG9tJ3MgbWF4aW11bSBjYW5ub3QgY29udmVydCB0byBudW1iZXIuXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGlzSW50ID0gaXNJbnQgPyB0cnVlIDogZmFsc2U7XHJcblxyXG4gICAgaWYoaXNJbnQpIHtcclxuICAgICAgbWluID0gTWF0aC5mbG9vcihtaW4pO1xyXG4gICAgICBtYXggPSBNYXRoLmZsb29yKG1heCk7XHJcbiAgICAgIHJldHVybiBtaW4gPT09IG1heCA/IG1pbiA6IG1pbiA+IG1heCA/IE51bWJlci5OYU4gOiBNYXRoLmZsb29yKCgobWF4IC0gbWluKSAqIE1hdGgucmFuZG9tKCkpICsgbWluKTtcclxuICAgIH1cclxuICAgIHJldHVybiBtaW4gPT09IG1heCA/IG1pbiA6IG1pbiA+IG1heCA/IE51bWJlci5OYU4gOiAoKG1heCAtIG1pbikgKiBNYXRoLnJhbmRvbSgpKSArIG1pbjtcclxuXHJcbiAgfVxyXG59KTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShtYXRoLCAnZGVnJywge1xyXG4gIGVudW1lcmFibGU6IHRydWUsXHJcbiAgdmFsdWU6IGZ1bmN0aW9uIGRlZyhhbmdsZSwgbm9ybWFsaXplKSB7XHJcbiAgICBpZihOdW1iZXIuaXNOYU4oYW5nbGUgPSBOdW1iZXIoYW5nbGUpKSkge1xyXG4gICAgICB0aHJvdyBUeXBlRXJyb3IoXCJNYXRoIGFuZ2xlIGNhbm5vdCBiZSBjb252ZXJ0ZWQgdG8gbnVtYmVyLlwiKTtcclxuICAgIH1cclxuXHJcbiAgICBhbmdsZSAqPSAxODAgLyBNYXRoLlBJO1xyXG5cclxuICAgIGlmKCFub3JtYWxpemUpIHtcclxuICAgICAgcmV0dXJuIGFuZ2xlO1xyXG4gICAgfVxyXG5cclxuICAgIGFuZ2xlICU9IDM2MDtcclxuICAgIGlmKGFuZ2xlIDwgMCkge1xyXG4gICAgICBhbmdsZSArPSAzNjA7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYW5nbGU7XHJcbiAgfVxyXG59KTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShtYXRoLCAncmFkJywge1xyXG4gIGVudW1lcmFibGU6IHRydWUsXHJcbiAgdmFsdWU6IGZ1bmN0aW9uIHJhZChhbmdsZSwgbm9ybWFsaXplKSB7XHJcbiAgICBpZihOdW1iZXIuaXNOYU4oYW5nbGUgPSBOdW1iZXIoYW5nbGUpKSkge1xyXG4gICAgICB0aHJvdyBUeXBlRXJyb3IoXCJNYXRoIGFuZ2xlIGNhbm5vdCBiZSBjb252ZXJ0ZWQgdG8gbnVtYmVyLlwiKTtcclxuICAgIH1cclxuXHJcbiAgICBhbmdsZSAqPSBNYXRoLlBJIC8gMTgwO1xyXG5cclxuICAgIGlmKCFub3JtYWxpemUpIHtcclxuICAgICAgcmV0dXJuIGFuZ2xlO1xyXG4gICAgfVxyXG5cclxuICAgIGFuZ2xlICU9IE1hdGguUEkgKiAyO1xyXG4gICAgaWYoYW5nbGUgPCAwKSB7XHJcbiAgICAgIGFuZ2xlICs9IE1hdGguUEkgKiAyO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFuZ2xlO1xyXG4gIH1cclxufSk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkobWF0aCwgJ2NhbkJlTnVtYmVyJywge1xyXG4gIGVudW1lcmFibGU6IHRydWUsXHJcbiAgdmFsdWU6IGZ1bmN0aW9uIGNhbkJlTnVtYmVyKG9iaikge1xyXG4gICAgcmV0dXJuICFNYXRoLmlzTmFOKG9iaik7XHJcbiAgfVxyXG59KVxyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KG1hdGgsICd0b051bWJlcicsIHtcclxuICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gIHZhbHVlOiBmdW5jdGlvbiB0b051bWJlcihvYmosIGRlZikge1xyXG4gICAgcmV0dXJuIE51bWJlcihvYmopIHx8IGRlZjtcclxuICB9XHJcbn0pO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KG1hdGgsICdjbGFtcCcsIHtcclxuICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gIHZhbHVlOiBmdW5jdGlvbiBjbGFtcChuLCBtaW4sIG1heCkge1xyXG4gICAgaWYoTWF0aC5pc05hTihOdW1iZXIobikpKSB7XHJcbiAgICAgIHRocm93IFR5cGVFcnJvcihcIk1hdGggY2xhbXAncyBpbnB1dCBjYW5ub3QgYmUgY29udmVydGVkIHRvIG51bWJlci5cIik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYoTWF0aC5pc05hTihOdW1iZXIobWluKSkpIHtcclxuICAgICAgdGhyb3cgVHlwZUVycm9yKFwiTWF0aCBjbGFtcCdzIG1pbiBjYW5ub3QgYmUgY29udmVydGVkIHRvIG51bWJlci5cIik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYoTWF0aC5pc05hTihOdW1iZXIobWF4KSkpIHtcclxuICAgICAgdGhyb3cgVHlwZUVycm9yKFwiTWF0aCBjbGFtcCdzIG1heCBjYW5ub3QgYmUgY29udmVydGVkIHRvIG51bWJlci5cIik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYobWluID4gbWF4ICYmIG4gPiBtaW4gJiYgbiA8IG1heCkge1xyXG4gICAgICByZXR1cm4gTWF0aC5hYnMobiAtIG1pbikgPCBNYXRoLmFicyhuIC0gbWF4KSA/IG1pbiA6IG1heDtcclxuICAgIH1cclxuICAgIGVsc2UgaWYobWluID09PSBtYXgpIHtcclxuICAgICAgcmV0dXJuIG1pbjtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbjtcclxuICB9XHJcbn0pO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KG1hdGgsICdiZXR3ZWVuJywge1xyXG4gIGVudW1lcmFibGU6IHRydWUsXHJcbiAgdmFsdWU6IGZ1bmN0aW9uIGJldHdlZW4obiwgbWluLCBtYXgpIHtcclxuICAgIGlmKE1hdGguaXNOYU4oTnVtYmVyKG4pKSkge1xyXG4gICAgICB0aHJvdyBUeXBlRXJyb3IoXCJNYXRoIGJldHdlZW4ncyBpbnB1dCBjYW5ub3QgYmUgY29udmVydGVkIHRvIG51bWJlci5cIik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYoTWF0aC5pc05hTihOdW1iZXIobWluKSkpIHtcclxuICAgICAgdGhyb3cgVHlwZUVycm9yKFwiTWF0aCBiZXR3ZWVuJ3MgbWluIGNhbm5vdCBiZSBjb252ZXJ0ZWQgdG8gbnVtYmVyLlwiKTtcclxuICAgIH1cclxuXHJcbiAgICBpZihNYXRoLmlzTmFOKE51bWJlcihtYXgpKSkge1xyXG4gICAgICB0aHJvdyBUeXBlRXJyb3IoXCJNYXRoIGJldHdlZW4ncyBtYXggY2Fubm90IGJlIGNvbnZlcnRlZCB0byBudW1iZXIuXCIpO1xyXG4gICAgfVxyXG4gICAgaWYobWluID4gbWF4KSB7XHJcbiAgICAgIHZhciB0bXAgPSBtaW47XHJcbiAgICAgIG1pbiA9IG1heDtcclxuICAgICAgbWF4ID0gdG1wO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuID49IG1pbiAmJiBuIDw9IG1heDtcclxuICB9XHJcbn0pO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KG1hdGgsICduZXh0Jywge1xyXG4gIGVudW1lcmFibGU6IHRydWUsXHJcbiAgdmFsdWU6IGZ1bmN0aW9uIG5leHQobiwgaW5jLCBtaW4sIG1heCkge1xyXG4gICAgaWYoTWF0aC5pc05hTihOdW1iZXIobikpKSB7XHJcbiAgICAgIHRocm93IFR5cGVFcnJvcihcIk1hdGggbmV4dCdzIGlucHV0IGNhbm5vdCBiZSBjb252ZXJ0ZWQgdG8gbnVtYmVyLlwiKTtcclxuICAgIH1cclxuXHJcbiAgICBpZihNYXRoLmlzTmFOKE51bWJlcihpbmMpKSkge1xyXG4gICAgICB0aHJvdyBUeXBlRXJyb3IoXCJNYXRoIG5leHQncyBpbmNyZW1lbnQgY2Fubm90IGJlIGNvbnZlcnRlZCB0byBudW1iZXIuXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmKHR5cGVvZiBtaW4gPT09ICd1bmRlZmluZWQnIHx8IG1pbiA9PT0gbnVsbCkge1xyXG4gICAgICBtaW4gPSBOdW1iZXIuTUlOX1NBRkVfSU5URUdFUjtcclxuICAgIH1cclxuICAgIGVsc2UgaWYoTWF0aC5pc05hTihOdW1iZXIobWluKSkpIHtcclxuICAgICAgdGhyb3cgVHlwZUVycm9yKFwiTWF0aCBiZXR3ZWVuJ3MgbWluIGNhbm5vdCBiZSBjb252ZXJ0ZWQgdG8gbnVtYmVyLlwiKTtcclxuICAgIH1cclxuXHJcbiAgICBpZih0eXBlb2YgbWF4ID09PSAndW5kZWZpbmVkJyB8fCBtYXggPT09IG51bGwpIHtcclxuICAgICAgbWF4ID0gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVI7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmKE1hdGguaXNOYU4oTnVtYmVyKG1heCkpKSB7XHJcbiAgICAgIHRocm93IFR5cGVFcnJvcihcIk1hdGggYmV0d2VlbidzIG1heCBjYW5ub3QgYmUgY29udmVydGVkIHRvIG51bWJlci5cIik7XHJcbiAgICB9XHJcblxyXG4gICAgbiArPSBpbmM7XHJcblxyXG4gICAgaWYobiA8IG1pbikge1xyXG4gICAgICByZXR1cm4gbWF4O1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZihuID4gbWF4KSB7XHJcbiAgICAgIHJldHVybiBtaW47XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbjtcclxuICB9XHJcbn0pO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KG1hdGgsICd0cnVuY2F0ZScsIHtcclxuICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gIHZhbHVlOiBmdW5jdGlvbiB0cnVuY2F0ZShudW0sIGRwKSB7XHJcbiAgICAgIGlmKE1hdGguaXNOYU4obnVtID0gTnVtYmVyKG51bSkpKSB7XHJcbiAgICAgICAgdGhyb3cgVHlwZUVycm9yKFwiTWF0aCdzIHRydW5jYXRlIGlucHV0IGNhbm5vdCBjb252ZXJ0IHRvIG51bWJlci5cIik7XHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICAgIGRwID0gbWF0aC50b051bWJlcihkcCwgMCk7XHJcbiAgICAgIFxyXG4gICAgICB2YXIgZHAxMCA9IE1hdGgucG93KDEwLCBNYXRoLmZsb29yKGRwKSk7XHJcbiAgICAgIHJldHVybiBNYXRoLmZsb29yKG51bSAqIGRwMTApIC8gZHAxMDtcclxuICB9XHJcbn0pO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KG1hdGgsICdyb3VuZCcsIHtcclxuICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gIHZhbHVlOiBmdW5jdGlvbiByb3VuZChudW0sIGRwKSB7XHJcbiAgICBpZihNYXRoLmlzTmFOKG51bSA9IE51bWJlcihudW0pKSkge1xyXG4gICAgICB0aHJvdyBUeXBlRXJyb3IoXCJNYXRoJ3Mgcm91bmQgaW5wdXQgY2Fubm90IGNvbnZlcnQgdG8gbnVtYmVyLlwiKTtcclxuICAgIH1cclxuXHJcbiAgICBkcCA9IG1hdGgudG9OdW1iZXIoZHAsIDApO1xyXG4gICAgXHJcbiAgICB2YXIgZHAxMCA9IE1hdGgucG93KDEwLCBNYXRoLmZsb29yKGRwKSk7XHJcbiAgICByZXR1cm4gTWF0aC5yb3VuZChudW0gKiBkcDEwKSAvIGRwMTA7XHJcbiAgfVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gbWF0aDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3V0aWxzL21hdGgvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXHJcblxyXG5cclxudmFyIHZlY3RvciA9IE9iamVjdC5jcmVhdGUobnVsbCk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkodmVjdG9yLCAnUG9pbnQnLCB7XHJcbiAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICB2YWx1ZTogcmVxdWlyZSgnLi9Qb2ludCcpXHJcbn0pO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KHZlY3RvciwgJ3BvaW50Jywge1xyXG4gIGVudW1lcmFibGU6IHRydWUsXHJcbiAgdmFsdWU6IGZ1bmN0aW9uKHgsIHkpIHtcclxuICAgIHJldHVybiBuZXcgdmVjdG9yLlBvaW50KHgsIHkpO1xyXG4gIH1cclxufSk7XHJcblxyXG5cclxuXHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vdXRpbHMvdmVjdG9yL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcclxuZnVuY3Rpb24gUG9pbnQoeCwgeSkge1xyXG4gIGlmKE51bWJlci5pc05hTih4ID0gTnVtYmVyKHgpKSB8fCBOdW1iZXIuaXNOYU4oeSA9IE51bWJlcih5KSkpIHtcclxuICAgIHRocm93IFR5cGVFcnJvcihcIlBvaW50J3MgaW5wdXQgY2Fubm90IGNvbnZlcnQgdG8gbnVtYmVyLlwiKTtcclxuICB9XHJcbiAgXHJcbiAgdmFyIHB0ID0ge1xyXG4gICAgeDogMCxcclxuICAgIHk6IDBcclxuICB9O1xyXG5cclxuICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0aGlzLCB7XHJcbiAgICB4OiB7XHJcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHB0Lng7XHJcbiAgICAgIH0sXHJcbiAgICAgIHNldDogZnVuY3Rpb24odmFsKSB7XHJcbiAgICAgICAgaWYoIU51bWJlci5pc05hTih2YWwpKSB7XHJcbiAgICAgICAgICB4ID0gdmFsO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIHk6IHtcclxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gcHQueTtcclxuICAgICAgfSxcclxuICAgICAgc2V0OiBmdW5jdGlvbih2YWwpIHtcclxuICAgICAgICBpZighTnVtYmVyLmlzTmFOKHZhbCkpIHtcclxuICAgICAgICAgIHkgPSB2YWw7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSlcclxufVxyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFBvaW50LCAncHJvdG90eXBlJywge1xyXG4gIHZhbHVlOiBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhPYmplY3QuY3JlYXRlKG51bGwpLCB7XHJcbiAgICBzZXQ6IHtcclxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIHNldCgpIHtcclxuICAgICAgICB2YXIgYSA9IGFyZ3VtZW50c1swXTtcclxuICAgICAgICBpZih0eXBlb2YgYSA9PT0gJ3VuZGVmaW5lZCcgfHwgYSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIHgsIHk7XHJcbiAgICAgICAgaWYoQXJyYXkuaXNBcnJheShhKSkge1xyXG4gICAgICAgICAgaWYoTnVtYmVyLmlzTmFOKHggPSBOdW1iZXIoYVswXSkpIHx8IE51bWJlci5pc05hTih5ID0gTnVtYmVyKGFbMV0pKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodHlwZW9mIGEgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICBpZihOdW1iZXIuaXNOYU4oeCA9IE51bWJlcihhLngpKSB8fCBOdW1iZXIuaXNOYU4oeSA9IE51bWJlcihhLnkpKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgaWYoTnVtYmVyLmlzTmFOKHggPSBOdW1iZXIoYSkpIHx8IE51bWJlci5pc05hTih5ID0gTnVtYmVyKGFyZ3VtZW50c1sxXSkpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgZGlzcGxhY2VtZW50OiB7XHJcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBkaXNwbGFjZW1lbnQoeCwgeSkge1xyXG4gICAgICAgIHZhciBwdCA9IFBvaW50LmNvbnZlcnRUbyh4LCB5KTtcclxuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KE1hdGgucG93KHB0LnggLSB0aGlzLngsIDIpICsgTWF0aC5wb3cocHQueSAtIHRoaXMueSwgMikpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgc2xvcGU6IHtcclxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIHNsb3BlKHgsIHkpIHtcclxuICAgICAgICB2YXIgcHQgPSBQb2ludC5jb252ZXJ0VG8oeCwgeSk7XHJcbiAgICAgICAgcmV0dXJuIChwdC55IC0gdGhpcy55KSAvIChwdC54IC0gdGhpcy54KTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGRpc3RhbmNlOiB7XHJcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGlzcGxhY2VtZW50O1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgYW5nbGU6IHtcclxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIGRpc3BsYWNlbWVudCh4LCB5KSB7XHJcbiAgICAgICAgdmFyIHB0ID0gUG9pbnQuY29udmVydFRvKHgsIHkpO1xyXG4gICAgICAgIHJldHVybiBNYXRoLmF0YW4yKHB0LnkgLSB0aGlzLnksIHB0LnggLSB0aGlzLngpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSlcclxufSk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoUG9pbnQsICdjb252ZXJ0VG8nLCB7XHJcbiAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICB2YWx1ZTogZnVuY3Rpb24gY29udmVydFRvKCkge1xyXG4gICAgdmFyIGEgPSBhcmd1bWVudHNbMF07XHJcbiAgICBpZih0eXBlb2YgYVswXSA9PT0gJ3VuZGVmaW5lZCcgfHwgYSA9PT0gbnVsbCkge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgeCwgeTtcclxuICAgIGlmKEFycmF5LmlzQXJyYXkoYSkpIHtcclxuICAgICAgaWYoYS5sZW5ndGggPCAyKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmKE51bWJlci5pc05hTih4ID0gTnVtYmVyKGFbMF0pKSB8fCBOdW1iZXIuaXNOYU4oeSA9IE51bWJlcihhWzFdKSkpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSBpZih0eXBlb2YgYSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgaWYoYSBpbnN0YW5jZW9mIFBvaW50KSB7XHJcbiAgICAgICAgcmV0dXJuIGE7XHJcbiAgICAgIH1cclxuICAgICAgaWYoTnVtYmVyLmlzTmFOKHggPSBOdW1iZXIoYS54KSkgfHwgTnVtYmVyLmlzTmFOKHkgPSBOdW1iZXIoYS55KSkpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIGlmKE51bWJlci5pc05hTih4ID0gTnVtYmVyKGEpKSkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICB9XHJcbiAgICAgIHZhciBiID0gYXJndW1lbnRzWzFdO1xyXG4gICAgICBpZihOdW1iZXIuaXNOYU4oeSA9IE51bWJlcihiKSkpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXcgUG9pbnQoeCwgeSk7XHJcbiAgfVxyXG59KTtcclxuXHJcblxyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3V0aWxzL3ZlY3Rvci9Qb2ludC9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXHJcbnZhciBsb2dpYyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XHJcbnZhciBjb3JlID0gcmVxdWlyZSgnLi8uLi9jb3JlJyk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkobG9naWMsICdvcicsIHtcclxuICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gIHZhbHVlOiBmdW5jdGlvbiBvcigpIHtcclxuICAgIGlmKGFyZ3VtZW50cy5sZW5ndGggPCAxKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGZvcih2YXIgayBpbiBhcmd1bWVudHMpIHtcclxuICAgICAgaWYoYXJndW1lbnRzW2tdKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbn0pO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGxvZ2ljLCAnb3JWYWx1ZScsIHtcclxuICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gIHZhbHVlOiBmdW5jdGlvbiBvclZhbHVlKCkge1xyXG4gICAgZm9yKHZhciBrIGluIGFyZ3VtZW50cykge1xyXG4gICAgICBpZihhcmd1bWVudHNba10pIHtcclxuICAgICAgICByZXR1cm4gYXJndW1lbnRzW2tdO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY29yZS51bmRlZmluZWQ7XHJcbiAgfVxyXG59KVxyXG5cclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShsb2dpYywgJ2FuZCcsIHtcclxuICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gIHZhbHVlOiBmdW5jdGlvbiBhbmQoKSB7XHJcbiAgICBmb3IodmFyIGsgaW4gYXJndW1lbnRzKSB7XHJcbiAgICAgIGlmKCFhcmd1bWVudHNba10pIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxufSk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkobG9naWMsICd4b3InLCB7XHJcbiAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICB2YWx1ZTogZnVuY3Rpb24geG9yKGEsIGIpIHtcclxuICAgIHJldHVybiAoIWEgJiYgYikgfHwgKGEgJiYgIWIpID8gdHJ1ZSA6IGZhbHNlO1xyXG4gIH1cclxufSk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkobG9naWMsICd4bm9yJywge1xyXG4gIGVudW1lcmFibGU6IHRydWUsXHJcbiAgdmFsdWU6IGZ1bmN0aW9uIHhub3IoYSwgYikge1xyXG4gICAgcmV0dXJuICFsb2dpYy54b3IoYSwgYik7XHJcbiAgfVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gbG9naWM7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi91dGlscy9sb2dpYy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXHJcbnZhciBkYXRhID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShkYXRhLCAnQ29va2llJywge1xyXG4gIGVudW1lcmFibGU6IHRydWUsXHJcbiAgdmFsdWU6IHJlcXVpcmUoJy4vQ29va2llJylcclxufSk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZGF0YSwgJ0pzb24nLCB7XHJcbiAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICB2YWx1ZTogcmVxdWlyZSgnLi9Kc29uJylcclxufSlcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZGF0YTtcclxuXHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZGF0YS9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXHJcbnZhciBDb29raWUgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xyXG5cclxudmFyIHVuZGVmaW5lZCA9IHJlcXVpcmUoJy4vLi4vLi4vdXRpbHMvY29yZScpLnVuZGVmaW5lZDtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShDb29raWUsICdlbmFibGVkJywge1xyXG4gIGVudW1lcmFibGU6IHRydWUsXHJcbiAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgIGlmKCFuYXZpZ2F0b3IuY29va2llRW5hYmxlZCkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGNrID0gXCJnbXBpeGlfdGVzdF9jb29raWVfXCIgKyBNYXRoLnJhbmRvbSgpICsgKyBcIl9cIiArIERhdGUubm93KCkgKyBcIj0xXCI7XHJcbiAgICBkb2N1bWVudC5jb29raWUgPSBjaztcclxuICAgIHZhciByZXN1bHQgPSBkb2N1bWVudC5jb29raWUuaW5kZXhPZihjaykgPj0gMDtcclxuICAgIGRvY3VtZW50LmNvb2tpZSA9IGNrICsgXCI7ZXhwaXJlcz1UaHUsIDAxLUphbi0xOTcwIDAwOjAwOjAxIEdNVFwiO1xyXG5cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG59KTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShDb29raWUsICdzZXQnLCB7XHJcbiAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICB2YWx1ZTogZnVuY3Rpb24gc2V0KGtleSwgdmFsdWUsIGV4cGlyZXMsIHBhdGgpIHtcclxuICAgIGlmKCFDb29raWUuZW5hYmxlZCkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgaWYoIWtleSAmJiB0eXBlb2Yga2V5ICE9PSAnc3RyaW5nJykge1xyXG4gICAgICB0aHJvdyBUeXBlRXJyb3IoXCJDb29raWUga2V5IG11c3QgYmUgYSBzdHJpbmcuXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgdmFsdWUgPSBcInVuZGVmaW5lZFwiO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZih2YWx1ZSA9PT0gbnVsbCkge1xyXG4gICAgICB2YWx1ZSA9IFwibnVsbFwiO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZih0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgIHZhbHVlID0gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIHZhbHVlID0gdmFsdWUudG9TdHJpbmcoKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgY2sgPSBrZXkgKyBcIj1cIiArIHZhbHVlICsgXCI7XCI7XHJcbiAgICBpZih0eXBlb2YgZXhwaXJlcyAhPT0gJ3VuZGVmaW5lZCcgJiYgZXhwaXJlcyAhPT0gbnVsbCkge1xyXG4gICAgICBpZighKGV4cGlyZXMgaW5zdGFuY2VvZiBEYXRlKSkge1xyXG4gICAgICAgIGlmKHR5cGVvZiBleHBpcmVzICE9PSAnbnVtYmVyJyAmJiBOdW1iZXIuaXNOYU4oZXhwaXJlcyA9IE51bWJlcihleHBpcmVzKSkpIHtcclxuICAgICAgICAgIHRocm93IFR5cGVFcnJvcihcIkNvb2tpZSBleHBpcmF0aW9uIG11c3QgYmUgYSBkYXRlLCBudW1iZXIgb3IgdW5kZWZpbmVkL251bGwuXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBleHBpcmVzID0gbmV3IERhdGUoRGF0ZS5ub3coKSArIGV4cGlyZXMpO1xyXG4gICAgICB9XHJcbiAgICAgIGNrICs9IFwiZXhwaXJlcz1cIiArIGV4cGlyZXMudG9VVENTdHJpbmcoKSArIFwiO1wiO1xyXG4gICAgfVxyXG5cclxuICAgIGlmKCFwYXRoKSB7XHJcbiAgICAgIGlmKHR5cGVvZiBwYXRoICE9PSAnc3RyaW5nJykge1xyXG4gICAgICAgIHBhdGggPSBwYXRoLnRvU3RyaW5nKCk7XHJcbiAgICAgIH1cclxuICAgICAgY2sgKz0gcGF0aCArIFwiO1wiO1xyXG4gICAgfVxyXG5cclxuICAgIGRvY3VtZW50LmNvb2tpZSA9IGNrO1xyXG4gICAgcmV0dXJuIGRvY3VtZW50LmNvb2tpZS5pbmRleE9mKGtleSArIFwiPVwiICsgdmFsdWUpID49IDA7XHJcbiAgfVxyXG59KTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShDb29raWUsICdpbnNlcnQnLCB7XHJcbiAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIENvb2tpZS5zZXQ7XHJcbiAgfVxyXG59KTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShDb29raWUsICdhZGQnLCB7XHJcbiAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIENvb2tpZS5zZXQ7XHJcbiAgfVxyXG59KTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShDb29raWUsICdnZXQnLCB7XHJcbiAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICB2YWx1ZTogZnVuY3Rpb24gZ2V0KGtleSwgZGVmYXVsdFZhbHVlLCBjcmVhdGVEZWZhdWx0LCBleHBpcmVzLCBwYXRoKSB7XHJcbiAgICBpZighQ29va2llLmVuYWJsZWQpIHtcclxuICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBpZih0eXBlb2Yga2V5ICE9PSAnc3RyaW5nJykge1xyXG4gICAgICB0aHJvdyBUeXBlRXJyb3IoXCJDb29raWUga2V5IG11c3QgYmUgYSBzdHJpbmcuXCIpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICB2YXIgbmFtZSA9IGtleSArIFwiPVwiO1xyXG4gICAgdmFyIGRlY29kZWRDb29raWUgPSBkZWNvZGVVUklDb21wb25lbnQoZG9jdW1lbnQuY29va2llKTtcclxuICAgIHZhciBjYSA9IGRlY29kZWRDb29raWUuc3BsaXQoJzsnKTtcclxuICAgIGZvcih2YXIgaSA9IDA7IGkgPGNhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFyIGMgPSBjYVtpXTtcclxuICAgICAgICB3aGlsZSAoYy5jaGFyQXQoMCkgPT09ICcgJykge1xyXG4gICAgICAgICAgICBjID0gYy5zdWJzdHJpbmcoMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjLmluZGV4T2YobmFtZSkgPT09IDApIHtcclxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGMuc3Vic3RyaW5nKG5hbWUubGVuZ3RoLCBjLmxlbmd0aCk7XHJcbiAgICAgICAgICAgIHN3aXRjaChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICBjYXNlIFwibnVsbFwiOiByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICBjYXNlIFwidW5kZWZpbmVkXCI6IHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgY3JlYXRlRGVmYXVsdCAmJiBDb29raWUuc2V0KGtleSwgZGVmYXVsdFZhbHVlLCBleHBpcmVzLCBwYXRoKTtcclxuXHJcbiAgICByZXR1cm4gZGVmYXVsdFZhbHVlO1xyXG4gIH1cclxufSk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoQ29va2llLCAnc2VsZWN0Jywge1xyXG4gIGVudW1lcmFibGU6IHRydWUsXHJcbiAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiBDb29raWUuZ2V0O1xyXG4gIH1cclxufSk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoQ29va2llLCAndW5zZXQnLCB7XHJcbiAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICB2YWx1ZTogZnVuY3Rpb24gdW5zZXQoa2V5LCBwYXRoKSB7XHJcbiAgICB2YXIgY2sgPSBrZXkgKyBcIj0xO2V4cGlyZXM9VGh1LCAwMSBKYW4gMTk3MCAwMDowMDowMCBVVEM7XCIgKyAocGF0aCA/IHBhdGgudG9TdHJpbmcoKSA6IFwiXCIpO1xyXG4gICAgZG9jdW1lbnQuY29va2llID0gY2s7IFxyXG4gIH1cclxufSk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoQ29va2llLCAnZGVsZXRlJywge1xyXG4gIGVudW1lcmFibGU6IHRydWUsXHJcbiAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiBDb29raWUudW5zZXQ7XHJcbiAgfVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQ29va2llO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2RhdGEvQ29va2llL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAxNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcclxuXHJcbnZhciBxdWVyeSA9IHJlcXVpcmUoXCIuLy4uLy4uL3V0aWxzL2Zvcm1hdC9RdWVyeVwiKS5zdHJpbmdpZnk7XHJcblxyXG5mdW5jdGlvbiBKc29uKHR5cGUsIHBhdGgsIHBhcmFtcywgc3VjY2VzcywgZmFpbCwgdGltZW91dCkge1xyXG4gIGlmKHR5cGVvZiB0eXBlICE9PSBcInN0cmluZ1wiKSB7XHJcbiAgICB0aHJvdyBUeXBlRXJyb3IoXCJKc29uIHJlcXVlc3QgdHlwZSBtdXN0IGJlIGEgc3RyaW5nXCIpO1xyXG4gIH1cclxuICBcclxuICBpZih0eXBlLnRvTG93ZXJDYXNlKCkgIT09ICdwb3N0JyAmJiB0eXBlLnRvTG93ZXJDYXNlKCkgIT09ICdnZXQnKSB7XHJcbiAgICB0aHJvdyBUeXBlRXJyb3IoXCJKc29uIHJlcXVlc3QgdHlwZSBtdXN0IGJlIGEgJ3Bvc3QnIG9yICdnZXQnIG9ubHkuXCIpO1xyXG4gIH1cclxuXHJcbiAgaWYodHlwZW9mIHBhdGggIT09IFwic3RyaW5nXCIpIHtcclxuICAgIHRocm93IFR5cGVFcnJvcihcIkpzb24gcmVxdWVzdCBwYXRoIG11c3QgYmUgYSBzdHJpbmcuXCIpO1xyXG4gIH1cclxuXHJcblxyXG5cclxuICBpZih0eXBlb2YgcGFyYW1zID09PSAndW5kZWZpbmVkJyB8fCBwYXJhbXMgPT09IG51bGwpIHtcclxuICAgIHBhcmFtcyA9IHt9O1xyXG4gIH1cclxuICBlbHNlIGlmKHR5cGVvZiBwYXJhbXMgPT09ICdzdHJpbmcnKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBwYXJhbXMgPSBKU09OLnBhcnNlKHBhcmFtcyk7XHJcbiAgICB9XHJcbiAgICBjYXRjaChlKSB7XHJcbiAgICAgIHRocm93IFN5bnRheEVycm9yKFwiSnNvbiByZXF1ZXN0IHBhcmFtIG11c3QgYmUgcGFyc2VhYmxlIHRvIGpzb24uXCIpO1xyXG4gICAgfVxyXG4gIH1cclxuICBlbHNlIGlmKHR5cGVvZiBwYXJhbXMgIT09ICdvYmplY3QnKSB7XHJcbiAgICB0aHJvdyBUeXBlRXJyb3IoXCJKc29uIHJlcXVlc3QgcGFyYW0gbXVzdCBiZSBhbiBvYmplY3QuXCIpO1xyXG4gIH1cclxuXHJcbiAgdmFyIHhtbGh0dHAgPSB3aW5kb3cuWE1MSHR0cFJlcXVlc3QgXHJcbiAgICAgID8gbmV3IFhNTEh0dHBSZXF1ZXN0KCkgXHJcbiAgICAgIDogbmV3IEFjdGl2ZVhPYmplY3QoXCJNaWNyb3NvZnQuWE1MSFRUUFwiKTtcclxuXHJcbiAgeG1saHR0cC5vdmVycmlkZU1pbWVUeXBlKFwiYXBwbGljYXRpb24vanNvblwiKTtcclxuXHJcbiAgZnVuY3Rpb24gYWRkT25TdGF0ZUNoYW5nZSgpIHtcclxuICAgIHhtbGh0dHAub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIGlmKHhtbGh0dHAucmVhZHlTdGF0ZSA9PT0gWE1MSHR0cFJlcXVlc3QuRE9ORSkge1xyXG4gICAgICAgIGlmKHhtbGh0dHAuc3RhdHVzID09PSAyMDApIHtcclxuICAgICAgICAgIHZhciByY3Y7XHJcbiAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB2YXIgcmN2ID0gSlNPTi5wYXJzZSh4bWxodHRwLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBjYXRjaChlKSB7XHJcbiAgICAgICAgICAgIHJjdiA9IHhtbGh0dHAucmVzcG9uc2VUZXh0O1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdHlwZW9mIHN1Y2Nlc3MgPT09ICdmdW5jdGlvbicgJiYgc3VjY2VzcyhyY3YsIHhtbGh0dHAsIHhtbGh0dHAuc3RhdHVzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICB0eXBlb2YgZmFpbCA9PT0gJ2Z1bmN0aW9uJyAmJiBmYWlsKHhtbGh0dHAsIHhtbGh0dHAuc3RhdHVzKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfVxyXG5cclxuXHJcbiAgeG1saHR0cC50aW1lb3V0ID0gTnVtYmVyKHRpbWVvdXQpIHx8IDEwMDAwO1xyXG4gIHhtbGh0dHAub250aW1lb3V0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICB0eXBlb2YgZmFpbCA9PT0gJ2Z1bmN0aW9uJyAmJiBmYWlsKHhtbGh0dHAsIHhtbGh0dHAuc3RhdHVzKTtcclxuICB9XHJcblxyXG4gIHRyeSB7XHJcbiAgICB2YXIgcCA9IHF1ZXJ5KHBhcmFtcyk7XHJcbiAgICBpZih0eXBlID09PSAnZ2V0Jykge1xyXG4gICAgICB4bWxodHRwLm9wZW4oXCJHRVRcIiwgcGF0aCArIHApO1xyXG4gICAgICBhZGRPblN0YXRlQ2hhbmdlKCk7XHJcbiAgICAgIHhtbGh0dHAuc2VuZCgpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIHhtbGh0dHAub3BlbihcIlBPU1RcIiwgcGF0aCk7XHJcbiAgICAgIHhtbGh0dHAuc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtdHlwZVwiLCBcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFwiKTtcclxuICAgICAgYWRkT25TdGF0ZUNoYW5nZSgpO1xyXG4gICAgICB4bWxodHRwLnNlbmQocC5zdWJzdHJpbmcoMSwgcC5sZW5ndGgpKTtcclxuICAgIH1cclxuICB9XHJcbiAgY2F0Y2goZSkge1xyXG4gICAgcmV0dXJuIGU7XHJcbiAgfVxyXG4gIFxyXG4gIHJldHVybiB0cnVlO1xyXG59XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoSnNvbiwgJ2dldCcsIHtcclxuICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gIHZhbHVlOiBmdW5jdGlvbiBnZXQocGF0aCwgcGFyYW1zLCBzdWNjZXNzLCBmYWlsLCB0aW1lb3V0KSB7XHJcbiAgICByZXR1cm4gSnNvbignZ2V0JywgcGF0aCwgcGFyYW1zLCBzdWNjZXNzLCBmYWlsLCB0aW1lb3V0KTtcclxuICB9XHJcbn0pO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KEpzb24sICdwb3N0Jywge1xyXG4gIGVudW1lcmFibGU6IHRydWUsXHJcbiAgdmFsdWU6IGZ1bmN0aW9uIHBvc3QocGF0aCwgcGFyYW1zLCBzdWNjZXNzLCBmYWlsLCB0aW1lb3V0KSB7XHJcbiAgICByZXR1cm4gSnNvbigncG9zdCcsIHBhdGgsIHBhcmFtcywgc3VjY2VzcywgZmFpbCwgdGltZW91dCk7XHJcbiAgfVxyXG59KTtcclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEpzb247XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZGF0YS9Kc29uL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAxNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9