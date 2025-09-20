import React, { useState } from 'react';
import { 
  FaPhone, 
  FaClock, 
  FaFacebookF, 
  FaInstagram, 
  FaTwitter, 
  FaWhatsapp, 
  FaMapMarkerAlt, 
  FaEnvelope,
  FaGem,
  FaCertificate,
  FaShieldAlt,
  FaAward,
  FaChevronRight,
  FaHeart
} from 'react-icons/fa';

const Footer = () => {
  const [emailSubscription, setEmailSubscription] = useState('');
  const [subscriptionStatus, setSubscriptionStatus] = useState('');

  const handleSubscription = (e) => {
    e.preventDefault();
    if (emailSubscription) {
      setSubscriptionStatus('Thank you for subscribing to our newsletter!');
      setEmailSubscription('');
      setTimeout(() => setSubscriptionStatus(''), 3000);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Newsletter Section */}
      {/* <div className="bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FaGem className="text-3xl text-white" />
            <h3 className="text-2xl md:text-3xl font-bold text-white">Stay Connected with Tannous</h3>
          </div>
          <p className="text-amber-100 mb-6 max-w-2xl mx-auto">
            Subscribe to receive exclusive offers, new collection updates, and jewelry care tips from our master craftsmen.
          </p>
          
          <form onSubmit={handleSubscription} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              value={emailSubscription}
              onChange={(e) => setEmailSubscription(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold"
            >
              Subscribe
            </button>
          </form>
          
          {subscriptionStatus && (
            <p className="mt-4 text-amber-100 font-medium">{subscriptionStatus}</p>
          )}
        </div>
      </div> */}

      <div className="lg:grid lg:grid-cols-5">
        {/* Enhanced Image Section */}
        <div className="relative block h-64 lg:col-span-2 lg:h-full">
          <img
            src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Tannous Jewelry Arabic Gold Collection"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-transparent"></div>
          
          {/* Overlay Content */}
          <div className="absolute inset-0 flex flex-col justify-center px-8">
            <div className="mb-6">
              <h3 className="text-3xl font-serif font-bold text-white mb-2">
                تنوس للمجوهرات
              </h3>
              <h4 className="text-2xl font-serif font-light text-amber-400 mb-3">
                Tannous Jewelry
              </h4>
              <p className="text-amber-200 text-lg leading-relaxed">
                Authentic Arabic Gold Jewelry<br />
                Crafting Excellence Since 1985
              </p>
            </div>
            
            {/* Certifications */}
            <div className="flex gap-4">
              <div className="flex items-center gap-2 bg-black bg-opacity-50 px-3 py-2 rounded-lg">
                <FaCertificate className="text-amber-400" />
                <span className="text-xs text-white">Certified Gold</span>
              </div>
              <div className="flex items-center gap-2 bg-black bg-opacity-50 px-3 py-2 rounded-lg">
                <FaShieldAlt className="text-amber-400" />
                <span className="text-xs text-white">Authentic</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Content Section */}
        <div className="px-6 py-8 sm:px-8 lg:col-span-3 lg:px-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            
            {/* Contact Information */}
            <div>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-amber-400">
                <FaPhone />
                <span>Contact Us</span>
              </h3>
              
              {/* Terrytown Location */}
              <div className="mb-6 p-4 bg-gray-800 rounded-lg">
                <h4 className="font-semibold text-amber-300 mb-3">Main Store - Terrytown, LA</h4>
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex items-center gap-2">
                    <FaPhone className="text-amber-400 text-xs" />
                    <span>(504) 252-1732</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <FaMapMarkerAlt className="text-amber-400 text-xs mt-1" />
                    <span>1180 Terry Pkwy Suite A<br />Terrytown, LA 70056</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaEnvelope className="text-amber-400 text-xs" />
                    <span>tannousjewelryla@gmail.com</span>
                  </div>
                </div>
              </div>

              {/* Houston Location */}
              <div className="mb-6 p-4 bg-gray-800 rounded-lg">
                <h4 className="font-semibold text-amber-300 mb-3">Houston Store</h4>
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex items-center gap-2">
                    <FaPhone className="text-amber-400 text-xs" />
                    <span>(713) 448-9916</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <FaMapMarkerAlt className="text-amber-400 text-xs mt-1" />
                    <span>12121 Westheimer Rd<br />Houston, TX 77077</span>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <FaClock className="text-amber-400" />
                  <span className="font-medium">Business Hours:</span>
                </div>
                <div className="ml-6 space-y-1">
                  <div className="flex justify-between">
                    <span>Mon - Fri:</span>
                    <span>10:00 AM - 7:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span>10:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span>12:00 PM - 5:00 PM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Services & Collections */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-amber-400">Our Services</h3>
              <ul className="space-y-3 text-sm text-gray-300">
                <li>
                  <a href="#" className="flex items-center gap-2 transition hover:text-amber-400 group">
                    <FaChevronRight className="text-xs group-hover:translate-x-1 transition-transform" />
                    Custom Arabic Jewelry Design
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-2 transition hover:text-amber-400 group">
                    <FaChevronRight className="text-xs group-hover:translate-x-1 transition-transform" />
                    Arabic Calligraphy Engraving
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-2 transition hover:text-amber-400 group">
                    <FaChevronRight className="text-xs group-hover:translate-x-1 transition-transform" />
                    Gold Jewelry Appraisal
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-2 transition hover:text-amber-400 group">
                    <FaChevronRight className="text-xs group-hover:translate-x-1 transition-transform" />
                    Jewelry Repair & Restoration
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-2 transition hover:text-amber-400 group">
                    <FaChevronRight className="text-xs group-hover:translate-x-1 transition-transform" />
                    Wedding Jewelry Sets
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-2 transition hover:text-amber-400 group">
                    <FaChevronRight className="text-xs group-hover:translate-x-1 transition-transform" />
                    Investment Gold Consultation
                  </a>
                </li>
              </ul>

              <h3 className="text-xl font-bold mb-4 mt-8 text-amber-400">Collections</h3>
              <ul className="space-y-3 text-sm text-gray-300">
                <li>
                  <a href="#" className="flex items-center gap-2 transition hover:text-amber-400 group">
                    <FaChevronRight className="text-xs group-hover:translate-x-1 transition-transform" />
                    22K Gold Necklaces
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-2 transition hover:text-amber-400 group">
                    <FaChevronRight className="text-xs group-hover:translate-x-1 transition-transform" />
                    Traditional Lebanese Jewelry
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-2 transition hover:text-amber-400 group">
                    <FaChevronRight className="text-xs group-hover:translate-x-1 transition-transform" />
                    Islamic Calligraphy Pieces
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-2 transition hover:text-amber-400 group">
                    <FaChevronRight className="text-xs group-hover:translate-x-1 transition-transform" />
                    Bridal Gold Sets
                  </a>
                </li>
              </ul>
            </div>

            {/* Company & Social Media */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-amber-400">About Tannous</h3>
              <ul className="space-y-3 text-sm text-gray-300 mb-8">
                <li>
                  <a href="/about" className="flex items-center gap-2 transition hover:text-amber-400 group">
                    <FaChevronRight className="text-xs group-hover:translate-x-1 transition-transform" />
                    Our Story & Heritage
                  </a>
                </li>
                <li>
                  <a href="/contact" className="flex items-center gap-2 transition hover:text-amber-400 group">
                    <FaChevronRight className="text-xs group-hover:translate-x-1 transition-transform" />
                    Visit Our Stores
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-2 transition hover:text-amber-400 group">
                    <FaChevronRight className="text-xs group-hover:translate-x-1 transition-transform" />
                    Authenticity Guarantee
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-2 transition hover:text-amber-400 group">
                    <FaChevronRight className="text-xs group-hover:translate-x-1 transition-transform" />
                    Customer Reviews
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-2 transition hover:text-amber-400 group">
                    <FaChevronRight className="text-xs group-hover:translate-x-1 transition-transform" />
                    Jewelry Care Guide
                  </a>
                </li>
              </ul>

              {/* Social Media */}
              <div>
                <h4 className="text-lg font-semibold mb-4 text-amber-400">Follow Our Journey</h4>
                <div className="flex gap-4 mb-6">
                  <a
                    href="#"
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 text-white transition-all hover:scale-110 hover:shadow-lg group"
                    aria-label="Facebook"
                  >
                    <FaFacebookF className="text-lg group-hover:scale-110 transition-transform" />
                  </a>
                  <a
                    href="#"
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 text-white transition-all hover:scale-110 hover:shadow-lg group"
                    aria-label="Instagram"
                  >
                    <FaInstagram className="text-lg group-hover:scale-110 transition-transform" />
                  </a>
                  <a
                    href="https://wa.me/15042521732"
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-green-600 text-white transition-all hover:scale-110 hover:shadow-lg group"
                    aria-label="WhatsApp"
                  >
                    <FaWhatsapp className="text-lg group-hover:scale-110 transition-transform" />
                  </a>
                  <a
                    href="#"
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white transition-all hover:scale-110 hover:shadow-lg group"
                    aria-label="Twitter"
                  >
                    <FaTwitter className="text-lg group-hover:scale-110 transition-transform" />
                  </a>
                </div>

                {/* Trust Badges */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <FaAward className="text-amber-400" />
                    <span className="text-gray-300">40+ Years of Excellence</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <FaCertificate className="text-amber-400" />
                    <span className="text-gray-300">Certified Gold Dealer</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <FaShieldAlt className="text-amber-400" />
                    <span className="text-gray-300">Lifetime Authenticity Guarantee</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-12 pt-8 border-t border-gray-700">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex items-center gap-2">
                <FaHeart className="text-red-400" />
                <p className="text-sm text-gray-400">
                  Made with love for the Arabic jewelry tradition
                </p>
              </div>

              <div className="text-center lg:text-left">
                <p className="text-sm text-gray-400 mb-2">
                  &copy; {currentYear} Tannous Jewelry. All rights reserved.
                </p>
                <p className="text-xs text-gray-500">
                  Serving the Arabic community with authentic gold jewelry since 1985
                </p>
              </div>

              <ul className="flex flex-wrap gap-6 text-xs">
                <li>
                  <a href="#" className="text-gray-400 transition hover:text-amber-400">
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 transition hover:text-amber-400">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 transition hover:text-amber-400">
                    Returns & Exchanges
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 transition hover:text-amber-400">
                    Shipping Information
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Contact Bar */}
      <div className="bg-black py-4">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span>Call us now:</span>
              <a href="tel:+15042521732" className="text-amber-400 font-semibold hover:text-amber-300">
                (504) 252-1732
              </a>
              <span className="hidden sm:inline">|</span>
              <a href="https://wa.me/15042521732" className="text-green-400 font-semibold hover:text-green-300">
                WhatsApp Us
              </a>
            </div>
            
            <div className="text-xs text-gray-500">
              Licensed Jewelry Dealer • Louisiana License #JD-2024-001
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;