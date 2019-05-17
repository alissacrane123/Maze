class GameView {
  constructor(canvas, ctx, obj) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.obj = obj;
  }

  start() {
    this.bindKeyHandlers();
    setInterval(this.updateView.bind(this), 20);
  }

  bindKeyHandlers() {
    const obj = this.obj;

    Object.keys(GameView.MOVES).forEach((k) => {
      const delta = GameView.MOVES[k];
      key(k, () => { obj.move(delta) })
    })
  }

  clear() {
    const ctx = this.ctx;
    const canvas = this.canvas;
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);
  }

  updateView() {
    this.clear();
    // this.obj.pos[0] += 1;
    
    const ctx = this.ctx;
    this.obj.draw(ctx);
  }
}

module.exports = GameView;


GameView.MOVES = {
  up: [0, -1],
  left: [-1, 0],
  down: [0, 1],
  right: [1, 0]
}


// var myGameArea = {
//   canvas: document.createElement("canvas"),
//   start: function () {
//     this.canvas.width = 480;
//     this.canvas.height = 270;
//     this.context = this.canvas.getContext("2d");
//     document.body.insertBefore(this.canvas, document.body.childNodes[0]);
//     this.interval = setInterval(updateGameArea, 20);
//   },
//   clear: function () {
//     this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
//   }
// }


// class GameView {
//   constructor(gamePiece) {
//     this.canvas = document.getElementById("maze");
//     this.ctx = this.canvas.getContext('2d');
//     this.interval;
//     this.gamePiece = gamePiece;

//     // this.clear = this.clear.bind(this);
//   }

//   start() {
//     let obj = this.gamePiece;
//     let updateView = this.updateView;
//     setInterval(updateView(obj), 20);
//   }

//   clear() {
//     let width = this.canvas.width;
//     let height = this.canvas.height;
//     this.ctx.clearRect(0, 0, width, height);
//   }

//   updateView(obj) {
//     let canvas = document.getElementById("maze");
//     let width = canvas.width;
//     let height = canvas.height;
//     let ctx = canvas.getContext('2d');
//     ctx.clearRect(0, 0, width, height);

//     obj.pos[0] += 1;
//     console.log(obj.pos);
//     obj.update(ctx);
//   }
// }




// class GameView {
//   constructor(game, ctx) {
//     this.ctx = ctx;
//     this.game = game;
//     this.player = this.game.player;
//   }

//   bindKeyHandlers() {
//     const player = this.player;

//     Object.keys(GameView.MOVES).forEach((k) => {
//       const delta = GameView.MOVES[k];
//       key(k, () => { player.move(delta) })
//     })
//   }

//   start(delta) {
//     this.bindKeyHandlers();
//     const game = this.game;
//     const ctx = this.ctx;
//     setInterval(() => {
//       game.moveObjects(delta);
//       game.draw(ctx);
//     }, 20);
//     // requestAnimationFrame(this.animate.bind(this))
//   }

//   animate() {
//     this.game.step(delta)
//     this.game.draw(this.ctx);
//     requestAnimationFrame(this.animate.bind(this));
//   }
// }