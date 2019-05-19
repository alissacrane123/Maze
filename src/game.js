const Maze = require("./maze");
const MovingObject = require("./moving_object");
const GameView = require("./game_view");

class Game {
  constructor(n, canvas, ctx) {
    this.obj;
    // this.obj = new MovingObject({ pos: [10, 10], vel: [5, 5], width: 20, height: 20, color: "#f00" });

    const obj = this.obj;
    
    const width = canvas.width;
    const height = canvas.height;
    
    this.maze;
    // this.maze = new Maze(n);
    // this.maze.drawMaze(ctx, n, width, height);

    this.ctx = ctx;
    this.canvas = canvas;
    this.n = n;
    
    // const mazeImage = this.toImage();
    this.view;
    // this.view = new GameView(canvas, ctx, obj, mazeImage);
    // this.newStart(ctx, n, width, height)
  }

  newStart() {
    const ctx = this.ctx;
    const canvas = this.canvas;
    const n = this.n;
    const width = canvas.width;
    const height = canvas.height;

    this.obj = new MovingObject({ pos: [10, 10], vel: [5, 5], width: 20, height: 20, color: "#f00" });
    this.maze = new Maze(n);
    this.maze.drawMaze(ctx, n, width, height);

    const obj = this.obj;
    const mazeImage = this.toImage();
    this.view = new GameView(canvas, ctx, obj, mazeImage);

    const view = this.view;
    view.start();
  }

  // start() {
  //   const obj = this.obj;
  //   const view = this.view;
  //   view.start();
  // }

  toImage() {
    const canvas = this.canvas;
    // debugger
    const data = canvas.toDataURL();
    const img = document.createElement("img");
    img.src = data;
    
    return img;
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