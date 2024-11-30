export function shufflePlayGround(playground, size) {
  if (!Array.isArray(playground)) {
    throw new TypeError("playground must be an array");
  }

  const allNumbers = playground.flat(2).filter((item) => item !== null);

  const result = [];
  let numbersIndex = 0;

  for (let i = 0; i < playground.length; i++) {
    const level = [];

    for (let j = 0; j < size; j++) {
      const row = [];

      for (let k = 0; k < size; k++) {
        if (numbersIndex < allNumbers.length) {
          row.push(allNumbers[numbersIndex]);
          numbersIndex++;
        } else {
          row.push(null);
        }
      }

      level.push(row);
    }

    result.push(level);
  }

  return result;
}
