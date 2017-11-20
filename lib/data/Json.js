
/* global Function */

var Utils = require('./../core/Utils');
var math = require('./../core/Math');

var Json = {};


var _timeout = 20000;
Object.defineProperty(Json, 'timeout', {
    enumerable: true,
    get: function() {
        return _timeout;
    },
    set: function(val) {
        val = math.clamp(math.toNumber(val, 0), 0, 3600000);
        _timeout = val === 0 ? 20000 : val;
    }
});

Object.defineProperty(Json, 'fromFileAsync', {
    enumerable: true,
    value: function(path, onsuccess, onerror) {
        if(!Utils.checkType(path, String)) {
            throw Error('Input file path must be a string.');
        }

        if (window.XMLHttpRequest) {
            var xmlhttp = new XMLHttpRequest();
        } 
        else {    
            var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xmlhttp.overrideMimeType("application/json");

        xmlhttp.onreadystatechange = function() {
            if(xmlhttp.readyState === 4) {
                Utils.checkThenSet(
                        xmlhttp.status === 200 ? onsuccess : onerror, 
                        function() {}, Function
                )(JSON.parse(xmlhttp.responseText));
            }
        };

        xmlhttp.timeout = Json.timeout;
        xmlhttp.ontimeout = function() {
            Utils.checkThenSet(onerror, function() {}, Function)();
        };

        xmlhttp.open("GET", path, true);
        xmlhttp.send();
    }
});


Object.defineProperty(Json, 'fromFile', {
    enumerable: true,
    value: function fromFile(path) {
            
        if(!Utils.checkType(path, String)) {
            throw Error('Input file path must be a string.');
        }

        if (window.XMLHttpRequest) {
            var xmlhttp = new XMLHttpRequest();
        } 
        else {    
            var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xmlhttp.overrideMimeType("application/json");

        xmlhttp.open("GET", path, false);

        try {
            xmlhttp.send();
        }
        catch(error) {
            return null;
        }

        if(xmlhttp.status === 200) {
            return JSON.parse(xmlhttp.responseText);
        }
        else {
            return null;
        }
    }
});


