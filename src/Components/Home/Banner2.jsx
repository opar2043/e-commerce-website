import { useState, useEffect } from "react";
import Banner from "../../assets/banner5.jpg";
import { FaGem } from "react-icons/fa";
import { motion } from "framer-motion";

const Banner2 = () => {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleShopNow = () => {
    console.log("Shop Now clicked!");
  };

  // Unified bottom-to-top animation variants
  const bottomToTopVariants = {
    hidden: { 
      opacity: 0, 
      y: 50 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const decorativeCircle1Variants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 0.2,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
  };

  const decorativeCircle2Variants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 0.2,
      transition: {
        duration: 1,
        delay: 0.2,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 1.1 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      className="flex flex-col md:flex-row w-full min-h-[350px] overflow-hidden font-['Cormorant_Garamond'] my-6 md:mb-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      {/* Content Section */}
      <div 
        className="relative flex-1 bg-[#fca94b] p-8 md:p-12 flex flex-col justify-center items-start overflow-hidden min-h-[300px]"
        style={{
          backgroundImage: "radial-gradient(circle at 20% 70%, rgba(255,255,255,0.2) 0%, transparent 40%)",
        }}
      >
        {/* Decorative Circles */}
        <motion.div
          className="absolute w-48 h-48 rounded-full bg-white opacity-20 -top-12 -right-12"
          variants={decorativeCircle1Variants}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute w-32 h-32 rounded-full bg-white opacity-20 -bottom-8 -left-8"
          variants={decorativeCircle2Variants}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.25, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Decorative Diamond */}
        <motion.div
          className="absolute w-20 h-20 bg-gradient-to-br from-transparent via-white/30 to-transparent rotate-45 right-10 bottom-10 opacity-70"
          initial={{ opacity: 0, scale: 0, rotate: 45 }}
          animate={{ 
            opacity: 0.7, 
            scale: [1, 1.1, 1],
            rotate: 45,
          }}
          transition={{
            opacity: { duration: 0.8, delay: 0.5 },
            scale: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        />
        
        <div className="relative z-10 w-full">
          {/* Content and price in a row */}
          <div className="flex flex-col md:flex-row justify-between items-start w-full mb-6">
            <div className="flex-1 max-w-md">
              {/* Subtitle - Bottom to Top */}
              <motion.h2
                className="text-lg md:text-xl font-medium text-amber-900 mb-4 italic"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              >
                Looking For the Latest
              </motion.h2>

              {/* Main Heading - Bottom to Top */}
              <motion.h3
                className="text-xl md:text-4xl font-semibold text-gray-900 mb-2"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              >
                Trending Collection
              </motion.h3>

              {/* Description - Bottom to Top */}
              <motion.p
                className="text-lg text-amber-950 mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              >
                Discover our exquisite summer jewelry collection, designed to add a touch of elegance to your warm-weather style. Handcrafted with precision and care.
              </motion.p>
            </div>

            {/* Price Circle - Bottom to Top */}
            <motion.div
              className="flex flex-col items-center justify-center rounded-full bg-[#181818] text-white p-4 w-24 h-24 md:w-28 md:h-28 md:ml-6"
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
              whileHover={{ 
                scale: 1.1,
                rotate: 5,
                transition: { duration: 0.3 },
              }}
            >
              <FaGem className="text-amber-300 mb-1 text-sm md:text-base" />
              <p className="text-xs md:text-sm">Start From</p>
              <p className="text-xl md:text-2xl font-bold">$200</p>
            </motion.div>
          </div>
          
          {/* Button - Bottom to Top */}
          <motion.button
            onClick={handleShopNow}
            className="px-6 py-2 border border-slate-950 text-slate-950 font-semibold hover:bg-white hover:text-black transition-all duration-300"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
            whileHover={{ 
              scale: 1.05,
              borderWidth: "2px",
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.95 }}
          >
            MAKE ORDER
          </motion.button>
        </div>
      </div>

      {/* Image Section */}
      <motion.div 
        className="relative flex-1 min-h-[300px]"
        variants={imageVariants}
      >
        <motion.img 
          src={Banner} 
          alt="Elegant jewelry collection" 
          className="w-full h-full object-cover"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        />
        {/* Gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[#FEB564]/30 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </motion.div>
    </motion.div>
  );
};

export default Banner2;