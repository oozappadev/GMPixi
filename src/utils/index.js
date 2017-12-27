

var utils = Object.create(null);

Object.defineProperty(utils, 'format', {
  enumerable: true,
  value: require("./format")
});

module.exports = utils;