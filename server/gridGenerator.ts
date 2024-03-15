interface Direction {
    x: number;
    y: number;
}

interface WordInfo {
    word: string;
}

interface GridResult {
    grid: string[][];
    placedWords: string[];
}

const gridSize = 22;

function generateGrid(words: WordInfo[]): GridResult {
    const grid: string[][] = Array.from({ length: gridSize }, () => Array(gridSize).fill(''));
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

    const placedWords: string[] = [];

    for (const { word } of words) {
        let direction: Direction | undefined;
        let startX: number, startY: number;
        let wordFits = false;

        // Try placing the word up to 50 times
        for (let attempt = 0; attempt < 50; attempt++) {
            direction = directions[Math.floor(Math.random() * directions.length)];
            startX = Math.floor(Math.random() * gridSize);
            startY = Math.floor(Math.random() * gridSize);

            let currentX = startX;
            let currentY = startY;
            wordFits = true;

            for (const letter of word) {
                const outOfBounds =
                    currentX < 0 ||
                    currentX >= gridSize ||
                    currentY < 0 ||
                    currentY >= gridSize;

                if (outOfBounds || grid[currentX]?.[currentY] !== '') {
                    wordFits = false;
                    break;
                }

                direction = direction!; // Non-null assertion operator
                grid[currentX]![currentY] = letter; // Non-null assertion operator
                currentX += direction.x;
                currentY += direction.y;
            }

            if (wordFits) {
                break;
            }
        }

        if (!wordFits) {
            console.error(`Could not place the word: ${word}`);
            continue; // Skip to the next word
        }

        placedWords.push(word);
    }

    // Fill remaining empty spaces with random letters
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            if (grid[i]![j] === '') { // Non-null assertion operator
                const randomLetter = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
                grid[i]![j] = randomLetter; // Non-null assertion operator
            }
        }
    }

    return { grid, placedWords };
}

export { generateGrid };
