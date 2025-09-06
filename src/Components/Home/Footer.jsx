import React from 'react';
import { Link } from 'react-router-dom';
import { FaPhone, FaClock, FaFacebookF, FaInstagram, FaTwitter, FaPinterest, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';
import footerImg from "../../assets/footer.webp";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="lg:grid lg:grid-cols-5">
        {/* Image Section */}
        <div className="relative block h-52 lg:col-span-2 lg:h-full">
          <img
            src={footerImg}
            alt="Tannous Jewelry Collection"
            className="absolute inset-0 h-full w-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 to-transparent"></div>
          <div className="absolute bottom-6 left-6">
            <h3 className="text-2xl font-serif font-light">Tannous Jewelry</h3>
            <p className="text-sm mt-1">Crafting Timeless Elegance</p>
          </div>
        </div>

        {/* Content Section */}
        <div className="px-6 py-6 sm:px-8 lg:col-span-3 lg:px-12">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <FaPhone className="text-amber-400" />
                <span>Call Us</span>
              </h3>
              
              <p className="text-2xl font-medium text-amber-400 mb-4">
                0123 456 789
              </p>

              <ul className="mt-3 space-y-2 text-sm text-gray-300">
                <li className="flex items-center gap-2">
                  <FaClock className="text-amber-400" />
                  <span>Monday to Friday: 10am - 5pm</span>
                </li>
                <li className="flex items-center gap-2">
                  <FaClock className="text-amber-400" />
                  <span>Weekend: 10am - 3pm</span>
                </li>
                <li className="flex items-center gap-2 mt-4">
                  <FaMapMarkerAlt className="text-amber-400" />
                  <span>123 Luxury Avenue, Jewelry District</span>
                </li>
                <li className="flex items-center gap-2">
                  <FaEnvelope className="text-amber-400" />
                  <span>contact@tannousjewelry.com</span>
                </li>
              </ul>

              {/* Social Media */}
              <div className="mt-6">
                <h4 className="text-sm font-medium mb-2">Follow Us</h4>
                <ul className="flex gap-4">
                  <li>
                    <Link
                      to="#"
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 text-white transition-all hover:bg-amber-500 hover:text-gray-900"
                    >
                      <FaFacebookF className="text-sm" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 text-white transition-all hover:bg-amber-500 hover:text-gray-900"
                    >
                      <FaInstagram className="text-sm" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 text-white transition-all hover:bg-amber-500 hover:text-gray-900"
                    >
                      <FaTwitter className="text-sm" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 text-white transition-all hover:bg-amber-500 hover:text-gray-900"
                    >
                      <FaPinterest className="text-sm" />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Links Section */}
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div>
                <h3 className="text-lg font-medium mb-4">Services</h3>
                <ul className="space-y-3 text-sm text-gray-300">
                  <li>
                    <Link to="#" className="transition hover:text-amber-400">Custom Design</Link>
                  </li>
                  <li>
                    <Link to="#" className="transition hover:text-amber-400">Appraisal</Link>
                  </li>
                  <li>
                    <Link to="#" className="transition hover:text-amber-400">Engagement Rings</Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Company</h3>
                <ul className="space-y-3 text-sm text-gray-300">
                  <li>
                    <Link to="#" className="transition hover:text-amber-400">About Us</Link>
                  </li>
                  <li>
                    <Link to="#" className="transition hover:text-amber-400">Our Story</Link>
                  </li>
                  <li>
                    <Link to="#" className="transition hover:text-amber-400">Sustainability</Link>
                  </li>
                  <li>
                    <Link to="#" className="transition hover:text-amber-400">Contact</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-8 pt-8 border-t border-gray-800">
            <div className="sm:flex sm:items-center sm:justify-between">
              <p className="text-xs text-gray-400">
                &copy; {new Date().getFullYear()} Tannous Jewelry. All rights reserved.
              </p>

              <ul className="flex flex-wrap gap-4 text-xs mt-3 sm:mt-0">
                <li>
                  <Link to="#" className="text-gray-400 transition hover:text-amber-400">Terms & Conditions</Link>
                </li>
                <li>
                  <Link to="#" className="text-gray-400 transition hover:text-amber-400">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="#" className="text-gray-400 transition hover:text-amber-400">Returns & Exchanges</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;