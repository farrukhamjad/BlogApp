import React from 'react'

function Spinner() {
  return (
    <div className='spin-loading bg-black h-screen flex justify-center items-center w-full'>
        <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div> 
    </div>
  )
}

export default Spinner
