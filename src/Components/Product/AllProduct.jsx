import React, { useEffect, useState } from 'react';
import Card from './Card';

const AllProduct = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [weightRange, setweightRange] = useState([0, 2000]);
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

  // Filter products based on category and weight range
  useEffect(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by weight range
    filtered = filtered.filter(product => {
      const minweight = Math.min(...product.weights.map(p => p.offerweight));
      return minweight >= weightRange[0] && minweight <= weightRange[1];
    });

    // Sort products
    switch (sortOption) {
      case 'weight-low-high':
        filtered = [...filtered].sort((a, b) => {
          const aweight = Math.min(...a.weights.map(p => p.offerweight));
          const bweight = Math.min(...b.weights.map(p => p.offerweight));
          return aweight - bweight;
        });
        break;
      case 'weight-high-low':
        filtered = [...filtered].sort((a, b) => {
          const aweight = Math.min(...a.weights.map(p => p.offerweight));
          const bweight = Math.min(...b.weights.map(p => p.offerweight));
          return bweight - aweight;
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
  }, [products, selectedCategory, weightRange, sortOption]);

  const handleweightRangeChange = (e) => {
    const value = parseInt(e.target.value);
    setweightRange([0, value]);
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

        {/* Filter by weight */}
        <div className="mb-6">
          <h3 className="font-bold text-slate-950  md:text-xl mb-2">weight Range</h3>
          <div className='w-full bg-[#FEB564] h-0.5 my-5'></div>
          <div className="space-y-2">
            <input
              type="range"
              min="0"
              max="2000"
              step="100"
              value={weightRange[1]}
              onChange={handleweightRangeChange}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>$0</span>
              <span>${weightRange[1]}</span> 
            </div>
          </div>
        </div>

        {/* Clear Filters Button */}
        <button
          onClick={() => {
            setSelectedCategory('all');
            setweightRange([0, 2000]);
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
              <option value="weight-low-high">weight: Low to High</option>
              <option value="weight-high-low">weight: High to Low</option>
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
                setweightRange([0, 2000]);
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