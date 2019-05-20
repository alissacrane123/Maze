const Maze = require("./maze");
// const drawMaze = require("./draw_maze");
const MovingObject = require("./moving_object");
const GameView = require("./game_view");
const Game = require("./game");
const Modal = require("./modal");
const Interface = require('./interface');
const Coin = require('./coins');
const Score = require("./score");

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