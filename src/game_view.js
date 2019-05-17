// const Maze = require("./maze");

class GameView {
  constructor(canvas, ctx, obj, mazeImage) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.obj = obj;
    this.mazeImage = mazeImage;

    
  }

  start() {
    this.bindKeyHandlers();
    setInterval(this.updateView.bind(this), 20);
  }

  bindKeyHandlers() {
    const ctx = this.ctx;
    const obj = this.obj;
    const height = this.canvas.height;
    const width = this.canvas.width;
    this.validMove = this.validMove.bind(this);

    Object.keys(GameView.MOVES).forEach((k) => {
      const delta = GameView.MOVES[k];
      key(k, () => { 
        // debugger
        this.validMove(delta, k, height, width, obj)
        // obj.move(delta, k, height, width);        
      })
    })
  }

  clear() {
    const ctx = this.ctx;
    const canvas = this.canvas;
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.clearRect(0, 0, width, height);
   
    this.drawBackground();
    // debugger;
  }

  updateView() {
    this.clear();
    const ctx = this.ctx;
    this.obj.draw(ctx);
  }

  drawBackground() {
     this.ctx.drawImage(this.mazeImage, 0, 0);
   
  }

  validMove(delta, k, height, width, obj) { 
    let x = obj.pos[0];
    let y = obj.pos[1];
    let dx = delta[0];
    let dy = delta[1];
    let h = obj.height;
    let w = obj.width;

    if (k === 'down' && (y + dy + h < height)) {
      this.clear();
      this.checkCollision(obj, delta)
    }
    if (k === 'up' && (y + dy > 0)) {
      this.clear();
      this.checkCollision(obj, delta)
    }
    if (k === 'left' && x + dx > 0) {
      this.clear();
      this.checkCollision(obj, delta)
    } 
    if (k === 'right' && x + dx + w < width) {
      this.clear();
      this.checkCollision(obj, delta)
    }
  }
  
  checkCollision( obj, delta) {
    let ctx = this.ctx;
    let newX = obj.pos[0] + delta[0];
    let newY = obj.pos[1] + delta[1];
    let h = obj.height;
    let w = obj.width;

    let imgData = ctx.getImageData(newX, newY, w, h);
    let pix = imgData.data;

    let collision = false

    for (let i = 3; i < pix.length; i += 4) {
      if(pix[i] !== 0) {
        collision = true;
        break;
      }
    }
    if (!collision) {
      obj.move(delta);
    }
  }
}


module.exports = GameView;


GameView.MOVES = {
  up: [0, -10],
  left: [-10, 0],
  down: [0, 10],
  right: [10, 0]
}




// class GameView {
//   constructor(canvas, ctx) {
//     this.canvas = canvas;
//     this.ctx = ctx;
//   }

//   bindKeyHandlers(obj) {

//     Object.keys(GameView.MOVES).forEach((k) => {
//       const delta = GameView.MOVES[k];
//       key(k, () => { obj.move(delta) })
//     })
//   }

//   clear() {
//     const ctx = this.ctx;
//     const canvas = this.canvas;
//     const width = canvas.width;
//     const height = canvas.height;

//     ctx.clearRect(0, 0, width, height);
//   }

//   updateView(obj) {
//     // const view = this.view;
//     // view.clear();
//     this.clear();

//     // const obj = this.obj;
//     const ctx = this.ctx;
//     obj.draw(ctx);
//   }
// }
