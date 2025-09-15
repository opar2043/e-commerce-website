import React from "react";
import { Link, Outlet } from "react-router-dom";
import {
  MdAddBox,
  MdLibraryBooks,
  MdDashboard,
  MdShoppingCart,
} from "react-icons/md";
import { AiOutlineHome } from "react-icons/ai";
import { FaCoins, FaUser } from "react-icons/fa";
import { RiVipCrownLine } from "react-icons/ri";

const Dashboard = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      <div className="h-[100vh] w-full md:w-72 bg-white p-6 space-y-6 shadow-lg border-r border-gray-200">
        {/* Brand Header */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <RiVipCrownLine className="text-3xl text-[#D99B55]" />
          <h2 className="text-2xl font-bold text-gray-800">
            Tannous Jewelry
          </h2>
        </div>

        {/* Navigation */}
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider pl-3 ">
            Main Menu
          </h3>
          <ul className="">
            {/* <li>
              <Link
                to="/dashboard/admin"
                className="flex items-center gap-2 text-gray-700 hover:bg-[#D99B55] hover:text-white rounded-lg px-4 py-2 transition-all duration-200"
              >
                <MdDashboard size={20} /> Dashboard
              </Link>
            </li> */}
            <li>
              <Link
                to="/dashboard/addproducts"
                className="flex items-center gap-2 text-gray-700 hover:bg-[#D99B55] hover:text-white rounded-lg px-4 py-3 transition-all duration-200"
              >
                <MdAddBox size={20} /> Add Products
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/updateprice"
                className="flex items-center gap-2 text-gray-700 hover:bg-[#D99B55] hover:text-white rounded-lg px-4 py-3 transition-all duration-200"
              >
                <FaCoins size={20} /> Update Price
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/allproduct"
                className="flex items-center gap-2 text-gray-700 hover:bg-[#D99B55] hover:text-white rounded-lg px-4 py-3 transition-all duration-200"
              >
                <MdLibraryBooks size={20} /> All Products
              </Link>
            </li>
          </ul>
        </div>

        {/* Management */}
        <div className="space-y-3 ">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider pl-3 mb-2">
            Management
          </h3>
          <ul className="space-y-2">
            <li>
              <Link
                to="/dashboard/user"
                className="flex items-center gap-2 text-gray-700 hover:bg-[#D99B55] hover:text-white rounded-lg px-4 py-2 transition-all duration-200"
              >
                <FaUser size={18} /> Customers
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/order"
                className="flex items-center gap-2 text-gray-700 hover:bg-[#D99B55] hover:text-white rounded-lg px-4 py-2 transition-all duration-200"
              >
                <MdShoppingCart size={20} /> Orders
              </Link>
            </li>
          </ul>
        </div>

        {/* Bottom Navigation */}
        <div className="pt-4  border-t border-gray-200">
          <ul className="space-y-2">
            <li>
              <Link
                to="/"
                className="flex items-center gap-2 bg-[#D99B55] text-white hover:bg-red-500 rounded px-4 py-2 transition-all duration-200"
              >
                <AiOutlineHome size={20} /> Back to Home
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
