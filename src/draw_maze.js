// [ TOP, RIGHT, BOTTOM, LEFT ]

let maze = new Maze(n);

function draw(n, w, h) {
  let canvas = document.getElementById('maze');
  let ctx = canvas.getContext('2d');

  let inc = w / n;

  for (let i = 0; i < n; i++) {
    let row = maze[i];

    for (let j = 0; j < n; j++) {
      let cell = row[j];

      let y = i * inc;
      let x = j * inc;

      if (cell[0] === 0) {
        ctx.moveTo(x, y);
        ctx.lineTo(x + inc, y);
      }

      if (cell[1] === 0) {
        ctx.moveTo(x + inc, y);
        ctx.lineTo(x + inc, y + inc);
      }

      if (cell[2] === 0) {
        ctx.moveTo(x, y + inc);
        ctx.lineTo(x + inc, y + inc);
      }

      if (cell[3] === 0) {
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + inc);
      }
      
    }
  }
}