// Функция для генерации расстановки карточек
export function generatePlacement(side) {
  // Замоканые данные при side = 4
  return [
    [0, 1, 2, 3],
    [1, 2, 0, 3],
    [3, 2, 1, 0],
    [1, 3, 0, 2],
  ];
}
