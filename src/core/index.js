
var core = Object.create(null);

Object.defineProperty(core, 'Game', {
  enumerable: true,
  value: require('./Game')
});


Object.defineProperty(core, 'GameObject', {
  enumerable: true,
  value: require('./GameObject')
});

module.exports = core;
