import React from 'react';

interface WordGridProps {
  wordSearchGrid: string[][];
  selectedLetters: { letter: string; rowIndex: number; colIndex: number }[];
  handleWordClick: (letter: string, rowIndex: number, colIndex: number) => void;
  currentFoundWord: { [key: string]: { letter: string; rowIndex: number; colIndex: number }[] };
}

const WordGrid: React.FC<WordGridProps> = ({ wordSearchGrid, selectedLetters, handleWordClick, currentFoundWord }) => (
  <div style={{ display: 'grid', gridTemplateColumns: `repeat(${wordSearchGrid.length}, 30px)` }}>
    {wordSearchGrid.map((row, rowIndex) => (
      row.map((letter, colIndex) => (
        <div
          key={`${rowIndex}-${colIndex}`}
          style={{
            border: '1px solid black',
            textAlign: 'center',
            padding: '9px',
            cursor: 'pointer',
            backgroundColor: Object.values(currentFoundWord).flat().some(
              (item) =>
                item.rowIndex === rowIndex &&
                item.colIndex === colIndex
            )
              ? '#c5d1eb'
              : selectedLetters.some(
                  (item) =>
                    item.rowIndex === rowIndex &&
                    item.colIndex === colIndex
                )
              ? '#fc69b9'
              : 'white',
          }}
          onClick={() => handleWordClick(letter, rowIndex, colIndex)}
        >
          {letter.toUpperCase()}
        </div>
      ))
    ))}
  </div>
);

export default WordGrid;
