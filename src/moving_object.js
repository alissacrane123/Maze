

class MovingObject {
  constructor(object) {
    this.pos = object.pos;
    this.vel = object.vel;
    this.height = object.height;
    this.width = object.width;
    this.color = object.color;


    // this.ctx.fillStyle = this.color;
    // this.ctx.fillRect = (this.pos[0], this.pos[1], this.width, this.height)
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    // ctx.beginPath();
    ctx.fillRect(this.pos[0], this.pos[1], this.width, this.height)
    // ctx.fill();
  }

  move(delta) {
    this.pos = [this.pos[0] + delta[0], this.pos[1] + delta[1]]
  }

}

module.exports = MovingObject;