export default function randomFoodCoords(snakeCoords) {
  let foodCoord;
  let num = 0;
  if (snakeCoords) {
    num = snakeCoords.length;
  }

  let ran1 = Math.floor(Math.random() * 14);
  let ran2 = Math.floor(Math.random() * 14);

  if (ran1 !== 0) {
    ran1 += 1;
  }

  if (ran2 !== 0) {
    ran2 += 1;
  }

  foodCoord = [ran1, ran2];

  for (let i = 0; i < snakeCoords.length; i++) {
    if (
      snakeCoords[i][0] === foodCoord[0] &&
      snakeCoords[i][1] === foodCoord[1]
    ) {
      console.log("its a match");
      num = num - 1;
      break;
    }
  }

  if (num === snakeCoords.length) {
    return foodCoord;
  } else {
    return randomFoodCoords(snakeCoords);
  }
}
