import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import EmojiBox from "./EmojiBox";

function Selection() {
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [clickedEmoji1, setClickedEmoji1] = useState("❓");
  const [errorMessage, setErrorMessage] = useState(null);
  const single = useLocation().state?.single;
  const initialClickedEmoji2 = single ? "🤖" : "❓";
  const [clickedEmoji2, setClickedEmoji2] = useState(initialClickedEmoji2);

  // Navigation hook
  const navigate = useNavigate();

  // Toggle handlers
  const handleToggle1 = () => {
    if (isOpen2 === true) {
      setIsOpen2(false);
      setIsOpen1(true);
    } else setIsOpen1(!isOpen1);
  };

  const handleToggle2 = () => {
    if (single) return null;
    else setIsOpen2(!isOpen2);
    if (isOpen1 === true) {
      setIsOpen1(false);
      setIsOpen2(true);
    } else setIsOpen2(!isOpen1);
  };

  // Close emoji selection
  const handleClose = () => {
    setIsOpen1(false);
    setIsOpen2(false);
  };

  // Handle emoji selection
  const handleEmojiClick1 = (emoji) => {
    setClickedEmoji1(emoji);
    handleClose();
  };

  const handleEmojiClick2 = (emoji) => {
    setClickedEmoji2(emoji);
    handleClose();
  };

  // Handle play button click
  const handlePlayClick = () => {
    if (single) {
      if (clickedEmoji1 === "❓") {
        setErrorMessage("Please change the emoji");
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      } else if (clickedEmoji1 === clickedEmoji2) {
        setErrorMessage("Please use different emoji");
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      } else {
        navigate("/gameMode", {
          state: { clickedEmoji1, clickedEmoji2 },
        });
      }
    } else {
      if (clickedEmoji1 === "❓" || clickedEmoji2 === "❓") {
        setErrorMessage("Please change the emoji");
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      } else if (clickedEmoji1 === clickedEmoji2) {
        setErrorMessage("Please use different emojis");
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      } else {
        navigate("/game", {
          state: { clickedEmoji1, clickedEmoji2 },
        });
      }
    }
  };

  return (
    <div className="flex lg:flex-row flex-col justify-center items-center h-screen">
      {/* Selection Box */}
      <div className="bg-white rounded-lg p-4 w-full max-w-lg">
        <div className="text-black font-semibold text-3xl border-b-2 border-gray-200 py-3 text-center">
          Select Who You Want To Be
        </div>
        <div className="text-black flex justify-evenly items-center h-40 lg:items-start lg:pt-10">
          <button
            className="btn btn-ghost btn-circle text-7xl mx-2"
            onClick={handleToggle1}
          >
            {clickedEmoji1}
          </button>
          <div className="font-bold text-3xl lg:mt-5">v/s</div>
          <button
            className="btn btn-ghost btn-circle text-7xl mx-2"
            onClick={handleToggle2}
          >
            {clickedEmoji2}
          </button>
        </div>
        {/* Error message */}
        {errorMessage && (
          <div className="w-full mt-2">
            <div
              role="alert"
              className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-red-200 border border-red-400 text-red-700 px-4 py-2 rounded-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 inline-block mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <span>{errorMessage}</span>
            </div>
          </div>
        )}
        <div className="flex justify-center mt-4">
          <Link
            to="/"
            className="btn btn-glass mx-2 text-2xl w-40 text-white bg-blue-700"
          >
            Back
          </Link>
          <button
            className="btn btn-glass mx-2 text-2xl w-40 text-white bg-black"
            onClick={handlePlayClick}
          >
            Play
          </button>
        </div>
      </div>
      {isOpen1 && <EmojiBox onEmojiClick={handleEmojiClick1} />}
      {isOpen2 && <EmojiBox onEmojiClick={handleEmojiClick2} />}
    </div>
  );
}

export default Selection;
