function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

async function fetchIcons() {
  try {
    const response = await fetch('/config/icons.json');
    if (!response.ok) {
      throw new Error('Ошибка при загрузке JSON файла');
    }
    const icons = await response.json();
    return icons;
  } catch (error) {
    console.error('Ошибка:', error);
    return [];
  }
}

async function generatePlacement(difficulty) {
  const cars_icons = await fetchIcons();

  if (cars_icons.length === 0) {
    return [];
  }

  const slicedCars = cars_icons.slice(0, difficulty);
  const cards = shuffle([...slicedCars, ...slicedCars]);

  return cards;
}

// Пример использования
generatePlacement(4).then(cards => {
  console.log(cards);
});