import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function End() {
  const { getStatus, winner, clickedEmoji1, clickedEmoji2, easy } = useLocation().state;
  console.log(easy, "end easy");

  return (
    <>
      <div className='flex justify-center items-center h-screen'>
        <div className='bg-white w-[25%] rounded-lg'>
          <div className='text-7xl w-full flex justify-center py-2'>{getStatus === `Congrats, ${winner} Won!` ? "🏆" : "🟰"}</div>
          <div className='text-black font-semibold text-3xl border-gray-200 border-b-2 w-full flex justify-center py-3 flex flex-col items-center'>{getStatus}
            {winner === "🤖" && <div className='text-lg'>Imagine losing to a bot 🫵😆</div>}
          </div>
          <div className='flex justify-center my-3'>
            <Link to="/game" state={{ clickedEmoji1, clickedEmoji2, easy }} className='btn btn-glass mx-3 text-2xl w-40 text-white bg-blue-700'>Back</Link>
            <Link to="/" className='btn btn-glass mx-3 text-2xl w-40 text-white bg-black'>Home</Link>
          </div>
        </div>
      </div>
    </>
  );
}
