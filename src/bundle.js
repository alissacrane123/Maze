/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/coins.js":
/*!**********************!*\
  !*** ./src/coins.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

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

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Maze = __webpack_require__(/*! ./maze */ "./src/maze.js");
const MovingObject = __webpack_require__(/*! ./moving_object */ "./src/moving_object.js");
const GameView = __webpack_require__(/*! ./game_view */ "./src/game_view.js");
const Coin = __webpack_require__(/*! ./coins */ "./src/coins.js");
const Score = __webpack_require__(/*! ./score */ "./src/score.js");

class Game {
  constructor(canvas, ctx, n) {
    this.obj;
    this.maze;
    this.view;
    this.ctx = ctx;
    this.canvas = canvas;
    this.n = n;
    
    this.img = document.createElement("img");
  }

  newStart() {
    let canvas = this.canvas;
    this.obj = new MovingObject({ pos: [10, 10], width: 20, height: 20, color: "red" });   
    this.maze = new Maze(this.n);
    this.maze.drawMaze(this.ctx, this.n, canvas.width, canvas.height);
    let obj = this.obj;

    let coins = [];
    for (let i = 0; i < 10; i++) {
      coins.push(new Coin(this.ctx, canvas, this.n, "yellow"))
    }
    coins.push(new Coin(this.ctx, canvas, this.n, "green"))
    
    let score = new Score();

    let mazeImage = this.toImage();
    this.view = new GameView(canvas, this.ctx, obj, mazeImage, coins, score);
    let view = this.view;
    view.start();
  }

  toImage() {
    let canvas = this.canvas;
    let data = canvas.toDataURL();
    this.img.src = data;
    return this.img;
  }

}
  

module.exports = Game;


// nextLevel() {
//   this.n += 5;
//   this.img.src = '#';

//   debugger
//   const ctx = this.ctx;
//   const canvas = this.canvas;
//   const n = this.n;
//   const width = canvas.width;
//   const height = canvas.height;

//   ctx.clearRect(0, 0, width, height);
//   debugger
//   // this.obj = new MovingObject({ pos: [10, 10], vel: [5, 5], width: 20, height: 20, color: "#f00" });

//   this.maze = new Maze(n);
//   debugger
//   this.maze.drawMaze(ctx, n, width, height);
//   debugger
//   const obj = this.obj;
//   const mazeImage = this.toImage();
//   // this.view = new GameView(canvas, ctx, obj, mazeImage);
//   this.view.obj = obj;
//   this.view.mazeImage = mazeImage;

//   const view = this.view;
//   debugger
//   view.start();
// }

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

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



/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Maze = __webpack_require__(/*! ./maze */ "./src/maze.js");
// const drawMaze = require("./draw_maze");
const MovingObject = __webpack_require__(/*! ./moving_object */ "./src/moving_object.js");
const GameView = __webpack_require__(/*! ./game_view */ "./src/game_view.js");
const Game = __webpack_require__(/*! ./game */ "./src/game.js");
const Modal = __webpack_require__(/*! ./modal */ "./src/modal.js");
const Interface = __webpack_require__(/*! ./interface */ "./src/interface.js");
const Coin = __webpack_require__(/*! ./coins */ "./src/coins.js");
const Score = __webpack_require__(/*! ./score */ "./src/score.js");

document.addEventListener("DOMContentLoaded", () => {

  const overlay = document.querySelector('.modal-overlay');
  const modal = new Modal(overlay);
  window.openModal = modal.open.bind(modal);
  window.openModal();

  const canvas = document.getElementById("maze");
  const ctx = canvas.getContext('2d');

  // const interface = new Interface(ctx, canvas);

  game = new Game(canvas, ctx, 15);
  game.newStart();

  // window.nextLevel = interface.nextLevel.bind(interface);

})

/***/ }),

/***/ "./src/interface.js":
/*!**************************!*\
  !*** ./src/interface.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(/*! ./game */ "./src/game.js");

class Interface {
  constructor(ctx, canvas) {
    this.ctx = ctx;
    this.canvas = canvas;
    const levelButton = document.querySelector('.level-button'); 

    this.n = 10;
  }

  registerListeners(levelButton) {
    levelButton.addEventListener('click', this.nextLevel.bind(this));
  }

  nextLevel() {
    this.n += 5;
    const width = this.canvas.width;
    const height = this.canvas.height;

    this.ctx.clearRect(0, 0, width, height);

    // debugger
    const game = new Game(this.canvas, this.ctx, this.n);
    // debugger
    game.newStart();
  }
}

module.exports = Interface;

/***/ }),

/***/ "./src/maze.js":
/*!*********************!*\
  !*** ./src/maze.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {



class Maze {
  constructor(n) {   
    this.totalCellCount = n * n;
    this.cells = [];
    this.unvisited = [];
    this.n = n;

    this.newMaze(n);

    this.path = []; // path of visited cell coordinates
    this.countVisited = 0;
    this.currCell;
    this.selectStart(n);
    this.next;
    this.run(n);
  }

  newMaze(n) {  
    for (let i = 0; i < n; i++) {
      this.cells[i] = []; // [ [], [], [] ]
      this.unvisited[i] = []; // [ [], [], [] ]
      for (let j = 0; j < n; j++) {
        this.cells[i][j] = [0, 0, 0, 0];    // [ [ [0,0,0,0], [0,0,0,0], [0,0,0,0] ],       [ [ [true], [true], [true] ],
        this.unvisited[i][j] = true;        //   [ [0,0,0,0], [0,0,0,0], [0,0,0,0] ],         [ [true], [true], [true] ],
      }                                     //   [ [0,0,0,0], [0,0,0,0], [0,0,0,0] ]  ]       [ [true], [true], [true] ]  ]
    }
  }

  selectStart(n) {
    let x = Math.floor(Math.random() * n);
    let y = Math.floor(Math.random() * n);
    let coords = [y, x]
    this.path.push(coords);
    // [ [y, x] ]

    this.unvisited[y][x] = false;       
    this.countVisited += 1;
    this.currCell = coords;
       
  }


  // [top, right, bottom, left]
  // [yCoord, xCoord, wallCurrent, wallNeighbor]

  run(n) { // REMEBER TO PASS N
    while (this.countVisited < this.totalCellCount) {

      let possible = [
        [this.currCell[0] - 1, this.currCell[1], 0, 2], // top
        [this.currCell[0], this.currCell[1] + 1, 1, 3], // right
        [this.currCell[0] + 1, this.currCell[1], 2, 0], // bottom
        [this.currCell[0], this.currCell[1] - 1, 3, 1] // left 
      ];

      let neighbors = [];

      for (let i = 0; i < 4; i++) {
        if (possible[i][0] > -1 &&  // making sure its in bounds
            possible[i][0] < n &&
            possible[i][1] > -1 &&
            possible[i][1] < n &&
            this.unvisited[possible[i][0]][possible[i][1]]) {// if true, hasn't been visited
          
          neighbors.push(possible[i]); // if all condition met, valid neighbor
        } 
      }

      // now check to make sure at least one neighbor, otherwise its a dead end
      if (neighbors.length > 0) {
        // if there's a valid neighbor, randomly select one
        this.pickNext(neighbors);
        // this.next = neighbors[ Math.floor( Math.random() * neighbors.length ) ];
      } else {
        this.currCell = this.path.pop(); // if no valid neighbor, backtrack to last cell
      }
    }

    return this.cells;
  }


  pickNext(neighbors) {
    // randomly select neighbor
    this.next = neighbors[Math.floor(Math.random() * neighbors.length)];
    // remove wall of currCell and chosen neighbor, 1 signifies there is no wall
    this.cells[this.currCell[0]][this.currCell[1]][this.next[2]] = 1 // knock down currCell wall => this.cells[currY][currX][currCellWall]
    this.cells[this.next[0]][this.next[1]][this.next[3]] = 1 // knock down currCell wall => this.cells[neighY][neighX][neighCellWall]
    // mark next as visitied, increment counter, and set current to next
    this.unvisited[this.next[0]][this.next[1]] = false; 
    this.countVisited += 1;
    this.currCell = [this.next[0], this.next[1]];
    // add cell to path
    this.path.push(this.currCell);
  }

  drawMaze(ctx, n, w, h) {
    const inc = w / n;
    const cells = this.cells;

    for (let i = 0; i < n; i++) {
      let row = cells[i];

      for (let j = 0; j < n; j++) {
        let cell = row[j];

        let y = i * inc;
        let x = j * inc;

        ctx.lineWidth = 5;
        ctx.lineCap = "round";

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
}

module.exports = Maze;











// class Maze {
//   constructor(n) {
//     this.totalCellCount = n * n;
//     this.cells = [];
//     this.unvisited = [];


//     this.newMaze(n);

//     this.path = []; // path of visited cell coordinates
//     this.countVisited = 0;
//     this.currCell;
//     this.selectStart(n);
//     this.next;
//     this.run(n);
//   }

//   newMaze(n) {
//     for (let i = 0; i < n; i++) {
//       this.cells[i] = []; // [ [], [], [] ]
//       this.unvisited[i] = []; // [ [], [], [] ]
//       for (let j = 0; j < n; j++) {
//         this.cells[i][j] = [0, 0, 0, 0];    // [ [ [0,0,0,0], [0,0,0,0], [0,0,0,0] ],       [ [ [true], [true], [true] ],
//         this.unvisited[i][j] = true;        //   [ [0,0,0,0], [0,0,0,0], [0,0,0,0] ],         [ [true], [true], [true] ],
//       }                                     //   [ [0,0,0,0], [0,0,0,0], [0,0,0,0] ]  ]       [ [true], [true], [true] ]  ]
//     }
//   }

//   selectStart(n) {
//     let x = Math.floor(Math.random() * n);
//     let y = Math.floor(Math.random() * n);
//     let coords = [y, x]
//     this.path.push(coords);
//     // [ [y, x] ]

//     this.unvisited[y][x] = false;
//     this.countVisited += 1;
//     this.currCell = coords;

//   }


//   // [top, right, bottom, left]
//   // [yCoord, xCoord, wallCurrent, wallNeighbor]

//   run(n) { // REMEBER TO PASS N
//     while (this.countVisited < this.totalCellCount) {

//       let possible = [
//         [this.currCell[0] - 1, this.currCell[1], 0, 2], // top
//         [this.currCell[0], this.currCell[1] + 1, 1, 3], // right
//         [this.currCell[0] + 1, this.currCell[1], 2, 0], // bottom
//         [this.currCell[0], this.currCell[1] - 1, 3, 1] // left 
//       ];

//       let neighbors = [];

//       for (let i = 0; i < 4; i++) {
//         if (possible[i][0] > -1 &&  // making sure its in bounds
//           possible[i][0] < n &&
//           possible[i][1] > -1 &&
//           possible[i][1] < n &&
//           this.unvisited[possible[i][0]][possible[i][1]]) {// if true, hasn't been visited

//           neighbors.push(possible[i]); // if all condition met, valid neighbor
//         }
//       }

//       // now check to make sure at least one neighbor, otherwise its a dead end
//       if (neighbors.length > 0) {
//         // if there's a valid neighbor, randomly select one
//         this.pickNext(neighbors);
//         // this.next = neighbors[ Math.floor( Math.random() * neighbors.length ) ];
//       } else {
//         this.currCell = this.path.pop(); // if no valid neighbor, backtrack to last cell
//       }
//     }

//     return this.cells;
//   }


//   pickNext(neighbors) {
//     // randomly select neighbor
//     this.next = neighbors[Math.floor(Math.random() * neighbors.length)];
//     // remove wall of currCell and chosen neighbor, 1 signifies there is no wall
//     this.cells[this.currCell[0]][this.currCell[1]][this.next[2]] = 1 // knock down currCell wall => this.cells[currY][currX][currCellWall]
//     this.cells[this.next[0]][this.next[1]][this.next[3]] = 1 // knock down currCell wall => this.cells[neighY][neighX][neighCellWall]
//     // mark next as visitied, increment counter, and set current to next
//     this.unvisited[this.next[0]][this.next[1]] = false;
//     this.countVisited += 1;
//     this.currCell = [this.next[0], this.next[1]];
//     // add cell to path
//     this.path.push(this.currCell);
//   }
// }

// module.exports = Maze;

/***/ }),

/***/ "./src/modal.js":
/*!**********************!*\
  !*** ./src/modal.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

class Modal {
  constructor(overlay) {
    this.overlay = overlay;
    const closeButton = overlay.querySelector('.button-close')

    this.registerListeners(closeButton);
  }

  open() {
    this.overlay.classList.remove('is-hidden');
  }

  close() {
    this.overlay.classList.add('is-hidden');
  }

  registerListeners(closeButton) {
    closeButton.addEventListener('click', this.close.bind(this));

    this.overlay.addEventListener('click', e => {
      if (e.target.id === this.overlay.id) {
        this.close();
      }
    });
  }
}

module.exports = Modal;



/***/ }),

/***/ "./src/moving_object.js":
/*!******************************!*\
  !*** ./src/moving_object.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {



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

/***/ }),

/***/ "./src/score.js":
/*!**********************!*\
  !*** ./src/score.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

class Score {
  constructor() {
    this.score = 0;

  }

  addPoint() {
    this.score += 1;
    this.updateCoins();
  }

  updateCoins() {
    let el = document.getElementById("coins");
    let score = this.score;
    el.innerHTML = score;
  }

  win() {
    let header = document.getElementById("modal-header");
    header.innerHTML = "YOU WIN!";

    let newGame = document.getElementById("new-game");
    newGame.classList.remove("is-hidden");

    let hide = document.getElementById("start");
    hide.classList.add("is-hidden");

    let modal = document.getElementById("modal")
    modal.classList.remove("is-hidden");
  }
}

module.exports = Score;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map