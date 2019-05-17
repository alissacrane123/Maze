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

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Maze = __webpack_require__(/*! ./maze */ "./src/maze.js");
const MovingObject = __webpack_require__(/*! ./moving_object */ "./src/moving_object.js");
const GameView = __webpack_require__(/*! ./game_view */ "./src/game_view.js");

class Game {
  constructor(n, canvas, ctx) {
    this.obj = new MovingObject({ pos: [50, 50], vel: [10, 10], width: 40, height: 40, color: "#f00" });
    const obj = this.obj;
    this.view = new GameView(canvas, ctx, obj, n);
    this.maze = new Maze(n)
  }

  start() {
    const obj = this.obj;
    const view = this.view;
    view.start();
  }

}
  


module.exports = Game;


// GameView.MOVES = {
//   up: [0, -10],
//   left: [-10, 0],
//   down: [0, 10],
//   right: [10, 0]
// }






// class Game {
//   constructor(player) {
//     this.player = player;
//   }

//   updateView() {
//     this.view.clear();
//     this.obj.pos[0] += 1;
//     this.obj.update();
//   }

//   draw(ctx, canvas) {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     ctx.fillStyle = "blue";
//     ctx.fillRect(0, 0, canvas.width, canvas.height);

//     this.player.draw(ctx);
//   }

//   moveObjects(delta) {
//     this.player.move(delta);
//   }

//   step(delta) {
//     this.moveObjects(delta);
//   }
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
  constructor(canvas, ctx, obj) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.obj = obj;
    // this.maze = new Maze(n);
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
    // const maze = this.maze;
    // const n = maze.n;
    // maze.drawMaze(ctx, n, width, height);
  }

  updateView() {
    this.clear();
    // this.obj.pos[0] += 1;
    // const maze = this.maze;
    const ctx = this.ctx;
    this.obj.draw(ctx);
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

document.addEventListener("DOMContentLoaded", () => {
  let n = 15;
  let w = 750;
  let h = 750;
  const canvas = document.getElementById("maze");
  const ctx = canvas.getContext('2d');
  // const maze = new Maze(n);
  // maze.drawMaze(ctx, n, w, h);
  // drawMaze(maze, ctx, n, w, h);

  // obj = new MovingObject({ pos: [50, 50], vel: [10, 10], width: 40, height: 40, color: "#f00" });
  // view = new GameView(canvas, ctx, obj, n);
  game = new Game(n, canvas, ctx);
  // view.start();
  game.start();
})

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

/***/ "./src/moving_object.js":
/*!******************************!*\
  !*** ./src/moving_object.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {



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

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map