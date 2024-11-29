import cards from "../../public/config/cards_config.json" assert { type: "json" };

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

export function generatePlacement(difficulty) {
  if (cards.length === 0) {
    return [];
  }

  const cardIndexes = Array.from({ length: cards.length }, (_, index) => index);

  const slicedIndexes = cardIndexes.slice(0, difficulty);

  const shuffledIndexes = shuffle([...slicedIndexes, ...slicedIndexes]);

  const matrix = [];
  for (let i = 0; i < shuffledIndexes.length; i += difficulty) {
    matrix.push(shuffledIndexes.slice(i, i + difficulty));
  }

  return matrix;
}
