const _ = require("lodash");

export default function growSnakeByOne(snakeCoords, snakeDirection) {
  let coords = _.cloneDeep(snakeCoords);

  if (snakeDirection === "left") {
    coords.push([
      //|tail row,
      coords[coords.length - 1][0],
      // |tail row value, tail column + 1; (add to right of tail)
      coords[coords.length - 1][1] + 1,
    ]);
  }

  if (snakeDirection === "right") {
    coords.push([
      //|tail row,
      coords[coords.length - 1][0],
      // |tail row value, tail column - 1; (add to left of tail)
      coords[coords.length - 1][1] - 1,
    ]);
  }

  if (snakeDirection === "up") {
    coords.push([
      //|tail row plus one (going up so its rows)
      coords[coords.length - 1][0] + 1,
      //| tail column the same as tail (want it to be the same just up one row)
      coords[coords.length - 1][1],
    ]);
  }

  if (snakeDirection === "down") {
    coords.push([
      //|tail row minus one (going down so its rows)
      coords[coords.length - 1][0] - 1,
      //| tail column the same as tail (want it to be the same just up one row)
      coords[coords.length - 1][1],
    ]);
  }

  // for (let i = 0; i < coords.length; i++) {
  //   console.log(coords[i]);
  // }

  return coords;
}
