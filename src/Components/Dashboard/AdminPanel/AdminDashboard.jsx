import React, { useEffect, useState } from 'react';
import { MdShoppingCart, MdInventory, MdPeople, MdAttachMoney } from 'react-icons/md';

const AdminDashboard = () => {
  const [userData, setUserData] = useState([]);
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    fetch('/user.json')
      .then(res => res.json())
      .then(data => setUserData(data))
  }, [])

  useEffect(() => {
    fetch("/product.json")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);

  // Calculate statistics
  const totalOrders = 152; // You can replace this with actual order data
  const totalRevenue = products.reduce((sum, product) => sum + product.prices[0].offerPrice, 0);
  const totalUsers = userData.length;
  const totalProducts = products.length;

  const stats = [
    {
      title: "Total Orders",
      value: totalOrders,
      icon: <MdShoppingCart className="text-3xl" />,
      color: "bg-blue-500",
      textColor: "text-blue-500"
    },
    {
      title: "Total Products",
      value: totalProducts,
      icon: <MdInventory className="text-3xl" />,
      color: "bg-green-500",
      textColor: "text-green-500"
    },
    {
      title: "Total Users",
      value: totalUsers,
      icon: <MdPeople className="text-3xl" />,
      color: "bg-[#D99B55]",
      textColor: "text-[#D99B55]"
    },
    {
      title: "Total Revenue",
      value: `$${totalRevenue}`,
      icon: <MdAttachMoney className="text-3xl" />,
      color: "bg-purple-500",
      textColor: "text-purple-500"
    }
  ];

  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-slate-800 mb-8">Admin Dashboard</h1>
      
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">{stat.title}</p>
                <p className="text-2xl font-bold text-slate-800 mt-2">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full ${stat.color} bg-opacity-10`}>
                <span className={stat.textColor}>{stat.icon}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <div className="bg-white rounded-lg shadow-lg p-6 border border-slate-200">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Recent Users</h2>
          <div className="space-y-3">
            {userData.slice(0, 5).map((user) => (
              <div key={user._id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div>
                  <p className="font-medium text-slate-800">{user.name}</p>
                  <p className="text-sm text-slate-600">{user.email}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  user.role === 'admin' 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-green-100 text-green-800'
                }`}>
                  {user.role}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Products */}
        <div className="bg-white rounded-lg shadow-lg p-6 border border-slate-200">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Recent Products</h2>
          <div className="space-y-3">
            {products.slice(0, 5).map((product) => (
              <div key={product.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div>
                  <p className="font-medium text-slate-800">{product.name}</p>
                  <p className="text-sm text-slate-600 capitalize">{product.category}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  product.isAvailable 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {product.isAvailable ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;