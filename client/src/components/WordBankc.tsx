import React from 'react';

interface WordBankProps {
  wordBank: string[];
  foundWords: string[];
}

const WordBank: React.FC<WordBankProps> = ({ wordBank, foundWords }) => (
  <div>
    <h2>Word Bank</h2>
    {wordBank.map((word, index) => (
      <div
        key={index}
        className={`word ${foundWords.includes(word.toUpperCase()) ? 'word-found' : 'word-not-found'}`}
      >
        {word}
      </div>
    ))}
  </div>
);

export default WordBank;
