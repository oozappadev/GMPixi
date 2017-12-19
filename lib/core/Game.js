


function Game(o) {
  if(typeof o !== 'object') {
    throw TypeError("Game setting must be a key-value pairs.");
  }
  
  Object.defineProperty(this, 'room', {
    enumerable: true,
    value: Object.create(null)
  });
  
  if(typeof o.room === 'object') {
    
  }
  
}


