class Game {
  constructor() {
    this.board = new Board(400);
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("gameBoard");
    this.gameEndScreen = document.getElementById("game-end");
  }

  start() {
    // Hide start screen and show game screen
    if (this.startScreen) this.startScreen.style.display = "none";
    this.gameScreen.style.display = "block";
    this.board.setup();
    this.board.start();
  }

  gameOver() {
    // Show end screen
    if (this.gameEndScreen) this.gameEndScreen.style.display = "block";
  }
  updateScore(points) {
    this.score += points;
    this.scoreDisplay.innerText = this.score;
  }
}

// Initialize the game
const game = new Game();

document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("start-button")
    .addEventListener("click", () => game.start());
  document
    .getElementById("restart-button")
    .addEventListener("click", () => location.reload());
});
