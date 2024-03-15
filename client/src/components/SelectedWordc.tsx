import React from 'react';

interface SelectedWordProps {
  selectedWord: string;
  handleBackspace: () => void;
}

const SelectedWord: React.FC<SelectedWordProps> = ({ selectedWord, handleBackspace }) => (
  <div>
    <h2>Selected Word:</h2>
    <div>{selectedWord}</div>
    <button onClick={handleBackspace}>Backspace</button>
  </div>
);

export default SelectedWord;
