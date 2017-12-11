
/* global Function */

var Utils = require('./../core/Utils');
var math = require('./../core/Math');

var Xml = {};

var _timeout = 20000;
Object.defineProperty(Xml, 'timeout', {
  enumerable: true,
  get: function() {
    return _timeout;
  },
  set: function(val) {
    val = math.clamp(math.toNumber(val, 0), 0, 3600000);
    _timeout = val === 0 ? 20000 : val;
  }
});


Object.defineProperty(Xml, 'fromFile', {
  enumerable: true,
  value: function(path) {
    if(!Utils.checkType(path, String)) {
      throw Error('Path must be a string.');
    }

    if (window.XMLHttpRequest) {
      var xmlhttp = new XMLHttpRequest();
    } else {    
      var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.open("GET", path, false);
    try {
      xmlhttp.send();
    }
    catch(error) {
      return null;
    }

    if(xmlhttp.readyState === 4 && xmlhttp.status === 200) return xmlhttp;
    return null;
  }
});


Object.defineProperty(Xml, 'fromFileAsync', {
  enumerable: true,
  value: function(path, onsuccess, onerror) {

    if(!Utils.checkType(path, String)) {
      throw Error('Path must be a string.');
    }

    if (window.XMLHttpRequest) {
      var xmlhttp = new XMLHttpRequest();
    } else {    
      var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function() {
      if(xmlhttp.readyState === 4) {
        Utils.checkThenSet(
            xmlhttp.status === 200 ? onsuccess : onerror, 
            function() {}, 
            Function
        )(xmlhttp);
      }
    };

    xmlhttp.timeout = Xml.timeout;
    xmlhttp.ontimeout = function() {
      Utils.checkThenSet(onerror, function() {}, Function);
    };

    xmlhttp.open("GET", path, true);
    try {
      xmlhttp.send();
    }
    catch(error) {
      Utils.checkThenSet(onerror, function() {}, Function)();
    }
  }
}); 


Object.defineProperty(Xml, 'toJson', {
  enumerable: true,
  value: function(xml) {
    var obj = {};

    if(xml.nodeType === 1) { 
      if(xml.attributes.length > 0) {
        for(var j=0; j<xml.attributes.length; ++j) {
          var attrib = xml.attributes.item(j);
          obj[attrib.nodeName] = attrib.nodeValue;
        }
      }
    }
    else if (xml.nodeType === 3) {
      obj = xml.nodeValue;
    }

    if(xml.hasChildNodes()) {
      for(var i=0; i<xml.childNodes.length; ++i) {
        var item = xml.childNodes[i];
        var nodeName = item.nodeName;
        if(typeof obj[nodeName] === 'undefined') {
          obj[nodeName] = Xml.toJson(item);
      }
        else {
          if(typeof obj[nodeName].push === "undefined") {
            var old = obj[nodeName];
            obj[nodeName] = [];
            obj[nodeName].push(old);
          }
          obj[nodeName].push(Xml.toJson(item));
        }
      }
    }

    return obj;
  }
});


Object.defineProperty(Xml, 'fromFileToJson', {
  enumerable: true,
  value: function(path, async, onsuccess, onerror) {
      var loadFile = function(xmlRequest) {
        var doc = xmlRequest.responseText;

        //removes all white space between tags
        var pattern = />[\r\n\t ]+</;
        while(pattern.test(doc)) {
          doc = doc.replace(pattern, "><");
        }
        while(doc.indexOf('\\n') > -1) {
          doc = doc.replace('\\n', '\n');
        }

        //converts back to xml after cleaning
        var parser;
        var xmlDoc;

        if (window.DOMParser) {
          parser = new DOMParser();
          xmlDoc = parser.parseFromString(doc, "text/xml");
        } else { 
          xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
          xmlDoc.async = false;
          xmlDoc.loadXML(doc); 
        } 

        var obj = Xml.toJson(xmlDoc);

        if(!async) {
          return obj;
        }
        Utils.checkThenSet(onsuccess, function() {}, Function)(obj);
    };

    if(!async) {
      return loadFile(Xml.fromFile(path));
    }
    Xml.loadAsync(path, loadFile, onerror);
  }
});

module.exports = Xml;
