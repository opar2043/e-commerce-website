import { useState, useEffect } from "react";
import Banner from "../../assets/banner2.webp";
import { FaGem } from "react-icons/fa";

const Banner2 = () => {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleShopNow = () => {
    console.log("Shop Now clicked!");
    // Navigation logic would go here
  };

  return (
    <div className="flex flex-col md:flex-row w-full min-h-[350px] overflow-hidden font-['Cormorant_Garamond'] mb-6 md:mb-12">
      {/* Content Section */}
      <div 
        className="relative flex-1 bg-[#FEB564] p-8 md:p-12 flex flex-col justify-center items-start overflow-hidden min-h-[400px]"
        style={{
          backgroundImage: "radial-gradient(circle at 20% 70%, rgba(255,255,255,0.2) 0%, transparent 40%)",
        }}
      >
        {/* Decorative Circles */}
        <div className="absolute w-48 h-48 rounded-full bg-white opacity-20 -top-12 -right-12"></div>
        <div className="absolute w-32 h-32 rounded-full bg-white opacity-20 -bottom-8 -left-8"></div>
        
        {/* Decorative Diamond */}
        <div className="absolute w-20 h-20 bg-gradient-to-br from-transparent via-white/30 to-transparent rotate-45 right-10 bottom-10 opacity-70 animate-pulse"></div>
        
        <div className={`relative z-10 w-full transition-all duration-700 ease-out ${loaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
          {/* Content and price in a row */}
          <div className="flex flex-col md:flex-row justify-between items-start w-full mb-6">
            <div className="flex-1 max-w-md">
              <h2 className="text-lg md:text-xl font-medium text-amber-900 mb-4 italic">Looking For the Latest</h2>
              <h3 className="text-xl md:text-4xl font-semibold text-gray-900 mb-2">Trending Collection</h3>
              <p className="text-lg text-amber-950 mb-8 leading-relaxed">
                Discover our exquisite summer jewelry collection, designed to add a touch of elegance to your warm-weather style. Handcrafted with precision and care.
              </p>
            </div>

            {/* Price Circle - positioned to the right on desktop */}
            <div className="flex flex-col items-center justify-center rounded-full bg-[#181818] text-white p-4 w-24 h-24 md:w-28 md:h-28 md:ml-6">
              <FaGem className="text-amber-300 mb-1 text-sm md:text-base" />
              <p className="text-xs md:text-sm">Start From</p>
              <p className="text-xl md:text-2xl font-bold">$200</p>
            </div>
          </div>
          
          {/* Button positioned below the content */}
          <button
            onClick={handleShopNow}
            className={`px-6 py-2 border border-slate-950 text-slate-950 font-semibold hover:bg-white hover:text-black transition-all duration-300 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            MAKE ORDER    
          </button>
        </div>
      </div>

      {/* Image Section */}
      <div className="relative flex-1 min-h-[400px]">
        <img 
          src={Banner} 
          alt="Elegant jewelry collection" 
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FEB564]/30 to-transparent"></div>
      </div>
    </div>
  );
};

export default Banner2;