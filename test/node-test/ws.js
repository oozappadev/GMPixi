
const sktio = require('socket.io');
const path = require('path');
let io;

module.exports = (app, http) => {
  io = sktio(http);

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "./../index.html"));
  });
  
  app.get('/gmpixi.js', (req, res) => {
    res.sendFile(path.join(__dirname, "./gmpixi.js"));
  });

  io.on('connection', socket => {
    socket.on('something', dt => {
      console.log(dt);
    });
  });

  


};
