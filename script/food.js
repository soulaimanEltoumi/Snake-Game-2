class Food {
  constructor(boardSize) {
    this.boardSize = boardSize;
    this.position = this.generatePosition();
  }

  generatePosition() {
    let x = Math.floor(Math.random() * (this.boardSize / 10)) * 10;
    let y = Math.floor(Math.random() * (this.boardSize / 10)) * 10;
    return { x, y };
  }

  respawn() {
    this.position = this.generatePosition();
  }
}
