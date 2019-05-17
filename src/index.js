const Maze = require("./maze");
const drawMaze = require("./draw_maze");
const MovingObject = require("./moving_object");
const GameView = require("./game_view");
const Game = require("./game");

document.addEventListener("DOMContentLoaded", () => {
  let n = 15;
  let w = 750;
  let h = 750;
  const canvas = document.getElementById("maze");
  const ctx = canvas.getContext('2d');
  const maze = new Maze(n);
  drawMaze(maze, ctx, n, w, h);

  obj = new MovingObject({ pos: [50, 50], vel: [10, 10], width: 40, height: 40, color: "#f00" });
  view = new GameView(canvas, ctx, obj);
  game = new Game(view, obj);
  // view.start();
})