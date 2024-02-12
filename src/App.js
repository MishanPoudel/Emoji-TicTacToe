import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Selection from "./pages/Selection";
import GameMode from "./pages/GameMode";
import End from "./pages/End";
import TicTacToe from "./pages/TicTacToe";
import EmojiApi from "./pages/EmojiApi";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/select" element={<Selection />} />
          <Route exact path="/gameMode" element={<GameMode />} />
          <Route exact path="/game" element={<TicTacToe />} />
          <Route exact path="/end" element={<End />} />
          <Route exact path="/emoji" element={<EmojiApi />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
