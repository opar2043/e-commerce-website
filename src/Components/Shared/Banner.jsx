import React from "react";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

import banner1 from "../../assets/banner.jpg";
import banner2 from "../../assets/banner2.jpg";
import banner3 from "../../assets/banner3.jpg";
import banner4 from "../../assets/banner4.jpg";

const Banner = () => {
const slides = [
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
            className="relative rounded-md w-full h-[60vh] md:h-[95vh] flex items-center justify-center text-center"
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
<h2 className="text-xl md:text-4xl font-semibold text-[#E4C496] 
               [text-shadow:_0_2px_8px_rgb(254_202_162_/_50%)]
                transition-all duration-300 mb-4">
  {slide.title}
</h2>
              <p className="text-lg sm:text-xl text-gray-200 mb-6 font-light">
                {slide.description}
              </p>
<Link to={"/collection"}>
  <button className="px-9 py-4 border border-transparent text-slate-900/90 font-semibold text-sm 
                     bg-gradient-to-r from-[#D9AF7F] to-[#ECD4AA]
                     hover:from-[#E5C191] hover:to-[#F5E0BF] 
                     hover:shadow-lg hover:shadow-amber-200/50 
                     transition-all duration-300 rounded-3xl">
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
