import React from 'react';

interface WordSearchProps {
  grid: string[][];
}

const WordSearch: React.FC<WordSearchProps> = ({ grid }) => {
  return (
    <div>
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: 'flex' }}>
          {row.map((cell, colIndex) => (
            <div key={colIndex} style={{ border: '1px solid black', width: '30px', height: '30px', textAlign: 'center' }}>
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default WordSearch;
