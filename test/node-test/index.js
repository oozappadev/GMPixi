
var app = require('express')();
var http = require('http').Server(app);


require('./ws')(app, http);

http.listen(12205, () => {
  console.log("Listen to port 12205.");
});