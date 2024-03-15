// App.tsx
import { useState, useEffect } from 'react';
import WordSearch from '../client/src/components/WordSearch';  // Check the path

function App() {
  const [wordSearchGrid, setWordSearchGrid] = useState<string[][]>([]);

  useEffect(() => {
    // Fetch the word search grid from the server (assuming the server is running on localhost:3000)
    fetch('http://localhost:3000/wordSearchGrid')
      .then(response => response.json())
      .then(data => setWordSearchGrid(data));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <WordSearch grid={wordSearchGrid} />
      </header>
    </div>
  );
}

export default App;
