import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RiVipCrownLine, RiHeartLine, RiHeartFill, RiShoppingCartLine } from "react-icons/ri";
import useAuth from '../Hooks/useAuth';
import Swal from 'sweetalert2';
import Loading from '../Shared/Loading';

const ViewCard = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [metal, setMetal] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { cart, setCart } = useAuth();
  const [price , setPrice] = useState(0);

  useEffect(() => {
    fetch('/metal.json')
      .then(response => response.json())
      .then(data => setMetal(data))
      .catch(error => console.error('Error fetching metal data:', error));
  }, []);

  useEffect(() => {
    fetch("/product.json")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .finally(() => setLoading(false));
  }, []);

  const product = products.find(p => p.id === parseInt(id));

  // Safe access to metal prices
  const goldPrice = metal.find(m => m?.metal === 'Gold')?.price * product?.weight || 0;
  const silverPrice = metal.find(m => m?.metal === 'Silver')?.price * product?.weight || 0;
  const platinumPrice = metal.find(m => m?.metal === 'Platinum')?.price * product?.weight || 0;
  const diamondPrice = metal.find(m => m?.metal === 'Diamond')?.price * product?.weight || 0;

  useEffect(()=>{
    if(product?.category === 'gold'){
      setPrice(goldPrice)
    } else if(product?.category === 'silver'){
      setPrice(silverPrice)
    } else if(product?.category === 'platinum'){
      setPrice(platinumPrice)
    } else if(product?.category === 'diamond'){
      setPrice(diamondPrice)
    }
  },[product?.category , goldPrice, silverPrice, platinumPrice, diamondPrice]);

  // console.log(price , product?.category , 'its my price');
  

    const totalPrice = price * quantity;

  if (loading || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
         <Loading></Loading>
      </div>
    );
  }

const handleImageSelect = (index) => {
    setSelectedImage(index);
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  function handleAddToCart(e) {
    e.preventDefault();
    
    const productToAdd = {
      id: product.id,
      name: product.name,
      category: product.category,
      image: product.images[0],
      price: totalPrice, // This calculates the price based on weight and metal type
      weight: product.weight,
      // size: selectedSize,
      quantity: quantity
    };
    
    setCart((prev) => [...prev, productToAdd]);

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Product added to cart!',
      showConfirmButton: false,
      timer: 1500
    });
  }


  console.log(cart);

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

            {/* Product Weight and Price */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Product Details</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Weight:</span>
                  <span className="font-semibold text-black">{product.weight}g</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Price:</span>
                  <span className="text-lg font-bold text-[#D99B55]">
                    {
                      product.category === 'gold' && goldPrice 
                    }

                    {
                      product.category === 'silver' && silverPrice 
                    }

                    {
                      product.category === 'platinum' && platinumPrice
                    }
                    {
                      product.category === 'diamond' && diamondPrice
                    }
                  </span>
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  {product.category === 'diamond' ? 
                    'Diamond price calculated based on weight and quality' :
                    `Price calculated based on current ${product.category.toLowerCase()} rate`
                  }
                </div>
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
                      {totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button 
                      className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                      onClick={decreaseQuantity}
                    >-</button>
                    <span className="px-4 py-2 text-black">{quantity}</span>
                    <button 
                      className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                      onClick={increaseQuantity}
                    >+</button>
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