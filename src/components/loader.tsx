import React from 'react'
import loader from '../../public/loader2.svg';

const Loader = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
        <img src={loader} alt='Loading...'/>
    </div>
  )
}

export default Loader