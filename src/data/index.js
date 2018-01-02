
var data = Object.create(null);

Object.defineProperty(data, 'Cookie', {
  enumerable: true,
  value: require('./Cookie')
});

Object.defineProperty(data, 'Json', {
  enumerable: true,
  value: require('./Json')
})

Object.defineProperty(data, 'Socket', {
  enumerable: true,
  value: require('./Socket');
});

module.exports = data;

