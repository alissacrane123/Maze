const Game = require("./game");

class Interface {
  constructor(ctx, canvas) {
    this.ctx = ctx;
    this.canvas = canvas;
    const levelButton = document.querySelector('.level-button'); 

    this.n = 10;
  }

  registerListeners(levelButton) {
    levelButton.addEventListener('click', this.nextLevel.bind(this));
  }

  nextLevel() {
    this.n += 5;
    const width = this.canvas.width;
    const height = this.canvas.height;

    this.ctx.clearRect(0, 0, width, height);

    // debugger
    const game = new Game(this.canvas, this.ctx, this.n);
    // debugger
    game.newStart();
  }
}

module.exports = Interface;