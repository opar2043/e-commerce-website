import banner from "../../assets/banner.webp";
import { useState, useEffect } from "react";

const Banner = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleOrderClick = () => {
    // Handle order button click
    console.log("Order button clicked!");
    // You can add your order logic or navigation here
  };

  return (
    <div className="relative w-full h-screen overflow-hidden mb-8 md:mb-14">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-out"
        style={{
          backgroundImage: `url(${banner})`,
          transform: loaded ? "scale(1)" : "scale(1.1)",
          opacity: loaded ? 1 : 0.8,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-start h-full text-white px-8 md:px-16 lg:px-24">
        <h1
          className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 transition-all duration-700 ease-out ${
            loaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
          style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}
        >
          Eternal Elegance in Every Piece
        </h1>

        <p
          className={`text-lg md:text-xl lg:text-2xl max-w-lg mb-8 transition-all duration-700 ease-out delay-150 ${
            loaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
          style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}
        >
          Discover our exclusive collection of handcrafted jewelry, where
          timeless beauty meets modern design.
        </p>

        <button
          onClick={handleOrderClick}
          className={`px-8 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 delay-300 ${
            loaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          Order Now
        </button>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black to-transparent opacity-30"></div>
    </div>
  );
};

export default Banner;
