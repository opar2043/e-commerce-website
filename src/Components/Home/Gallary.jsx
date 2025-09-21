// import React from "react";
// import img1 from "../../assets/gold1.webp";
// import img2 from "../../assets/gold2.webp";
// import img3 from "../../assets/gold3.webp";
// import img4 from "../../assets/gold4.webp";
// import img5 from "../../assets/gold5.webp";
// import img6 from "../../assets/gold6.webp";
// import Title from "../Shared/Title";
// import { Link } from "react-router-dom";

// const Gallery = () => {
//   const goldItems = [
//     {
//       id: 1,
//       src: img1,
//       title: "Gold Bars",
//       description: "24K pure gold investment bars",
//     },
//     {
//       id: 2,
//       src: img2,
//       title: "Gold Coins",
//       description: "Collectible limited edition coins",
//     },
//     {
//       id: 3,
//       src: img3,
//       title: "Gold Jewelry",
//       description: "Handcrafted golden accessories",
//     },
//     {
//       id: 4,
//       src: img4,
//       title: "Gold Crown",
//       description: "Royalty inspired designs",
//     },
//     {
//       id: 5,
//       src: img5,
//       title: "Gold Ring",
//       description: "Elegant wedding bands",
//     },
//     {
//       id: 6,
//       src: img6,
//       title: "Gold Necklace",
//       description: "Statement luxury pieces",
//     },
//   ];

//   return (
//     <div className="px-3 md:px-6 min-h-screen mt-10">
//       <Title
//         head={"Our Collection"}
//         para={"Explore our exquisite collection of gold items"}
//       ></Title>

//       {/* Gallery Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full ">
//         {goldItems.slice(0, 3).map((item) => (
//           <div
//             key={item.id}
//             className="group relative overflow-hidden aspect-square"
//           >
//             {/* Replace the gradient with your actual images */}
//             <div
//               className="h-full w-full absolute bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
//               style={{ backgroundImage: `url(${item.src})` }}
//             ></div>

//             {/* Hover overlay */}
//             <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"></div>
//           </div>
//         ))}
//       </div>

//       {/* Centered Button */}
//       <div className="flex justify-center items-center my-12">
// <Link to={"/collection"}>
//          <button className="px-8 py-3 border border-black text-black font-semibold text-lg hover:bg-black hover:text-white transition-all duration-300 ">
//           VIEW COLLECTION
//         </button>
// </Link>
//       </div>
//     </div>
//   );
// };

// export default Gallery;

import React, { useState, useEffect } from "react";
import {
  FaGem,
  FaEye,
  FaHeart,
  FaStar,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Gallery = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [favorites, setFavorites] = useState(new Set());

  const goldItems = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      title: "22K Arabic Gold Necklaces",
      description:
        "Traditional Lebanese designs with authentic Arabic calligraphy",
      category: "Necklaces",
      price: "Starting at $850",
      rating: 4.9,
      featured: true,
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      title: "Gold Investment Coins",
      description: "Collectible limited edition Middle Eastern gold coins",
      category: "Coins",
      price: "Starting at $420",
      rating: 4.8,
      featured: false,
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      title: "Bridal Gold Jewelry Sets",
      description: "Complete bridal sets with traditional Arabic patterns",
      category: "Bridal Sets",
      price: "Starting at $1,200",
      rating: 5.0,
      featured: true,
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      title: "Islamic Calligraphy Rings",
      description: "Personalized rings with Quranic verses and Arabic names",
      category: "Rings",
      price: "Starting at $380",
      rating: 4.9,
      featured: false,
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1630019852942-f89202989a59?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      title: "Traditional Gold Bracelets",
      description: "Handcrafted Lebanese gold bracelets with intricate details",
      category: "Bracelets",
      price: "Starting at $650",
      rating: 4.7,
      featured: true,
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      title: "Damascus Pattern Pendants",
      description:
        "Sterling silver pendants with traditional Damascus patterns",
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
    setCurrentSlide(
      (prev) => (prev - 1 + featuredItems.length) % featuredItems.length
    );
  };

  return (
    <div className="px-4 md:px-8 min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Enhanced Title Section */}
      <div className="text-center mb-16 max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-3 my-6">
          <FaGem className="text-3xl text-amber-600" />
          <h2 className="text-4xl md:text-5xl  font-bold text-gray-800">
            Our Exquisite Collection
          </h2>
          <FaGem className="text-3xl text-amber-500" />
        </div>
        <div className="w-24 h-1 bg-gradient-to-r from-[#ffb056] via-[#f59426] to-[#ffb157] mx-auto mb-6"></div>
        <p className="text-xl text-gray-600 leading-relaxed">
          Discover authentic Arabic gold jewelry crafted with 40+ years of
          expertise. Each piece reflects our commitment to traditional Middle
          Eastern artistry and modern elegance.
        </p>
      </div>

      {/* Featured Carousel */}
      <div className="mb-16">

        <div className="relative max-w-6xl mx-auto">
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {featuredItems.map((item) => (
                <div key={item.id} className="min-w-full relative">
                  <div className="grid grid-cols-1 lg:grid-cols-2 h-[500px]">
                    {/* Image Section */}
                    <div className="relative overflow-hidden">
                      <img
                        src={item.src}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    </div>

                    {/* Content Section */}
                    <div className="bg-[#fca139] p-8 lg:p-12 flex flex-col justify-center text-white">
                      <div className="mb-4">
                        <span className="inline-block bg-white text-amber-600 px-3 py-1 rounded-full text-sm font-semibold mb-4">
                          {item.category}
                        </span>
                        <h4 className="text-3xl lg:text-4xl font-bold mb-4">
                          {item.title}
                        </h4>
                        <p className="text-xl text-amber-100 mb-6 leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-4 mb-6">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={i}
                              className={`text-lg ${
                                i < Math.floor(item.rating)
                                  ? "text-yellow-300"
                                  : "text-yellow-500 opacity-30"
                              }`}
                            />
                          ))}
                          <span className="ml-2 text-white font-semibold">
                            {item.rating}
                          </span>
                        </div>
                        <div className="text-2xl font-bold text-white">
                          {item.price}
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <button className="px-6 py-3 bg-white text-amber-600 font-bold rounded-lg hover:bg-amber-100 transition-colors">
                          <Link to={"/collection"}>View Collection</Link>
                        </button>

                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Controls */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-3 rounded-full shadow-lg transition-all"
          >
            <FaChevronLeft className="text-gray-800" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-3 rounded-full shadow-lg transition-all"
          >
            <FaChevronRight className="text-gray-800" />
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {featuredItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? "bg-white" : "bg-white bg-opacity-50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Gallery Grid */}
      <div className="mb-16">
        <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          Complete Collection
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {goldItems.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {/* Image Container */}
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {item.category}
                </div>

                {/* Hover Content */}
                <div
                  className={`absolute inset-0 flex flex-col justify-end p-6 text-white transition-all duration-300 ${
                    hoveredItem === item.id
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0"
                  }`}
                >
                  <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-200 mb-3">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={`text-sm ${
                            i < Math.floor(item.rating)
                              ? "text-yellow-400"
                              : "text-gray-400"
                          }`}
                        />
                      ))}
                      <span className="ml-1 text-sm">{item.rating}</span>
                    </div>
                    <span className="text-lg font-bold">{item.price}</span>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <button className="flex-1 bg-amber-500 text-white py-2 px-4 rounded-lg hover:bg-amber-700 transition-colors font-semibold">
                      <Link to={"/collection"}>View Collection</Link>
                    </button>

                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced CTA Section */}
      <div className="text-center mb-16">
        <div className="bg-[#fca43f] rounded-3xl p-12 max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: "60px 60px",
              }}
            ></div>
          </div>

          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Experience Authentic Arabic Jewelry
            </h3>
            <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
              Visit our showroom in Terrytown or browse our complete collection
              online. Each piece comes with a certificate of authenticity and
              lifetime craftsmanship guarantee.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/collection">
                <button className="px-8 py-4 bg-white text-amber-600 font-bold text-lg rounded-xl hover:bg-amber-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
                  VIEW FULL COLLECTION
                </button>
              </Link>

            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-6 mt-8 text-white">
              <div className="flex items-center gap-2">
                <FaGem className="text-yellow-300" />
                <span className="text-sm font-semibold">Authentic Gold</span>
              </div>
              <div className="flex items-center gap-2">
                <FaStar className="text-yellow-300" />
                <span className="text-sm font-semibold">
                  40+ Years Heritage
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FaHeart className="text-yellow-300" />
                <span className="text-sm font-semibold">
                  1000+ Happy Customers
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
