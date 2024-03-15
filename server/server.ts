import express, { Request, Response } from 'express';
import cors from 'cors';
import mongoose, { ConnectOptions } from 'mongoose';
import wordsRouter, { fetchWordsFromDatabase } from '../controllers/words_controller'; // Import the new function

import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env['PORT'] || 5000;

app.use(cors());

// MONGO CONNECTION
async function connectToMongoDB() {
  try {
    await mongoose.connect(process.env['MONGO_URI']!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
    console.log('Connected to MongoDB!!!');
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error connecting to MongoDB:', error.message);
    }
  }
}

connectToMongoDB();

const gridSize = 22;

interface Direction {
  x: number;
  y: number;
}

interface WordInfo {
  word: string;
}

async function generateGrid(wordsFromDatabase: WordInfo[]) {
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

  for (const rawWordObject of wordsFromDatabase) {
    const word = String(rawWordObject.word);
    let direction: Direction | undefined;
    let startX: number = 0,
      startY: number = 0;
    let wordFits = false;

    // Try placing the word up to 50 times
    for (let attempt = 0; attempt < 50; attempt++) {
      direction = directions[Math.floor(Math.random() * directions.length)];
      startX = Math.floor(Math.random() * gridSize);
      startY = Math.floor(Math.random() * gridSize);

      let currentX = startX;
      let currentY = startY;
      wordFits = true;

      for (const _ of word) {
        if (
          currentX < 0 ||
          currentX >= gridSize ||
          currentY < 0 ||
          currentY >= gridSize ||
          (grid[currentX] && grid[currentX]![currentY] !== '')
        ) {
          wordFits = false;
          console.log(`Invalid position for ${_} at (${currentX}, ${currentY})`);
          break;
        }

        if (direction) {
          grid[currentX]![currentY] = _;
          currentX += direction.x;
          currentY += direction.y;
        } else {
          wordFits = false;
          break;
        }
      }

      if (wordFits) {
        break;
      }
    }

    if (!wordFits) {
      console.error(`Could not place the word: ${word}`);
      console.log('Grid:', grid);
      continue; // Skip to the next word
    }

    let currentX = startX;
    let currentY = startY;

    for (const _ of word) {
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
      currentX += direction.x;
      currentY += direction.y;
    }

    placedWords.push(word);
  }

  console.log('Final Grid:', grid);

  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if (!grid[i] || (grid[i] && grid[i]![j] === '')) {
        const randomLetter = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
        if (!grid[i]) {
          grid[i] = []; // Ensure the row exists
        }
        grid[i]![j] = randomLetter;
      }
    }
  }

  console.log('Generated grid:', grid);
  console.log('Placed words:', placedWords);

  // Return the generated grid and placed words
  return { grid, placedWords };
}

const API_PATH = '/api'; // Define the API path constant

async function startServer(): Promise<void | { grid: string[][], placedWords: string[] }> {
  let wordsFromDatabase: WordInfo[];

  try {
    app.use(API_PATH, wordsRouter);

    // Fetch words from the database
    wordsFromDatabase = await fetchWordsFromDatabase();

    if (!wordsFromDatabase || wordsFromDatabase.length === 0) {
      console.error('Error: Words from the database are either undefined or empty.');
      return;
    }

    // Generate grid with fetched words
    const { grid: _, placedWords } = await generateGrid(wordsFromDatabase);

    // Set up routes
    app.get('/', (_req: Request, res: Response) => { // Change req to _req
      res.send('hello');
    });

    app.get(`${API_PATH}/wordBank`, (_: Request, res: Response) => {
      console.log('Sending wordBank:', placedWords);
      res.json(placedWords);
    });

    app.get(`${API_PATH}/databaseWords`, async (_: Request, res: Response) => {
      try {
        // Fetch words from database again (if needed)
        const wordsFromDatabase = await fetchWordsFromDatabase();
        res.json(wordsFromDatabase);
        console.log('database words pulled');
      } catch (error) {
        res.status(500).send(error);
      }
    });

    // Start listening on specified port
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

    // Return a resolved promise with void value to satisfy the return type
    return Promise.resolve();
  } catch (error) {
    console.error('Error fetching words from the database:', (error as Error).message);
    // Explicitly return undefined to satisfy the return type
    return undefined;
  }

}startServer();
