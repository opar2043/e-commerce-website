import React from 'react'

const Title = ({head , head2 , para}) => {
  return (
    <div className='flex justify-center flex-col items-center mb-5  md:mt-10'>
          <div className='flex items-center mb-3'>
             <h2 className='text-2xl md:text-4xl font-bold text-black italic'>{head} <span className='text-[#f78809]'>{head2}</span></h2>
             <div className="border-t-2 border-[#f78809] w-12 sm:w-16 mt-3 ml-1"></div>
          </div>
        <p className='text-slate-950 text-center italic'>{para}</p>
    </div>
  )
}

export default Title