// import React, { useEffect, useState } from 'react';
// import Card from './Card';
// import useProducts from '../Hooks/useProducts';
// import useMetal from '../Hooks/useMetal';
// import Loading from '../Shared/Loading';

// const AllProduct = () => {
//   // const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [weightRange, setWeightRange] = useState([0, 2000]);
//   const [sortOption, setSortOption] = useState('default');
//   const [products , isLoading , refetch] = useProducts([]);
//   const [metal] = useMetal([]);
//   console.log(metal);
//   const goldRate = metal.find((m) => m?.metal === "Gold")?.price || 0;
//   const silverRate = metal.find((m) => m?.metal === "Silver")?.price || 0;
//   const platinumRate = metal.find((m) => m?.metal === "Coins")?.price || 0;
//   const diamondRate = metal.find((m) => m?.metal === "Diamond")?.price || 0;

  


  

//   // Get unique categories
//   const categories = ['all', ...new Set(products.map(product => product.category))];

//   // Filter products based on category and weight range
//   useEffect(() => {
//     let filtered = products;

//     // Filter by category
//     if (selectedCategory !== 'all') {
//       filtered = filtered.filter(product => product.category === selectedCategory);
//     }

//     // Filter by weight range
//     filtered = filtered.filter(product => {
//       return product?.weight >= weightRange[0] && product?.weight <= weightRange[1];
//     });

//     // Sort products
//     switch (sortOption) {
//       case 'weight-low-high':
//         filtered = [...filtered].sort((a, b) => a.weight - b.weight);
//         break;
//       case 'weight-high-low':
//         filtered = [...filtered].sort((a, b) => b.weight - a.weight);
//         break;
//       case 'name-asc':
//         filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
//         break;
//       case 'name-desc':
//         filtered = [...filtered].sort((a, b) => b.name.localeCompare(a.name));
//         break;
//       default:
//         break;
//     }

//     setFilteredProducts(filtered);
//   }, [products, selectedCategory, weightRange, sortOption]);

//   const handleWeightRangeChange = (e) => {
//     const value = parseInt(e.target.value);
//     setWeightRange([0, value]);
//   };

  
//   if (isLoading) {
//     return <Loading></Loading>
//   }


//   return (
//     <div className="py-10 flex flex-col md:flex-row bg-white min-h-screen">
//       {/* Sidebar Filters */}
//       <div className='flex flex-col w-full md:w-64 p-4 border-r border-gray-200'>
//         <h2 className="text-xl mb-4 text-slate-950 font-light">Filters Products</h2>

//         {/* Filter by Category */}
//         <div className="mb-6">
//           <h3 className="font-bold text-slate-950 md:text-xl mb-2">Category</h3>
//           <div className='w-full bg-[#FEB564] h-0.5 my-5'></div>
//           <div className="space-y-2">
//             {categories.map(category => (
//               <div key={category} className="flex items-center">
//                 <input
//                   type="radio"
//                   id={category}
//                   name="category"
//                   value={category}
//                   checked={selectedCategory === category}
//                   onChange={(e) => setSelectedCategory(e.target.value)}
//                   className="mr-2"
//                 />
//                 <label htmlFor={category} className="text-gray-600 capitalize">
//                   {category}
//                 </label>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Filter by Weight */}
//         {/* Just change this function . i want to change the price range from both left and right side . */}
//         <div className="mb-6">
//           <h3 className="font-bold text-slate-950 md:text-xl mb-2">Weight Range</h3>
//           <div className='w-full bg-[#FEB564] h-0.5 my-5'></div>
//           <div className="space-y-2">
//             <input
//               type="range"
//               min="0"
//               max="2000"
//               step="100"
//               value={weightRange[1]}
//               onChange={handleWeightRangeChange}
//               className="w-full"
//             />
//             <div className="flex justify-between text-sm text-gray-600">
//               <span>0 gm</span>
//               <span>{weightRange[1]} gm</span> 
//             </div>
//           </div>
//         </div>

//         {/* Clear Filters Button */}
//         <button
//           onClick={() => {
//             setSelectedCategory('all');
//             setWeightRange([0, 2000]);
//             setSortOption('default');
//           }}
//           className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
//         >
//           Clear Filters
//         </button>
//       </div>

//       {/* Main Content */}
//       <div className='flex-1 p-4'>
//         {/* Header with item count and sort options */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
//           <p className="text-gray-600 mb-2 md:mb-0">
//             Showing {filteredProducts.length} of {products.length} items
//           </p>
          
//           <div className="flex items-center md:px-4">
//             <select
//               id="sort"
//               value={sortOption}
//               onChange={(e) => setSortOption(e.target.value)}
//               className="border border-gray-300 bg-[#181818] px-6 py-2 text-white"
//             >
//               <option value="default">Sort By</option>
//               <option value="weight-low-high">Weight: Low to High</option>
//               <option value="weight-high-low">Weight: High to Low</option>
//               <option value="name-asc">Name: A to Z</option>
//               <option value="name-desc">Name: Z to A</option>
//             </select>
//           </div>
//         </div>

//         {/* Products Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredProducts.map((product) => (
//             <div key={product.id}>
//               <Card product={product} />
//             </div>
//           ))}
//         </div>

//         {/* No results message */}
//         {filteredProducts.length === 0 && (
//           <div className="text-center py-12">
//             <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
//             <button
//               onClick={() => {
//                 setSelectedCategory('all');
//                 setWeightRange([0, 2000]);
//                 setSortOption('default');
//               }}
//               className="mt-4 bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-700 transition-colors"
//             >
//               Clear Filters
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AllProduct;





import React, { useEffect, useState, useMemo } from 'react';
import { 
  FaFilter, 
  FaSearch, 
  FaTh, 
  FaList, 
  FaGem, 
  FaSort,
  FaBalanceScale,
  FaTag,
  FaTimes,
  FaChevronDown,
  FaHeart
} from 'react-icons/fa';
import useMetal from '../Hooks/useMetal';
import useProducts from '../Hooks/useProducts';
import Card from './Card';

const AllProduct = () => {
  // Mock data - replace with your actual hooks
  const [products] = useProducts()

  const [metal ] = useMetal()

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [weightRange, setWeightRange] = useState([0, 100]);
  const [sortOption, setSortOption] = useState('default');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  // Get metal prices
  const goldPrice = metal.find(m => m?.metal === 'Gold')?.price || 68.50;
  const silverPrice = metal.find(m => m?.metal === 'Silver')?.price || 0.95;
  const platinumPrice = metal.find(m => m?.metal === 'Platinum')?.price || 32.10;

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

  // Get unique categories
  const categories = useMemo(() => {
    return ['all', ...new Set(products.map(product => product.category))];
  }, [products]);

  // Enhanced filtering logic
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.shortDescription?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Weight filter
    filtered = filtered.filter(product => 
      product.weight >= weightRange[0] && product.weight <= weightRange[1]
    );

    // Price filter
    filtered = filtered.filter(product => {
      const price = calculatePrice(product);
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Availability filter
    if (showAvailableOnly) {
      filtered = filtered.filter(product => product.isAvailable);
    }

    // Featured filter
    if (showFeaturedOnly) {
      filtered = filtered.filter(product => product.featured);
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
  }, [products, searchTerm, selectedCategory, weightRange, priceRange, sortOption, showAvailableOnly, showFeaturedOnly, goldPrice, silverPrice, platinumPrice]);

  // Update filtered products when dependencies change
  useEffect(() => {
    setFilteredProducts(filteredAndSortedProducts);
  }, [filteredAndSortedProducts]);

  const clearAllFilters = () => {
    setSelectedCategory('all');
    setPriceRange([0, 5000]);
    setWeightRange([0, 100]);
    setSortOption('default');
    setSearchTerm('');
    setShowAvailableOnly(false);
    setShowFeaturedOnly(false);
  };

  const activeFiltersCount = [
    selectedCategory !== 'all',
    priceRange[0] > 0 || priceRange[1] < 5000,
    weightRange[0] > 0 || weightRange[1] < 100,
    searchTerm,
    showAvailableOnly,
    showFeaturedOnly
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#FEB564] via-[#f59426] to-[#FEB564] py-16">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FaGem className="text-3xl" />
            <h1 className="text-4xl md:text-5xl font-bold">Our Jewelry Collection</h1>
            <FaGem className="text-3xl" />
          </div>
          <p className="text-xl text-amber-100 max-w-2xl mx-auto">
            Discover authentic Arabic gold and silver jewelry crafted with traditional techniques and modern elegance
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Controls Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search jewelry by name, category, or description..."
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
                  ? 'bg-[#f7992f] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <FaFilter />
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
                <FaTh className="text-gray-600" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                }`}
              >
                <FaList className="text-gray-600" />
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
              <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <FaFilter className="text-amber-600" />
                  Filter Products
                </h2>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearAllFilters}
                    className="text-amber-600 hover:text-amber-700 font-medium text-sm flex items-center gap-1"
                  >
                    <FaTimes size={12} />
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

              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <FaTag className="text-amber-600" />
                  Category
                </h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {categories.map(category => (
                    <label key={category} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={selectedCategory === category}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-4 h-4 text-amber-600 focus:ring-amber-500"
                      />
                      <span className="text-gray-700 capitalize">{category}</span>
                      <span className="text-gray-400 text-sm ml-auto">
                        ({products.filter(p => category === 'all' || p.category === category).length})
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <FaTag className="text-amber-600" />
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
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 5000])}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    step="50"
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
                  <FaBalanceScale className="text-amber-600" />
                  Weight Range (grams)
                </h3>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
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
                  <FaGem className="text-amber-600" />
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
                  Showing {filteredProducts.length} of {products.length} products
                </p>
                <p className="text-gray-500 text-sm">
                  {searchTerm && `Results for "${searchTerm}"`}
                  {selectedCategory !== 'all' && ` in ${selectedCategory}`}
                </p>
              </div>
              
              {/* Active Filters Display */}
              {activeFiltersCount > 0 && (
                <div className="flex flex-wrap gap-2 mt-3 md:mt-0">
                  {selectedCategory !== 'all' && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">
                      {selectedCategory}
                      <button onClick={() => setSelectedCategory('all')}>
                        <FaTimes size={10} />
                      </button>
                    </span>
                  )}
                  {showAvailableOnly && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      Available Only
                      <button onClick={() => setShowAvailableOnly(false)}>
                        <FaTimes size={10} />
                      </button>
                    </span>
                  )}
                  {showFeaturedOnly && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      Featured
                      <button onClick={() => setShowFeaturedOnly(false)}>
                        <FaTimes size={10} />
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
                   <Card product={product}></Card>
                ))}
              </div>
            ) : (
              // No Results
              <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
                <FaGem className="text-6xl text-gray-300 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-800 mb-4">No Products Found</h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  We couldn't find any products matching your criteria. Try adjusting your filters or search terms.
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

            {/* Pagination */}
            {filteredProducts.length > 12 && (
              <div className="mt-12 flex justify-center">
                <div className="flex gap-2">
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    Previous
                  </button>
                  <button className="px-4 py-2 bg-amber-600 text-white rounded-lg">1</button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">2</button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">3</button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 py-16 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">Can't Find What You're Looking For?</h3>
          <p className="text-xl text-amber-100 mb-8">
            Our master jewelers can create custom Arabic jewelry pieces tailored to your preferences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="px-8 py-4 bg-white text-amber-600 font-bold rounded-xl hover:bg-amber-100 transition-colors">
              Request Custom Design
            </a>
            <a href="tel:+15042521732" className="px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-amber-600 transition-colors">
              Call (504) 252-1732
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProduct;