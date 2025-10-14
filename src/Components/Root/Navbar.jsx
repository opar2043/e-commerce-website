import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FiShoppingCart,
  FiUser,
  FiMenu,
  FiX,
  FiLogOut,
  FiChevronDown
} from "react-icons/fi";
import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";
import useMetal from "../Hooks/useMetal";
import useAdmin from "../Hooks/useAdmin";
import { FaHeart, FaUser } from "react-icons/fa";
import useWish from "../Hooks/useWish";
import useCart from "../Hooks/useCart";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { handleLogout, user, setIsCartSidebarOpen } = useAuth() || {};
  const [wish] = useWish([]);
  const [metal] = useMetal([]);
  console.log(metal);
  const { admin } = useAdmin();
  const [cart] = useCart();
  const navigate = useNavigate();

  function handleOpen() {
    setIsCartSidebarOpen(true);
  }

  const logOut = () => {
    handleLogout()
      .then(() => {
        Swal.fire({ title: "Logout Successful", icon: "success" });
        navigate("/");
      })
      .catch(() => {
        Swal.fire({ title: "Try Again", icon: "error" });
      });
  };

  const navLinkStyle =
    "relative px-3 py-2 transition-all duration-300 hover:text-[#FEB564] before:content-[''] before:absolute before:w-0 hover:before:w-full before:h-[2px] before:bg-[#FEB564] before:bottom-0 before:left-0 before:rounded-full before:transition-all before:duration-300";

 const NavLinks = (
    <>
      <NavLink to="/" className={navLinkStyle}>
        Home
      </NavLink>

      {/* Dropdown on hover for Collection */}
      <div className="relative group ">
        <NavLink to="/collection" className={navLinkStyle}>
          Collection
        </NavLink>
        <div className="absolute left-0 top-full hidden group-hover:block bg-white shadow-lg rounded-md mt-1  z-50">
          <ul className="py-2 px-4 text-gray-700 flex gap-3">
{metal &&
        metal.map((cat, index) => (
          <li key={index}>
            <NavLink
              to={`/collection/${cat.metal}`}
              className="block px-4 py-2 duration-150 text-black hover:bg-orange-100"
            >
              {cat.metal}
            </NavLink>
          </li>
        ))}
          </ul>
        </div>
      </div>

      <NavLink to="/about" className={navLinkStyle}>
        About
      </NavLink>
      <NavLink to="/contact" className={navLinkStyle}>
        Contact
      </NavLink>

      {/* Wishlist */}
      <NavLink to="/wish" className="relative px-3 py-2 hover:text-[#FEB564]">
        <FaHeart />
        <span className="absolute -top-2 -right-2 bg-amber-700 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow">
          {wish?.length || 0}
        </span>
      </NavLink>

      {/* Admin Dashboard */}
      {admin && (
        <NavLink to="/dashboard" className="px-3 py-2 hover:text-[#FEB564]">
          <FaUser size={20} />
        </NavLink>
      )}
    </>
  );


  return (
    <div className="fixed top-0 left-0 w-full z-50">
      {/* 🔹 Upper Navbar (Gold Prices) */}
      <div className="bg-[#76614B] px-4 py-0.5 md:px-8 flex justify-center items-center text-slate-950">
        <div className="flex gap-6 text-xs md:text-sm py-0.5">
          {metal?.map((met) => (
            <div key={met.metal} className="flex gap-2 items-center">
              <span className="font-semibold text-white ">
                {met.metal.toUpperCase()}
              </span>
              <span className="text-[#FCA139] font-bold text-lg">
                ${met.price.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 🔹 Lower Navbar */}
      <div className="bg-black px-4 md:px-10 py-1 flex justify-between items-center">
        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
        </button>

        {/* Left: Brand */}
        <div className="text-white text-xl md:text-3xl font-semibold tracking-wide flex gap-4">
          <Link to="/">Tannous Jewelry</Link>
          <button
            onClick={handleOpen}
            className="relative flex items-center text-white hover:text-[#FEB564] transition-colors duration-300 md:hidden"
          >
            <FiShoppingCart size={24} />
            <span className="absolute -top-2 -right-3 bg-amber-700 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow">
              {cart?.length || 0}
            </span>
          </button>
        </div>

        {/* Center: NavLinks (Desktop) */}
        <div className="hidden lg:flex">
          <ul className="flex items-center gap-6 text-md text-white/90">
            {NavLinks}
          </ul>
        </div>

        {/* Right: Cart + Logout/Login */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Cart */}
          <button
            onClick={handleOpen}
            className="relative flex items-center text-white hover:text-[#FEB564] transition-colors duration-300"
          >
            <FiShoppingCart size={24} />
            <span className="absolute -top-2 -right-3 bg-amber-700 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow">
              {cart?.length || 0}
            </span>
          </button>

          {/* Logout / Login */}
          {user ? (
            <button
              onClick={logOut}
              className="flex flex-col items-center justify-center w-12 h-12 border border-white rounded-full hover:bg-white hover:text-black transition"
            >
              <FiLogOut size={22} />
              <span className="text-[10px] ">Logout</span>
            </button>
          ) : (
            <NavLink to="/login" onClick={() => setIsMenuOpen(false)}>
              <button className="flex flex-col items-center justify-center w-12 h-12 border border-white rounded-full hover:bg-white hover:text-black transition">
                <FiUser size={22} />
              </button>
            </NavLink>
          )}
        </div>
      </div>

      {/* 🔹 Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-black text-white px-6 py-6">
          <ul className="flex flex-col gap-4 text-lg">{NavLinks}</ul>
          <div className="mt-6">
            {user ? (
              <button
                onClick={logOut}
                className="flex  items-center gap-2 px-3 py-2 border border-white rounded-full hover:bg-white hover:text-black transition w-full justify-center"
              >
                <FiLogOut size={20} /> Logout
              </button>
            ) : (
              <NavLink to="/login" onClick={() => setIsMenuOpen(false)}>
                <button className="flex   items-center gap-2 px-3 py-2 border border-white rounded-full hover:bg-white hover:text-black transition w-full justify-center">
                  <FiUser size={20} /> Login
                </button>
              </NavLink>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
