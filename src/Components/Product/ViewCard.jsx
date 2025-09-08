import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { RiVipCrownLine, RiHeartLine, RiHeartFill, RiStarFill, RiShoppingCartLine } from "react-icons/ri";

const ViewCard = () => {
  const {id} = useParams();
  const [products, setProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    fetch("/product.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D99B55] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  const handleImageSelect = (index) => {
    setSelectedImage(index);
  };

  const handlePriceSelect = (index) => {
    setSelectedPrice(index);
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <a href="/" className="text-gray-500 hover:text-[#D99B55] transition-colors">Home</a>
            </li>
            <li className="flex items-center">
              <span className="mx-2 text-gray-400">/</span>
              <a href="/products" className="text-gray-500 hover:text-[#D99B55] transition-colors">Products</a>
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
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
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
                      ? 'border-[#D99B55] scale-105' 
                      : 'border-gray-200 hover:border-[#D99B55]'
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center mb-4">
                <div className="flex text-[#D99B55]">
                  <RiStarFill className="w-5 h-5" />
                  <RiStarFill className="w-5 h-5" />
                  <RiStarFill className="w-5 h-5" />
                  <RiStarFill className="w-5 h-5" />
                  <RiStarFill className="w-5 h-5 text-gray-300" />
                </div>
                <span className="ml-2 text-gray-600">(12 reviews)</span>
              </div>
              <p className="text-gray-700">{product.shortDescription}</p>
            </div>

            {/* Availability */}
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              product.isAvailable 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {product.isAvailable ? 'In Stock' : 'Out of Stock'}
            </div>

            {/* Price Options */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Price Options</h3>
              <div className="flex flex-wrap gap-3">
                {product.prices.map((priceOption, index) => (
                  <button
                    key={index}
                    onClick={() => handlePriceSelect(index)}
                    className={`px-4 py-2 rounded-lg border-2 transition-all ${
                      selectedPrice === index
                        ? 'border-[#D99B55] bg-[#D99B55]/10'
                        : 'border-gray-200 hover:border-[#D99B55]'
                    }`}
                  >
                    <div className="flex flex-col items-center">
                      <span className={`text-sm ${
                        selectedPrice === index ? 'text-[#D99B55] font-medium' : 'text-gray-600'
                      }`}>
                        Option {index + 1}
                      </span>
                      <div className="flex items-baseline mt-1">
                        <span className="text-lg font-bold text-gray-900">
                          ${priceOption.offerPrice}
                        </span>
                        <span className="ml-2 text-sm text-gray-500 line-through">
                          ${priceOption.price}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Options */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Select Size</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => handleSizeSelect(size)}
                      className={`px-4 py-2 rounded-md border-2 transition-all ${
                        selectedSize === size
                          ? 'border-[#D99B55] bg-[#D99B55]/10 text-[#D99B55] font-medium'
                          : 'border-gray-200 hover:border-[#D99B55] text-gray-700'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Add to Cart */}
            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="block text-sm text-gray-600">Total Price</span>
                  <div className="flex items-baseline mt-1">
                    <span className="text-2xl font-bold text-gray-900">
                      ${product.prices[selectedPrice].offerPrice}
                    </span>
                    <span className="ml-2 text-sm text-gray-500 line-through">
                      ${product.prices[selectedPrice].price}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button className="px-3 py-2 text-gray-600 hover:bg-gray-100">-</button>
                    <span className="px-4 py-2">1</span>
                    <button className="px-3 py-2 text-gray-600 hover:bg-gray-100">+</button>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <button 
                  className="flex-1 bg-[#D99B55] hover:bg-[#C68A4A] text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
                  disabled={!product.isAvailable}
                >
                  <RiShoppingCartLine className="w-5 h-5 mr-2" />
                  Add to Cart
                </button>
                <button className="px-4 py-3 border-2 border-[#D99B55] text-[#D99B55] font-medium rounded-lg hover:bg-[#D99B55]/10 transition-colors">
                  Buy Now
                </button>
              </div>
            </div>

            {/* Product Features */}
            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Features</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <RiVipCrownLine className="w-5 h-5 text-[#D99B55] mt-0.5 mr-3" />
                  <span className="text-gray-700">Premium quality materials</span>
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
                  <span className="text-gray-700">Free shipping and returns</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewCard;