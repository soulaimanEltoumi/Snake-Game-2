// Snake class
class Snake {
  constructor() {
    this.body = [{ x: 10, y: 10 }];
    this.direction = "right";
    this.score = 0;
  }

  move() {
    // Move the snake in the current direction
    let head = { ...this.body[0] };
    switch (this.direction) {
      case "up":
        head.y -= 10;
        break;
      case "down":
        head.y += 10;
        break;
      case "left":
        head.x -= 10;
        break;
      case "right":
        head.x += 10;
        break;
    }

    // Add new head to the beginning of the body
    this.body.unshift(head);
    // Remove the tail to simulate movement
    this.body.pop();
  }

  changeDirection(newDirection) {
    // Change direction of the snake, prevent reversing
    if (this.direction === "up" && newDirection === "down") return;
    if (this.direction === "down" && newDirection === "up") return;
    if (this.direction === "left" && newDirection === "right") return;
    if (this.direction === "right" && newDirection === "left") return;

    this.direction = newDirection;
  }

  grow() {
    // Add a new segment to the snake's body
    let tail = { ...this.body[this.body.length - 1] };
    this.body.push(tail);
    this.score++;
  }

  checkCollision(boardSize) {
    // Check if snake hits the walls or itself
    let head = this.body[0];
    if (
      head.x < 0 ||
      head.x >= boardSize ||
      head.y < 0 ||
      head.y >= boardSize
    ) {
      return true; // collision with walls
    }

    for (let i = 1; i < this.body.length; i++) {
      if (head.x === this.body[i].x && head.y === this.body[i].y) {
        return true; // collision with itself
      }
    }

    return false;
  }
}
