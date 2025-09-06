import { NavLink } from "react-router-dom";
import { FiShoppingCart, FiUser, FiSearch, FiChevronUp, FiChevronDown } from "react-icons/fi";

const Navbar = () => {
  const NavLinks = (
    <>
      <NavLink to={"/"}>
        <li>
          <span>Home</span>
        </li>
        <hr className="md:border md:border-[#120e0ed8] w-8 mx-auto hidden" />
      </NavLink>

      <NavLink to={"/collection"}>
        <li>
          <span>Collection</span>
        </li>
        <hr className="md:border md:border-[#120e0ed8] w-8 mx-auto hidden" />
      </NavLink>

      <NavLink to={"/about"}>
        <li>
          <span>About</span>
        </li>
        <hr className="md:border md:border-[#120e0ed8]  w-8 mx-auto hidden" />
      </NavLink>
      
      <NavLink to={"/contact"}>
        <li>
          <span>Contact</span>
        </li>
        <hr className="md:border md:border-[#120e0ed8]  w-8 mx-auto hidden" />
      </NavLink>
    </>
  );

  return (
    <div>
      {/* Upper Navbar - Black Background */}
      <div className="bg-[#110F0D] py-2 px-1 md:px-8 flex flex-col lg:flex-row justify-between items-center text-white">
        {/* Left Side - Logo and Website Name */}
        <div className="flex items-center justify-start gap-3">
          <img src={'gold1'} alt="Logo" className="w-6 md:w-8" />
          <p className="text-white text-2xl md:text-4xl font-extrabold tracking-wide">
            Tannous Jewlery
          </p>
        </div>

        {/* Middle - Metal Prices */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 mt-3 lg:mt-0">
          {/* Gold Price */}
          <div className="flex items-center gap-2 text-center">
            <span className="text-[#FB8911] font-bold text-sm md:text-base">
              GOLD
            </span>
            <span className="text-white text-sm md:text-base">$2,045.50</span>
            <div className="flex flex-col items-center">
              <FiChevronUp className="text-green-400 text-xs" />
              <FiChevronDown className="text-gray-500 text-xs opacity-30" />
            </div>
            <span className="text-green-400 text-xs md:text-sm">
              +1.2% (+$24.50)
            </span>
          </div>

          {/* Silver Price */}
          <div className="flex items-center gap-2 text-center">
            <span className="text-gray-300 font-bold text-sm md:text-base">
              SILVER
            </span>
            <span className="text-white text-sm md:text-base">$23.85</span>
            <div className="flex flex-col items-center">
              <FiChevronUp className="text-gray-500 text-xs opacity-30" />
              <FiChevronDown className="text-red-400 text-xs" />
            </div>
            <span className="text-red-400 text-xs md:text-sm">
              -0.8% (-$0.19)
            </span>
          </div>

          {/* Platinum Price */}
          <div className="flex items-center gap-2 text-center">
            <span className="text-gray-100 font-bold text-sm md:text-base">
              PLATINUM
            </span>
            <span className="text-white text-sm md:text-base">$978.30</span>
            <div className="flex flex-col items-center">
              <FiChevronUp className="text-green-400 text-xs" />
              <FiChevronDown className="text-gray-500 text-xs opacity-30" />
            </div>
            <span className="text-green-400 text-xs md:text-sm">
              +0.5% (+$4.85)
            </span>
          </div>
        </div>

        {/* Right Side - User Profile */}
        <div className="mt-3 lg:mt-0">
          <NavLink to={"/login"}>
            <button className="p-2 rounded-full border border-white hover:border-[#FB8911] hover:text-[#FB8911] text-white transition-colors duration-200">
              <FiUser size={24} />
            </button>
          </NavLink>
        </div>
      </div>

      {/* Lower Navbar - Updated Design */}
      <div className="navbar bg-[#FEB564] md:px-10 py-4">
        {/* Left Side - Search Bar */}
        <div className="navbar-start">
          <div className="relative">
            <input
              type="text"
              placeholder="Search jewelry..."
              className="pl-10 pr-4 py-2 text-lg bg-transparent  border-b border-amber-700 focus:outline-none focus:border-amber-900 w-72 text-amber-900 placeholder-amber-900"
            />
            <FiSearch
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-700"
              size={20}
            />
          </div>
        </div>

        {/* Right Side - Navigation Links and Cart */}
        <div className="navbar-end flex items-center gap-8">
          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex">
            <ul className="menu menu-horizontal font-semibold text-xl text-amber-900 gap-8">
              {NavLinks}
            </ul>
          </div>

          {/* Cart Icon */}
          <NavLink
            to="/cart"
            className="relative flex items-center text-amber-900 hover:text-amber-700 transition-colors duration-200"
          >
            <FiShoppingCart size={28} />
            <span className="absolute -top-2 -right-3 bg-amber-800 text-white text-sm font-bold rounded-full w-6 h-6 flex items-center justify-center shadow">
              0
            </span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;