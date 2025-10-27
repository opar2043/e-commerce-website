import React from 'react';
import { motion } from 'framer-motion';

const Title = ({ head, para }) => {
  return (
    <div className='flex justify-center flex-col items-center my-7 bg-[#F9FAFB] md:my-12'>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className='flex items-center mb-3'
      >
        <h2 className='text-2xl md:text-5xl text-black/90 font-light italic'>{head}</h2>
      </motion.div>
      
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        className='text-gray-500 text-center font-light italic text-xl'
      >
        {para}
      </motion.p>
    </div>
  );
};

export default Title;