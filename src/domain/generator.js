import cards from "../../public/config/cards_config.json" assert { type: "json" };

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}


function generateGrid(array) {
  const length = array.length;

  if (length % 2 !== 0) {
    throw new Error("Массив должен содержать четное количество элементов.");
  }

  let rows = Math.floor(Math.sqrt(length));
  let columns = length / rows;

  while (!Number.isInteger(columns)) {
    rows--;
    columns = length / rows;
  }

  // Создание двумерного массива
  const grid = [];
  for (let i = 0; i < rows; i++) {
    grid.push(array.slice(i * columns, (i + 1) * columns));
  }

  return grid;
}

export function generatePlacement(difficulty) {
  if (cards.length === 0) {
    return [];
  }

  const cardIndexes = Array.from({ length: cards.length }, (_, index) => index);

  const slicedIndexes = cardIndexes.slice(0, difficulty / 2);

  const shuffledIndexes = shuffle([...slicedIndexes, ...slicedIndexes]);

  return generateGrid(shuffledIndexes);
}
