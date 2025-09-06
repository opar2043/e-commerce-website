import { FaRegHeart } from "react-icons/fa";
import { MdOutlineTimer } from "react-icons/md";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Card = ({ product }) => {
  const { name, price, description, category, images, _id } = product;
  const firstImage = images?.[0];
  const firstPrice = images?.[0]?.price;

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true }}
      className="w-full h-[380px] relative overflow-hidden group cursor-pointer rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
    >
      {/* Image container */}
      <div className="w-full h-full overflow-hidden">
        <img
          src={firstImage}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
      </div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Top info bar */}
      <div className="absolute top-4 left-4 flex gap-2">
        <span className="bg-color text-white px-2 py-1 rounded text-xs font-medium capitalize">
          {category}
        </span>
        <span className="bg-white text-gray-800 px-2 py-1 rounded text-xs font-semibold flex items-center gap-1">
          <MdOutlineTimer className="text-color" /> New
        </span>
      </div>

      {/* Favorite icon */}
      <button className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-white transition-colors duration-300">
        <FaRegHeart className="text-gray-600 hover:text-red-500 transition-colors duration-300" />
      </button>

      {/* Content section */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
        <h3 className="text-lg font-bold mb-1 line-clamp-1">{name}</h3>
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-color font-semibold">${firstPrice || price}</span>
          <span className="text-xs text-gray-300 bg-gray-800/50 px-2 py-1 rounded">
            Premium
          </span>
        </div>
        
        <p className="text-sm text-gray-200 mb-4 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          {description}
        </p>
        
        <Link to={`/view/${_id}`}>
          <button className="w-full bg-color hover:bg-color-dark text-white py-2 rounded font-medium transition-colors duration-300 transform translate-y-4 group-hover:translate-y-0">
            View Details
          </button>
        </Link>
      </div>
    </motion.div>
  );
};

export default Card;