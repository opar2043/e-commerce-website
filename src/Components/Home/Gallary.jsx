import React from 'react';
import img1 from "../../assets/gold1.webp";
import img2 from "../../assets/gold2.webp";
import img3 from "../../assets/gold3.webp";
import img4 from "../../assets/gold4.webp";
import img5 from "../../assets/gold5.webp";
import img6 from "../../assets/gold6.webp";
import Title from '../Shared/Title';

const Gallery = () => {
  const goldItems = [
    { id: 1, src: img1, title: "Gold Bars", description: "24K pure gold investment bars" },
    { id: 2, src: img2, title: "Gold Coins", description: "Collectible limited edition coins" },
    { id: 3, src: img3, title: "Gold Jewelry", description: "Handcrafted golden accessories" },
    { id: 4, src: img4, title: "Gold Crown", description: "Royalty inspired designs" },
    { id: 5, src: img5, title: "Gold Ring", description: "Elegant wedding bands" },
    { id: 6, src: img6, title: "Gold Necklace", description: "Statement luxury pieces" },
  ];

  return (
    <div className="  min-h-screen my-10">

   <Title head={"Our"} head2={"Collection"} para={"Explore our exquisite collection of gold items"}></Title>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full ">
        {goldItems.map((item) => (
          <div key={item.id} className="group relative overflow-hidden aspect-square">
            {/* Replace the gradient with your actual images */}
            <div 
              className="h-full w-full absolute bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
              style={{ backgroundImage: `url(${item.src})` }}
            ></div>
            
            {/* Overlay content */}
            <div className="relative h-full flex items-end p-5 bg-gradient-to-t from-black via-transparent to-transparent">
              <div>
                <h3 className="text-xl font-semibold text-yellow-200">{item.title}</h3>
                <p className="text-gray-300 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.description}
                </p>
              </div>
            </div>
            
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">

            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default Gallery;