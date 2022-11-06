export default function clearSnakeFromGrid(grid) {
  let newGrid = grid;

  for (let i = 0; i < newGrid.length; i++) {
    for (let c = 0; c < newGrid[i].length; c++) {
      if (newGrid[i][c] === "HEAD") {
        newGrid[i][c] = null;
      }

      if (newGrid[i][c] === "BODY") {
        newGrid[i][c] = null;
      }

      if (newGrid[i][c] === "TAIL") {
        newGrid[i][c] = null;
      }
    }
  }

  return newGrid;
}
