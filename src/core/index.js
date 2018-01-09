
var core = Object.create(null);

Object.defineProperty(core, 'Game', {
  enumerable: true,
  value: require('./Game')
});


Object.defineProperty(core, 'GameObject', {
  enumerable: true,
  value: require('./GameObject')
});

Object.defineProperty(core, 'Container', {
  enumerable: true,
  value: require('./Container')
});

Object.defineProperty(core, 'Room', {
  enumerable: true,
  value: require('./Room')
});

module.exports = core;
