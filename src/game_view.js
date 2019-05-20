// const Maze = require("./maze");

class GameView {
  constructor(canvas, ctx, obj, mazeImage, coins, score) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.obj = obj;
    this.mazeImage = mazeImage;  
    this.coins = coins;  
    this.score = score;
  }

  start() {
    this.bindKeyHandlers();
    setInterval(this.updateView.bind(this), 20);
  }

  bindKeyHandlers() {
    let ctx = this.ctx;
    let obj = this.obj;
    let height = this.canvas.height;
    let width = this.canvas.width;
    this.validMove = this.validMove.bind(this);

    Object.keys(GameView.MOVES).forEach((k) => {
      const delta = GameView.MOVES[k];
      key(k, () => { 
        this.validMove(delta, k, height, width, obj)
      })
    })
  }

  clear() {
    let ctx = this.ctx;
    let canvas = this.canvas;   
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    this.drawBackground();
    this.coins.forEach(coin => coin.draw(ctx));
  }

  updateView() {
    this.clear();
    let ctx = this.ctx;
    this.obj.draw(ctx);
    this.coins.forEach(coin => coin.draw(ctx));
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

    for (let i = 0; i < pix.length; i += 4) {
      if (pix[i] !== 0) {
        this.removeCoin(newX, newY, w, h);
        break 
      } else if (pix[i+1] !== 0) {
        this.score.win();
      }
    }
    
    let collision = false

    for (let i = 3; i < pix.length; i += 4) {
      if(pix[i] !== 0 && pix[i-3] === 0  && pix[i-2] === 0) {
        collision = true;
        break;
      }
    }

    if (!collision) {
      obj.move(delta);
    }
  }

  removeCoin(newX, newY, w, h) {
    let newCoins = [];

    this.coins.forEach(coin => {
      if (coin.pos[0] >= newX && coin.pos[0] <= newX + w &&
          coin.pos[1] >= newY && coin.pos[1] <= newY + h) {
            this.score.addPoint();
          } else {
            newCoins.push(coin);
          }
    })

    this.coins = newCoins;
  }
}


module.exports = GameView;


GameView.MOVES = {
  up: [0, -10],
  left: [-10, 0],
  down: [0, 10],
  right: [10, 0]
}

