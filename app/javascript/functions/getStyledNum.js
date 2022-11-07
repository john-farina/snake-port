export default function getStyledNum(number, whichPlace) {
  let numStr = (number - 2).toString();
  let array = [];

  if (numStr.length === 1) {
    array.push(0);
    array.push(0);
  }

  if (numStr.length === 2) {
    array.push(0);
  }

  for (let i = 0; i < numStr.length; i++) {
    array.push(Number(numStr[i]));
  }

  if (whichPlace === 1) {
    return array[0];
  }

  if (whichPlace === 2) {
    return array[1];
  }

  if (whichPlace === 3) {
    return array[2];
  }
}
