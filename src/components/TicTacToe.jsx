import React, { useState, useEffect, useMemo } from 'react';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const winner = calculateWinner(board);

  const handleClick = (index) => {
    if (board[index] || winner) {
      return;
    }

    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const getStatus = useMemo(() => {
    if (winner) {
      return `Winner: ${winner}`;
    } else if (!board.includes(null)) {
      return 'It\'s a draw!';
    } else {
      return `Next player: ${isXNext ? 'X' : 'O'}`;
    }
  }, [board, isXNext, winner]);

  useEffect(() => {
    document.title = `Tic Tac Toe - ${getStatus}`;
  }, [getStatus]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  const renderSquare = (index) => (
    <button
      className="btn btn-neutral h-32 w-32 flex items-center justify-center text-4xl"
      onClick={() => handleClick(index)}
    >
      {board[index]}
    </button>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="mb-4 text-3xl font-bold">{getStatus}</div>
        <div className="grid grid-cols-3 gap-1">
          {[0, 1, 2].map((row) => (
            <div key={row} className="grid grid-rows-3">
              {[0, 1, 2].map((col) => (
                <div key={col} className="flex items-center justify-center mt-1">
                  {renderSquare(row * 3 + col)}
                </div>
              ))}
            </div>
          ))}
        </div>
        <button
          className="btn btn-primary mt-4"
          onClick={resetGame}
        >
          Reset Game
        </button>
      </div>
    </div>
  );
};

// Function to calculate the winner
const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6],            // Diagonals
  ];

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
};

export default TicTacToe;
