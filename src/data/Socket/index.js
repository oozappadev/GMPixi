
var io = require('socket.io-client');
var undefined = require('./../../utils/core').undefined;

var connections = Object.create(null);
var conn_count = 0;
var active = null;

function Socket(socketName, path, options) {
  if(typeof socketName === 'undefined') {
    return active;
  }

  if(typeof socketName !== 'string') {
    throw TypeError("Socket's name must be a string.");
  }

  if(typeof connections[socketName] !== 'undefined') {
    return connections[socketName];
  }
  connections[socketName] = io(path, options);
  conn_count++;
  active = connections[socketName];
  return connections[socketName];
}

Object.defineProperty(Socket, 'count', {
  enumerable: true,
  get: function() {
    return conn_count;
  }
});

Object.defineProperty(Socket, 'get', {
  enumerable: true,
  value: function get(key) {
    if(typeof key === 'undefined') {
      return active;
    }
    return connections[key];
  }
});

Object.defineProperty(Socket, 'remove', {
  enumerable: true,
  value: function remove(key) {
    if(typeof connections[key] !== 'undefined') {
      connections[key].close();
      return delete connections[key];
    }
    return false;
  }
});

Object.defineProperty(Socket, 'all', {
  enumerable: true,
  get: function() {
    return connections;
  }
});

Object.defineProperty(Socket, 'removeAll', {
  enumerable: true,
  value: function removeAll() {
    for(var k in connections) {
      Socket.remove(k);
    }
  }
});

Object.defineProperty(Socket, 'active', {
  enumerable: true,
  get: function() {
    return active;
  },
  set: function(skt) {
    if(typeof skt === 'string' && typeof connections[skt] !== 'undefined') {
      active = connections[skt];
    }
    else {
      for(var k in connections) {
        if(connections[k] === skt) {
          active = skt;
          break;
        }
      }
    }
  }
});

Object.defineProperty(Socket, 'emit', {
  enumerable: true,
  get: function() {
    return active !== null ? active.emit.bind(active) : function() {}
  }
});

Object.defineProperty(Socket, 'on', {
  enumerable: true,
  get: function() {
    return active !== null ? active.on.bind(active) : function() {}
  }
});


module.exports = Socket;