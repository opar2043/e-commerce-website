import React from "react";
import { BsFillEyeFill } from "react-icons/bs";

const Card = ({ product }) => {
  const { name, images, prices, category } = product;
  const firstImage = images[0];
  const { price, offerPrice } = prices[0];

  return (
    <div className="relative group overflow-hidden rounded shadow cursor-pointer h-fit">
      {/* Product Image */}
      <img
      src={firstImage}
        alt={name}
        className="w-full h-96 object-cover transform group-hover:scale-110 transition duration-500"
      />

      {/* Diamond badge (top-right, always visible) */}
      {category && (
        <div className="absolute top-2 left-3 bg-black text-white  rounded px-4 py-1 text-sm shadow-md z-20 flex items-center">
          {category}
        </div>
      )}

      {/* Hover Icon */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition duration-500 z-10">
        <button className="p-3 bg-white rounded-full text-gray-700 shadow-md hover:bg-orange-400 hover:text-white transition duration-300">
          <BsFillEyeFill size={22} />
        </button>
      </div>

      {/* Content (always visible at bottom) */}
      <div className="absolute bottom-0 left-0 w-full bg-white text-gray-800 px-4 py-5 z-20 flex flex-col items-center ">
        <h3 className=" font-semibold truncate text-xl hover:text-yellow-500 mb-4">{name}</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm line-through opacity-70">${price}</span>
          <span className="text-lg font-bold ">${offerPrice}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
