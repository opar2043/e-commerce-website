import React, { useEffect, useState } from 'react';
import Card from './Card';

const AllProduct = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [sortOption, setSortOption] = useState('default');

  useEffect(() => {
    fetch("/product.json")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      });
  }, []);

  // Get unique categories
  const categories = ['all', ...new Set(products.map(product => product.category))];

  // Filter products based on category and price range
  useEffect(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by price range
    filtered = filtered.filter(product => {
      const minPrice = Math.min(...product.prices.map(p => p.offerPrice));
      return minPrice >= priceRange[0] && minPrice <= priceRange[1];
    });

    // Sort products
    switch (sortOption) {
      case 'price-low-high':
        filtered = [...filtered].sort((a, b) => {
          const aPrice = Math.min(...a.prices.map(p => p.offerPrice));
          const bPrice = Math.min(...b.prices.map(p => p.offerPrice));
          return aPrice - bPrice;
        });
        break;
      case 'price-high-low':
        filtered = [...filtered].sort((a, b) => {
          const aPrice = Math.min(...a.prices.map(p => p.offerPrice));
          const bPrice = Math.min(...b.prices.map(p => p.offerPrice));
          return bPrice - aPrice;
        });
        break;
      case 'name-asc':
        filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filtered = [...filtered].sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // Default sorting (by id or as they come)
        break;
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategory, priceRange, sortOption]);

  const handlePriceRangeChange = (e) => {
    const value = parseInt(e.target.value);
    setPriceRange([0, value]);
  };

  return (
    <div className="py-10 flex flex-col md:flex-row bg-white min-h-screen">
      {/* Sidebar Filters */}
      <div className='flex flex-col w-full md:w-64 p-4 border-r border-gray-200'>
        <h2 className="text-xl mb-4 text-slate-950 font-light">Filters Products</h2>

        {/* Filter by Category */}
        <div className="mb-6">
          <h3 className="font-bold text-slate-950  md:text-xl mb-2">Category</h3>
          <div className='w-full bg-[#FEB564] h-0.5 my-5'></div>
          <div className="space-y-2">
            {categories.map(category => (
              <div key={category} className="flex items-center">
                <input
                  type="radio"
                  id={category}
                  name="category"
                  value={category}
                  checked={selectedCategory === category}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="mr-2"
                />
                <label htmlFor={category} className="text-gray-600 capitalize">
                  {category}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Filter by Price */}
        <div className="mb-6">
          <h3 className="font-bold text-slate-950  md:text-xl mb-2">Price Range</h3>
          <div className='w-full bg-[#FEB564] h-0.5 my-5'></div>
          <div className="space-y-2">
            <input
              type="range"
              min="0"
              max="2000"
              step="100"
              value={priceRange[1]}
              onChange={handlePriceRangeChange}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>$0</span>
              <span>${priceRange[1]}</span> 
            </div>
          </div>
        </div>

        {/* Clear Filters Button */}
        <button
          onClick={() => {
            setSelectedCategory('all');
            setPriceRange([0, 2000]);
            setSortOption('default');
          }}
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
        >
          Clear Filters
        </button>
      </div>

      {/* Main Content */}
      <div className='flex-1 p-4'>
        {/* Header with item count and sort options */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <p className="text-gray-600 mb-2 md:mb-0 ">
            Showing {filteredProducts.length} of {products.length} items
          </p>
          
          <div className="flex items-center md:px-4">
            <select
              id="sort"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="border border-gray-300 bg-[#181818] px-6 py-2 text-white"
            >
              <option value="default">Sort By</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="">
              <Card product={product} />
            </div>
          ))}
        </div>

        {/* No results message */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setPriceRange([0, 2000]);
                setSortOption('default');
              }}
              className="mt-4 bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProduct;