import { useState, useEffect } from "react";
import Banner from "../../assets/banner2.webp";

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
        
        <div className={`relative z-10 max-w-md transition-all duration-700 ease-out ${loaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">Trending Collection</h1>
          <h2 className="text-2xl md:text-3xl font-medium text-amber-900 mb-4 italic">Looking For the Latest</h2>
          <p className="text-lg text-amber-950 mb-8 leading-relaxed">
            Discover our exquisite summer jewelry collection, designed to add a touch of elegance to your warm-weather style. Handcrafted with precision and care.
          </p>
          <button 
            onClick={handleShopNow}
            className="flex items-center gap-2 px-8 py-3 bg-gray-900 text-white text-lg font-medium rounded-full transition-all duration-300 hover:bg-amber-800 hover:shadow-lg hover:-translate-y-0.5"
          >
            Shop Now
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
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