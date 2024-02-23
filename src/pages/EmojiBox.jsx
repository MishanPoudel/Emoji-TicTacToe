import React, { useEffect, useState } from "react";

function EmojiBox({ onEmojiClick }) {
  const [emojiList, setEmojiList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch emoji data when component mounts
  useEffect(() => {
    // Fetch emoji data using API key
    const apiKey = process.env.REACT_APP_EMOJI_API_KEY;

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

  // Handle search input changes
  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Handle emoji button click
  const handleClick = (emoji) => {
    onEmojiClick(emoji.character);
  };

  return (
    <>
      <div className="bg-blue-300 lg:max-w-[20%] px-6 py-4 h-[50vh] overflow-y-auto rounded-3xl lg:mt-0 mt-7 lg:ml-6">
        {/* Search input */}
        <input
          type="text"
          placeholder="Search Emoji"
          className="input input-bordered input-info w-full mb-5"
          onKeyUp={handleSearch}
        />
        {/* Emoji list */}
        <ul className="flex flex-wrap gap-2">
          {/* Map through emojiList and filter based on search term */}
          {emojiList &&
            emojiList
              .filter((emoji) => emoji.slug.toLowerCase().includes(searchTerm))
              .map((emoji, index) => (
                <button
                  className="btn btn-circle btn-outline hover:bg-gray-600 text-3xl h-12 w-12"
                  key={index}
                  emoji-name={emoji.slug}
                  onClick={() => handleClick(emoji)}
                >
                  {emoji.character}
                </button>
              ))}
        </ul>
      </div>
    </>
  );
}

export default EmojiBox;
