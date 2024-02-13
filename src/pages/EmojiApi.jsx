import React, { useEffect, useState } from "react";
import EmojiBox from "./EmojiBox";
import Selection from "./Selection";

function EmojiApi() {
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [emojiList, setEmojiList] = useState([]);

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

  return (
    <>
      <EmojiBox emojiList={emojiList} onEmojiClick={setSelectedEmoji} />
      <Selection selectedEmoji={selectedEmoji} />
    </>
  );
}

export default EmojiApi;
