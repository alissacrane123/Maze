

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