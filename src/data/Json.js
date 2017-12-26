
function Json() {

}

Object.defineProperties(o, 'get', {
  enumerable: true,
  value: function get(path, params, success, fail, timeout) {
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
      xmlhttp.open("GET", )
    }

  }
});
