import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EmojiBox from './EmojiBox';

function Selection({ selectedEmoji, onEmojiClick }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className='flex justify-center items-center h-screen'>
        <div className='bg-white h-[27%] w-[25%] rounded-lg'>
          <div className='text-black font-semibold text-2xl border-gray-200 border-b-2 w-full flex justify-center py-3'>
            Select Who You Want To Be
          </div>
          <div className='text-black flex justify-evenly h-[50%]'>
            <button
              className="btn btn-ghost text-7xl mt-5"
              onClick={handleClick}
            >
              {selectedEmoji}
            </button>
            <div className='font-bold text-3xl flex justify-center items-center'>
              OR
            </div>
            <button
              className="btn btn-ghost text-7xl mt-5"
              onClick={handleClick}
            >
              {selectedEmoji}
            </button>
          </div>
          <div className='flex justify-center mt-3'>
            <Link
              to='/'
              className='btn btn-glass mx-3 text-2xl w-40 text-white bg-blue-700'
            >
              Back
            </Link>
            <Link
              to='/gameMode'
              className='btn btn-glass mx-3 text-2xl w-40 text-white bg-black'
            >
              Play
            </Link>
          </div>
        </div>
        {isOpen && <EmojiBox onEmojiClick={onEmojiClick} />}
      </div>
    </>
  );
}

export default Selection;
