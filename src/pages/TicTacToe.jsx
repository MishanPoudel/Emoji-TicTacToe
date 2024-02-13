import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const winner = calculateWinner(board);
  const { state } = useLocation();
  const { clickedEmoji1, clickedEmoji2 } = state || {};

  let p1 = `${clickedEmoji1}`;
  let p2 = `${clickedEmoji2}`;

  const navigate = useNavigate();

  const handleClick = (index) => {
    if (board[index] || winner) {
      return;
    }
    const newBoard = board.slice();
    newBoard[index] = isXNext ? p1 : p2;
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const getStatus = useMemo(() => {
    if (winner) {
      return `Congrats, ${winner} Won!`;
    } else if (!board.includes(null)) {
      return "It's a draw!";
    } 
  }, [board, winner]);

  useEffect(() => {
    if (winner || !board.includes(null)) {
      navigate("/end", { state: { getStatus, winner } });
    }
  }, [getStatus, winner, board, navigate]);
  

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  const renderSquare = (index) => (
    <button
      className="h-32 w-32 flex items-center justify-center text-4xl"
      onClick={() => handleClick(index)}
    >
      {board[index]}
    </button>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="relative flex justify-between bg-white my-3 h-16 rounded-md select-none">
          <motion.div
            className="absolute bg-gray-300 h-full w-[50%] rounded-md z-10 top-0"
            animate={{ translateX: isXNext ? 0 : 215 }}
          ></motion.div>
          <div className="text-5xl grow h-16 mt-1 z-20">{p1}</div>
          <div className="text-5xl grow h-16 mt-1 z-30">{p2}</div>
        </div>

        <div className="grid grid-cols-3 gap-2 bg-white p-3 rounded-md">
          {[0, 1, 2].map((row) => (
            <div key={row} className="grid grid-rows-3 gap-2">
              {[0, 1, 2].map((col) => (
                <div
                  key={col}
                  className="flex items-center justify-center bg-gray-300 rounded-md"
                >
                  {renderSquare(row * 3 + col)}
                </div>
              ))}
            </div>
          ))}
        </div>
        <button
          className="btn bg-red-700 text-white text-xl mt-4"
          onClick={resetGame}
        >
          Reset Game
        </button>
      </div>
    </div>
  );
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
};

export default TicTacToe;
