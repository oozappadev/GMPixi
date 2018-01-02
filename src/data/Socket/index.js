
var io = require('socket.io-client');

function Socket(host, options) {
  Object.defineProperty(this, 'io', {
    enumerable: true,
    value: io(host, options)
  });
}

Object.defineProperty(Socket, 'prototype', {
  enumerable: true,
  value: Object.defineProperties(Object.create(null), {
    on: {
      enumerable: true,
      get: function() {
        return this.io.on;
      }
    },
    emit: {
      enumerable: true,
      get: function() {
        return this.io.emit;
      }
    }
  })
});

