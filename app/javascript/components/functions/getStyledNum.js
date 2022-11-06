//take a number make it 000 and return the number requested ex: getStyledNum(8, 1) === 0
//            getStyledNum(8, 3) === 8 (because its returning 008 technically)
//
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

  // console.log(array);

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
// console.log(getStyledNum(16, 1));
