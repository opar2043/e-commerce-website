// import React, { useEffect, useState } from "react";
// import { BsFillEyeFill } from "react-icons/bs";
// import { Link } from "react-router-dom";
// import useMetal from "../Hooks/useMetal";
// import useProducts from "../Hooks/useProducts";

// const Card = ({ product }) => {
//   const { _id, name, images, weight, category } = product;
//   const firstImage = images[0];

//   // const [metal, setMetal] = useState([]);
//   const [metal, isLoading, refetch] = useMetal([]);
//   const [products] = useProducts([]);

//   // useEffect(() => {
//   //   fetch("/metal.json")
//   //     .then((response) => response.json())
//   //     .then((data) => setMetal(data))
//   //     .catch((error) => console.error("Error fetching metal data:", error));
//   // }, []);

//   const goldPrice = metal.find((m) => m?.metal === "Gold")?.price || 0;
//   const silverPrice = metal.find((m) => m?.metal === "Silver")?.price || 0;
//   const platinumPrice = metal.find((m) => m?.metal === "Platinum")?.price || 0;

//   // Compute price based on category
//   let price = 0;
//   if (category.toLowerCase() === "gold") {
//     price = weight * goldPrice;
//   } else if (category.toLowerCase() === "silver") {
//     price = weight * silverPrice;
//   } else if (
//     category.toLowerCase() === "diamond" ||
//     category.toLowerCase() === "platinum"
//   ) {
//     price = weight * platinumPrice;
//   }

//   return (
//         <Link to={`/product/${_id}`}>

//     <div className="relative border-4 border-[#ce7613] group overflow-hidden rounded cursor-pointer h-fit">
//       {/* Product Image */}
//       <img
//         src={firstImage}
//         alt={name}
//         className="w-full h-96 object-cover transform group-hover:scale-110 transition duration-500"
//       />

//       {/* Category badge (top-left) */}
//       {category && (
//         <div className="absolute top-2 left-3 bg-black text-white rounded px-4 py-1 text-sm shadow-md z-20 flex items-center">
//           {category}
//         </div>
//       )}

//       {/* Hover Icon */}
//       <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition duration-500 z-10">
//       </div>

//       {/* Content (bottom info) */}
//       <div className="absolute bottom-0 left-0 w-full bg-white text-gray-800 px-4 py-5 z-20 flex flex-col items-center">
//         <h3 className="font-semibold truncate text-xl hover:text-yellow-500 mb-4">
//           {name}
//         </h3>
//         <div className="flex items-center gap-2">
//           <span className="text-sm font-light text-gray-700">{weight} gm</span>
//           {price > 0 && (
//             <span className="text-lg font-light text-slate-950">
//               ${price.toFixed(2)}
//             </span>
//           )}
//         </div>
//       </div>
//     </div>
//      </Link>
//   );
// };

// export default Card;
















import React, { useState, useEffect } from "react";
import { 
  BsFillEyeFill, 
  BsHeart, 
  BsHeartFill,
  BsCart3 
} from "react-icons/bs";
import { 
  FaGem, 
  FaStar, 
  FaCertificate,
  FaBalanceScale,
  FaTags 
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Card = ({ product }) => {
  const { _id, name, images, weight, category, shortDescription, isAvailable } = product;
  const firstImage = images?.[0];
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Mock metal prices - replace with your actual hook data
  const metalPrices = {
    gold: 68.50,
    silver: 0.95,
    platinum: 32.10,
    diamond: 150.00
  };

  // Calculate price based on category and weight
  const calculatePrice = () => {
    const categoryLower = category?.toLowerCase() || '';
    let basePrice = 0;
    
    if (categoryLower.includes('gold')) {
      basePrice = weight * metalPrices.gold;
    } else if (categoryLower.includes('silver')) {
      basePrice = weight * metalPrices.silver;
    } else if (categoryLower.includes('platinum')) {
      basePrice = weight * metalPrices.platinum;
    } else if (categoryLower.includes('diamond')) {
      basePrice = weight * metalPrices.diamond;
    } else {
      basePrice = weight * metalPrices.gold; // Default to gold pricing
    }
    
    return basePrice;
  };

  const price = calculatePrice();
  
  // Determine gold purity based on category
  const getGoldPurity = () => {
    const categoryLower = category?.toLowerCase() || '';
    if (categoryLower.includes('22k') || categoryLower.includes('gold')) return '22K';
    if (categoryLower.includes('18k')) return '18K';
    if (categoryLower.includes('14k')) return '14K';
    return 'Premium';
  };

  // Image cycling on hover
  useEffect(() => {
    if (isHovered && images && images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex(prev => (prev + 1) % images.length);
      }, 1500);
      return () => clearInterval(interval);
    } else {
      setCurrentImageIndex(0);
    }
  }, [isHovered, images]);

  const toggleWishlist = (e) => {
    e.preventDefault();
    setIsWishlisted(!isWishlisted);
  };

  const addToCart = (e) => {
    e.preventDefault();
    console.log('Adding to cart:', _id);
  };

  return (
    <Link to={`/product/${_id}`}>
    <div className="group relative bg-white border-4 border-[#76614B] rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 overflow-hidden ">

        
        {/* Image Container */}
        <div 
          className="relative aspect-square overflow-hidden bg-gradient-to-br from-amber-50 to-yellow-50"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Main Product Image */}
          <img
            src={images && images.length > 0 ? images[currentImageIndex] : firstImage}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Top Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
            {/* Category Badge */}
            <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
              {category} 
            </div>
            

            
            {/* Availability Badge */}
            {!isAvailable && (
              <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                Out of Stock
              </div>
            )}
          </div>



          {/* Image Indicators */}
          {images && images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1 z-20">
              {images.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                  }`}
                />
              ))}
            </div>
          )}


        </div>

        {/* Product Information */}
        <div className="p-6 bg-white">
          {/* Product Name */}
          <h3 className="font-bold text-xl text-gray-800 mb-2 line-clamp-2 group-hover:text-amber-600 transition-colors">
            {name}
          </h3>
          
          {/* Short Description */}
          {shortDescription && (
            <p className="text-gray-600 text-md mb-3 line-clamp-2">
              {shortDescription}
            </p>
          )}

          {/* Product Details */}
          <div className="flex items-center gap-4 mb-4">
            {/* Weight */}
            <div className="flex items-center gap-1 text-gray-700">
              <FaBalanceScale className="text-amber-500 text-sm" />
              <span className="text-md font-medium">{weight}g</span>
            </div>
            
            {/* Rating Stars */}
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="text-yellow-400 text-sm" />
              ))}
              <span className="text-xs text-gray-500 ml-1">(4.9)</span>
            </div>
          </div>

          {/* Pricing */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              {price > 0 && (
                <>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-gray-800">
                      ${price.toFixed(2)}
                    </span>
                   
                  </div>
                  <div className="text-xs text-gray-500">
                    ${(price/weight).toFixed(2)} per gram
                  </div>
                </>
              )}
            </div>
            
            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              {isAvailable ? (
                <div className="flex items-center gap-1 text-green-600 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>In Stock</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-red-600 text-sm">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span>Out of Stock</span>
                </div>
              )}
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
            <div className="grid grid-cols-2 justify-between  gap-3 text-xs text-gray-600">
              <div className="flex items-center gap-1">
                <FaCertificate className="text-green-500" />
                <span>Certified</span>
              </div>
              <div className="flex items-center gap-1">
                <FaGem className="text-amber-500" />
                <span>Authentic</span>
              </div>
            </div>
            

          </div>
        </div>

    </div>
    </Link>
  );
};

export default Card;
