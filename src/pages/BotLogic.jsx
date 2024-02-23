// Function to determine the winner based on the current state of the board
const calculateWinner = (squares) => {
  // Define all possible winning combinations
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

  // Check each winning combination
  for (const [a, b, c] of lines) {
    // If the squares in the current combination have the same symbol
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      // Return the symbol of the winner
      return squares[a];
    }
  }

  // If there's no winner, return null
  return null;
};

// Function to handle the bot's move in the game
export const handleBotMove = (
  board,
  isXNext,
  p1,
  p2,
  winner,
  navigate,
  getStatus,
  clickedEmoji1,
  clickedEmoji2,
  easy,
  setIsXNext,
  setBoard
) => {
  // Function to get a random empty cell on the board
  const getRandomEmptyCell = (board) => {
    const emptyCells = [];
    for (let i = 0; i < board.length; i++) {
      if (!board[i]) {
        emptyCells.push(i);
      }
    }
    if (emptyCells.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    return emptyCells[randomIndex];
  };

  // Function to determine the bot's move in easy mode
  const easyBotMove = (board) => {
    const index = getRandomEmptyCell(board);
    return index;
  };

  // Function to determine the bot's move in hard mode
  const hardBotMove = (board, player) => {
    // Check if the bot can win with the next move
    for (let i = 0; i < board.length; i++) {
      if (!board[i]) {
        const copy = board.slice();
        copy[i] = player;
        // If the bot wins with this move, return the index
        if (calculateWinner(copy) === player) {
          return i;
        }
      }
    }

    // If the opponent can win with the next move, block it
    const opponent = player === p1 ? p2 : p1;
    for (let i = 0; i < board.length; i++) {
      if (!board[i]) {
        const copy = board.slice();
        copy[i] = opponent;
        // If the opponent wins with this move, block it
        if (calculateWinner(copy) === opponent) {
          return i;
        }
      }
    }

    // If no winning or blocking move is found, make a random move
    return getRandomEmptyCell(board);
  };

  // Determine the bot's move based on the game mode and difficulty level
  if (!isXNext && easy !== undefined) {
    if (easy) {
      // Easy mode: make a random move after a short delay
      setTimeout(() => {
        const index = easyBotMove(board);
        const newBoard = board.slice();
        newBoard[index] = p2;
        setBoard(newBoard);
        setIsXNext(true);
      }, 1000);
    } else {
      // Hard mode: make a strategic move after a short delay
      setTimeout(() => {
        const index = hardBotMove(board, p2);
        const newBoard = board.slice();
        newBoard[index] = p2;
        setBoard(newBoard);
        setIsXNext(true);
      }, 1000);
    }
  }
};
