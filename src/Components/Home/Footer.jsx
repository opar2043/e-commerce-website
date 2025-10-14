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
import master from "../../assets/master-card.png"
import visa from "../../assets/visa.png"
import gold from "../../assets/gold15.jpg"

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
      <div className="lg:grid lg:grid-cols-5">
        {/* Image Section */}
        <div className="relative block h-64 lg:col-span-2 lg:h-full">
          <img
            src={gold}
            alt="Tannous Jewelry Arabic Gold Collection"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-transparent"></div>

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

        {/* Content Section */}
        <div className="px-6 py-8 sm:px-8 lg:col-span-3 lg:px-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            
            {/* Contact Info */}
            <div>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-amber-400">
                <FaPhone />
                <span>Contact Us</span>
              </h3>
              
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
                </div>
              </div>

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

            {/* Services */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-amber-400">Our Services</h3>
              <ul className="space-y-3 text-sm text-gray-300">
                {[
                  "Custom Arabic Jewelry Design",
                  "Arabic Calligraphy Engraving",
                  "Gold Jewelry Appraisal",
                  "Jewelry Repair & Restoration",
                  "Wedding Jewelry Sets",
                  "Investment Gold Consultation"
                ].map((service, i) => (
                  <li key={i} className="flex items-center gap-2 transition hover:text-amber-400 group cursor-pointer">
                    <FaChevronRight className="text-xs group-hover:translate-x-1 transition-transform" />
                    {service}
                  </li>
                ))}
              </ul>
            </div>

            {/* About & Socials */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-amber-400">About Tannous</h3>
              <ul className="space-y-3 text-sm text-gray-300 mb-8">
                {[
                  "Our Story & Heritage",
                  "Visit Our Stores",
                  "Authenticity Guarantee",
                  "Customer Reviews",
                  "Jewelry Care Guide"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 transition hover:text-amber-400 group cursor-pointer">
                    <FaChevronRight className="text-xs group-hover:translate-x-1 transition-transform" />
                    {item}
                  </li>
                ))}
              </ul>

              <div>
                <h4 className="text-lg font-semibold mb-4 text-amber-400">Follow Our Journey</h4>
                <div className="flex gap-4 mb-6">
                  {[
                    { icon: <FaFacebookF />, color: "from-amber-500 to-amber-600" },
                    { icon: <FaInstagram />, color: "from-pink-500 to-purple-600" },
                    { icon: <FaWhatsapp />, color: "from-green-500 to-green-600" },
                    { icon: <FaTwitter />, color: "from-blue-500 to-blue-600" }
                  ].map((social, i) => (
                    <div
                      key={i}
                      className={`flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br ${social.color} text-white transition-all hover:scale-110 hover:shadow-lg group cursor-pointer`}
                    >
                      <span className="text-lg group-hover:scale-110 transition-transform">{social.icon}</span>
                    </div>
                  ))}
                </div>

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
              <div className="text-center lg:text-left">
                <p className="text-sm text-gray-400 mb-2">
                  &copy; {currentYear} Tannous Jewelry. All rights reserved.
                </p>
                <p className="text-xs text-gray-500">
                  Serving the Arabic community with authentic gold jewelry since 1985
                </p>
              </div>

              <ul className="flex flex-wrap gap-6 text-xs text-gray-400">
                {["Terms & Conditions", "Privacy Policy", "Returns & Exchanges", "Shipping Information"].map((item, i) => (
                  <li key={i} className="transition hover:text-amber-400 cursor-pointer">
                    {item}
                  </li>
                ))}
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
              <span className="text-amber-400 font-semibold hover:text-amber-300 cursor-pointer">
                (504) 252-1732
              </span>
              <span className="hidden sm:inline">|</span>
              <span className="text-green-400 font-semibold hover:text-green-300 cursor-pointer">
                WhatsApp Us
              </span>
            </div>

            <div className="text-xs text-gray-500 flex justify-center items-center gap-3">
              <p>Powered By</p>
              <div className="flex gap-2">
                <img src={visa} alt="visa" className="w-12 h-8" />
                <img src={master} alt="master" className="w-12 h-8" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
