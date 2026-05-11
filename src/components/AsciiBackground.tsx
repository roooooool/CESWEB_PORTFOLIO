/* src/components/AsciiBackground.tsx */
import { useEffect, useState } from 'react';
import './comp_css/AsciiBackground.css';

const CHARS = "01$#!&%@*+-=<>[]/?"; // The character pool

const AsciiBackground = () => {
  const [grid, setGrid] = useState<string[][]>([]);
  const rows = 1000; // Adjust for density
  const cols = 100; 

  // Initialize and animate the grid
  useEffect(() => {
    const generateRow = () => Array.from({ length: cols }, () => CHARS[Math.floor(Math.random() * CHARS.length)]);
    
    // Create initial grid
    const initialGrid = Array.from({ length: rows }, generateRow);
    setGrid(initialGrid);

    const interval = setInterval(() => {
      setGrid(prevGrid => {
        // Shift rows down and add a new one at top (Flow effect)
        const newGrid = [...prevGrid];
        newGrid.pop();
        newGrid.unshift(generateRow());
        return newGrid;
      });
    }, 150); // Speed of the flow

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="ascii-bg-wrapper">
      <div className="ascii-grid">
        {grid.map((row, i) => (
          <div key={i} className="ascii-row">
            {row.join('')}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AsciiBackground;