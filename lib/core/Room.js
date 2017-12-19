
require("pixi.js/dist/pixi.min.js");

var object = require("./Object");
var container = require("./Container");

module.exports = function() {
  return object.create(container);
};

