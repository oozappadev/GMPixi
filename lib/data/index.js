
var data = {};

var Cookie = require('./Cookie');
Object.defineProperty(data, 'Cookie', {
    enumerable: true,
    get: function() {
        return Cookie;
    }
});

var Xml = require('./Xml');
Object.defineProperty(data, 'Xml', {
    enumerable: true,
    get: function() {
        return Xml;
    }
});

var Json = require('./Json');
Object.defineProperty(data, 'Json', {
    enumerable: true,
    get: function() {
        return Json;
    }
});


module.exports = data;