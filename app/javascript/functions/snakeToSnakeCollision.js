export default function snakeToSnakeCollision(snake, endGame) {
  let headCoords = snake[0];

  for (let i = 1; i < snake.length; i++) {
    if (headCoords[0] === snake[i][0] && headCoords[1] === snake[i][1]) {
      endGame();
    }
  }
}
