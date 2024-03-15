interface Direction {
  x: number;
  y: number;
}

interface WordInfo {
  word: string;
}

const gridSize = 12;

function generateGrid(words: WordInfo[]): string[][] {
  const grid: string[][] = [];
  const directions: Direction[] = [
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: -1, y: 0 },
    { x: 0, y: -1 },
    { x: -1, y: -1 },
    { x: 1, y: -1 },
    { x: -1, y: 1 },
  ];

  for (let i = 0; i < gridSize; i++) {
    grid[i] = new Array(gridSize).fill('');
  }

  function recursiveGenerate(words: WordInfo[]) {
    for (const wordObject of words) {
      const word = String(wordObject.word);
      const direction = directions[Math.floor(Math.random() * directions.length)];
      const startX = Math.floor(Math.random() * gridSize);
      const startY = Math.floor(Math.random() * gridSize);

      let currentX = startX;
      let currentY = startY;
      let wordFits = true;

      for (const letter of word) {
        if (
          currentX < 0 ||
          currentX >= gridSize ||
          currentY < 0 ||
          currentY >= gridSize ||
          (grid[currentX] && grid[currentX]![currentY] !== '')
        ) {
          wordFits = false;
          break;
        }

        if (direction) {
          grid[currentX]![currentY] = letter;
          currentX += direction.x;
          currentY += direction.y;
        } else {
          wordFits = false;
          break;
        }
      }

      if (!wordFits) {
        for (let i = 0; i < word.length; i++) {
          if (grid[startX + i * direction!.x] && grid[startX + i * direction!.x]![startY + i * direction!.y]) {
            grid[startX + i * direction!.x]![startY + i * direction!.y] = '';
          }
        }
        recursiveGenerate([wordObject, ...words.filter((w) => w !== wordObject)]);
      }
    }
  }

  recursiveGenerate(words);

  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if (!grid[i] || (grid[i] && grid[i]![j] === '')) {
        const randomLetter = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
        if (!grid[i]) {
          grid[i] = [];
        }
        grid[i]![j] = randomLetter;
      }
    }
  }

  return grid;
}

const words: WordInfo[] = [
  { word: 'example' },
  // Add more words as needed
];

const wordSearchGrid = generateGrid(words);
console.log(wordSearchGrid);