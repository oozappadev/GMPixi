

var GMPixi = Object.create(null);

Object.defineProperty(GMPixi, 'utils', {
  enumerable: true,
  value: require('./utils')
});

Object.defineProperty(GMPixi, 'data', {
  enumerable: true,
  value: require('./data')
});


global.GMPixi = GMPixi;


