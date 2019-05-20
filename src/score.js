class Score {
  constructor() {
    this.score = 0;
    this.time = -1;

    setInterval(this.addTime.bind(this), 1000);
  }

  addTime() {
    this.time += 1;
    let timer = document.getElementById('timer');
    timer.innerHTML = this.time;
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