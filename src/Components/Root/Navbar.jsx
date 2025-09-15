import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FiShoppingCart,
  FiUser,
  FiSearch,
  FiChevronUp,
  FiChevronDown,
  FiMenu,
  FiX,
  FiLogOut,
} from "react-icons/fi";
import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";
import useMetal from "../Hooks/useMetal";
import useAdmin from "../Hooks/useAdmin";
import { FaHeart } from "react-icons/fa";
import logo from "../../assets/tannous.jpg";
import useWish from "../Hooks/useWish";
import useCart from "../Hooks/useCart";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {  handleLogout, user } = useAuth() || {};
  const [wish] = useWish([]);
  const [metal, isLoading, refetch] = useMetal([]);
  const { admin } = useAdmin();
  const [cart ] = useCart();
  const navigate = useNavigate();

  const logOut = () => {
    handleLogout()
      .then(() => {
        Swal.fire({
          title: "Logout Successful",
          icon: "success",
        });
        navigate("/");
      })
      .catch(() => {
        Swal.fire({
          title: "Try Again",
          icon: "error",
        });
      });
  };

  const NavLinks = (
    <>
      <NavLink className='before:w-0  hover:before:w-full before:bg-[#FEB564] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px]  hover:text-[#FEB564] transition-all duration-300 before:left-0 cursor-pointer capitalize ' to={"/"} onClick={() => setIsMenuOpen(false)}>
        <li className="py-2 ">
          <span>Home</span>
        </li>
      </NavLink>

      <NavLink className='before:w-0  hover:before:w-full before:bg-[#FEB564] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px]  hover:text-[#FEB564] transition-all duration-300 before:left-0 cursor-pointer capitalize ' to={"/collection"} onClick={() => setIsMenuOpen(false)}>
        <li className="py-2 ">
          <span>Collection</span>
        </li>
      </NavLink>

      <NavLink className='before:w-0  hover:before:w-full before:bg-[#FEB564] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px]  hover:text-[#FEB564] transition-all duration-300 before:left-0 cursor-pointer capitalize ' to={"/about"} onClick={() => setIsMenuOpen(false)}>
        <li className="py-2 ">
          <span>About</span>
        </li>
      </NavLink>

      <NavLink className='before:w-0  hover:before:w-full before:bg-[#FEB564] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px]  hover:text-[#FEB564] transition-all duration-300 before:left-0 cursor-pointer capitalize ' to={"/contact"} onClick={() => setIsMenuOpen(false)}>
        <li className="py-2">
          <span>Conatct</span>
        </li>
      </NavLink>
      <NavLink
        to="/wish"
        className="relative ml-3 md:ml-0 flex items-center 
         className='before:w-0  hover:before:w-full before:bg-[#FEB564] before:h-[2px] before:transition-all before:duration-300 before:absolute  before:rounded-full before:bottom-[-2px]  hover:text-[#FEB564] transition-all duration-300 before:left-0 cursor-pointer capitalize md:mr-1'
        "
      >
        Wish List
        <span className="absolute hidden  md:top-1 md:-right-3 bg-amber-800 text-white text-xs font-bold rounded-full w-5 h-5 md:flex items-center justify-center shadow">
          {wish?.length || 0}
        </span>
      </NavLink>
      {admin && (
        <NavLink className='before:w-0  hover:before:w-full before:bg-[#FEB564] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px]  hover:text-[#FEB564] transition-all duration-300 before:left-0 cursor-pointer capitalize' to={"/dashboard"} onClick={() => setIsMenuOpen(false)}>
          <li className="py-2">
            <span>Dashboard</span>
          </li>
        </NavLink>
      )}
    </>
  );

  return (
    <div>
      {/* Upper Navbar */}
      <div className="bg-[#FEB564] py-2 px-4 md:px-8 flex flex-col lg:flex-row justify-between items-center text-slate-950">
        {/* Logo */}
        <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-start">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="w-6 md:w-8 rounded-full" />
            <p className="text-slate-950 text-xl md:text-3xl  tracking-wide">
              Tannous Jewelry
            </p>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-full border border-black"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>

        {/* Metal Prices */}
        <div className="hidden md:flex flex-col md:flex-row gap-4 md:gap-8 mt-3 lg:mt-0">
          {metal &&
            metal.map((met) => (
              <div
                key={met.metal}
                className="flex items-center gap-2 text-center text-xs"
              >
                <span className="text-slate-950 font-semibold text-xs ">
                  {met.metal.toUpperCase()}
                </span>
                <span className="text-white text-xs ">
                  ${met.price.toFixed(2)}
                </span>
                <div className="flex flex-col items-center">
                  <FiChevronUp className="text-green-500 text-xs" />
                  <FiChevronDown className="text-gray-500 text-xs opacity-30" />
                </div>
                <span className="text-green-600 text-xs ">+1.2% (+$24.50)</span>
              </div>
            ))}
        </div>

        {/* Desktop Logout/Login */}
        <div className="hidden lg:flex items-center gap-2 mt-3 lg:mt-0">
          {user ? (
            <button
              onClick={logOut}
              className="flex items-center flex-col  px-3 py-2  border border-black rounded-full hover:border-white hover:text-white transition-colors duration-200"
            >
              <FiLogOut size={18} />
              <span className="text-[8px]">Logout</span>
            </button>
          ) : (
            <NavLink to="/login">
              <button className="flex items-center gap-2 p-3 border border-black rounded-full hover:border-white hover:text-white transition-colors duration-200">
                <FiUser size={20} />
              </button>
            </NavLink>
          )}
        </div>
      </div>

      {/* Lower Navbar */}
      <div className="navbar bg-[#000000] px-4 md:px-10 py-2 relative">
        {/* Mobile menu overlay */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-90 z-40 lg:hidden"
            onClick={() => setIsMenuOpen(false)}
          >
            <div
              className="absolute top-0 left-0 w-64 h-full bg-black p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                <FiX size={24} />
              </button>
              <ul className="menu text-white text-sm mt-10">{NavLinks}</ul>

              {/* Mobile Login/Logout */}
              <div className="mt-6">
                {user ? (
                  <button
                    onClick={logOut}
                    className="flex items-center gap-2 px-3 py-2 border border-white rounded-full hover:bg-white hover:text-black transition-colors duration-200 w-full justify-center"
                  >
                    <FiLogOut size={20} />
                    <span>Logout</span>
                  </button>
                ) : (
                  <NavLink to="/login" onClick={() => setIsMenuOpen(false)}>
                    <button className="flex items-center gap-2 px-3 py-2 border border-white rounded-full hover:bg-white hover:text-black transition-colors duration-200 w-full justify-center">
                      <FiUser size={20} />
                      <span>Login</span>
                    </button>
                  </NavLink>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Search Bar */}
        <div className="navbar-start">
          <div className="relative">
            <input
              type="text"
              placeholder="Search jewelry..."
              className="pl-10 pr-4 py-2 text-sm bg-transparent border-b border-amber-700 focus:outline-none focus:border-amber-900 w-48 md:w-72 text-white placeholder-amber-900"
            />
            <FiSearch
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-700"
              size={18}
            />
          </div>
        </div>

        {/* Right Side - Desktop Links + Cart */}
        <div className="navbar-end flex items-center gap-4 md:gap-8">
          <div className="hidden lg:flex">
            <ul className="menu menu-horizontal text-sm text-white/90 gap-2">
              {NavLinks}
            </ul>
          </div>

          {/* Cart Icon */}
          <NavLink
            to="/cart"
            className="relative flex items-center text-white hover:text-amber-700 transition-colors duration-200"
          >
            <FiShoppingCart size={24} />
            <span className="absolute -top-2 -right-3 bg-amber-800 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow">
              {cart?.length || 0}
            </span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
