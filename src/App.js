import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Home from "./components/Home";
import Selection from "./components/Selection";
import GameMode from "./components/GameMode";
import End from "./components/End";
import TicTacToe from './components/TicTacToe';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exec path="/" element={<Home />} />
          <Route exec path="/select" element={<Selection />} />
          <Route exec path="/gameMode" element={<GameMode />} />
          <Route exec path="/game" element={<TicTacToe />} />
          <Route exec path="/end" element={<End />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
