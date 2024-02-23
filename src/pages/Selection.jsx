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

  console.log(single);

  const navigate = useNavigate();

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

  const handleClose = () => {
    setIsOpen1(false);
    setIsOpen2(false);
  };

  const handleEmojiClick1 = (emoji) => {
    setClickedEmoji1(emoji);
    handleClose();
  };

  const handleEmojiClick2 = (emoji) => {
    setClickedEmoji2(emoji);
    handleClose();
  };

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
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white h-[27%] w-[25%] rounded-lg">
          <div className="text-black font-semibold text-2xl border-gray-200 border-b-2 w-full flex justify-center py-3">
            Select Who You Want To Be
          </div>
          <div className="text-black flex justify-evenly h-[50%]">
            <button
              className="btn btn-ghost btn-circle text-7xl mt-5"
              onClick={handleToggle1}
            >
              {clickedEmoji1}
            </button>

            <div className="font-bold text-3xl flex justify-center items-center">
              OR
            </div>
            <button
              className="btn btn-ghost btn-circle text-7xl mt-5"
              onClick={handleToggle2}
            >
              {clickedEmoji2}
            </button>
          </div>
          {errorMessage && (
            <div
              role="alert"
              className="absolute top-2 left-[25vw] w-[50%] alert alert-error"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{errorMessage}</span>
            </div>
          )}
          <div className="flex justify-center mt-3">
            <Link
              to="/"
              className="btn btn-glass mx-3 text-2xl w-40 text-white bg-blue-700"
            >
              Back
            </Link>
            <button
              className="btn btn-glass mx-3 text-2xl w-40 text-white bg-black"
              onClick={handlePlayClick}
            >
              Play
            </button>
          </div>
        </div>
        {isOpen1 && <EmojiBox onEmojiClick={handleEmojiClick1} />}
        {isOpen2 && <EmojiBox onEmojiClick={handleEmojiClick2} />}
      </div>
    </>
  );
}

export default Selection;
