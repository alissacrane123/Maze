class Coin {
  constructor(ctx, canvas, n, color) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.n = n
    this.width = 15;
    this.height = 15;
    this.color = color;

    this.pos;

    if (color === 'green') {
      this.pos = [670, 670];
    } else {
      this.selectPos(ctx, canvas);
    }

    let pos = this.pos;
    if (pos[0] === 10 && pos[1] === 10) {
      this.selectPos(ctx, canvas);
    }
  }

  selectPos(ctx, canvas) {
    let inc = canvas.width / this.n;
    let numX = Math.floor(Math.random() * (this.n  - 1));
    let x = 10 + (inc * numX);
    let numY = Math.floor(Math.random() * (this.n - 1));
    let y = 10 + (inc * numY);
    this.pos = [x, y];
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.rect(this.pos[0], this.pos[1], this.width, this.height);
    // square.classList.add("hero");
    // let img = document.getElementById("image");
    // ctx.drawImage(img, this.pos[0], this.pos[1], 30, 30);
    ctx.fill();
  }
}

module.exports = Coin;