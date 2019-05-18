

class MovingObject {
  constructor(object) {
    this.pos = object.pos;
    this.vel = object.vel;
    this.height = object.height;
    this.width = object.width;
    this.color = object.color;
    this.move = this.move.bind(this);

  }

  // U+1F47B

  draw(ctx) {

    // let code = "U+1F47B";




    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.rect(this.pos[0], this.pos[1], this.width, this.height);
    ctx.fillStyle = "red";
    ctx.fill();
  }

  move(delta, k, height, width) {

      // debugger 
    this.pos = [this.pos[0] + delta[0], this.pos[1] + delta[1]]

  }


}

module.exports = MovingObject;