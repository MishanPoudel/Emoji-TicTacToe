import React from "react";
import '../App.css';

function Home() {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="bg-white h-24 w-24 rounded-md"></div>
        <p className="text-5xl font-bold my-16 h-14">Emoji TicTacToe</p>
        <div className="w-[25%] flex justify-between px-12">
            <button className="btn btn-ghost text-2xl my-6 bg-white text-black">Single-Player</button>
            <button className="btn btn-ghost text-2xl my-6 bg-white text-black">Multi-Player</button>
        </div>
      </div>
    </>
  );
}

export default Home;
