import cards from "../../public/config/cards_config.json" assert { type: "json" };

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function generateGrid(array) {
  const shuffledArray = shuffle(array);

  const length = shuffledArray.length;
  const rows = Math.sqrt(length);
  const columns = rows;

  // Создание двумерного массива
  const grid = [];
  for (let i = 0; i < rows; i++) {
    grid.push(shuffledArray.slice(i * columns, (i + 1) * columns));
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

  let fullGrid = [];
  for (let i = 0; i < 3; i++) {
    fullGrid.push(generateGrid(duplicatedIndexes));
  }

  return fullGrid;
}
