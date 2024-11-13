import React, { useState, useEffect } from 'react';

const Board = () => {
  const [board, setBoard] = useState([['', '', ''], ['', '', ''], ['', '', '']]);
  const [currentPlayer, setCurrentPlayer] = useState('');
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    // Fetch initial game state from the backend
    fetch('http://localhost:3000/game/state')
      .then((response) => response.json())
      .then((data) => setBoard(data));

    fetch('http://localhost:3000/game/current-player')
      .then((response) => response.json())
      .then((data) => setCurrentPlayer(data));

    fetch('http://localhost:3000/game/winner')
      .then((response) => response.json())
      .then((data) => setWinner(data));
  }, []);

  const handleMove = (row, col) => {
    fetch('http://localhost:3000/game/move', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ row, col }),
    })
      .then((response) => response.json())
      .then((data) => setBoard(data));

    fetch('http://localhost:3000/game/current-player')
      .then((response) => response.json())
      .then((data) => setCurrentPlayer(data));

    fetch('http://localhost:3000/game/winner')
      .then((response) => response.json())
      .then((data) => setWinner(data));
  };

  const resetGame = () => {
    fetch('http://localhost:3000/game/reset', { method: 'POST' })
      .then(() => {
        setBoard([['', '', ''], ['', '', ''], ['', '', '']]);
        setCurrentPlayer('X');
        setWinner(null);
      });
  };

  return (
    <div>
      <h2>Tic Tac Toe</h2>
      {winner ? <h3>Winner: {winner}</h3> : <h3>Current Player: {currentPlayer}</h3>}
      <button onClick={resetGame}>Reset Game</button>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 100px)', gridGap: '10px' }}>
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <button
              key={`${rowIndex}-${colIndex}`}
              onClick={() => handleMove(rowIndex, colIndex)}
              style={{ width: '100px', height: '100px', fontSize: '24px' }}
            >
              {cell}
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default Board;
