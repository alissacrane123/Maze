// const Maze = require("./maze");

class GameView {
  constructor(canvas, ctx, obj, mazeImage) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.obj = obj;
    this.mazeImage = mazeImage;

  }

  start() {
    this.bindKeyHandlers();
    setInterval(this.updateView.bind(this), 20);
  }

  bindKeyHandlers() {
    const obj = this.obj;

    Object.keys(GameView.MOVES).forEach((k) => {
      const delta = GameView.MOVES[k];
      key(k, () => { obj.move(delta) })
    })
  }

  clear() {
    const ctx = this.ctx;
    const canvas = this.canvas;
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);
    this.drawBackground();

  }

  updateView() {
    this.clear();

    const ctx = this.ctx;
    this.obj.draw(ctx);
  }

  drawBackground() {

    this.ctx.drawImage(this.mazeImage, 0, 0);
  }

}


module.exports = GameView;


GameView.MOVES = {
  up: [0, -10],
  left: [-10, 0],
  down: [0, 10],
  right: [10, 0]
}




// class GameView {
//   constructor(canvas, ctx) {
//     this.canvas = canvas;
//     this.ctx = ctx;
//   }

//   bindKeyHandlers(obj) {

//     Object.keys(GameView.MOVES).forEach((k) => {
//       const delta = GameView.MOVES[k];
//       key(k, () => { obj.move(delta) })
//     })
//   }

//   clear() {
//     const ctx = this.ctx;
//     const canvas = this.canvas;
//     const width = canvas.width;
//     const height = canvas.height;

//     ctx.clearRect(0, 0, width, height);
//   }

//   updateView(obj) {
//     // const view = this.view;
//     // view.clear();
//     this.clear();

//     // const obj = this.obj;
//     const ctx = this.ctx;
//     obj.draw(ctx);
//   }
// }
