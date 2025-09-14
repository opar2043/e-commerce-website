import React, { useEffect, useState } from "react";
import { BsFillEyeFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import useMetal from "../Hooks/useMetal";
import useProducts from "../Hooks/useProducts";

const Card = ({ product }) => {
  const { _id, name, images, weight, category } = product;
  const firstImage = images[0];

  // const [metal, setMetal] = useState([]);
  const [metal, isLoading, refetch] = useMetal([]);
  const [products] = useProducts([]);

  // useEffect(() => {
  //   fetch("/metal.json")
  //     .then((response) => response.json())
  //     .then((data) => setMetal(data))
  //     .catch((error) => console.error("Error fetching metal data:", error));
  // }, []);

  const goldPrice = metal.find((m) => m?.metal === "Gold")?.price || 0;
  const silverPrice = metal.find((m) => m?.metal === "Silver")?.price || 0;
  const platinumPrice = metal.find((m) => m?.metal === "Platinum")?.price || 0;

  // Compute price based on category
  let price = 0;
  if (category.toLowerCase() === "gold") {
    price = weight * goldPrice;
  } else if (category.toLowerCase() === "silver") {
    price = weight * silverPrice;
  } else if (
    category.toLowerCase() === "diamond" ||
    category.toLowerCase() === "platinum"
  ) {
    price = weight * platinumPrice;
  }

  return (
        <Link to={`/product/${_id}`}>

    <div className="relative border-4 border-[#ce7613] group overflow-hidden rounded cursor-pointer h-fit">
      {/* Product Image */}
      <img
        src={firstImage}
        alt={name}
        className="w-full h-96 object-cover transform group-hover:scale-110 transition duration-500"
      />

      {/* Category badge (top-left) */}
      {category && (
        <div className="absolute top-2 left-3 bg-black text-white rounded px-4 py-1 text-sm shadow-md z-20 flex items-center">
          {category}
        </div>
      )}

      {/* Hover Icon */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition duration-500 z-10">
          {/* <button className="p-3 bg-white rounded-full text-gray-700 shadow-md hover:bg-orange-400 hover:text-white transition duration-300">
            <BsFillEyeFill size={22} />
          </button> */}
       
      </div>

      {/* Content (bottom info) */}
      <div className="absolute bottom-0 left-0 w-full bg-white text-gray-800 px-4 py-5 z-20 flex flex-col items-center">
        <h3 className="font-semibold truncate text-xl hover:text-yellow-500 mb-4">
          {name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-sm font-light text-gray-700">{weight} gm</span>
          {price > 0 && (
            <span className="text-lg font-light text-slate-950">
              ${price.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
     </Link>
  );
};

export default Card;
