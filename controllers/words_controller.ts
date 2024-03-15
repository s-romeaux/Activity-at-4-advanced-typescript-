import express, { Router, Request, Response } from 'express';
import Word from '../models/words';

const wordsRouter: Router = express.Router();

// Original function for handling the '/getWords' route
async function getWordsFromDatabase(_: Request, res: Response): Promise<void> {
  try {
    const words = await Word.find();
    console.log('Words from MongoDB:', words);
    res.json(words);
  } catch (error) {
    console.error('Error fetching words from the database:', error);
    res.status(500).send('Internal Server Error');
  }
}

wordsRouter.get('/getWords', getWordsFromDatabase);

// Export the router
export default wordsRouter;

// Additional function to be used outside of the route
export async function fetchWordsFromDatabase(): Promise<void> {
  try {
    const words = await Word.find();
    console.log('Words from MongoDB:', words);
    // Handle the result accordingly (this won't send a response directly)
  } catch (error) {
    console.error('Error fetching words from the database:', error);
    // Handle the error accordingly (this won't send a response directly)
  }
}
