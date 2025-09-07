import banner from "../../assets/banner.webp";
import { useState, useEffect } from "react";

const Banner = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleOrderClick = () => {
    console.log("Order button clicked!");
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <img
        src={banner}
        alt="Jewellery Banner"
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-out ${
          loaded ? "scale-100 opacity-100" : "scale-105 opacity-90"
        }`}
      />

      {/* Dark Overlay for readability */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>

      {/* Centered Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center h-full text-white px-6">
        <h1
          className={`text-2xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-wider text-orange-400 transition-all duration-700 ease-out ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          JEWELLERY FOR THE FEMININE IN YOU
        </h1>

        <p
          className={`text-base md:text-lg lg:text-xl mb-6 transition-all duration-700 ease-out delay-150 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          Take a moment and cherish the grand collection
        </p>

        <button
          onClick={handleOrderClick}
          className={`px-6 py-2 border border-white text-white font-semibold hover:bg-white hover:text-black transition-all duration-300 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          MAKE ORDER    
        </button>
      </div>
    </div>
  );
};

export default Banner;
