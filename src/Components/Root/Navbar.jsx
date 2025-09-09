import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FiShoppingCart, FiUser, FiSearch, FiChevronUp, FiChevronDown, FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [metal, setMetal] = useState([]);
  useEffect(()=>{
    fetch('/metal.json')
      .then(response => response.json())
      .then(data => setMetal(data))
      .catch(error => console.error('Error fetching metal data:', error));
  },[])


  const NavLinks = (
    <>
      <NavLink to={"/"} onClick={() => setIsMenuOpen(false)}>
        <li className="py-2 border-b border-gray-700">
          <span>Home</span>
        </li>
      </NavLink>

      <NavLink to={"/collection"} onClick={() => setIsMenuOpen(false)}>
        <li className="py-2 border-b border-gray-700">
          <span>Collection</span>
        </li>
      </NavLink>

      <NavLink to={"/about"} onClick={() => setIsMenuOpen(false)}>
        <li className="py-2 border-b border-gray-700">
          <span>About</span>
        </li>
      </NavLink>
      
      <NavLink to={"/contact"} onClick={() => setIsMenuOpen(false)}>
        <li className="py-2">
          <span>Contact</span>
        </li>
      </NavLink> 
      <NavLink to={"/dashboard"} onClick={() => setIsMenuOpen(false)}>
        <li className="py-2">
          <span>Dashboard</span>
        </li>
      </NavLink>

    </>
  );

  return (
    <div>
      {/* Upper Navbar - Metal Prices */}
      <div className="bg-[#FEB564] py-2 px-4 md:px-8 flex flex-col lg:flex-row justify-between items-center text-slate-950">
        {/* Left Side - Logo and Website Name */}
        <div className="flex items-center  gap-3 w-full lg:w-auto justify-between lg:justify-start">
          <div className="flex items-center gap-3">
            <img src={'gold1'} alt="Logo" className="w-6 md:w-8" />
            <p className="text-slate-950 text-xl md:text-3xl font-extrabold tracking-wide">
              Tannous Jewlery
            </p>
          </div>
          
          {/* Mobile menu button for lower navbar */}
          <button 
            className="lg:hidden p-2 rounded-full border border-black"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>

        {/* Middle - Metal Prices - Hidden on mobile */}
        <div className="hidden md:flex flex-col md:flex-row gap-4 md:gap-8 mt-3 lg:mt-0">

         {
          metal && metal.map(met => (
            <div key={met.metal} className="flex items-center gap-2 text-center">
              <span className="text-slate-950 font-bold text-sm md:text-base">
                {met.metal.toUpperCase()}
              </span>
              <span className="text-white text-sm md:text-base">
                ${met.price.toFixed(2)}
              </span>
              <div className="flex flex-col items-center">
                <FiChevronUp className="text-green-500 text-xs" />
                <FiChevronDown className="text-gray-500 text-xs opacity-30" />
              </div>
              <span className="text-green-600 text-xs md:text-sm">
                +1.2% (+$24.50)
              </span>
            </div>
          ))
         }






          {/* Gold Price */}
          {/* <div className="flex items-center gap-2 text-center">
            <span className="text-[#eb7b04] font-bold text-sm md:text-base">
              GOLD
            </span>
            <span className="text-white text-sm md:text-base">$2,045.50</span>
            <div className="flex flex-col items-center">
              <FiChevronUp className="text-green-500 text-xs" />
              <FiChevronDown className="text-gray-500 text-xs opacity-30" />
            </div>
            <span className="text-green-600 text-xs md:text-sm">
              +1.2% (+$24.50)
            </span>
          </div> */}

          {/* Silver Price */}
          {/* <div className="flex items-center gap-2 text-center">
            <span className="text-slate-950 font-bold text-sm md:text-base">
              SILVER
            </span>
            <span className="text-white text-sm md:text-base">$23.85</span>
            <div className="flex flex-col items-center">
              <FiChevronUp className="text-gray-500 text-xs opacity-30" />
              <FiChevronDown className="text-red-500 text-xs" />
            </div>
            <span className="text-red-500 text-xs md:text-sm">
              -0.8% (-$0.19)
            </span>
          </div> */}

          {/* Platinum Price */}
          {/* <div className="flex items-center gap-2 text-center">
            <span className="text-slate-950 font-bold text-sm md:text-base">
              PLATINUM
            </span>
            <span className="text-white text-sm md:text-base">$978.30</span>
            <div className="flex flex-col items-center">
              <FiChevronUp className="text-green-600 text-xs" />
              <FiChevronDown className="text-gray-500 text-xs opacity-30" />
            </div>
            <span className="text-green-600 text-xs md:text-sm">
              +0.5% (+$4.85)
            </span>
          </div> */}
        </div>

        {/* Right Side - User Profile - Hidden on mobile */}
        <div className="hidden lg:flex mt-3 lg:mt-0">
          <NavLink to={"/login"}>
            <button className="p-2 rounded-full border border-black hover:border-white hover:text-white text-slate-950 transition-colors duration-200">
              <FiUser size={24} />
            </button>
          </NavLink>
        </div>
      </div>

      {/* Lower Navbar */}
      <div className="navbar bg-[#000000] px-4 md:px-10 py-4 relative">
        {/* Mobile menu overlay */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-40 lg:hidden" onClick={() => setIsMenuOpen(false)}>
            <div className="absolute top-0 left-0 w-64 h-full bg-black p-6" onClick={(e) => e.stopPropagation()}>
              <button 
                className="absolute top-4 right-4 text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                <FiX size={24} />
              </button>
              <ul className="menu text-white text-lg mt-10">
                {NavLinks}
              </ul>
            </div>
          </div>
        )}

        {/* Left Side - Search Bar */}
        <div className="navbar-start">
          <div className="relative">
            <input
              type="text"
              placeholder="Search jewelry..."
              className="pl-10 pr-4 py-2 text-lg bg-transparent border-b border-amber-700 focus:outline-none focus:border-amber-900 w-48 md:w-72 text-white placeholder-amber-900"
            />
            <FiSearch
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-700"
              size={20}
            />
          </div>
        </div>

        {/* Right Side - Navigation Links and Cart */}
        <div className="navbar-end flex items-center gap-4 md:gap-8">
          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex">
            <ul className="menu menu-horizontal text-lg text-white/90 gap-4">
              <NavLink to={"/"}><li><span>Home</span></li></NavLink>
              <NavLink to={"/collection"}><li><span>Collection</span></li></NavLink>
              <NavLink to={"/about"}><li><span>About</span></li></NavLink>
              <NavLink to={"/contact"}><li><span>Contact</span></li></NavLink>
              <NavLink to={"/dashboard"}><li><span>Dashboard</span></li></NavLink>
            </ul>
          </div>

          {/* User icon visible on mobile */}
          <div className="lg:hidden">
            <NavLink to={"/login"}>
              <button className="p-2 rounded-full border border-white text-white">
                <FiUser size={20} />
              </button>
            </NavLink>
          </div>

          {/* Cart Icon */}
          <NavLink
            to="/cart"
            className="relative flex items-center text-white hover:text-amber-700 transition-colors duration-200"
          >
            <FiShoppingCart size={24} />
            <span className="absolute -top-2 -right-3 bg-amber-800 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow">
              0
            </span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;