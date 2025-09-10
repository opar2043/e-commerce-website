import React, { useEffect, useState } from "react";
import {
  FiSearch,
  FiDollarSign,
  FiPieChart,
  FiShoppingCart,
  FiFilter,
} from "react-icons/fi";
import Loading from "../../Shared/Loading";

const Order = () => {
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCart, setFilteredCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating API call with your data structure
    const mockCartData = [
      {
        category: "gold",
        id: 1,
        image: "https://1.ibb.co.com/XZnewqBf/gold5.webp",
        name: "Gold Plated Necklace",
        price: 377.5,
        quantity: 1,
        weight: 3,
      },
      {
        id: 2,
        name: "Gold Plated Mecklace",
        category: "gold",
        image: "https://1.ibb.co.com/XZnewqBf/gold5.webp",
        price: 795,
        quantity: 2,
        weight: 5,
      },
      {
        id: 3,
        name: "Platinum Earrings",
        category: "platinum",
        image: "https://1.ibb.co.com/XZnewqBf/gold5.webp",
        price: 295.2,
        quantity: 1,
        weight: 2,
      },
    ];

    setTimeout(() => {
      setCart(mockCartData);
      setFilteredCart(mockCartData);
      setLoading(false);
    }, 1000); // simulate API delay
  }, []);

  // Calculate total revenue
  const calculateTotalRevenue = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Calculate total profit (30% profit margin)
  const calculateTotalProfit = () => {
    return cart.reduce((total, item) => total + item.price * 0.3 * item.quantity, 0);
  };

  // Calculate total items
  const calculateTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Handle search
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = cart.filter(
      (item) =>
        item.name.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term)
    );

    if (selectedCategory !== "all") {
      setFilteredCart(filtered.filter((item) => item.category === selectedCategory));
    } else {
      setFilteredCart(filtered);
    }
  };

  // Handle category filter
  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);

    if (category === "all") {
      setFilteredCart(
        searchTerm
          ? cart.filter(
              (item) =>
                item.name.toLowerCase().includes(searchTerm) ||
                item.category.toLowerCase().includes(searchTerm)
            )
          : cart
      );
    } else {
      setFilteredCart(
        cart.filter(
          (item) =>
            item.category === category &&
            (item.name.toLowerCase().includes(searchTerm) ||
              item.category.toLowerCase().includes(searchTerm))
        )
      );
    }
  };

  // Get unique categories
  const getCategories = () => {
    const categories = cart.map((item) => item.category);
    return ["all", ...new Set(categories)];
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">
          Order Management
        </h1>
        <p className="text-slate-600 mb-8">
          Track and manage your orders and profits
        </p>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Total Items */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-blue-100 mr-4">
                <FiShoppingCart className="text-2xl text-blue-600" />
              </div>
              <div>
                <p className="text-slate-600">Total Items</p>
                <h3 className="text-2xl font-bold text-slate-800">
                  {calculateTotalItems()}
                </h3>
              </div>
            </div>
          </div>

          {/* Total Revenue */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-green-100 mr-4">
                <FiDollarSign className="text-2xl text-green-600" />
              </div>
              <div>
                <p className="text-slate-600">Total Revenue</p>
                <h3 className="text-2xl font-bold text-slate-800">
                  ${calculateTotalRevenue().toFixed(2)}
                </h3>
              </div>
            </div>
          </div>

          {/* Total Profit */}
          {/* <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-amber-100 mr-4">
                <FiPieChart className="text-2xl text-amber-600" />
              </div>
              <div>
                <p className="text-slate-600">Total Profit</p>
                <h3 className="text-2xl font-bold text-slate-800">
                  ${calculateTotalProfit().toFixed(2)}
                </h3>
              </div>
            </div>
          </div> */}
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-grow">
              <FiSearch className="absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search by product name or category..."
                className="w-full border border-slate-300 rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-[#FEB564] focus:border-transparent"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>

            <div className="flex items-center">
              <FiFilter className="text-slate-400 mr-2" />
              <select
                className="border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#FEB564] focus:border-transparent"
                value={selectedCategory}
                onChange={(e) => handleCategoryFilter(e.target.value)}
              >
                {getCategories().map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="py-4 px-6 text-left text-slate-600 font-semibold">
                    Product
                  </th>
                  <th className="py-4 px-6 text-left text-slate-600 font-semibold">
                    Category
                  </th>
                  <th className="py-4 px-6 text-left text-slate-600 font-semibold">
                    Price
                  </th>
                  <th className="py-4 px-6 text-left text-slate-600 font-semibold">
                    Quantity
                  </th>
                  <th className="py-4 px-6 text-left text-slate-600 font-semibold">
                    Weight
                  </th>
                  <th className="py-4 px-6 text-left text-slate-600 font-semibold">
                    Revenue
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCart.length > 0 ? (
                  filteredCart.map((item, index) => {

                    return (
                      <tr
                        key={`${item.id}-${index}`}
                        className="hover:bg-slate-50"
                      >
                        <td className="py-4 px-6">
                          <div className="flex items-center">
                            <span className="font-medium text-slate-800">
                              {item.name}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="inline-block px-3 py-1 bg-slate-100 text-slate-800 rounded-full text-sm capitalize">
                            {item.category}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-slate-800">
                          ${item.price.toFixed(2)}
                        </td>
                        <td className="py-4 px-6 text-slate-800">
                          {item.quantity}
                        </td>
                        <td className="py-4 px-6 text-slate-800">
                          {item.weight}g
                        </td>
                        <td className="py-4 px-6 text-slate-800 font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="py-8 px-6 text-center text-slate-500"
                    >
                      No orders found matching your search criteria.
                    </td>
                  </tr>
                )}
              </tbody>

              {filteredCart.length > 0 && (
                <tfoot className="bg-slate-50">
                  <tr>
                    <td
                      colSpan="5"
                      className="py-4 px-6 text-right font-semibold text-slate-800"
                    >
                      Totals:
                    </td>
                    <td className="py-4 px-6 font-semibold text-slate-800">
                      $
                      {filteredCart
                        .reduce(
                          (total, item) => total + item.price * item.quantity,
                          0
                        )
                        .toFixed(2)}
                    </td>

                  </tr>
                </tfoot>
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
