
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
