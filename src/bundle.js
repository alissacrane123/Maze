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

/***/ "./src/draw_maze.js":
/*!**************************!*\
  !*** ./src/draw_maze.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

// const Maze = require("./maze");

// [ TOP, RIGHT, BOTTOM, LEFT ]

const drawMaze = (maze, ctx, n, w, h) => {
  console.log("????")
  console.log(n)
  // let mazev/ = new Maze(n);
  // let canvas = document.getElementById('maze');
  // let ctx = canvas.getContext('2d');
  let cells = maze.cells;
  ctx.canvas.width = w;
  ctx.canvas.height = h;

  let inc = w / n; // width of canvas div. by num of cells per row

  for (let i = 0; i < n; i++) {
    let row = cells[i];
    console.log(cells)
    console.log(row)
    for (let j = 0; j < n; j++) {
      let cell = row[j];

      let y = i * inc;
      let x = j * inc;

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

// drawMaze(10, 500, 500);


module.exports = drawMaze;

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Maze = __webpack_require__(/*! ./maze */ "./src/maze.js");
const drawMaze = __webpack_require__(/*! ./draw_maze */ "./src/draw_maze.js");

// window.Maze = Maze;
// window.drawMaze = drawMaze;



document.addEventListener("DOMContentLoaded", () => {
  let n = 20;
  let w = 500;
  let h = 500;
  const canvasEl = document.getElementById("maze");

  const ctx = canvasEl.getContext('2d');
  const maze = new Maze(n);
  console.log(maze)
  drawMaze(maze, ctx, n, w, h);
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


    this.newMaze(n);

    this.path = []; // path of visited cell coordinates
    this.countVisited = 0;
    this.currCell;
    this.selectStart(n);
    this.next;
    this.run(n);
  }

  newMaze(n) {
    // console.log("end")
    // console.log(n)
    
    for (let i = 0; i < n; i++) {
      this.cells[i] = []; // [ [], [], [] ]
      this.unvisited[i] = []; // [ [], [], [] ]
      // console.log("??")
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
    // console.log("start")
    // console.log(n);
    // console.log(x);
    // console.log(y);
    // console.log(this)

    console.log(this.unvisited)
    debugger
    this.unvisited[y][x] = false;       
    this.countVisited += 1;
    this.currCell = coords;
    
    // return coords;    
  }


  // [top, right, bottom, left]
  // [yCoord, xCoord, wallCurrent, wallNeighbor]

  run(n) { // REMEBER TO PASS N
    while (this.countVisited < this.totalCellCount) {
      // console.log(this.currCell)
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
}

module.exports = Maze;

// let maze2 = new Maze(4);

// console.log(maze2);




// generateMaze(n) {
//   let gridCells = n * n;
//   let checkedCells = [];
//   let uncheckedCells = [];

//   for (let i = 0; i < n; i++) {
//     gridCells.push([]);
//     uncheckedCells.push([]);


//   }
// } 

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map