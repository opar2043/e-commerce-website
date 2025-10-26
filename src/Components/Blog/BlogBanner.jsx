import { FaCalendarAlt, FaUser, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Using placeholder images - replace with your actual imports
import banner from "../../assets/blog.jpg";
import blog1 from "../../assets/gold1.jpg";
import blog2 from "../../assets/gold2.jpg";
import blog3 from "../../assets/gold3.jpg";
import blog4 from "../../assets/gold4.jpg";

const BlogBanner = () => {
  const blogs = [
    {
      id: 1,
      name: "The Timeless Beauty of Gold Jewelry",
      date: "2025-09-01",
      blog: "Gold jewelry has been cherished for centuries as a symbol of wealth, beauty, and tradition. From ancient civilizations to modern fashion, gold remains unmatched in elegance. In this blog, we explore why gold is still the number one choice for weddings, festivals, and everyday wear.",
      writer: "Tannous Jewelry",
      image: blog1,
    },
    {
      id: 2,
      name: "How to Choose the Perfect Gold Necklace",
      date: "2025-09-03",
      blog: "Selecting a gold necklace can be tricky, especially with so many designs and purity levels available. This guide helps you understand karats, weight, and styles so you can pick the perfect necklace that matches your personality and occasion.",
      writer: "Tannous Jewelry",
      image: blog2,
    },
    {
      id: 3,
      name: "Why Gold is the Best Investment ",
      date: "2025-09-05",
      blog: "Beyond beauty, gold is one of the safest investments in the world. In 2025, with market uncertainty, gold continues to shine as a secure asset. We explain why buying gold jewelry or coins is a smart choice for your financial future.",
      writer: "Tannous Jewelry",
      image: blog3,
    },
    {
      id: 4,
      name: "Caring for Your Gold Jewelry",
      date: "2025-09-07",
      blog: "Gold is durable but still requires care to maintain its shine. Learn the best tips for cleaning, storing, and protecting your gold jewelry so it lasts a lifetime without losing its brilliance.",
      writer: "Tannous Jewelry",
      image: blog4,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.95 
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const bannerVariants = {
    hidden: { 
      opacity: 0,
      x: 100 
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const bannerContentVariants = {
    hidden: { 
      opacity: 0,
      y: 30 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row-reverse gap-6 p-6 bg-gray-50 min-h-screen">
      {/* Left Blog Cards */}
      <motion.div 
        className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {blogs.map((blog, index) => (
          <motion.div
            key={blog.id}
            variants={cardVariants}
            whileHover={{ 
              y: -8,
              transition: { duration: 0.3 }
            }}
            className="bg-white overflow-hidden shadow-lg"
          >
            <motion.div
              className="overflow-hidden"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
            >
              <img
                src={blog.image}
                alt={blog.name}
                className="w-full h-48 object-cover"
              />
            </motion.div>
            <div className="p-5">
              <motion.div 
                className="flex items-center text-sm text-[#191919] mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.15 }}
              >
                <span className="flex items-center mr-3">
                  <FaUser className="mr-1" /> {blog.writer}
                </span>
                <span className="flex items-center">
                  <FaCalendarAlt className="mr-1" /> {blog.date}
                </span>
              </motion.div>
              <motion.h3 
                className="text-lg font-semibold mb-4 text-[#191919]"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.15 }}
              >
                {blog.name}
              </motion.h3>
              <motion.p 
                className="text-gray-700 text-md mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.15 }}
              >
                {blog.blog.substring(0, 80)}...
              </motion.p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 + index * 0.15 }}
              >
                <Link
                  to={"/collection"}
                  className="px-4 py-2 border border-gray-800 text-gray-800 font-medium text-sm hover:bg-gray-800 hover:text-white transition-all duration-300 flex items-center"
                >
                  View Collection <FaArrowRight className="ml-2" />
                </Link>
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Right Banner */}
      <motion.div 
        className="lg:w-1/2 relative flex items-center justify-center overflow-hidden"
        variants={bannerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.img
          src={banner}
          alt="Gold Banner"
          className="w-full h-full object-cover absolute inset-0"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <motion.div 
          className="relative z-10 text-center text-white p-8 max-w-md"
          variants={bannerContentVariants}
        >
          <motion.h2 
            className="text-6xl font-serif mb-2 italic"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            Arabic Style
          </motion.h2>
          <motion.p 
            className="text-3xl font-light mb-8 italic"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            Antique Jewellery
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
          >
            <Link
              to={"/collection"}
              className="px-8 py-3 border-2 border-white text-white font-semibold text-lg hover:bg-white hover:text-gray-800 transition-all duration-300 flex items-center"
            >
              View Collection <FaArrowRight className="ml-2" />
            </Link>
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default BlogBanner;