

var query = require("./../../utils/format/Query").stringify;

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
