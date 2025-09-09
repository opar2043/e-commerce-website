import React, { useEffect, useState } from "react";
import { BsFillEyeFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const Card = ({ product }) => {
  const { name, images, weights, category,id } = product;
  const firstImage = images[0];
  const { weight, offerweight } = weights[0];

  const [metal ,setMetal] = useState([])
    useEffect(() => {
      fetch('/metal.json')
        .then(response => response.json())
        .then(data => setMetal(data))
        .catch(error => console.error('Error fetching metal data:', error));
    }, []);

  const goldPrice = metal.find(m => m?.metal === 'Gold')?.price || 0;
  const silverPrice = metal.find(m => m?.metal === 'Silver')?.price || 0;
  const platinumPrice = metal.find(m => m?.metal === 'Platinum')?.price || 0;



  console.log(goldPrice, silverPrice, platinumPrice);
  

  return (
    <div className="relative border-b border-gray-200 group overflow-hidden rounded  cursor-pointer h-fit">
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
        <Link to={`/product/${product.id}`}>
          <button className="p-3 bg-white rounded-full text-gray-700 shadow-md hover:bg-orange-400 hover:text-white transition duration-300">
            <BsFillEyeFill size={22} />
          </button>
        </Link>
      </div>

      {/* Content (always visible at bottom) */}
      <div className="absolute bottom-0 left-0 w-full bg-white text-gray-800 px-4 py-5 z-20 flex flex-col items-center ">
        <h3 className=" font-semibold truncate text-xl hover:text-yellow-500 mb-4">{name}</h3>
        <div className="flex items-center gap-2">
           {/* {category === 'Gold' ? (
             <>
               <span className="text-sm line-through opacity-70">${weight * goldPrice}</span>
               <span className="text-lg font-bold ">${offerweight * goldPrice}</span>
             </>
           ) : category === 'Silver' ? (
             <>
               <span className="text-sm line-through opacity-70">${weight * silverPrice}</span>
               <span className="text-lg font-bold ">${offerweight * silverPrice}</span>
             </>
           ) : category === 'Platinum' ? (
             <>
               <span className="text-sm line-through opacity-70">${weight * platinumPrice}</span>
               <span className="text-lg font-bold ">${offerweight * platinumPrice}</span>
             </>
           ) : null} */}

               {/* <span className="text-sm line-through opacity-70">${weight }gm</span> */}
               <span className="text-md font-normal text-gray-700">{weight}gm</span>

        </div>
      </div>
    </div>
  );
};

export default Card;
