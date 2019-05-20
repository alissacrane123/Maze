const Maze = require("./maze");
const MovingObject = require("./moving_object");
const GameView = require("./game_view");
const Coin = require("./coins");
const Score = require("./score");

class Game {
  constructor(canvas, ctx, n, w) {
    this.obj;
    this.maze;
    this.view;
    this.ctx = ctx;
    this.canvas = canvas;
    this.n = n;
    this.w = w;
    
    this.img = document.createElement("img");
  }

  newStart() {
    let canvas = this.canvas;
    this.obj = new MovingObject({ pos: [10, 10], width: this.w, height: this.w, color: "red" });   
    this.maze = new Maze(this.n);
    this.maze.drawMaze(this.ctx, this.n, canvas.width, canvas.height);
    let obj = this.obj;

    let coins = [];
    for (let i = 0; i < 10; i++) {
      coins.push(new Coin(this.ctx, canvas, this.n, "yellow"))
    }
    coins.push(new Coin(this.ctx, canvas, this.n, "green"))

    let score = new Score();

    let mazeImage = this.toImage();
    this.view = new GameView(canvas, this.ctx, obj, mazeImage, coins, score);
    let view = this.view;
    view.start();
  }

  toImage() {
    let canvas = this.canvas;
    let data = canvas.toDataURL();
    this.img.src = data;
    return this.img;
  }

}
  

module.exports = Game;


// nextLevel() {
//   this.n += 5;
//   this.img.src = '#';

//   debugger
//   const ctx = this.ctx;
//   const canvas = this.canvas;
//   const n = this.n;
//   const width = canvas.width;
//   const height = canvas.height;

//   ctx.clearRect(0, 0, width, height);
//   debugger
//   // this.obj = new MovingObject({ pos: [10, 10], vel: [5, 5], width: 20, height: 20, color: "#f00" });

//   this.maze = new Maze(n);
//   debugger
//   this.maze.drawMaze(ctx, n, width, height);
//   debugger
//   const obj = this.obj;
//   const mazeImage = this.toImage();
//   // this.view = new GameView(canvas, ctx, obj, mazeImage);
//   this.view.obj = obj;
//   this.view.mazeImage = mazeImage;

//   const view = this.view;
//   debugger
//   view.start();
// }