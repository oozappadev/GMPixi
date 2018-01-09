
var Format = Object.create(null);

Object.defineProperty(Format, 'query', {
  enumerable: true,
  value: require('./Query')
});

module.exports = Format;
