
var array = Object.create(null);



Object.defineProperty(array, 'randomize', {
  enumerable: true,
  value: function randomize(obj) {
    function shuffleArray(array) {
      for (var i = array.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var temp = array[i];
          array[i] = array[j];
          array[j] = temp;
      }
    }

    if(typeof obj === 'string') {
      var str = obj.split();
      shuffleArray(str);
      return str.join();
    }
    else if(Array.isArray(obj)) {
      shuffleArray(obj);
      return obj;
    }
    
    throw TypeError("Array randomize's input must be an array or string.");
  }
});

Object.defineProperty(array, 'shuffle', {
  enumerable: true,
  get: function() {
    return array.randomize;
  }
});

module.exports = array;







module.exports = array;