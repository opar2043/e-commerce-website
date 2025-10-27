import React from "react";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { motion } from "framer-motion";

import banner1 from "../../assets/banner.jpg";
import banner2 from "../../assets/banner2.jpg";
import banner3 from "../../assets/banner3.jpg";
import banner4 from "../../assets/banner4.jpg";
import banner5 from "../../assets/whitebrand.jpg";

const Banner = () => {
  const slides = [
    {
      img: banner5,

    },
    {
      img: banner1,
      title: "Jewellery For The Feminine in You",
      description: "Take a moment and cherish the grand collection",
      button: "MAKE ORDER",
      link: "/order",
    },
    {
      img: banner2,
      title: "Explore Our Gold Collection",
      description: "Finest handcrafted jewellery for every occasion",
      button: "VIEW COLLECTION",
      link: "/collection",
    },
    {
      img: banner3,
      title: "Diamonds That Define Elegance",
      description: "Shine bright with timeless diamond pieces",
      button: "SHOP NOW",
      link: "/shop",
    },
    {
      img: banner4,
      title: "Silver That Sparks Style",
      description: "Trendy designs made with sterling silver",
      button: "DISCOVER",
      link: "/discover",
    },
  ];

  return (
    <section className="relative">
      <Carousel
        infiniteLoop
        autoPlay
        interval={4000}
        transitionTime={900}
        showStatus={false}
        showThumbs={false}
        swipeable
        emulateTouch
        showArrows={false}
        stopOnHover
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="relative rounded-md w-full h-[60vh] md:h-[60vh] flex items-center justify-center text-center"
          >
            {/* Background Image */}
            <img
              src={slide.img}
              alt={`Slide ${index + 1}`}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Gradient Overlay */}
            {
              slide.title && <div className="absolute inset-0  bg-gradient-to-r from-black/60 to-transparent" />
            }

            {/* Text + Button with Animation */}
            <div className="relative z-10 max-w-2xl px-6">
              <motion.h2
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl md:text-5xl font-semibold text-[#E4C496]
                [text-shadow:_0_2px_8px_rgb(254_202_162_/_50%)]
                transition-all duration-300 mb-2"
              >
                {slide.title}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg md:text-2xl text-gray-200 mb-4 font-light"
              >
                {slide.description}
              </motion.p>

             {
              slide.button &&               <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Link to={"/collection"}>
                  <button className="px-9 py-4 border border-transparent text-slate-900/90 font-semibold text-sm
                      bg-gradient-to-r from-[#D9AF7F] to-[#ECD4AA]
                     hover:from-[#E5C191] hover:to-[#F5E0BF]
                      hover:shadow-lg hover:shadow-amber-200/50
                      transition-all duration-300 rounded-3xl">
                    VIEW COLLECTION
                  </button>
                </Link>
              </motion.div>
             }
            </div>
          </div>
        ))}
      </Carousel>
    </section>
  );
};

export default Banner;