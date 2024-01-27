import React from 'react'

function Selection() {
  return (
    <>
    <div className='flex justify-center items-center h-screen'>
        <div className='bg-white h-[27%] w-[25%] rounded-lg'>
            <div className='text-black font-semibold text-2xl border-gray-200 border-b-2 w-full flex justify-center py-3'>Select Who You Want To Be</div>
        <div className='text-black flex justify-evenly h-[50%]'>
        <button className="btn btn-ghost text-7xl mt-5">😈</button>
            <div className='font-bold text-3xl flex justify-center items-center'>OR</div>
            <button className="btn btn-ghost text-7xl mt-5">🙉</button>
        </div>
        <div className='flex justify-center mt-3'>
            <button className='btn btn-glass mx-3 text-2xl w-40 text-white bg-blue-700'>Back</button>
            <button className='btn btn-glass mx-3 text-2xl w-40 text-white bg-black'>Play</button>
        </div>
        </div>
    </div>
    </>
  )
}

export default Selection