function shufflePlayGround(playground, size) {
    const allNumbers = playground.flat(2).filter(item => item !== null);
  
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
  
  const array = [
    [
      [1, 4, 7, 8],
      [9, 12, 13, 14],
      [6, 3, 9, 10],
      [11, 15, null, 12]
    ],
    [
      [null, null, null, null],
      [null, 29, null, null],
      [null, null, null, null],
      [null, 12, 14, null]
    ],
    [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null]
    ]
  ];

  const size = 4;
  const shuffledPlayground = shufflePlayGround(array, size);
  console.log(JSON.stringify(shuffledPlayground, null, 2));