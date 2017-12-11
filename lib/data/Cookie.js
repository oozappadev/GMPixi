
var Cookie = Cookie || {};

var Utils = require('./../core/Utils');
var math = require('./../core/Math');

Object.defineProperty(Cookie, 'set', {
  enumerable: true,
  value: function set(key, value, howLong, path) {

    if(Utils.checkType(key)) key = key.toString();
    else throw ReferenceError('Input key is undefined.');

    if(Utils.checkType(value)) key = key.toString();
    else throw ReferenceError('Input value is undefined.');

    howLong = Utils.checkType(howLong, Date) ? howLong 
        : math.toNumber(howLong, 0);

    var expires = "";
    if(Utils.checkType(howLong, Number)) {
      if(howLong !== 0) {
        var date = new Date();
        date.setTime(date.getTime() + howLong);
        expires = "; expires=" + date.toUTCString();
      }
    }
    else {
      expires = "; expires=" + howLong.toUTCString();
    }

    path = Utils.checkThenSet(path, '/', String);

    document.cookie = key + "=" + value + expires + "; path=/";
    return Cookie.get(key);
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
  value: function get(key, defaultValue, createDefault, howLong, path) {

    if(Utils.checkType(key)) key = key.toString();
    else throw ReferenceError('Input key is undefined.');

    key = key + "=";

    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)===' ') c = c.substring(1,c.length);
      if (c.indexOf(key) === 0) 
        return c.substring(key.length,c.length).replace("=", "");
    }

    defaultValue = Utils.checkThenSet(defaultValue, null);
    createDefault = Utils.checkThenSet(createDefault, false, Boolean);

    if(createDefault && defaultValue !== null) {
      Cookie.set(key, defaultValue, howLong, path);
      return Cookie.get(key);
    }
    return null;
  }
});

Object.defineProperty(Cookie, 'remove', {
  enumerable: true,
  value: function remove(key) {
    return Cookie.set(key, "", -1);
  }
});

Object.defineProperty(Cookie, 'delete', {
  enumerable: true,
  get: function() {
    return Cookie.remove;
  }
});


module.exports = Cookie;

