import React, { useState, useEffect } from "react";
import {
  FaGem,
  FaEye,
  FaHeart,
  FaStar,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
// Using placeholder images
import gold9 from "../../assets/gold9.jpg";
import gold10 from "../../assets/gold10.jpg";
import gold12 from "../../assets/gold12.jpg";
import gold13  from "../../assets/gold13.jpg";
import gold14 from "../../assets/gold14.jpg";
import gold15 from "../../assets/gold16.jpg";

const Gallery = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [favorites, setFavorites] = useState(new Set());

  const goldItems = [
    {
      id: 1,
      src: gold9,
      title: "22K Arabic Gold Necklaces",
      description: "Traditional Lebanese designs with authentic Arabic calligraphy",
      category: "Necklaces",
      price: "Starting at $850",
      rating: 4.9,
      featured: true,
    },
    {
      id: 2,
      src: gold10,
      title: "Gold Investment Coins",
      description: "Collectible limited edition Middle Eastern gold coins",
      category: "Coins",
      price: "Starting at $420",
      rating: 4.8,
      featured: false,
    },
    {
      id: 3,
      src: gold12,
      title: "Bridal Gold Jewelry Sets",
      description: "Complete bridal sets with traditional Arabic patterns",
      category: "Bridal Sets",
      price: "Starting at $1,200",
      rating: 5.0,
      featured: true,
    },
    {
      id: 4,
      src: gold13,
      title: "Islamic Calligraphy Rings",
      description: "Personalized rings with Quranic verses and Arabic names",
      category: "Rings",
      price: "Starting at $380",
      rating: 4.9,
      featured: false,
    },
    {
      id: 5,
      src: gold14,
      title: "Traditional Gold Bracelets",
      description: "Handcrafted Lebanese gold bracelets with intricate details",
      category: "Bracelets",
      price: "Starting at $650",
      rating: 4.7,
      featured: true,
    },
    {
      id: 6,
      src: gold15,
      title: "Damascus Pattern Pendants",
      description: "Sterling silver pendants with traditional Damascus patterns",
      category: "Pendants",
      price: "Starting at $290",
      rating: 4.6,
      featured: false,
    },
  ];

  const featuredItems = goldItems.filter((item) => item.featured);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredItems.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [featuredItems.length]);

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredItems.length) % featuredItems.length);
  };

  // Animation variants
  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const gemVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: { duration: 0.6, ease: "backOut" },
    },
  };

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const carouselContentVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
    exit: (direction) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  const gridContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const gridItemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const ctaVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <div className="px-4 md:px-8 min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Enhanced Title Section */}
<motion.div
      className="text-center mb-16 max-w-4xl mx-auto"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={headerVariants}
    >
      <div className="flex items-center justify-center gap-3 my-6">
        {/* Left Gem Icon - Bottom to Top */}
        <motion.div
          initial={{ opacity: 0, y: 50, rotate: -180 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        >
          <FaGem className="text-3xl text-amber-600" />
        </motion.div>

        {/* Heading - Bottom to Top */}
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-gray-800"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          Our Exquisite Collection
        </motion.h2>

        {/* Right Gem Icon - Bottom to Top */}
        <motion.div
          initial={{ opacity: 0, y: 50, rotate: 180 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        >
          <FaGem className="text-3xl text-amber-500" />
        </motion.div>
      </div>

      {/* Decorative Line - Bottom to Top with scale */}
      <motion.div
        className="w-24 h-1 bg-gradient-to-r from-[#ffb056] via-[#f59426] to-[#ffb157] mx-auto mb-6"
        initial={{ opacity: 0, scaleX: 0, y: 30 }}
        whileInView={{ opacity: 1, scaleX: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
      />

      {/* Description - Bottom to Top */}
      <motion.p
        className="text-xl text-gray-600 leading-relaxed"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
      >
        Discover authentic Arabic gold jewelry crafted with 40+ years of expertise. Each piece
        reflects our commitment to traditional Middle Eastern artistry and modern elegance.
      </motion.p>
    </motion.div>

      {/* Featured Carousel */}
      <motion.div
        className="mb-16"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="relative max-w-6xl mx-auto">
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={currentSlide}
                className="grid grid-cols-1 lg:grid-cols-2 h-[500px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Image Section */}
                <div className="relative overflow-hidden">
                  <motion.img
                    src={featuredItems[currentSlide].src}
                    alt={featuredItems[currentSlide].title}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.8 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>

                {/* Content Section */}
                <motion.div
                  className="bg-[#fca139] p-8 lg:p-12 flex flex-col justify-center text-white"
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="mb-4">
                    <motion.span
                      className="inline-block bg-white text-amber-600 px-3 py-1 rounded-full text-sm font-semibold mb-4"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.4 }}
                    >
                      {featuredItems[currentSlide].category}
                    </motion.span>
                    <motion.h4
                      className="text-3xl lg:text-4xl font-bold mb-4"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      {featuredItems[currentSlide].title}
                    </motion.h4>
                    <motion.p
                      className="text-xl text-amber-100 mb-6 leading-relaxed"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      {featuredItems[currentSlide].description}
                    </motion.p>
                  </div>

                  <motion.div
                    className="flex items-center gap-4 mb-6"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ duration: 0.3, delay: 0.6 + i * 0.05 }}
                        >
                          <FaStar
                            className={`text-lg ${
                              i < Math.floor(featuredItems[currentSlide].rating)
                                ? "text-yellow-300"
                                : "text-yellow-500 opacity-30"
                            }`}
                          />
                        </motion.div>
                      ))}
                      <span className="ml-2 text-white font-semibold">
                        {featuredItems[currentSlide].rating}
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-white">
                      {featuredItems[currentSlide].price}
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex gap-4"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                  >
                    <motion.button
                      to={'/collection'}
                      className="px-6 py-3 bg-white text-amber-600 font-bold rounded-lg hover:bg-amber-100 transition-colors cursor-pointer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link to={"/collection"}>View Collection </Link>
                    </motion.button>
                  </motion.div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Carousel Controls */}
          <motion.button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-3 rounded-full shadow-lg transition-all"
            whileHover={{ scale: 1.1, x: -2 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaChevronLeft className="text-gray-800" />
          </motion.button>
          <motion.button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-3 rounded-full shadow-lg transition-all"
            whileHover={{ scale: 1.1, x: 2 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaChevronRight className="text-gray-800" />
          </motion.button>

          {/* Slide Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {featuredItems.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? "bg-white" : "bg-white bg-opacity-50"
                }`}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
                animate={{ scale: index === currentSlide ? 1.2 : 1 }}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Enhanced Gallery Grid */}
      <div className="mb-16">
        <motion.h3
          className="text-2xl font-bold text-gray-800 mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Complete Collection
        </motion.h3>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {goldItems.map((item) => (
            <motion.div
              key={item.id}
              variants={gridItemVariants}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              whileHover={{ y: -8 }}
            >
              {/* Image Container */}
              <div className="relative aspect-square overflow-hidden">
                <motion.img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                />

                {/* Gradient Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredItem === item.id ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Category Badge */}
                <motion.div
                  className="absolute top-4 left-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold"
                  initial={{ x: -100, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {item.category}
                </motion.div>

                {/* Hover Content */}
                <motion.div
                  className="absolute inset-0 flex flex-col justify-end p-6 text-white"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{
                    y: hoveredItem === item.id ? 0 : 20,
                    opacity: hoveredItem === item.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-200 mb-3">{item.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={`text-sm ${
                            i < Math.floor(item.rating) ? "text-yellow-400" : "text-gray-400"
                          }`}
                        />
                      ))}
                      <span className="ml-1 text-sm">{item.rating}</span>
                    </div>
                    <span className="text-lg font-bold">{item.price}</span>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <motion.button
                      className="flex-1 bg-amber-500 text-white py-2 px-4 rounded-lg hover:bg-amber-700 transition-colors font-semibold cursor-pointer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View Collection
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Enhanced CTA Section */}
      <motion.div
        className="text-center mb-16"
        variants={ctaVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="bg-[#fca43f] rounded-3xl p-12 max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: "60px 60px",
              }}
            />
          </div>

          <div className="relative z-10">
            <motion.h3
              className="text-3xl md:text-4xl font-bold text-white mb-4"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Experience Authentic Arabic Jewelry
            </motion.h3>
            <motion.p
              className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Visit our showroom in Terrytown or browse our complete collection online. Each piece
              comes with a certificate of authenticity and lifetime craftsmanship guarantee.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.button
                className="px-8 py-4 bg-white text-amber-600 font-bold text-lg rounded-xl hover:bg-amber-100 transition-all duration-300 shadow-lg cursor-pointer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to={"/collection"}>VIEW FULL COLLECTION</Link>
              </motion.button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              className="flex flex-wrap justify-center gap-6 mt-8 text-white"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {[
                { icon: FaGem, text: "Authentic Gold" },
                { icon: FaStar, text: "40+ Years Heritage" },
                { icon: FaHeart, text: "1000+ Happy Customers" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-2"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <item.icon className="text-yellow-300" />
                  <span className="text-sm font-semibold">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Gallery;