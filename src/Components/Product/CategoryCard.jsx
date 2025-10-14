import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import useMetal from '../Hooks/useMetal';
import useProducts from '../Hooks/useProducts';
import Card from './Card';
import backgroundImage from "../../assets/gold15.jpg";

const CategoryCard = () => {
  const { metal } = useParams();
  const [products] = useProducts();
  const [metalData] = useMetal();

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [weightRange, setWeightRange] = useState([0, 2000]);
  const [sortOption, setSortOption] = useState('default');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(true);
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  // Get metal prices
  const goldPrice = metalData.find(m => m?.metal === 'Gold')?.price || 68.50;
  const silverPrice = metalData.find(m => m?.metal === 'Silver')?.price || 0.95;
  const platinumPrice = metalData.find(m => m?.metal === 'Platinum')?.price || 32.10;

  // Calculate price for a product
  const calculatePrice = (product) => {
    const categoryLower = product.category?.toLowerCase() || '';
    if (categoryLower.includes('gold')) {
      return product.weight * goldPrice;
    } else if (categoryLower.includes('silver')) {
      return product.weight * silverPrice;
    } else if (categoryLower.includes('platinum')) {
      return product.weight * platinumPrice;
    }
    return product.weight * goldPrice;
  };

  // Filter products by category from URL parameter
  const categoryProducts = useMemo(() => {
    return products.filter(product => 
      product.category?.toLowerCase() === metal?.toLowerCase()
    );
  }, [products, metal]);

  // Enhanced filtering logic
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...categoryProducts]; // Start with category filtered products

    // Search filter
    if (searchTerm.trim()) {
      filtered = filtered.filter(product =>
        product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.shortDescription?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Weight filter - only apply if range has been changed from default
    if (weightRange[0] > 0 || weightRange[1] < 2000) {
      filtered = filtered.filter(product => 
        product.weight >= weightRange[0] && product.weight <= weightRange[1]
      );
    }

    // Price filter - only apply if range has been changed from default
    if (priceRange[0] > 0 || priceRange[1] < 50000) {
      filtered = filtered.filter(product => {
        const price = calculatePrice(product);
        return price >= priceRange[0] && price <= priceRange[1];
      });
    }

    // Availability filter
    if (showAvailableOnly) {
      filtered = filtered.filter(product => product.isAvailable !== false);
    }

    // Featured filter
    if (showFeaturedOnly) {
      filtered = filtered.filter(product => product.featured === true);
    }

    // Sorting
    switch (sortOption) {
      case 'price-low-high':
        filtered = [...filtered].sort((a, b) => calculatePrice(a) - calculatePrice(b));
        break;
      case 'price-high-low':
        filtered = [...filtered].sort((a, b) => calculatePrice(b) - calculatePrice(a));
        break;
      case 'weight-low-high':
        filtered = [...filtered].sort((a, b) => a.weight - b.weight);
        break;
      case 'weight-high-low':
        filtered = [...filtered].sort((a, b) => b.weight - a.weight);
        break;
      case 'name-asc':
        filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filtered = [...filtered].sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'featured':
        filtered = [...filtered].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
      default:
        break;
    }

    return filtered;
  }, [categoryProducts, searchTerm, weightRange, priceRange, sortOption, showAvailableOnly, showFeaturedOnly, goldPrice, silverPrice, platinumPrice]);

  // Update filtered products when dependencies change
  useEffect(() => {
    setFilteredProducts(filteredAndSortedProducts);
  }, [filteredAndSortedProducts]);

  const clearAllFilters = () => {
    setPriceRange([0, 50000]);
    setWeightRange([0, 2000]);
    setSortOption('default');
    setSearchTerm('');
    setShowAvailableOnly(false);
    setShowFeaturedOnly(false);
  };

  const activeFiltersCount = [
    priceRange[0] > 0 || priceRange[1] < 50000,
    weightRange[0] > 0 || weightRange[1] < 2000,
    searchTerm.trim(),
    showAvailableOnly,
    showFeaturedOnly
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Header Section */}
      <div
        className="relative py-16 bg-center bg-cover"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative max-w-7xl mx-auto px-4 text-center text-white">
          <div className="flex items-center justify-center gap-3 mb-4">
            <h1 className="text-4xl md:text-5xl font-bold capitalize">{metal} Jewelry</h1>
          </div>
          <p className="text-xl text-amber-100 max-w-2xl mx-auto">
            Browse our exquisite collection of {metal} jewelry pieces
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Controls Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search jewelry by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>

            {/* Filter Toggle Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-colors ${
                showFilters || activeFiltersCount > 0
                  ? 'bg-amber-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filters
              {activeFiltersCount > 0 && (
                <span className="bg-white text-amber-600 px-2 py-1 rounded-full text-xs font-bold">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {/* View Mode Toggle */}
            <div className="flex bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                }`}
              >
                <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                }`}
              >
                <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="appearance-none text-gray-600 bg-white border border-gray-300 rounded-xl px-4 py-3 pr-10 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                <option value="default">Sort By</option>
                <option value="featured">Featured First</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="weight-low-high">Weight: Low to High</option>
                <option value="weight-high-low">Weight: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
              </select>
              <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  Filter Products
                </h2>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearAllFilters}
                    className="text-amber-600 hover:text-amber-700 font-medium text-sm flex items-center gap-1"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Clear All
                  </button>
                )}
              </div>

              {/* Quick Filters */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">Quick Filters</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showAvailableOnly}
                      onChange={(e) => setShowAvailableOnly(e.target.checked)}
                      className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500"
                    />
                    <span className="text-gray-700">Available Only</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showFeaturedOnly}
                      onChange={(e) => setShowFeaturedOnly(e.target.checked)}
                      className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500"
                    />
                    <span className="text-gray-700">Featured Items</span>
                  </label>
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <span className="text-amber-600">💰</span>
                  Price Range
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      placeholder="Min"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                    />
                    <span className="text-gray-500">-</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 50000])}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="50000"
                    step="100"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Weight Range Filter */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <span className="text-amber-600">⚖️</span>
                  Weight Range (grams)
                </h3>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="2000"
                    step="10"
                    value={weightRange[1]}
                    onChange={(e) => setWeightRange([0, parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{weightRange[0]}g</span>
                    <span>{weightRange[1]}g</span>
                  </div>
                </div>
              </div>

              {/* Live Metal Prices */}
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-4 rounded-lg border border-amber-200">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <span className="text-amber-600">💎</span>
                  Live Metal Prices
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Gold (22K):</span>
                    <span className="font-semibold text-amber-600">${goldPrice}/g</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Silver:</span>
                    <span className="font-semibold text-gray-600">${silverPrice}/g</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Platinum:</span>
                    <span className="font-semibold text-purple-600">${platinumPrice}/g</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div>
                <p className="text-gray-700 font-medium">
                  Showing {filteredProducts.length} of {categoryProducts.length} products
                </p>
                <p className="text-gray-500 text-sm">
                  {searchTerm && `Results for "${searchTerm}"`}
                  <span className="capitalize"> in {metal}</span>
                </p>
              </div>

              {/* Active Filters Display */}
              {activeFiltersCount > 0 && (
                <div className="flex flex-wrap gap-2 mt-3 md:mt-0">
                  {showAvailableOnly && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      Available Only
                      <button onClick={() => setShowAvailableOnly(false)}>
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </span>
                  )}
                  {showFeaturedOnly && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      Featured
                      <button onClick={() => setShowFeaturedOnly(false)}>
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Products Grid/List */}
            {filteredProducts.length > 0 ? (
              <div className={
                viewMode === 'grid'
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  : "space-y-6"
              }>
                {filteredProducts.map((product) => (
                  <Card key={product._id || product.id} product={product} />
                ))}
              </div>
            ) : (
              // No Results
              <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
                <span className="text-6xl text-gray-300 block mb-6">💎</span>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">No Products Found</h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  We couldn't find any {metal} products matching your criteria. Try adjusting your filters or search terms.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={clearAllFilters}
                    className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-semibold"
                  >
                    Clear All Filters
                  </button>
                  <button
                    onClick={() => setSearchTerm('')}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                  >
                    Clear Search
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;