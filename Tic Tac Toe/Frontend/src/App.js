import React, { useState } from 'react';
import './App.css';

const TicTacToe = () => {
  const [board, setBoard] = useState([['', '', ''], ['', '', ''], ['', '', '']]);
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [fadeClass, setFadeClass] = useState('');
  const [showCongratulations, setShowCongratulations] = useState(false);

  const winSound = new Audio('/congo.mp3');
  const drawSound = new Audio('/fail.mp3');

  const startGame = () => {
    setFadeClass('fade-out');
    setTimeout(() => {
      setIsGameStarted(true);
      setFadeClass('');
    }, 1000);
  };

  const goToMenu = () => {
    setFadeClass('fade-out');
    setTimeout(() => {
      setIsGameStarted(false);
      setFadeClass('');
      resetGame();
    }, 1000);
  };

  const checkWinner = (board) => {
    const winningCombinations = [
      [[0, 0], [0, 1], [0, 2]],
      [[1, 0], [1, 1], [1, 2]],
      [[2, 0], [2, 1], [2, 2]],
      [[0, 0], [1, 0], [2, 0]],
      [[0, 1], [1, 1], [2, 1]],
      [[0, 2], [1, 2], [2, 2]],
      [[0, 0], [1, 1], [2, 2]],
      [[0, 2], [1, 1], [2, 0]],
    ];

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        board[a[0]][a[1]] &&
        board[a[0]][a[1]] === board[b[0]][b[1]] &&
        board[a[0]][a[1]] === board[c[0]][c[1]]
      ) {
        return board[a[0]][a[1]];
      }
    }
    return null;
  };

  const checkDraw = (board) => {
    return board.every(row => row.every(cell => cell !== ''));
  };

  const createConfettiPiece = () => {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti-piece');
    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
    confetti.style.animationDuration = `${Math.random() * 2 + 1}s`;

    document.body.appendChild(confetti);

    confetti.addEventListener('animationend', () => {
      confetti.remove();
    });
  };

  const triggerConfetti = (isWin) => {
    setShowCongratulations(true); 
    for (let i = 0; i < 100; i++) {
      createConfettiPiece();
    }

    if (isWin) {
      winSound.play(); 
    } else {
      drawSound.play(); 
    }


    setTimeout(() => {
      setShowCongratulations(false); 
    }, 4000);
  };

  const handleMove = (row, col) => {
    if (board[row][col] === '' && !winner && !isDraw) {
      const newBoard = [...board.map(row => [...row])];
      newBoard[row][col] = currentPlayer;
      setBoard(newBoard);

      const winner = checkWinner(newBoard);
      if (winner) {
        setWinner(winner);
        triggerConfetti(true);
      } else if (checkDraw(newBoard)) {
        setIsDraw(true);
        triggerConfetti(false);
      } else {
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
      }
    }
  };

  const resetGame = () => {
    setFadeClass('fade-out-reset'); 
    setTimeout(() => {
      setBoard([['', '', ''], ['', '', ''], ['', '', '']]);
      setWinner(null);
      setIsDraw(false);
      setCurrentPlayer('X');
      setFadeClass(''); 
    }, 1000); 
  };

  const playAgain = () => {
    resetGame();
    setIsGameStarted(true); 
  };

  return (
    <div className="game">
      {!isGameStarted ? (
        <div className={`start-screen ${fadeClass}`}>
          <h1 className="title">Tic Tac Toe</h1>
          <button onClick={startGame} className="start-button">Start Game</button>
        </div>
      ) : (
        <div className={`game-content ${fadeClass}`}>
          <button onClick={goToMenu} className="menu-button">Menu</button>
          <div className="winner">
            {winner ? `Match Result: ${winner} wins` : isDraw ? 'Match Result: Draw' : ''}
          </div>
          
          {!winner && !isDraw && (
            <h1 className='playername'>{currentPlayer}'s turn</h1>
          )}
          
          
      
          {!winner && !isDraw && (
            <div className="board">
              {board.map((row, rowIndex) => (
                <div key={rowIndex} className="board-row">
                  {row.map((cell, colIndex) => (
                    <button
                      key={colIndex}
                      className="square"
                      onClick={() => handleMove(rowIndex, colIndex)}
                    >
                      {cell}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          )}

          {!winner && !isDraw && (
            <button onClick={resetGame} className="reset-button">Reset Game</button>
          )}

          {(winner || isDraw) && (
            <button onClick={playAgain} className="play-again-button">Play Again</button>
          )}
        </div>
      )}

      {showCongratulations && winner && (
        <div className="congratulations-overlay">
          <div className="congratulations-message">
            🎉 Congratulations! {winner} wins the game! 🎉
          </div>
        </div>
      )}
      
      {showCongratulations && isDraw && (
        <div className="congratulations-overlay">
          <div className="congratulations-message">
          😀 It's a Draw! 😀
          </div>
        </div>
      )}
    </div>
  );
};

export default TicTacToe;
