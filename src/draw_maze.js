// const Maze = require("./maze");

// [ TOP, RIGHT, BOTTOM, LEFT ]

const drawMaze = (maze, ctx, n, w, h) => {
  console.log("????")
  console.log(n)
  // let mazev/ = new Maze(n);
  // let canvas = document.getElementById('maze');
  // let ctx = canvas.getContext('2d');
  let cells = maze.cells;
  ctx.canvas.width = w;
  ctx.canvas.height = h;

  let inc = w / n; // width of canvas div. by num of cells per row

  for (let i = 0; i < n; i++) {
    let row = cells[i];
    console.log(cells)
    console.log(row)
    for (let j = 0; j < n; j++) {
      let cell = row[j];

      let y = i * inc;
      let x = j * inc;

      if (cell[0] === 0) {
        ctx.moveTo(x, y);
        ctx.lineTo(x + inc, y);
        ctx.stroke();
      }

      if (cell[1] === 0) {
        ctx.moveTo(x + inc, y);
        ctx.lineTo(x + inc, y + inc);
        ctx.stroke();
      }

      if (cell[2] === 0) {
        ctx.moveTo(x, y + inc);
        ctx.lineTo(x + inc, y + inc);
        ctx.stroke();
      }

      if (cell[3] === 0) {
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + inc);
        ctx.stroke();
      }
      
    }
  }
}

// drawMaze(10, 500, 500);


module.exports = drawMaze;