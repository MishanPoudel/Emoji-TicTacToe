import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [emojiList, setEmojiList] = useState([]);
  const [randomEmoji, setRandomEmoji] = useState("🐒");
  const navigate = useNavigate();

  const handleClickSingle = () => {
    navigate("/select", { state: { single: true } });
  };

  const handleClickMulti = () => {
    navigate("/select", { state: { single: false } });
  };

  useEffect(() => {
    const apiKey = process.env.REACT_APP_EMOJI_API_KEY;

    if (!apiKey) {
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://emoji-api.com/emojis?access_key=${apiKey}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setEmojiList(data);
      } catch (error) {
        console.error("Error fetching emoji data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (emojiList.length > 0) {
        const randomIndex = Math.floor(Math.random() * emojiList.length);
        setRandomEmoji(emojiList[randomIndex].character);
      }
      console.log("next");
    }, 1300);

    return () => clearInterval(intervalId);
  }, [emojiList]);

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="bg-white h-24 w-24 rounded-md">
          <button className="btn btn-ghost btn-circle text-5xl m-6">
            {randomEmoji}
          </button>
        </div>
        <p className="text-5xl font-bold my-16 h-14">Emoji TicTacToe</p>
        <div className="w-[25%] flex justify-between px-12">
          <button
            onClick={handleClickSingle}
            className="btn btn-ghost text-2xl my-6 bg-white text-black"
          >
            Single-Player
          </button>
          <button
            onClick={handleClickMulti}
            className="btn btn-ghost text-2xl my-6 bg-white text-black"
          >
            Multi-Player
          </button>
        </div>
      </div>
    </>
  );
}

export default Home;
