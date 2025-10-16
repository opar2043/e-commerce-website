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
import useAxios from "../Hooks/useAxios";
import ReactImageMagnify from "react-image-magnify";

const ViewCard = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { setCart, cart, setWish, wish, user, setIsCartSidebarOpen } =
    useAuth();
  // const [cart] = useCart([]);
  const [price, setPrice] = useState(0);
  const [metal, isLoading] = useMetal([]);
  const [products] = useProducts([]);
  const [, , refetch] = useCart([]);
  const axiosSecure = useAxios();
  // Find the product
  const product = products.find((p) => p._id === id);

  const addToCart = () => {
    setCart([...cart, product]);
  };

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

    // Don't update local state here - let the backend be the source of truth
    // setCart([...cart, productToAdd]); // Remove this line

    fetch("https://gold-web-server.vercel.app/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productToAdd),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          // Refetch cart data from backend to sync with latest data
          refetch();

          // Open the cart sidebar after successful addition
          setIsCartSidebarOpen(true);

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
        console.error("Error adding to cart:", err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong while adding to cart!",
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

    fetch("https://gold-web-server.vercel.app/wish", {
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
              <Link
                to="/"
                className="text-gray-500 hover:text-[#D99B55] transition-colors"
              >
                Home
              </Link>
            </li>
            <li className="flex items-center">
              <span className="mx-2 text-gray-400">/</span>
              <span className="text-gray-900">{product.name}</span>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="relative w-full flex flex-col gap-4">
            <div className="relative border-2 border-[#D99B55] rounded-xl bg-white p-4 flex items-center justify-center">
              <div className="w-full max-w-md mx-auto">
                <ReactImageMagnify
                  {...{
                    smallImage: {
                      alt: product.name,
                      isFluidWidth: true,
                      src: product.images[selectedImage],
                    },
                    largeImage: {
                      src: product.images[selectedImage],
                      width: 1200,
                      height: 1200,
                    },
                    enlargedImageContainerDimensions: {
                      width: "130%",
                      height: "100%",
                    },
                    enlargedImageContainerStyle: {
                      zIndex: 9999,
                      background: "#fff",
                      borderRadius: "10px",
                    },
                    isHintEnabled: true,
                    lensStyle: { backgroundColor: "rgba(255,255,255,0.2)" },
                  }}
                />
              </div>

              {/* Favorite Button */}
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="absolute top-5 right-5 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-all"
              >
                {isFavorite ? (
                  <RiHeartFill className="text-red-500 w-6 h-6" />
                ) : (
                  <RiHeartLine className="text-gray-700 w-6 h-6" />
                )}
              </button>
            </div>

            {/* ✅ Thumbnails */}
            <div className="flex justify-center gap-3 flex-wrap">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`border-2 rounded-md overflow-hidden w-20 h-20 p-1 transition-all ${
                    selectedImage === index
                      ? "border-[#D99B55] scale-105"
                      : "border-gray-200 hover:border-[#D99B55]"
                  }`}
                >
                  <img
                    src={image}
                    alt={`thumb-${index}`}
                    className="w-full h-full object-cover rounded-md"
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
                  <span className="text-gray-700">Size:</span>
                  <span className="font-semibold text-black/80">
                    {product.size || "21 cm"}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">Weight:</span>
                  <span className="font-semibold text-black/80">
                    {product.weight}g
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Price per gram:</span>
                  <span className="font-semibold text-black/80">
                    ${product.category === "Gold" && goldRate.toFixed(2)}
                    {product.category === "Silver" && silverRate.toFixed(2)}
                    {product.category === "Platinum" && platinumRate.toFixed(2)}
                    {product.category === "Diamond" && diamondRate.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-gray-700">Total Price:</span>
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
                  <span className="block text-sm text-gray-700">
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
                      className="px-3 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={decreaseQuantity}
                    >
                      -
                    </button>
                    <span className="px-4 py-2 text-black">{quantity}</span>
                    <button
                      className="px-3 py-2 text-gray-700 hover:bg-gray-100"
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
                  // onClick={addToCart }
                  className={`flex-1 font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center
    ${
      product.isAvailable
        ? "bg-[#D99B55] hover:bg-[#C68A4A] text-white"
        : "bg-gray-400 cursor-not-allowed text-gray-100"
    }`}
                  disabled={!product.isAvailable}
                >
                  <RiShoppingCartLine className="w-5 h-5 mr-2" />
                  {product.isAvailable ? "Add to Cart" : "Stock Out"}
                </button>

                <button
                  onClick={() => handleWish(product)}
                  className="px-4 py-3 border-2 border-[#D99B55] text-[#D99B55] font-medium rounded-lg hover:bg-[#D99B55]/10 transition-colors"
                >
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
