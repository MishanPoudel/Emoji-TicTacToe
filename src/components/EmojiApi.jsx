import React, { useEffect, useState } from "react";
import EmojiBox from "./EmojiBox";
import Selection from "./Selection";
import TicTacToe from "./TicTacToe";

function EmojiApi() {
  const [emojiList, setEmojiList] = useState([]);
  const [selectedEmoji, setSelectedEmoji] = useState("");

  useEffect(() => {
    const apiKey = process.env.REACT_APP_EMOJI_API_KEY;

    if (!apiKey) {
      console.error("API key not provided.");
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://emoji-api.com/emojis?access_key=${apiKey}`
        );
        const data = await response.json();
        setEmojiList(data);
      } catch (error) {
        console.error("Error fetching emoji data:", error);
      }
    };

    fetchData();
  }, []);

  const handleEmojiClick = (emoji) => {
    setSelectedEmoji(emoji);
  };

  return (
    <>
      <Selection selectedEmoji={selectedEmoji} onEmojiClick={handleEmojiClick}/>
      <EmojiBox emojiList={emojiList} onEmojiClick={handleEmojiClick} />
      <TicTacToe selectedEmoji={selectedEmoji}/>
    </>
  );
}

export default EmojiApi;
