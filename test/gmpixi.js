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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {

var GMPixi = Object.create(null);

Object.defineProperty(GMPixi, 'utils', {
  enumerable: true,
  value: __webpack_require__(3)
});

Object.defineProperty(GMPixi, 'data', {
  enumerable: true,
  value: __webpack_require__(5)
});


global.GMPixi = GMPixi;



/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 2 */
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {



var utils = Object.create(null);

Object.defineProperty(utils, 'format', {
  enumerable: true,
  value: __webpack_require__(4)
});

module.exports = utils;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {


var Format = Object.create(null);

Object.defineProperty(Format, 'query', {
  enumerable: true,
  value: __webpack_require__(0)
});

module.exports = Format;


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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {



var query = __webpack_require__(0).stringify;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYTVkYjU1YTg1M2JjMzUyMmIwN2EiLCJ3ZWJwYWNrOi8vLy4vdXRpbHMvZm9ybWF0L1F1ZXJ5LmpzIiwid2VicGFjazovLy8uL2luZGV4LmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvd2VicGFjay9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi91dGlscy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi91dGlscy9mb3JtYXQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGF0YS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kYXRhL0Nvb2tpZS5qcyIsIndlYnBhY2s6Ly8vLi9kYXRhL0pzb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7OztBQzVEQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixjQUFjO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDs7Ozs7Ozs7O0FDbElBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7O0FBR0Q7Ozs7Ozs7Ozs7QUNmQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNENBQTRDOztBQUU1Qzs7Ozs7Ozs7O0FDbEJBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQsdUI7Ozs7Ozs7QUNSQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOzs7Ozs7OztBQ1BBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDs7Ozs7Ozs7O0FDWkE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2Qjs7QUFFN0I7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbURBQW1EO0FBQ25EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DLGtCQUFrQixjQUFjO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixzQ0FBc0M7QUFDN0QseUI7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7Ozs7Ozs7OztBQ3pJQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7O0FBR0QiLCJmaWxlIjoiZ21waXhpLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYTVkYjU1YTg1M2JjMzUyMmIwN2EiLCJcclxuLy8gQ29udmVydCBhbiBvamVjdCBvZiBkYXRhIGludG8gYSBVUkwgcXVlcnkgc3RyaW5nXHJcblxyXG52YXIgUXVlcnkgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xyXG5cclxuZnVuY3Rpb24gcGFyc2VUb1F1ZXJ5KGtleSwgb2JqKSB7XHJcbiAgc3dpdGNoKHR5cGVvZiBvYmopIHtcclxuICAgIGNhc2UgJ3VuZGVmaW5lZCc6XHJcbiAgICAgIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQoa2V5KTtcclxuICAgIGNhc2UgJ29iamVjdCc6XHJcbiAgICAgIGlmKG9iaiA9PT0gbnVsbCkge1xyXG4gICAgICAgIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQoa2V5KSArIFwiPW51bGxcIjtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIGlmKEFycmF5LmlzQXJyYXkob2JqKSkge1xyXG4gICAgICAgIHZhciBzdHIgPSBcIlwiO1xyXG4gICAgICAgIGZvcih2YXIgaT0wOyBpPG9iai5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgdmFyIHYgPSBvYmpbaV07XHJcbiAgICAgICAgICBzd2l0Y2godHlwZW9mIHYpIHtcclxuICAgICAgICAgICAgY2FzZSAndW5kZWZpbmVkJzpcclxuICAgICAgICAgICAgICBzdHIgKz0gZW5jb2RlVVJJQ29tcG9uZW50KGtleSkgKyBcIltdXCI7XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ29iamVjdCc6XHJcbiAgICAgICAgICAgICAgaWYodiA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgc3RyICs9IGVuY29kZVVSSUNvbXBvbmVudChrZXkpICsgXCJbXT1udWxsXCI7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc3RyICs9IGVuY29kZVVSSUNvbXBvbmVudChrZXkpICsgXCJbXT1cIiArIGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeSh2KSk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgIHN0ciArPSBlbmNvZGVVUklDb21wb25lbnQoa2V5KSArIFwiW109XCIgKyBlbmNvZGVVUklDb21wb25lbnQodi50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmKGkgPCBvYmoubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICBzdHIgKz0gXCImXCI7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzdHIgfHwga2V5ICsgXCJbXVwiO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQoa2V5KSArIFwiPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KG9iaikpO1xyXG4gICAgZGVmYXVsdDogXHJcbiAgICAgIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQoa2V5KSArIFwiPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KG9iai50b1N0cmluZygpKTtcclxuICB9XHJcbiAgXHJcbn1cclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShRdWVyeSwgJ3N0cmluZ2lmeScsIHtcclxuICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gIHZhbHVlOiBmdW5jdGlvbiBzdHJpbmdpZnkocSkge1xyXG4gICAgXHJcblxyXG4gICAgaWYoIXEgfHwgdHlwZW9mIHEgIT09ICdvYmplY3QnKSB7XHJcbiAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBxdWVyeVN0cmluZyA9IFwiXCI7XHJcblxyXG5cclxuICAgIGZvcih2YXIgayBpbiBxKSB7XHJcbiAgICAgIHF1ZXJ5U3RyaW5nICs9IHBhcnNlVG9RdWVyeShrLCBxW2tdKSArIFwiJlwiO1xyXG4gICAgfVxyXG5cclxuICAgIHF1ZXJ5U3RyaW5nID0gcXVlcnlTdHJpbmcuc3Vic3RyaW5nKDAsIHF1ZXJ5U3RyaW5nLmxlbmd0aCAtIDEpO1xyXG5cclxuICAgIHJldHVybiBxdWVyeVN0cmluZyA/IFwiP1wiICsgcXVlcnlTdHJpbmcgOiBcIlwiO1xyXG4gIH1cclxufSk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoUXVlcnksICdwYXJzZScsIHtcclxuICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gIHZhbHVlOiBmdW5jdGlvbiBwYXJzZShzdHIpIHtcclxuICAgIGlmKHR5cGVvZiBzdHIgIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG5cclxuICAgIGlmKHN0ci5pbmRleE9mKFwiP1wiKSA+IC0xKSB7XHJcbiAgICAgIHN0ciA9IHN0ci5zdWJzdHJpbmcoc3RyLmluZGV4T2YoXCI/XCIpICsgMSwgc3RyLmxlbmd0aCk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIG9iaiA9IHt9O1xyXG4gICAgd2hpbGUoc3RyICE9PSBcIlwiKSB7XHJcbiAgICAgIHZhciBvO1xyXG4gICAgICBpZihzdHIuaW5kZXhPZihcIiZcIikgPCAwKSB7XHJcbiAgICAgICAgbyA9IHN0cjtcclxuICAgICAgICBzdHIgPSBcIlwiO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIG8gPSBzdHIuc3Vic3RyaW5nKDAsIHN0ci5pbmRleE9mKFwiJlwiKSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHN0ciA9IHN0ci5zdWJzdHJpbmcoc3RyLmluZGV4T2YoXCImXCIpICsgMSwgc3RyLmxlbmd0aCk7XHJcblxyXG4gICAgICB2YXIga2V5O1xyXG4gICAgICB2YXIgdmFsO1xyXG4gICAgICBpZihvLmluZGV4T2YoXCI9XCIpID4gMCkge1xyXG4gICAgICAgIGtleSA9IGRlY29kZVVSSUNvbXBvbmVudChvLnN1YnN0cmluZygwLCBvLmluZGV4T2YoXCI9XCIpKSk7XHJcbiAgICAgICAgdmFsID0gZGVjb2RlVVJJQ29tcG9uZW50KG8uc3Vic3RyaW5nKG8uaW5kZXhPZihcIj1cIikgKyAxLCBvLmxlbmd0aCkpO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIGtleSA9IG87XHJcbiAgICAgICAgdmFsID0gXCJcIjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYodmFsLnRvTG93ZXJDYXNlKCkgPT09ICdmYWxzZScgfHwgdmFsLnRvTG93ZXJDYXNlKCkgPT09ICd0cnVlJykge1xyXG4gICAgICAgIHZhbCA9IEJvb2xlYW4odmFsKTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIGlmKHZhbCAhPT0gXCJcIiAmJiAhTnVtYmVyLmlzTmFOKE51bWJlcih2YWwpKSkge1xyXG4gICAgICAgIHZhbCA9IE51bWJlcih2YWwpO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICB2YXIgdG1wID0gSlNPTi5wYXJzZSh2YWwpO1xyXG4gICAgICAgICAgdmFsID0gdG1wO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaChlKSB7fVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZihrZXkuaW5kZXhPZihcIltdXCIpID4gMCkge1xyXG4gICAgICAgIGtleSA9IGtleS5zdWJzdHJpbmcoMCwga2V5LmluZGV4T2YoXCJbXVwiKSk7XHJcbiAgICAgICAgb2JqW2tleV0gPSBvYmpba2V5XSB8fCBbXTtcclxuICAgICAgICBvYmpba2V5XS5wdXNoKHZhbCk7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgb2JqW2tleV0gPSB2YWw7XHJcbiAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG9iajtcclxuICB9XHJcbn0pXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFF1ZXJ5O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3V0aWxzL2Zvcm1hdC9RdWVyeS5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcclxuXHJcbnZhciBHTVBpeGkgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KEdNUGl4aSwgJ3V0aWxzJywge1xyXG4gIGVudW1lcmFibGU6IHRydWUsXHJcbiAgdmFsdWU6IHJlcXVpcmUoJy4vdXRpbHMnKVxyXG59KTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShHTVBpeGksICdkYXRhJywge1xyXG4gIGVudW1lcmFibGU6IHRydWUsXHJcbiAgdmFsdWU6IHJlcXVpcmUoJy4vZGF0YScpXHJcbn0pO1xyXG5cclxuXHJcbmdsb2JhbC5HTVBpeGkgPSBHTVBpeGk7XHJcblxyXG5cclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZztcclxuXHJcbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXHJcbmcgPSAoZnVuY3Rpb24oKSB7XHJcblx0cmV0dXJuIHRoaXM7XHJcbn0pKCk7XHJcblxyXG50cnkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxyXG5cdGcgPSBnIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKSB8fCAoMSxldmFsKShcInRoaXNcIik7XHJcbn0gY2F0Y2goZSkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXHJcblx0aWYodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIilcclxuXHRcdGcgPSB3aW5kb3c7XHJcbn1cclxuXHJcbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cclxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3NcclxuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBnO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvd2VicGFjay9idWlsZGluL2dsb2JhbC5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcclxuXHJcbnZhciB1dGlscyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkodXRpbHMsICdmb3JtYXQnLCB7XHJcbiAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICB2YWx1ZTogcmVxdWlyZShcIi4vZm9ybWF0XCIpXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB1dGlscztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3V0aWxzL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxyXG52YXIgRm9ybWF0ID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShGb3JtYXQsICdxdWVyeScsIHtcclxuICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gIHZhbHVlOiByZXF1aXJlKCcuL1F1ZXJ5JylcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEZvcm1hdDtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi91dGlscy9mb3JtYXQvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXHJcbnZhciBkYXRhID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShkYXRhLCAnQ29va2llJywge1xyXG4gIGVudW1lcmFibGU6IHRydWUsXHJcbiAgdmFsdWU6IHJlcXVpcmUoJy4vQ29va2llJylcclxufSk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZGF0YSwgJ0pzb24nLCB7XHJcbiAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICB2YWx1ZTogcmVxdWlyZSgnLi9Kc29uJylcclxufSlcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZGF0YTtcclxuXHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZGF0YS9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcclxudmFyIENvb2tpZSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XHJcblxyXG52YXIgdW5kZWZpbmVkO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KENvb2tpZSwgJ2VuYWJsZWQnLCB7XHJcbiAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgaWYoIW5hdmlnYXRvci5jb29raWVFbmFibGVkKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgY2sgPSBcImdtcGl4aV90ZXN0X2Nvb2tpZV9cIiArIE1hdGgucmFuZG9tKCkgKyArIFwiX1wiICsgRGF0ZS5ub3coKSArIFwiPTFcIjtcclxuICAgIGRvY3VtZW50LmNvb2tpZSA9IGNrO1xyXG4gICAgdmFyIHJlc3VsdCA9IGRvY3VtZW50LmNvb2tpZS5pbmRleE9mKGNrKSA+PSAwO1xyXG4gICAgZG9jdW1lbnQuY29va2llID0gY2sgKyBcIjtleHBpcmVzPVRodSwgMDEtSmFuLTE5NzAgMDA6MDA6MDEgR01UXCI7XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcbn0pO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KENvb2tpZSwgJ3NldCcsIHtcclxuICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gIHZhbHVlOiBmdW5jdGlvbiBzZXQoa2V5LCB2YWx1ZSwgZXhwaXJlcywgcGF0aCkge1xyXG4gICAgaWYoIUNvb2tpZS5lbmFibGVkKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBpZigha2V5ICYmIHR5cGVvZiBrZXkgIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHRocm93IFR5cGVFcnJvcihcIkNvb2tpZSBrZXkgbXVzdCBiZSBhIHN0cmluZy5cIik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYodHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICB2YWx1ZSA9IFwidW5kZWZpbmVkXCI7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmKHZhbHVlID09PSBudWxsKSB7XHJcbiAgICAgIHZhbHVlID0gXCJudWxsXCI7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgdmFsdWUgPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgdmFsdWUgPSB2YWx1ZS50b1N0cmluZygpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBjayA9IGtleSArIFwiPVwiICsgdmFsdWUgKyBcIjtcIjtcclxuICAgIGlmKHR5cGVvZiBleHBpcmVzICE9PSAndW5kZWZpbmVkJyAmJiBleHBpcmVzICE9PSBudWxsKSB7XHJcbiAgICAgIGlmKCEoZXhwaXJlcyBpbnN0YW5jZW9mIERhdGUpKSB7XHJcbiAgICAgICAgaWYodHlwZW9mIGV4cGlyZXMgIT09ICdudW1iZXInICYmIE51bWJlci5pc05hTihleHBpcmVzID0gTnVtYmVyKGV4cGlyZXMpKSkge1xyXG4gICAgICAgICAgdGhyb3cgVHlwZUVycm9yKFwiQ29va2llIGV4cGlyYXRpb24gbXVzdCBiZSBhIGRhdGUsIG51bWJlciBvciB1bmRlZmluZWQvbnVsbC5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGV4cGlyZXMgPSBuZXcgRGF0ZShEYXRlLm5vdygpICsgZXhwaXJlcyk7XHJcbiAgICAgIH1cclxuICAgICAgY2sgKz0gXCJleHBpcmVzPVwiICsgZXhwaXJlcy50b1VUQ1N0cmluZygpICsgXCI7XCI7XHJcbiAgICB9XHJcblxyXG4gICAgaWYoIXBhdGgpIHtcclxuICAgICAgaWYodHlwZW9mIHBhdGggIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgcGF0aCA9IHBhdGgudG9TdHJpbmcoKTtcclxuICAgICAgfVxyXG4gICAgICBjayArPSBwYXRoICsgXCI7XCI7XHJcbiAgICB9XHJcblxyXG4gICAgZG9jdW1lbnQuY29va2llID0gY2s7XHJcbiAgICByZXR1cm4gZG9jdW1lbnQuY29va2llLmluZGV4T2Yoa2V5ICsgXCI9XCIgKyB2YWx1ZSkgPj0gMDtcclxuICB9XHJcbn0pO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KENvb2tpZSwgJ2luc2VydCcsIHtcclxuICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gQ29va2llLnNldDtcclxuICB9XHJcbn0pO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KENvb2tpZSwgJ2FkZCcsIHtcclxuICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gQ29va2llLnNldDtcclxuICB9XHJcbn0pO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KENvb2tpZSwgJ2dldCcsIHtcclxuICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gIHZhbHVlOiBmdW5jdGlvbiBnZXQoa2V5LCBkZWZhdWx0VmFsdWUsIGNyZWF0ZURlZmF1bHQsIGV4cGlyZXMsIHBhdGgpIHtcclxuICAgIGlmKCFDb29raWUuZW5hYmxlZCkge1xyXG4gICAgICByZXR1cm4gZGVmYXVsdFZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmKHR5cGVvZiBrZXkgIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHRocm93IFR5cGVFcnJvcihcIkNvb2tpZSBrZXkgbXVzdCBiZSBhIHN0cmluZy5cIik7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHZhciBuYW1lID0ga2V5ICsgXCI9XCI7XHJcbiAgICB2YXIgZGVjb2RlZENvb2tpZSA9IGRlY29kZVVSSUNvbXBvbmVudChkb2N1bWVudC5jb29raWUpO1xyXG4gICAgdmFyIGNhID0gZGVjb2RlZENvb2tpZS5zcGxpdCgnOycpO1xyXG4gICAgZm9yKHZhciBpID0gMDsgaSA8Y2EubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YXIgYyA9IGNhW2ldO1xyXG4gICAgICAgIHdoaWxlIChjLmNoYXJBdCgwKSA9PT0gJyAnKSB7XHJcbiAgICAgICAgICAgIGMgPSBjLnN1YnN0cmluZygxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGMuaW5kZXhPZihuYW1lKSA9PT0gMCkge1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gYy5zdWJzdHJpbmcobmFtZS5sZW5ndGgsIGMubGVuZ3RoKTtcclxuICAgICAgICAgICAgc3dpdGNoKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgIGNhc2UgXCJudWxsXCI6IHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgIGNhc2UgXCJ1bmRlZmluZWRcIjogcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjcmVhdGVEZWZhdWx0ICYmIENvb2tpZS5zZXQoa2V5LCBkZWZhdWx0VmFsdWUsIGV4cGlyZXMsIHBhdGgpO1xyXG5cclxuICAgIHJldHVybiBkZWZhdWx0VmFsdWU7XHJcbiAgfVxyXG59KTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShDb29raWUsICdzZWxlY3QnLCB7XHJcbiAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIENvb2tpZS5nZXQ7XHJcbiAgfVxyXG59KTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShDb29raWUsICd1bnNldCcsIHtcclxuICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gIHZhbHVlOiBmdW5jdGlvbiB1bnNldChrZXksIHBhdGgpIHtcclxuICAgIHZhciBjayA9IGtleSArIFwiPTE7ZXhwaXJlcz1UaHUsIDAxIEphbiAxOTcwIDAwOjAwOjAwIFVUQztcIiArIChwYXRoID8gcGF0aC50b1N0cmluZygpIDogXCJcIik7XHJcbiAgICBkb2N1bWVudC5jb29raWUgPSBjazsgXHJcbiAgfVxyXG59KTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShDb29raWUsICdkZWxldGUnLCB7XHJcbiAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIENvb2tpZS51bnNldDtcclxuICB9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBDb29raWU7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZGF0YS9Db29raWUuanNcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXHJcblxyXG52YXIgcXVlcnkgPSByZXF1aXJlKFwiLi8uLi91dGlscy9mb3JtYXQvUXVlcnlcIikuc3RyaW5naWZ5O1xyXG5cclxuZnVuY3Rpb24gSnNvbih0eXBlLCBwYXRoLCBwYXJhbXMsIHN1Y2Nlc3MsIGZhaWwsIHRpbWVvdXQpIHtcclxuICBpZih0eXBlb2YgdHlwZSAhPT0gXCJzdHJpbmdcIikge1xyXG4gICAgdGhyb3cgVHlwZUVycm9yKFwiSnNvbiByZXF1ZXN0IHR5cGUgbXVzdCBiZSBhIHN0cmluZ1wiKTtcclxuICB9XHJcbiAgXHJcbiAgaWYodHlwZS50b0xvd2VyQ2FzZSgpICE9PSAncG9zdCcgJiYgdHlwZS50b0xvd2VyQ2FzZSgpICE9PSAnZ2V0Jykge1xyXG4gICAgdGhyb3cgVHlwZUVycm9yKFwiSnNvbiByZXF1ZXN0IHR5cGUgbXVzdCBiZSBhICdwb3N0JyBvciAnZ2V0JyBvbmx5LlwiKTtcclxuICB9XHJcblxyXG4gIGlmKHR5cGVvZiBwYXRoICE9PSBcInN0cmluZ1wiKSB7XHJcbiAgICB0aHJvdyBUeXBlRXJyb3IoXCJKc29uIHJlcXVlc3QgcGF0aCBtdXN0IGJlIGEgc3RyaW5nLlwiKTtcclxuICB9XHJcblxyXG5cclxuXHJcbiAgaWYodHlwZW9mIHBhcmFtcyA9PT0gJ3VuZGVmaW5lZCcgfHwgcGFyYW1zID09PSBudWxsKSB7XHJcbiAgICBwYXJhbXMgPSB7fTtcclxuICB9XHJcbiAgZWxzZSBpZih0eXBlb2YgcGFyYW1zID09PSAnc3RyaW5nJykge1xyXG4gICAgdHJ5IHtcclxuICAgICAgcGFyYW1zID0gSlNPTi5wYXJzZShwYXJhbXMpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2goZSkge1xyXG4gICAgICB0aHJvdyBTeW50YXhFcnJvcihcIkpzb24gcmVxdWVzdCBwYXJhbSBtdXN0IGJlIHBhcnNlYWJsZSB0byBqc29uLlwiKTtcclxuICAgIH1cclxuICB9XHJcbiAgZWxzZSBpZih0eXBlb2YgcGFyYW1zICE9PSAnb2JqZWN0Jykge1xyXG4gICAgdGhyb3cgVHlwZUVycm9yKFwiSnNvbiByZXF1ZXN0IHBhcmFtIG11c3QgYmUgYW4gb2JqZWN0LlwiKTtcclxuICB9XHJcblxyXG4gIHZhciB4bWxodHRwID0gd2luZG93LlhNTEh0dHBSZXF1ZXN0IFxyXG4gICAgICA/IG5ldyBYTUxIdHRwUmVxdWVzdCgpIFxyXG4gICAgICA6IG5ldyBBY3RpdmVYT2JqZWN0KFwiTWljcm9zb2Z0LlhNTEhUVFBcIik7XHJcblxyXG4gIHhtbGh0dHAub3ZlcnJpZGVNaW1lVHlwZShcImFwcGxpY2F0aW9uL2pzb25cIik7XHJcblxyXG4gIGZ1bmN0aW9uIGFkZE9uU3RhdGVDaGFuZ2UoKSB7XHJcbiAgICB4bWxodHRwLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICBpZih4bWxodHRwLnJlYWR5U3RhdGUgPT09IFhNTEh0dHBSZXF1ZXN0LkRPTkUpIHtcclxuICAgICAgICBpZih4bWxodHRwLnN0YXR1cyA9PT0gMjAwKSB7XHJcbiAgICAgICAgICB2YXIgcmN2O1xyXG4gICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdmFyIHJjdiA9IEpTT04ucGFyc2UoeG1saHR0cC5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgY2F0Y2goZSkge1xyXG4gICAgICAgICAgICByY3YgPSB4bWxodHRwLnJlc3BvbnNlVGV4dDtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHR5cGVvZiBzdWNjZXNzID09PSAnZnVuY3Rpb24nICYmIHN1Y2Nlc3MocmN2LCB4bWxodHRwLCB4bWxodHRwLnN0YXR1cyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgdHlwZW9mIGZhaWwgPT09ICdmdW5jdGlvbicgJiYgZmFpbCh4bWxodHRwLCB4bWxodHRwLnN0YXR1cyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcblxyXG4gIHhtbGh0dHAudGltZW91dCA9IE51bWJlcih0aW1lb3V0KSB8fCAxMDAwMDtcclxuICB4bWxodHRwLm9udGltZW91dCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdHlwZW9mIGZhaWwgPT09ICdmdW5jdGlvbicgJiYgZmFpbCh4bWxodHRwLCB4bWxodHRwLnN0YXR1cyk7XHJcbiAgfVxyXG5cclxuICB0cnkge1xyXG4gICAgdmFyIHAgPSBxdWVyeShwYXJhbXMpO1xyXG4gICAgaWYodHlwZSA9PT0gJ2dldCcpIHtcclxuICAgICAgeG1saHR0cC5vcGVuKFwiR0VUXCIsIHBhdGggKyBwKTtcclxuICAgICAgYWRkT25TdGF0ZUNoYW5nZSgpO1xyXG4gICAgICB4bWxodHRwLnNlbmQoKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICB4bWxodHRwLm9wZW4oXCJQT1NUXCIsIHBhdGgpO1xyXG4gICAgICB4bWxodHRwLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LXR5cGVcIiwgXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIik7XHJcbiAgICAgIGFkZE9uU3RhdGVDaGFuZ2UoKTtcclxuICAgICAgeG1saHR0cC5zZW5kKHAuc3Vic3RyaW5nKDEsIHAubGVuZ3RoKSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGNhdGNoKGUpIHtcclxuICAgIHJldHVybiBlO1xyXG4gIH1cclxuICBcclxuICByZXR1cm4gdHJ1ZTtcclxufVxyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KEpzb24sICdnZXQnLCB7XHJcbiAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICB2YWx1ZTogZnVuY3Rpb24gZ2V0KHBhdGgsIHBhcmFtcywgc3VjY2VzcywgZmFpbCwgdGltZW91dCkge1xyXG4gICAgcmV0dXJuIEpzb24oJ2dldCcsIHBhdGgsIHBhcmFtcywgc3VjY2VzcywgZmFpbCwgdGltZW91dCk7XHJcbiAgfVxyXG59KTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShKc29uLCAncG9zdCcsIHtcclxuICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gIHZhbHVlOiBmdW5jdGlvbiBwb3N0KHBhdGgsIHBhcmFtcywgc3VjY2VzcywgZmFpbCwgdGltZW91dCkge1xyXG4gICAgcmV0dXJuIEpzb24oJ3Bvc3QnLCBwYXRoLCBwYXJhbXMsIHN1Y2Nlc3MsIGZhaWwsIHRpbWVvdXQpO1xyXG4gIH1cclxufSk7XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBKc29uO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2RhdGEvSnNvbi5qc1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9