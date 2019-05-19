const Maze = require("./maze");
// const drawMaze = require("./draw_maze");
const MovingObject = require("./moving_object");
const GameView = require("./game_view");
const Game = require("./game");
const Modal = require("./modal");

document.addEventListener("DOMContentLoaded", () => {
  let n = 15;
  let w = 750;
  let h = 750;

  const overlay = document.querySelector('.modal-overlay');
  const modal = new Modal(overlay);
  window.openModal = modal.open.bind(modal);
  window.openModal();

  const canvas = document.getElementById("maze");
  const ctx = canvas.getContext('2d');
  game = new Game(n, canvas, ctx);
  game.newStart();

  // game.toImage();
})