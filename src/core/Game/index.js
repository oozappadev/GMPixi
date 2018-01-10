
require('pixi.js');

var Room = require('./../Room');

function Game() {
  var renderer = new PIXI.CanvasRenderer(800, 600);
  document.body.appendChild(renderer.view);

  var room = new Room({
    setup: function() {
      this.text = this.add(new PIXI.Text("H", {fill: 0x808080}));
    },
    update: function() {
      this.text.text = Date.now();
    }
  });

  var update = function() {
    room.update();
    renderer.render(room);
    requestAnimationFrame(update);
  };

  update();

}


module.exports = Game;
