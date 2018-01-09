

function Dimension(side) {
  if(!side && typeof side !== 'object') {
    throw TypeError("Dimension's side must be an object");
  }

  var sides = {};
  var total = 0;
  for(var key in side) {
    if(key === 'total') {
      continue;
    }
    (function(k, v){
      sides[k] = v;
      Object.definePropertys(this, k, {
        enumerable: true,
        get: function() {
          return sides;
        },
        set: function(inp) {
          if(!Math.isNaN(inp = Number(inp))) {
            sides[k] = inp;
          }
        }
      });
    }).call(this, key, side[k]);
    total++;
  }

  Object.defineProperty(this, 'total', {
    get: function() {
      return total;
    }
  });

}
