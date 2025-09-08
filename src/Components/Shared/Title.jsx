import React from 'react'

const Title = ({head  , para}) => {
  return (
    <div className='flex justify-center flex-col items-center mb-5 bg-[#F9FAFB] md:my-10'>
          <div className='flex items-center mb-3'>
             <h2 className='text-2xl md:text-4xl  text-black/90 font-light italic'>{head}</h2>
          </div>
        <p className='text-gray-500 text-center font-light italic'>{para}</p>
    </div>
  )
}

export default Title