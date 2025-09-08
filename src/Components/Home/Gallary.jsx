import React from "react";
import img1 from "../../assets/gold1.webp";
import img2 from "../../assets/gold2.webp";
import img3 from "../../assets/gold3.webp";
import img4 from "../../assets/gold4.webp";
import img5 from "../../assets/gold5.webp";
import img6 from "../../assets/gold6.webp";
import Title from "../Shared/Title";
import { Link } from "react-router-dom";

const Gallery = () => {
  const goldItems = [
    {
      id: 1,
      src: img1,
      title: "Gold Bars",
      description: "24K pure gold investment bars",
    },
    {
      id: 2,
      src: img2,
      title: "Gold Coins",
      description: "Collectible limited edition coins",
    },
    {
      id: 3,
      src: img3,
      title: "Gold Jewelry",
      description: "Handcrafted golden accessories",
    },
    {
      id: 4,
      src: img4,
      title: "Gold Crown",
      description: "Royalty inspired designs",
    },
    {
      id: 5,
      src: img5,
      title: "Gold Ring",
      description: "Elegant wedding bands",
    },
    {
      id: 6,
      src: img6,
      title: "Gold Necklace",
      description: "Statement luxury pieces",
    },
  ];

  return (
    <div className="px-3 md:px-6 min-h-screen mt-10">
      <Title
        head={"Our Collection"}
        para={"Explore our exquisite collection of gold items"}
      ></Title>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full ">
        {goldItems.slice(0, 3).map((item) => (
          <div
            key={item.id}
            className="group relative overflow-hidden aspect-square"
          >
            {/* Replace the gradient with your actual images */}
            <div
              className="h-full w-full absolute bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
              style={{ backgroundImage: `url(${item.src})` }}
            ></div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"></div>
          </div>
        ))}
      </div>

      {/* Centered Button */}
      <div className="flex justify-center items-center my-12">
<Link to={"/collection"}>
         <button className="px-8 py-3 border border-black text-black font-semibold text-lg hover:bg-black hover:text-white transition-all duration-300 ">
          VIEW COLLECTION
        </button>
</Link>
      </div>
    </div>
  );
};

export default Gallery;
