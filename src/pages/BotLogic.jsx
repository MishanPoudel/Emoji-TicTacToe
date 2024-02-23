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
  
  export const handleBotMove = (board, isXNext, p1, p2, winner, navigate, getStatus, clickedEmoji1, clickedEmoji2, easy, setIsXNext, setBoard) => {
    const getRandomEmptyCell = (board) => {
      const emptyCells = [];
      for (let i = 0; i < board.length; i++) {
        if (!board[i]) {
          emptyCells.push(i);
        }
      }
      if (emptyCells.length === 0) return null; // Board is full
      const randomIndex = Math.floor(Math.random() * emptyCells.length);
      return emptyCells[randomIndex];
    };
  
    const easyBotMove = (board) => {
      const index = getRandomEmptyCell(board);
      return index;
    };
  
    const hardBotMove = (board, player) => {
        console.log("i am hard bot")
      for (let i = 0; i < board.length; i++) {
        if (!board[i]) {
          const copy = board.slice();
          copy[i] = player;
          if (calculateWinner(copy) === player) {
            return i;
          }
        }
      }
  
      const opponent = player === p1 ? p2 : p1;
      for (let i = 0; i < board.length; i++) {
        if (!board[i]) {
          const copy = board.slice();
          copy[i] = opponent;
          if (calculateWinner(copy) === opponent) {
            return i;
          }
        }
      }
  
      return getRandomEmptyCell(board);
    };
  
    if (!isXNext && easy !== undefined) {
      if (easy) {
        setTimeout(() => {
          const index = easyBotMove(board);
          const newBoard = board.slice();
          newBoard[index] = p2;
          setBoard(newBoard);
          setIsXNext(true);
        }, 1200); 
      } else {
        setTimeout(() => {
          const index = hardBotMove(board, p2);
          const newBoard = board.slice();
          newBoard[index] = p2;
          setBoard(newBoard);
          setIsXNext(true);
        }, 1200); 
      }
    }
  };
  