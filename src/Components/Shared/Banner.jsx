import React from "react";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

import banner1 from "../../assets/banner.webp";
import banner2 from "../../assets/banner2.webp";
import banner3 from "../../assets/banner.webp";
import banner4 from "../../assets/banner2.webp";

const Banner = () => {
  const slides = [
    {
      img: banner1,
      title: "JEWELLERY FOR THE FEMININE IN YOU",
      description: "Take a moment and cherish the grand collection",
      button: "MAKE ORDER",
      link: "/order",
    },
    {
      img: banner2,
      title: "EXPLORE OUR GOLD COLLECTION",
      description: "Finest handcrafted jewellery for every occasion",
      button: "VIEW COLLECTION",
      link: "/collection",
    },
    {
      img: banner3,
      title: "DIAMONDS THAT DEFINE ELEGANCE",
      description: "Shine bright with timeless diamond pieces",
      button: "SHOP NOW",
      link: "/shop",
    },
    {
      img: banner4,
      title: "SILVER THAT SPARKS STYLE",
      description: "Trendy designs made with sterling silver",
      button: "DISCOVER",
      link: "/discover",
    },
  ];

  return (
    <section className="relative ">
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
            className="relative rounded-md w-full h-[95vh] flex items-center justify-center text-center"
          >
            {/* Background Image */}
            <img
              src={slide.img}
              alt={`Slide ${index + 1}`}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70"></div>

            {/* Text + Button */}
            <div className="relative z-10 max-w-2xl px-6">
              <h2 className="text-xl md:text-4xl text-orange-400 drop-shadow-md mb-4">
                {slide.title}
              </h2>
              <p className="text-lg sm:text-xl text-gray-200 mb-6 font-light">
                {slide.description}
              </p>
              <Link to={"/collection"}>
                <button className="px-8 py-3 border border-white text-white font-semibold text-lg hover:border-orange-400 hover:text-orange-400 transition-all duration-300 ">
                  VIEW COLLECTION
                </button>
              </Link>
            </div>
          </div>
        ))}
      </Carousel>
    </section>
  );
};

export default Banner;
