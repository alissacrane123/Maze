

class MovingObject {
  constructor(object) {
    this.pos = object.pos;
    this.height = object.height;
    this.width = object.width;
    this.color = object.color;
    this.type = object.type;

    this.move = this.move.bind(this);
  }
  // U+1F47B

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.rect(this.pos[0], this.pos[1], this.width, this.height);
    // square.classList.add("hero");
    // let img = document.getElementById("image");
    // ctx.drawImage(img, this.pos[0], this.pos[1], 30, 30);
    ctx.fill();
    
  }

  move(delta, k, height, width) {
    // let square = ctx.rect(this.pos[0], this.pos[1], this.width, this.height);
    // square.classList.remove("hero");
    this.pos = [this.pos[0] + delta[0], this.pos[1] + delta[1]]
  }
}

module.exports = MovingObject;