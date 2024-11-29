import cards from "../../public/config/cards_config.json" assert { type: "json" };

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function generateGrid(array) {
  const length = array.length;
  let rows = Math.floor(Math.sqrt(length));
  let columns = length / rows;

  // Создание двумерного массива
  const grid = [];
  for (let i = 0; i < rows; i++) {
    grid.push(array.slice(i * columns, (i + 1) * columns));
  }

  return grid;
}

export function generatePlacement(difficulty) {
  const totalCards = difficulty * difficulty;

  if (totalCards % 2 !== 0) {
    throw new Error("Общее количество элементов должно быть четным.");
  }

  const cardIndexes = Array.from(
    { length: totalCards / 2 },
    (_, index) => index % cards.length
  );

  const duplicatedIndexes = [...cardIndexes, ...cardIndexes];
  const shuffledIndexes = shuffle(duplicatedIndexes);

  console.log(generateGrid(shuffledIndexes));
  return generateGrid(shuffledIndexes);
}
