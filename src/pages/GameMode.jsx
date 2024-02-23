import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function GameMode() {
  // Extract state from location
  const { state } = useLocation();
  const { clickedEmoji1, clickedEmoji2 } = state || {};
  const navigate = useNavigate();

  // Click handlers for game modes
  const handleClick1 = () => {
    navigate("/game", { state: { clickedEmoji1, clickedEmoji2, easy: true } });
  };
  const handleClick2 = () => {
    navigate("/game", { state: { clickedEmoji1, clickedEmoji2, easy: false } });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white w-full lg:w-[35%] rounded-lg px-5">
        {/* Game mode selection */}
        <div className="text-black font-semibold text-3xl border-gray-200 border-b-2 w-full flex justify-center py-3">
          Select The Game Mode
        </div>
        <div className="flex justify-center my-3">
          <button
            onClick={handleClick1}
            className="btn btn-glass mx-3 text-2xl w-40 text-white bg-blue-700"
          >
            Easy
          </button>
          <button
            onClick={handleClick2}
            className="btn btn-glass mx-3 text-2xl w-40 text-white bg-black"
          >
            Hard
          </button>
        </div>
      </div>
    </div>
  );
}

export default GameMode;
