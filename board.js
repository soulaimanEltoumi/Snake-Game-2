class Board {
  constructor(size) {
    this.size = size;
    this.snake = new Snake();
    this.food = new Food(size);
    this.interval = null;
    this.score = 0;
    this.speed = 100; // milliseconds
    this.isGameOver = false;
    this.foodElement = null;
    this.scoreElement = document.getElementById("scoreBoard");
  }

  setup() {
    // Setup the game board
    this.createBoard();
    this.drawSnake();
    this.drawFood();

    // Setup event listeners for keyboard input
    document.addEventListener("keydown", (e) => this.changeDirection(e));
  }

  createBoard() {
    // Create HTML elements to represent the game board
    const gameBoard = document.getElementById("gameBoard");
    gameBoard.style.width = this.size + "px";
    gameBoard.style.height = this.size + "px";
    gameBoard.style.position = "relative";
  }

  drawSnake() {
    // Draw the snake on the game board
    const gameBoard = document.getElementById("gameBoard");
    [...gameBoard.children].forEach((e) => {
      if (e.className === "snake") e.remove();
    });
    this.snake.body.forEach((segment) => {
      const snakeElement = document.createElement("div");
      snakeElement.style.width = "10px";
      snakeElement.style.height = "10px";
      snakeElement.style.backgroundColor = "green";
      snakeElement.style.position = "absolute";
      snakeElement.style.left = segment.x + "px";
      snakeElement.style.top = segment.y + "px";
      snakeElement.classList.add("snake");
      gameBoard.appendChild(snakeElement);
    });
  }

  drawFood() {
    const gameBoard = document.getElementById("gameBoard");

    // If the foodElement is not created yet, create it
    if (!this.foodElement) {
      this.foodElement = document.createElement("div");
      this.foodElement.style.width = "10px";
      this.foodElement.style.height = "10px";
      this.foodElement.style.backgroundColor = "red";
      this.foodElement.style.position = "absolute";
      this.foodElement.classList.add("food");
      gameBoard.appendChild(this.foodElement);
    }

    // Update the position of the foodElement
    this.foodElement.style.left = this.food.position.x + "px";
    this.foodElement.style.top = this.food.position.y + "px";
  }

  updateScore() {
    // Update the text content of the score element
    if (this.scoreElement) {
      this.scoreElement.textContent = `Score: ${this.score}`;
    }
  }

  changeDirection(event) {
    // Change snake's direction based on key press
    switch (event.key) {
      case "ArrowUp":
        this.snake.changeDirection("up");
        break;
      case "ArrowDown":
        this.snake.changeDirection("down");
        break;
      case "ArrowLeft":
        this.snake.changeDirection("left");
        break;
      case "ArrowRight":
        this.snake.changeDirection("right");
        break;
    }
  }

  update() {
    // Update the game state
    if (this.isGameOver) return;

    this.snake.move();

    // Check for collisions
    if (this.snake.checkCollision(this.size)) {
      this.gameOver();
      return;
    }

    // Check if snake eats food
    if (
      this.snake.body[0].x === this.food.position.x &&
      this.snake.body[0].y === this.food.position.y
    ) {
      this.snake.grow();
      this.score++;
      this.updateScore(); // Update the score displayed
      this.food.respawn();
      this.drawFood(); // Redraw food at new position

      // Increase speed as score increases
      if (this.speed > 50) {
        this.speed -= 5;
        clearInterval(this.interval);
        this.start();
      }
    }

    // Redraw snake
    this.drawSnake();
  }

  start() {
    // Start the game loop
    this.interval = setInterval(() => {
      this.update();
    }, this.speed);
  }

  gameOver() {
    // Game over
    this.isGameOver = true;
    clearInterval(this.interval);
    console.log(`Game Over! Score: ${this.score}`);

    // Hide the game screen and show the game over screen
    document.getElementById("gameBoard").style.display = "none";
    document.getElementById("game-end").style.display = "block";

    // Update the final score
    document.getElementById("final-score").textContent = `Score: ${this.score}`;
  }
}
