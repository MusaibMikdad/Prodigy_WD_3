import React, { useState } from 'react';
import './App.css';

const TicTacToe = () => {
  const [board, setBoard] = useState([['', '', ''], ['', '', ''], ['', '', '']]);
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameModeSelected, setIsGameModeSelected] = useState(false);
  const [gameMode, setGameMode] = useState(null);
  const [fadeClass, setFadeClass] = useState('');
  const [showCongratulations, setShowCongratulations] = useState(false);

  const winSound = new Audio('/congo.mp3');
  const drawSound = new Audio('/fail.mp3');
  const computerWinSound = new Audio('/loss.mp3'); 

  const startGame = () => {
    setFadeClass('fade-out');
    setTimeout(() => {
      setIsGameModeSelected(true);
      setFadeClass('');
    }, 1000);
  };

  const selectGameMode = (mode) => {
    setGameMode(mode);
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
      setIsGameModeSelected(false);
      setGameMode(null);
      setFadeClass('');
      resetGame();
    }, 1000);
  };

  const goback = () => {
    setFadeClass('fade-out');
    setTimeout(() => {
      setIsGameStarted(false);
      setIsGameModeSelected(true);
      setGameMode(false);
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

  const triggerConfetti = (isWin, winner) => {
    setShowCongratulations(true);
    for (let i = 0; i < 100; i++) {
      createConfettiPiece();
    }

    if (isWin) {
      if (gameMode === 'single' && winner === 'O') {
        computerWinSound.play(); 
      } else {
        winSound.play();
      }
    } else {
      drawSound.play();
    }

    setTimeout(() => {
      setShowCongratulations(false);
    }, 5000);
  };

  const handlePlayerMove = (row, col) => {
    if (board[row][col] === '' && !winner && !isDraw) {
      const newBoard = board.map(row => [...row]);
      newBoard[row][col] = currentPlayer;
      setBoard(newBoard);

      const winner = checkWinner(newBoard);
      if (winner) {
        setWinner(winner);
        triggerConfetti(true, winner);
      } else if (checkDraw(newBoard)) {
        setIsDraw(true);
        triggerConfetti(false);
      } else if (gameMode === 'single' && currentPlayer === 'X') {
        setCurrentPlayer('O');
        setTimeout(() => handleComputerMove(newBoard), 500);
      } else {
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
      }
    }
  };

  const minimax = (board, depth, isMaximizing) => {
    const winner = checkWinner(board);
    if (winner) {
      if (winner === 'O') return 10 - depth; 
      if (winner === 'X') return depth - 10; 
      return 0; 
    }
  
    if (checkDraw(board)) return 0; 
    
    let bestScore = isMaximizing ? -Infinity : Infinity;
    let move = null;
  
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (board[row][col] === '') {
          board[row][col] = isMaximizing ? 'O' : 'X'; 
          const score = minimax(board, depth + 1, !isMaximizing);
          board[row][col] = ''; 
  
          if (isMaximizing) {
            if (score > bestScore) {
              bestScore = score;
              move = { row, col };
            }
          } else {
            if (score < bestScore) {
              bestScore = score;
              move = { row, col };
            }
          }
        }
      }
    }
  
    return depth === 0 ? move : bestScore;
  };
  
  const handleComputerMove = (currentBoard) => {
    if (winner || isDraw) return;
  
    const bestMove = minimax(currentBoard, 0, true); 
  
    const newBoard = currentBoard.map(row => [...row]);
    newBoard[bestMove.row][bestMove.col] = 'O';
    setBoard(newBoard);
  
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
      triggerConfetti(true, newWinner);
    } else if (checkDraw(newBoard)) {
      setIsDraw(true);
      triggerConfetti(false);
    } else {
      setCurrentPlayer('X');
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
      {!isGameStarted && !isGameModeSelected ? (
        <div className={`start-screen ${fadeClass}`}>
          <h1 className="title">Tic Tac Toe</h1>
          <button onClick={startGame} className="start-button">Start Game</button>
        </div>
      ) : !isGameStarted && isGameModeSelected ? (
        <div className={`game-mode-screen ${fadeClass}`}>
          <h2 className='game_mode'>Select Game Mode</h2>
          <button onClick={() => selectGameMode('single')} className="mode-button">Single Player</button>
          <button onClick={() => selectGameMode('multi')} className="mode-button">Two Player</button>
          <button onClick={goToMenu} className="menu-button">Menu</button>
        </div>
      ):(
        <div className={`game-content ${fadeClass}`}>
          <button onClick={goToMenu} className="menu-button">Menu</button>
          <button onClick={goback} className="back-button"> Back </button>
          <div className="winner">
            {gameMode === 'multi' && winner ? `Match Result: ${winner} wins` : isDraw ? 'Match Result: Draw' : ''}
          </div>
          <div className='losser'>
          {gameMode === 'single' && winner === 'O' && (
          <h1> Match Result:  Computer wins </h1>
        )}
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
                      onClick={() => handlePlayerMove(rowIndex, colIndex)}
                      disabled={cell !== '' || (gameMode === 'single' && currentPlayer === 'O')}
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
      {gameMode === 'single' && winner === 'O' 
        ? ' Better luck next time! 🙂' 
        : `🎉 Congratulations! ${winner} wins the game! 🎉`}
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
