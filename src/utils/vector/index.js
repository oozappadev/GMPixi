


var vector = Object.create(null);

Object.defineProperty(vector, 'Point', {
  enumerable: true,
  value: require('./Point')
});

Object.defineProperty(vector, 'point', {
  enumerable: true,
  value: function(x, y) {
    return new vector.Point(x, y);
  }
});



