import drawSnakeInGrid from "./drawSnakeInGrid";

export default function drawGrid(columnRow, snakeCoords, foodCoords) {
  let drawnGrid = [];

  for (let r = 0; r < columnRow; r++) {
    let row = [];

    for (let c = 0; c < columnRow; c++) {
      row.push(null);
    }

    drawnGrid.push(row);
  }

  if (snakeCoords) {
    drawnGrid = drawSnakeInGrid(snakeCoords, drawnGrid);
  }

  if (foodCoords) {
    drawnGrid[foodCoords[0]][foodCoords[1]] = "FOOD";
  }

  return drawnGrid;
}
