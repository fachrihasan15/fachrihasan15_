const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Canvas size
canvas.width = 400;
canvas.height = 400;

const box = 20; // size of one grid box
let score = 0;
let gameOver = false; // Status permainan

// Snake initialization
let snake = [{ x: 9 * box, y: 10 * box }];

// Direction
let direction;

// Food initialization
let food = {
  x: Math.floor(Math.random() * (canvas.width / box)) * box,
  y: Math.floor(Math.random() * (canvas.height / box)) * box,
};

// Key event listener
document.addEventListener("keydown", (event) => {
  if (!gameOver) {
    if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    else if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    else if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    else if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
  }

  // Restart game when Enter is pressed after game over
  if (gameOver && event.key === "Enter") {
    resetGame();
  }
});

// Draw the game
function drawGame() {
  // Clear canvas
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw snake
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "lime" : "white";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
    ctx.strokeStyle = "#000";
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }

  // Draw food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);

  // Old head position
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  // Move snake in the current direction
  if (direction === "UP") snakeY -= box;
  if (direction === "DOWN") snakeY += box;
  if (direction === "LEFT") snakeX -= box;
  if (direction === "RIGHT") snakeX += box;

  // Dinding Tembus
  if (snakeX < 0) snakeX = canvas.width - box;
  if (snakeX >= canvas.width) snakeX = 0;
  if (snakeY < 0) snakeY = canvas.height - box;
  if (snakeY >= canvas.height) snakeY = 0;

  // Check if snake eats the food
  if (snakeX === food.x && snakeY === food.y) {
    score++;
    food = {
      x: Math.floor(Math.random() * (canvas.width / box)) * box,
      y: Math.floor(Math.random() * (canvas.height / box)) * box,
    };
  } else {
    // Remove the tail
    snake.pop();
  }

  // Add new head
  const newHead = { x: snakeX, y: snakeY };

  // Check collision with snake body
  if (collision(newHead, snake)) {
    clearInterval(game); // Hentikan game loop
    gameOver = true; // Tandai game over
    alert(`Game Over! Your score: ${score}\nPress Enter to restart.`);
  }

  snake.unshift(newHead);

  // Draw score
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, canvas.height - 10);
}

// Check for collision with snake body
function collision(head, snakeArray) {
  for (let i = 0; i < snakeArray.length; i++) {
    if (head.x === snakeArray[i].x && head.y === snakeArray[i].y) {
      return true;
    }
  }
  return false;
}

// Reset the game
function resetGame() {
  snake = [{ x: 9 * box, y: 10 * box }]; // Reset snake
  direction = undefined; // Reset direction
  score = 0; // Reset score
  food = {
    x: Math.floor(Math.random() * (canvas.width / box)) * box,
    y: Math.floor(Math.random() * (canvas.height / box)) * box,
  }; // Reset food
  gameOver = false; // Reset game over status
  game = setInterval(drawGame, 100); // Restart game loop
}

// Run the game
let game = setInterval(drawGame, 100);
