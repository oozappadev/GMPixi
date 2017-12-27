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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {

var GMPixi = Object.create(null);

Object.defineProperty(GMPixi, 'utils', {
  enumerable: true,
  value: __webpack_require__(2)
});

Object.defineProperty(GMPixi, 'data', {
  enumerable: true,
  value: __webpack_require__(5)
});


global.GMPixi = GMPixi;



/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 1 */
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {



var utils = Object.create(null);

Object.defineProperty(utils, 'format', {
  enumerable: true,
  value: __webpack_require__(3)
});

module.exports = utils;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {


var Format = Object.create(null);

Object.defineProperty(Format, 'query', {
  enumerable: true,
  value: __webpack_require__(4)
});

module.exports = Format;


/***/ }),
/* 4 */
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {


var data = Object.create(null);

Object.defineProperty(data, 'Cookie', {
  enumerable: true,
  value: __webpack_require__(6)
});

Object.defineProperty(data, 'Json', {
  enumerable: true,
  value: __webpack_require__(7)
})

module.exports = data;



/***/ }),
/* 6 */
/***/ (function(module, exports) {


var Cookie = Object.create(null);

var undefined;

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

Object.defineProperties(Cookie, 'add', {
  enumerable: true,
  get: function() {
    return Cookie.set;
  }
});

Object.defineProperty(Cookie, 'insert', {
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {



var query = __webpack_require__(4);

function Json(type, path, params, success, fail, timeout) {
  if(typeof type !== string) {
    throw TypeError("Json request type must be a string");
  }
  
  if(type.toLowerCase() !== 'post' && type.toLowerCase() !== 'get') {
    throw TypeError("Json request type must be a 'post' or 'get' only.");
  }

  if(typeof path !== string) {
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

  xmlhttp.onreadystate = function () {
    if(xmlhttp.readyState === XMLHttpRequest.DONE) {
      if(xmlhttp.status === 200) {
        var rcv = JSON.parse(xmlhttp.responseText);
        typeof success === 'function' && success(rcv, xmlhttp, xmlhttp.status);
      }
      else {
        typeof fail === 'function' && fail(xmlhttp, xmlhttp.status);
      }
    }
  };

  xmlhttp.timeout = Number(timeout) || 10000;
  xmlhttp.ontimeout = function() {
    typeof fail === 'function' && fail(xmlhttp, xmlhttp.status);
  }

  try {
    var p = query(params);
    if(type === 'get') {
      xmlhttp.open("GET", path + p);
      xmlhttp.send();
    }
    else {
      xmlhttp.open("POST", path);
      xmlhttp.send(p.substring(1, p.length));
    }
  }
  catch(e) {
    return false;
  }
  
  return true;
}

Object.defineProperties(o, 'get', {
  enumerable: true,
  value: function get(path, params, success, fail, timeout) {
    

  }
});


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZThlZmQzNzI0ZWIyNWI4MjY3MjAiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy93ZWJwYWNrL2J1aWxkaW4vZ2xvYmFsLmpzIiwid2VicGFjazovLy8uL3V0aWxzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3V0aWxzL2Zvcm1hdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi91dGlscy9mb3JtYXQvUXVlcnkuanMiLCJ3ZWJwYWNrOi8vLy4vZGF0YS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kYXRhL0Nvb2tpZS5qcyIsIndlYnBhY2s6Ly8vLi9kYXRhL0pzb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7QUMzREE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7QUFHRDs7Ozs7Ozs7OztBQ2ZBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw0Q0FBNEM7O0FBRTVDOzs7Ozs7Ozs7QUNsQkE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRCx1Qjs7Ozs7OztBQ1JBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7Ozs7Ozs7O0FDUEE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsY0FBYztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7Ozs7Ozs7O0FDbklBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDs7Ozs7Ozs7O0FDWkE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2Qjs7QUFFN0I7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbURBQW1EO0FBQ25EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DLGtCQUFrQixjQUFjO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixzQ0FBc0M7QUFDN0QseUI7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7Ozs7Ozs7OztBQ3pJQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBLENBQUMiLCJmaWxlIjoiZ21waXhpLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZThlZmQzNzI0ZWIyNWI4MjY3MjAiLCJcclxuXHJcbnZhciBHTVBpeGkgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KEdNUGl4aSwgJ3V0aWxzJywge1xyXG4gIGVudW1lcmFibGU6IHRydWUsXHJcbiAgdmFsdWU6IHJlcXVpcmUoJy4vdXRpbHMnKVxyXG59KTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShHTVBpeGksICdkYXRhJywge1xyXG4gIGVudW1lcmFibGU6IHRydWUsXHJcbiAgdmFsdWU6IHJlcXVpcmUoJy4vZGF0YScpXHJcbn0pO1xyXG5cclxuXHJcbmdsb2JhbC5HTVBpeGkgPSBHTVBpeGk7XHJcblxyXG5cclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZztcclxuXHJcbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXHJcbmcgPSAoZnVuY3Rpb24oKSB7XHJcblx0cmV0dXJuIHRoaXM7XHJcbn0pKCk7XHJcblxyXG50cnkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxyXG5cdGcgPSBnIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKSB8fCAoMSxldmFsKShcInRoaXNcIik7XHJcbn0gY2F0Y2goZSkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXHJcblx0aWYodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIilcclxuXHRcdGcgPSB3aW5kb3c7XHJcbn1cclxuXHJcbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cclxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3NcclxuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBnO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvd2VicGFjay9idWlsZGluL2dsb2JhbC5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcclxuXHJcbnZhciB1dGlscyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkodXRpbHMsICdmb3JtYXQnLCB7XHJcbiAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICB2YWx1ZTogcmVxdWlyZShcIi4vZm9ybWF0XCIpXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB1dGlscztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3V0aWxzL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxyXG52YXIgRm9ybWF0ID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShGb3JtYXQsICdxdWVyeScsIHtcclxuICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gIHZhbHVlOiByZXF1aXJlKCcuL1F1ZXJ5JylcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEZvcm1hdDtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi91dGlscy9mb3JtYXQvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXHJcbi8vIENvbnZlcnQgYW4gb2plY3Qgb2YgZGF0YSBpbnRvIGEgVVJMIHF1ZXJ5IHN0cmluZ1xyXG5cclxudmFyIFF1ZXJ5ID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcclxuXHJcbmZ1bmN0aW9uIHBhcnNlVG9RdWVyeShrZXksIG9iaikge1xyXG4gIHN3aXRjaCh0eXBlb2Ygb2JqKSB7XHJcbiAgICBjYXNlICd1bmRlZmluZWQnOlxyXG4gICAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KGtleSk7XHJcbiAgICBjYXNlICdvYmplY3QnOlxyXG4gICAgICBpZihvYmogPT09IG51bGwpIHtcclxuICAgICAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KGtleSkgKyBcIj1udWxsXCI7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZihBcnJheS5pc0FycmF5KG9iaikpIHtcclxuICAgICAgICB2YXIgc3RyID0gXCJcIjtcclxuICAgICAgICBmb3IodmFyIGk9MDsgaTxvYmoubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgIHZhciB2ID0gb2JqW2ldO1xyXG4gICAgICAgICAgc3dpdGNoKHR5cGVvZiB2KSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ3VuZGVmaW5lZCc6XHJcbiAgICAgICAgICAgICAgc3RyICs9IGVuY29kZVVSSUNvbXBvbmVudChrZXkpICsgXCJbXVwiO1xyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdvYmplY3QnOlxyXG4gICAgICAgICAgICAgIGlmKHYgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHN0ciArPSBlbmNvZGVVUklDb21wb25lbnQoa2V5KSArIFwiW109bnVsbFwiO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHN0ciArPSBlbmNvZGVVUklDb21wb25lbnQoa2V5KSArIFwiW109XCIgKyBlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkodikpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICBzdHIgKz0gZW5jb2RlVVJJQ29tcG9uZW50KGtleSkgKyBcIltdPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KHYudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZihpIDwgb2JqLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgc3RyICs9IFwiJlwiO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3RyIHx8IGtleSArIFwiW11cIjtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KGtleSkgKyBcIj1cIiArIGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShvYmopKTtcclxuICAgIGRlZmF1bHQ6IFxyXG4gICAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KGtleSkgKyBcIj1cIiArIGVuY29kZVVSSUNvbXBvbmVudChvYmoudG9TdHJpbmcoKSk7XHJcbiAgfVxyXG4gIFxyXG59XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoUXVlcnksICdzdHJpbmdpZnknLCB7XHJcbiAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICB2YWx1ZTogZnVuY3Rpb24gc3RyaW5naWZ5KHEpIHtcclxuICAgIFxyXG5cclxuICAgIGlmKCFxIHx8IHR5cGVvZiBxICE9PSAnb2JqZWN0Jykge1xyXG4gICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgcXVlcnlTdHJpbmcgPSBcIlwiO1xyXG5cclxuXHJcbiAgICBmb3IodmFyIGsgaW4gcSkge1xyXG4gICAgICBxdWVyeVN0cmluZyArPSBwYXJzZVRvUXVlcnkoaywgcVtrXSkgKyBcIiZcIjtcclxuICAgIH1cclxuXHJcbiAgICBxdWVyeVN0cmluZyA9IHF1ZXJ5U3RyaW5nLnN1YnN0cmluZygwLCBxdWVyeVN0cmluZy5sZW5ndGggLSAxKTtcclxuXHJcbiAgICByZXR1cm4gcXVlcnlTdHJpbmcgPyBcIj9cIiArIHF1ZXJ5U3RyaW5nIDogXCJcIjtcclxuICB9XHJcbn0pO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFF1ZXJ5LCAncGFyc2UnLCB7XHJcbiAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICB2YWx1ZTogZnVuY3Rpb24gcGFyc2Uoc3RyKSB7XHJcbiAgICBpZih0eXBlb2Ygc3RyICE9PSAnc3RyaW5nJykge1xyXG4gICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuXHJcbiAgICBpZihzdHIuaW5kZXhPZihcIj9cIikgPiAtMSkge1xyXG4gICAgICBzdHIgPSBzdHIuc3Vic3RyaW5nKHN0ci5pbmRleE9mKFwiP1wiKSArIDEsIHN0ci5sZW5ndGgpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBvYmogPSB7fTtcclxuICAgIHdoaWxlKHN0ciAhPT0gXCJcIikge1xyXG4gICAgICB2YXIgbztcclxuICAgICAgaWYoc3RyLmluZGV4T2YoXCImXCIpIDwgMCkge1xyXG4gICAgICAgIG8gPSBzdHI7XHJcbiAgICAgICAgc3RyID0gXCJcIjtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICBvID0gc3RyLnN1YnN0cmluZygwLCBzdHIuaW5kZXhPZihcIiZcIikpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzdHIgPSBzdHIuc3Vic3RyaW5nKHN0ci5pbmRleE9mKFwiJlwiKSArIDEsIHN0ci5sZW5ndGgpO1xyXG5cclxuICAgICAgdmFyIGtleTtcclxuICAgICAgdmFyIHZhbDtcclxuICAgICAgaWYoby5pbmRleE9mKFwiPVwiKSA+IDApIHtcclxuICAgICAgICBrZXkgPSBkZWNvZGVVUklDb21wb25lbnQoby5zdWJzdHJpbmcoMCwgby5pbmRleE9mKFwiPVwiKSkpO1xyXG4gICAgICAgIHZhbCA9IGRlY29kZVVSSUNvbXBvbmVudChvLnN1YnN0cmluZyhvLmluZGV4T2YoXCI9XCIpICsgMSwgby5sZW5ndGgpKTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICBrZXkgPSBvO1xyXG4gICAgICAgIHZhbCA9IFwiXCI7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmKHZhbC50b0xvd2VyQ2FzZSgpID09PSAnZmFsc2UnIHx8IHZhbC50b0xvd2VyQ2FzZSgpID09PSAndHJ1ZScpIHtcclxuICAgICAgICB2YWwgPSBCb29sZWFuKHZhbCk7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZih2YWwgIT09IFwiXCIgJiYgIU51bWJlci5pc05hTihOdW1iZXIodmFsKSkpIHtcclxuICAgICAgICB2YWwgPSBOdW1iZXIodmFsKTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgdmFyIHRtcCA9IEpTT04ucGFyc2UodmFsKTtcclxuICAgICAgICAgIHZhbCA9IHRtcDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2goZSkge31cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYoa2V5LmluZGV4T2YoXCJbXVwiKSA+IDApIHtcclxuICAgICAgICBrZXkgPSBrZXkuc3Vic3RyaW5nKDAsIGtleS5pbmRleE9mKFwiW11cIikpO1xyXG4gICAgICAgIG9ialtrZXldID0gb2JqW2tleV0gfHwgW107XHJcbiAgICAgICAgb2JqW2tleV0ucHVzaCh2YWwpO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIG9ialtrZXldID0gdmFsO1xyXG4gICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBvYmo7XHJcbiAgfVxyXG59KVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBRdWVyeTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi91dGlscy9mb3JtYXQvUXVlcnkuanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXHJcbnZhciBkYXRhID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShkYXRhLCAnQ29va2llJywge1xyXG4gIGVudW1lcmFibGU6IHRydWUsXHJcbiAgdmFsdWU6IHJlcXVpcmUoJy4vQ29va2llJylcclxufSk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZGF0YSwgJ0pzb24nLCB7XHJcbiAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICB2YWx1ZTogcmVxdWlyZSgnLi9Kc29uJylcclxufSlcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZGF0YTtcclxuXHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZGF0YS9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcclxudmFyIENvb2tpZSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XHJcblxyXG52YXIgdW5kZWZpbmVkO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KENvb2tpZSwgJ2VuYWJsZWQnLCB7XHJcbiAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgaWYoIW5hdmlnYXRvci5jb29raWVFbmFibGVkKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgY2sgPSBcImdtcGl4aV90ZXN0X2Nvb2tpZV9cIiArIE1hdGgucmFuZG9tKCkgKyArIFwiX1wiICsgRGF0ZS5ub3coKSArIFwiPTFcIjtcclxuICAgIGRvY3VtZW50LmNvb2tpZSA9IGNrO1xyXG4gICAgdmFyIHJlc3VsdCA9IGRvY3VtZW50LmNvb2tpZS5pbmRleE9mKGNrKSA+PSAwO1xyXG4gICAgZG9jdW1lbnQuY29va2llID0gY2sgKyBcIjtleHBpcmVzPVRodSwgMDEtSmFuLTE5NzAgMDA6MDA6MDEgR01UXCI7XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcbn0pO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KENvb2tpZSwgJ3NldCcsIHtcclxuICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gIHZhbHVlOiBmdW5jdGlvbiBzZXQoa2V5LCB2YWx1ZSwgZXhwaXJlcywgcGF0aCkge1xyXG4gICAgaWYoIUNvb2tpZS5lbmFibGVkKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBpZigha2V5ICYmIHR5cGVvZiBrZXkgIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHRocm93IFR5cGVFcnJvcihcIkNvb2tpZSBrZXkgbXVzdCBiZSBhIHN0cmluZy5cIik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYodHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICB2YWx1ZSA9IFwidW5kZWZpbmVkXCI7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmKHZhbHVlID09PSBudWxsKSB7XHJcbiAgICAgIHZhbHVlID0gXCJudWxsXCI7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgdmFsdWUgPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgdmFsdWUgPSB2YWx1ZS50b1N0cmluZygpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBjayA9IGtleSArIFwiPVwiICsgdmFsdWUgKyBcIjtcIjtcclxuICAgIGlmKHR5cGVvZiBleHBpcmVzICE9PSAndW5kZWZpbmVkJyAmJiBleHBpcmVzICE9PSBudWxsKSB7XHJcbiAgICAgIGlmKCEoZXhwaXJlcyBpbnN0YW5jZW9mIERhdGUpKSB7XHJcbiAgICAgICAgaWYodHlwZW9mIGV4cGlyZXMgIT09ICdudW1iZXInICYmIE51bWJlci5pc05hTihleHBpcmVzID0gTnVtYmVyKGV4cGlyZXMpKSkge1xyXG4gICAgICAgICAgdGhyb3cgVHlwZUVycm9yKFwiQ29va2llIGV4cGlyYXRpb24gbXVzdCBiZSBhIGRhdGUsIG51bWJlciBvciB1bmRlZmluZWQvbnVsbC5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGV4cGlyZXMgPSBuZXcgRGF0ZShEYXRlLm5vdygpICsgZXhwaXJlcyk7XHJcbiAgICAgIH1cclxuICAgICAgY2sgKz0gXCJleHBpcmVzPVwiICsgZXhwaXJlcy50b1VUQ1N0cmluZygpICsgXCI7XCI7XHJcbiAgICB9XHJcblxyXG4gICAgaWYoIXBhdGgpIHtcclxuICAgICAgaWYodHlwZW9mIHBhdGggIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgcGF0aCA9IHBhdGgudG9TdHJpbmcoKTtcclxuICAgICAgfVxyXG4gICAgICBjayArPSBwYXRoICsgXCI7XCI7XHJcbiAgICB9XHJcblxyXG4gICAgZG9jdW1lbnQuY29va2llID0gY2s7XHJcbiAgICByZXR1cm4gZG9jdW1lbnQuY29va2llLmluZGV4T2Yoa2V5ICsgXCI9XCIgKyB2YWx1ZSkgPj0gMDtcclxuICB9XHJcbn0pO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoQ29va2llLCAnYWRkJywge1xyXG4gIGVudW1lcmFibGU6IHRydWUsXHJcbiAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiBDb29raWUuc2V0O1xyXG4gIH1cclxufSk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoQ29va2llLCAnaW5zZXJ0Jywge1xyXG4gIGVudW1lcmFibGU6IHRydWUsXHJcbiAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiBDb29raWUuc2V0O1xyXG4gIH1cclxufSk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoQ29va2llLCAnZ2V0Jywge1xyXG4gIGVudW1lcmFibGU6IHRydWUsXHJcbiAgdmFsdWU6IGZ1bmN0aW9uIGdldChrZXksIGRlZmF1bHRWYWx1ZSwgY3JlYXRlRGVmYXVsdCwgZXhwaXJlcywgcGF0aCkge1xyXG4gICAgaWYoIUNvb2tpZS5lbmFibGVkKSB7XHJcbiAgICAgIHJldHVybiBkZWZhdWx0VmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYodHlwZW9mIGtleSAhPT0gJ3N0cmluZycpIHtcclxuICAgICAgdGhyb3cgVHlwZUVycm9yKFwiQ29va2llIGtleSBtdXN0IGJlIGEgc3RyaW5nLlwiKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgdmFyIG5hbWUgPSBrZXkgKyBcIj1cIjtcclxuICAgIHZhciBkZWNvZGVkQ29va2llID0gZGVjb2RlVVJJQ29tcG9uZW50KGRvY3VtZW50LmNvb2tpZSk7XHJcbiAgICB2YXIgY2EgPSBkZWNvZGVkQ29va2llLnNwbGl0KCc7Jyk7XHJcbiAgICBmb3IodmFyIGkgPSAwOyBpIDxjYS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhciBjID0gY2FbaV07XHJcbiAgICAgICAgd2hpbGUgKGMuY2hhckF0KDApID09PSAnICcpIHtcclxuICAgICAgICAgICAgYyA9IGMuc3Vic3RyaW5nKDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYy5pbmRleE9mKG5hbWUpID09PSAwKSB7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBjLnN1YnN0cmluZyhuYW1lLmxlbmd0aCwgYy5sZW5ndGgpO1xyXG4gICAgICAgICAgICBzd2l0Y2gocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgY2FzZSBcIm51bGxcIjogcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgY2FzZSBcInVuZGVmaW5lZFwiOiByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNyZWF0ZURlZmF1bHQgJiYgQ29va2llLnNldChrZXksIGRlZmF1bHRWYWx1ZSwgZXhwaXJlcywgcGF0aCk7XHJcblxyXG4gICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcclxuICB9XHJcbn0pO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KENvb2tpZSwgJ3NlbGVjdCcsIHtcclxuICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gQ29va2llLmdldDtcclxuICB9XHJcbn0pO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KENvb2tpZSwgJ3Vuc2V0Jywge1xyXG4gIGVudW1lcmFibGU6IHRydWUsXHJcbiAgdmFsdWU6IGZ1bmN0aW9uIHVuc2V0KGtleSwgcGF0aCkge1xyXG4gICAgdmFyIGNrID0ga2V5ICsgXCI9MTtleHBpcmVzPVRodSwgMDEgSmFuIDE5NzAgMDA6MDA6MDAgVVRDO1wiICsgKHBhdGggPyBwYXRoLnRvU3RyaW5nKCkgOiBcIlwiKTtcclxuICAgIGRvY3VtZW50LmNvb2tpZSA9IGNrOyBcclxuICB9XHJcbn0pO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KENvb2tpZSwgJ2RlbGV0ZScsIHtcclxuICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gQ29va2llLnVuc2V0O1xyXG4gIH1cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IENvb2tpZTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9kYXRhL0Nvb2tpZS5qc1xuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcclxuXHJcbnZhciBxdWVyeSA9IHJlcXVpcmUoXCIuLy4uL3V0aWxzL2Zvcm1hdC9RdWVyeVwiKTtcclxuXHJcbmZ1bmN0aW9uIEpzb24odHlwZSwgcGF0aCwgcGFyYW1zLCBzdWNjZXNzLCBmYWlsLCB0aW1lb3V0KSB7XHJcbiAgaWYodHlwZW9mIHR5cGUgIT09IHN0cmluZykge1xyXG4gICAgdGhyb3cgVHlwZUVycm9yKFwiSnNvbiByZXF1ZXN0IHR5cGUgbXVzdCBiZSBhIHN0cmluZ1wiKTtcclxuICB9XHJcbiAgXHJcbiAgaWYodHlwZS50b0xvd2VyQ2FzZSgpICE9PSAncG9zdCcgJiYgdHlwZS50b0xvd2VyQ2FzZSgpICE9PSAnZ2V0Jykge1xyXG4gICAgdGhyb3cgVHlwZUVycm9yKFwiSnNvbiByZXF1ZXN0IHR5cGUgbXVzdCBiZSBhICdwb3N0JyBvciAnZ2V0JyBvbmx5LlwiKTtcclxuICB9XHJcblxyXG4gIGlmKHR5cGVvZiBwYXRoICE9PSBzdHJpbmcpIHtcclxuICAgIHRocm93IFR5cGVFcnJvcihcIkpzb24gcmVxdWVzdCBwYXRoIG11c3QgYmUgYSBzdHJpbmcuXCIpO1xyXG4gIH1cclxuXHJcblxyXG5cclxuICBpZih0eXBlb2YgcGFyYW1zID09PSAndW5kZWZpbmVkJyB8fCBwYXJhbXMgPT09IG51bGwpIHtcclxuICAgIHBhcmFtcyA9IHt9O1xyXG4gIH1cclxuICBlbHNlIGlmKHR5cGVvZiBwYXJhbXMgPT09ICdzdHJpbmcnKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBwYXJhbXMgPSBKU09OLnBhcnNlKHBhcmFtcyk7XHJcbiAgICB9XHJcbiAgICBjYXRjaChlKSB7XHJcbiAgICAgIHRocm93IFN5bnRheEVycm9yKFwiSnNvbiByZXF1ZXN0IHBhcmFtIG11c3QgYmUgcGFyc2VhYmxlIHRvIGpzb24uXCIpO1xyXG4gICAgfVxyXG4gIH1cclxuICBlbHNlIGlmKHR5cGVvZiBwYXJhbXMgIT09ICdvYmplY3QnKSB7XHJcbiAgICB0aHJvdyBUeXBlRXJyb3IoXCJKc29uIHJlcXVlc3QgcGFyYW0gbXVzdCBiZSBhbiBvYmplY3QuXCIpO1xyXG4gIH1cclxuXHJcbiAgdmFyIHhtbGh0dHAgPSB3aW5kb3cuWE1MSHR0cFJlcXVlc3QgXHJcbiAgICAgID8gbmV3IFhNTEh0dHBSZXF1ZXN0KCkgXHJcbiAgICAgIDogbmV3IEFjdGl2ZVhPYmplY3QoXCJNaWNyb3NvZnQuWE1MSFRUUFwiKTtcclxuXHJcbiAgeG1saHR0cC5vdmVycmlkZU1pbWVUeXBlKFwiYXBwbGljYXRpb24vanNvblwiKTtcclxuXHJcbiAgeG1saHR0cC5vbnJlYWR5c3RhdGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZih4bWxodHRwLnJlYWR5U3RhdGUgPT09IFhNTEh0dHBSZXF1ZXN0LkRPTkUpIHtcclxuICAgICAgaWYoeG1saHR0cC5zdGF0dXMgPT09IDIwMCkge1xyXG4gICAgICAgIHZhciByY3YgPSBKU09OLnBhcnNlKHhtbGh0dHAucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICB0eXBlb2Ygc3VjY2VzcyA9PT0gJ2Z1bmN0aW9uJyAmJiBzdWNjZXNzKHJjdiwgeG1saHR0cCwgeG1saHR0cC5zdGF0dXMpO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIHR5cGVvZiBmYWlsID09PSAnZnVuY3Rpb24nICYmIGZhaWwoeG1saHR0cCwgeG1saHR0cC5zdGF0dXMpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgeG1saHR0cC50aW1lb3V0ID0gTnVtYmVyKHRpbWVvdXQpIHx8IDEwMDAwO1xyXG4gIHhtbGh0dHAub250aW1lb3V0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICB0eXBlb2YgZmFpbCA9PT0gJ2Z1bmN0aW9uJyAmJiBmYWlsKHhtbGh0dHAsIHhtbGh0dHAuc3RhdHVzKTtcclxuICB9XHJcblxyXG4gIHRyeSB7XHJcbiAgICB2YXIgcCA9IHF1ZXJ5KHBhcmFtcyk7XHJcbiAgICBpZih0eXBlID09PSAnZ2V0Jykge1xyXG4gICAgICB4bWxodHRwLm9wZW4oXCJHRVRcIiwgcGF0aCArIHApO1xyXG4gICAgICB4bWxodHRwLnNlbmQoKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICB4bWxodHRwLm9wZW4oXCJQT1NUXCIsIHBhdGgpO1xyXG4gICAgICB4bWxodHRwLnNlbmQocC5zdWJzdHJpbmcoMSwgcC5sZW5ndGgpKTtcclxuICAgIH1cclxuICB9XHJcbiAgY2F0Y2goZSkge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuICBcclxuICByZXR1cm4gdHJ1ZTtcclxufVxyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMobywgJ2dldCcsIHtcclxuICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gIHZhbHVlOiBmdW5jdGlvbiBnZXQocGF0aCwgcGFyYW1zLCBzdWNjZXNzLCBmYWlsLCB0aW1lb3V0KSB7XHJcbiAgICBcclxuXHJcbiAgfVxyXG59KTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9kYXRhL0pzb24uanNcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==