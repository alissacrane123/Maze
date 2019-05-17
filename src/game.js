class Game {
  constructor(obj, view) {
    this.obj = obj;
    this.view = view;
  }

  start() {
    const obj = this.obj;
    const view = this.view;
    view.bindKeyHandlers(obj);
    setInterval(view.updateView(obj), 20);
  }

}
  


module.exports = Game;


// GameView.MOVES = {
//   up: [0, -10],
//   left: [-10, 0],
//   down: [0, 10],
//   right: [10, 0]
// }






// class Game {
//   constructor(player) {
//     this.player = player;
//   }

//   updateView() {
//     this.view.clear();
//     this.obj.pos[0] += 1;
//     this.obj.update();
//   }

//   draw(ctx, canvas) {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     ctx.fillStyle = "blue";
//     ctx.fillRect(0, 0, canvas.width, canvas.height);

//     this.player.draw(ctx);
//   }

//   moveObjects(delta) {
//     this.player.move(delta);
//   }

//   step(delta) {
//     this.moveObjects(delta);
//   }
// }