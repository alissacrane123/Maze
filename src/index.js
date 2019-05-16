const Maze = require("./maze");
const drawMaze = require("./draw_maze");

// window.Maze = Maze;
// window.drawMaze = drawMaze;



document.addEventListener("DOMContentLoaded", () => {
  let n = 20;
  let w = 500;
  let h = 500;
  const canvasEl = document.getElementById("maze");

  const ctx = canvasEl.getContext('2d');
  const maze = new Maze(n);
  console.log(maze)
  drawMaze(maze, ctx, n, w, h);
})