import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  RiVipCrownLine,
  RiHeartLine,
  RiHeartFill,
  RiShoppingCartLine,
} from "react-icons/ri";
import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";
import Loading from "../Shared/Loading";
import useMetal from "../Hooks/useMetal";
import useProducts from "../Hooks/useProducts";
import { FaHeart } from "react-icons/fa";
import useCart from "../Hooks/useCart";

const ViewCard = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { setCart , setWish , wish , user } = useAuth();
  // const [cart] = useCart([]);
  const [price, setPrice] = useState(0);
  const [metal, isLoading] = useMetal([]);
  const [products] = useProducts([]);

  // Find the product
  const product = products.find((p) => p._id === id);

  // Convert weight to number for calculations
  const productWeight = product ? parseFloat(product.weight) : 0;

  // Safe access to metal prices
  const goldRate = metal.find((m) => m?.metal === "Gold")?.price || 0;
  const silverRate = metal.find((m) => m?.metal === "Silver")?.price || 0;
  const platinumRate = metal.find((m) => m?.metal === "Platinum")?.price || 0;
  const diamondRate = metal.find((m) => m?.metal === "Diamond")?.price || 0;

  // Calculate prices based on category
  useEffect(() => {
    if (!product) return;

    let calculatedPrice = 0;

    if (product.category === "Gold") {
      calculatedPrice = goldRate * productWeight;
    } else if (product.category === "Silver") {
      calculatedPrice = silverRate * productWeight;
    } else if (product.category === "Platinum") {
      calculatedPrice = platinumRate * productWeight;
    } else if (product.category === "Diamond") {
      calculatedPrice = diamondRate * productWeight;
    }

    setPrice(calculatedPrice);
  }, [product, goldRate, silverRate, platinumRate, diamondRate, productWeight]);

  const totalPrice = price * quantity;
  
  if (isLoading || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loading></Loading>
      </div>
    );
  }

  const handleImageSelect = (index) => {
    setSelectedImage(index);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  function handleAddToCart(e) {
    e.preventDefault();

    const productToAdd = {
      id: product._id,
      name: product.name,
      category: product.category,
      image: product.images[0],
      price: totalPrice,
      weight: product.weight,
      quantity: quantity,
    };

    setCart((prev) => [...prev, productToAdd]);

  fetch("http://localhost:5000/cart", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(productToAdd),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.insertedId) {
        setWish((prev) => [...prev, productToAdd]);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Added to Your Cart",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    })
    .catch((err) => {
      console.error("Error adding to wish:", err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong while adding to wishlist!",
      });
    });
  }


function handleWish(product) {
  const productToWish = {
    id: product._id,
    name: product.name,
    category: product.category,
    image: product.images[0],
    price: price.toFixed(2),
    weight: product.weight,
    size: product.size || "21 cm",
    quantity: quantity,

    
  };

  fetch("http://localhost:5000/wish", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(productToWish),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.insertedId) {
        setWish((prev) => [...prev, productToWish]);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Added to Wishlist!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    })
    .catch((err) => {
      console.error("Error adding to wish:", err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong while adding to wishlist!",
      });
    });
}

function handleCart(product) {
  const productToWish = {
    id: product._id,
    name: product.name,
    category: product.category,
    image: product.images[0],
    price: price.toFixed(2),
    weight: product.weight,
    size: product.size || "21 cm",
    quantity: product.quantity,
  };


}

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <a
                href="/"
                className="text-gray-500 hover:text-[#D99B55] transition-colors"
              >
                Home
              </a>
            </li>
            <li className="flex items-center">
              <span className="mx-2 text-gray-400">/</span>
              <a
                href="/products"
                className="text-gray-500 hover:text-[#D99B55] transition-colors"
              >
                Products
              </a>
            </li>
            <li className="flex items-center">
              <span className="mx-2 text-gray-400">/</span>
              <span className="text-gray-900">{product.name}</span>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative overflow-hidden rounded-lg border-2 border-[#D99B55] p-2 bg-gray-50 aspect-square">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-contain transition-transform duration-500 hover:scale-105"
              />
              <button
                onClick={toggleFavorite}
                className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                aria-label={
                  isFavorite ? "Remove from favorites" : "Add to favorites"
                }
              >
                {isFavorite ? (
                  <RiHeartFill className="w-6 h-6 text-red-500" />
                ) : (
                  <RiHeartLine className="w-6 h-6 text-gray-600" />
                )}
              </button>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => handleImageSelect(index)}
                  className={`rounded-md border-2 overflow-hidden aspect-square p-1 transition-all ${
                    selectedImage === index
                      ? "border-[#D99B55] scale-105"
                      : "border-gray-200 hover:border-[#D99B55]"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <p className="text-gray-700">{product.shortDescription}</p>
            </div>

            {/* Availability */}
            <div
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                product.isAvailable
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {product.isAvailable ? "In Stock" : "Out of Stock"}
            </div>

            {/* Product Weight and Price */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Product Details
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                 <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Size:</span>
                  <span className="font-semibold text-black/80">
                    {product.size || "21 cm"}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Weight:</span>
                  <span className="font-semibold text-black/80">
                    {product.weight}g
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Price per gram:</span>
                  <span className="font-semibold text-black/80">
                    ${product.category === "Gold" && goldRate.toFixed(2)}
                    {product.category === "Silver" && silverRate.toFixed(2)}
                    {product.category === "Platinum" && platinumRate.toFixed(2)}
                    {product.category === "Diamond" && diamondRate.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-gray-600">Total Price:</span>
                  <span className="text-lg font-bold text-[#D99B55]">
                    ${price.toFixed(2)}
                  </span>
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  Price calculated based on current{" "}
                  {product.category.toLowerCase()} rate
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Description
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Add to Cart */}
            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="block text-sm text-gray-600">
                    Order Total
                  </span>
                  <div className="flex items-baseline mt-1">
                    <span className="text-2xl font-bold text-gray-900">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                      onClick={decreaseQuantity}
                    >
                      -
                    </button>
                    <span className="px-4 py-2 text-black">{quantity}</span>
                    <button
                      className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                      onClick={increaseQuantity}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#D99B55] hover:bg-[#C68A4A] text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
                  disabled={!product.isAvailable}
                >
                  <RiShoppingCartLine className="w-5 h-5 mr-2" />
                  Add to Cart
                </button>
                  <button
                  onClick={()=>handleWish(product)}
                  className="px-4 py-3 border-2 border-[#D99B55] text-[#D99B55] font-medium rounded-lg hover:bg-[#D99B55]/10 transition-colors">
                    <FaHeart></FaHeart>
                  </button>
                <Link to={"/collection"}>
                  <button className="px-4 py-3 border-2 border-[#D99B55] text-[#D99B55] font-medium rounded-lg hover:bg-[#D99B55]/10 transition-colors">
                    All Collection
                  </button>
                </Link>
                

               
              </div>
            </div>

            {/* Product Features */}
            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Product Features
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <RiVipCrownLine className="w-5 h-5 text-[#D99B55] mt-0.5 mr-3" />
                  <span className="text-gray-700">
                    Premium quality materials
                  </span>
                </li>
                <li className="flex items-start">
                  <RiVipCrownLine className="w-5 h-5 text-[#D99B55] mt-0.5 mr-3" />
                  <span className="text-gray-700">Expert craftsmanship</span>
                </li>
                <li className="flex items-start">
                  <RiVipCrownLine className="w-5 h-5 text-[#D99B55] mt-0.5 mr-3" />
                  <span className="text-gray-700">Lifetime warranty</span>
                </li>
                <li className="flex items-start">
                  <RiVipCrownLine className="w-5 h-5 text-[#D99B55] mt-0.5 mr-3" />
                  <span className="text-gray-700">
                    Free shipping and returns
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCard;
