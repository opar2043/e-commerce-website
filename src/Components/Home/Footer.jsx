import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
import master from "../../assets/master-card.png";
import visa from "../../assets/visa.png";
import gold from "../../assets/gold15.jpg";

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

  // Bottom-to-top animation variants
  const bottomToTopVariants = {
    hidden: { 
      opacity: 0, 
      y: 30 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

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
              {/* Brand Title - Bottom to Top */}
              <motion.h4
                className="text-2xl font-serif font-light text-amber-400 mb-3"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                Tannous Jewelry
              </motion.h4>

              {/* Description - Bottom to Top */}
              <motion.p
                className="text-amber-200 text-lg leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              >
                Authentic Arabic Gold Jewelry<br />
                Crafting Excellence Since 1985
              </motion.p>
            </div>

            {/* Badges - Bottom to Top */}
            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            >
              <div className="flex items-center gap-2 bg-black bg-opacity-50 px-3 py-2 rounded-lg">
                <FaCertificate className="text-amber-400" />
                <span className="text-xs text-white">Certified Gold</span>
              </div>
              <div className="flex items-center gap-2 bg-black bg-opacity-50 px-3 py-2 rounded-lg">
                <FaShieldAlt className="text-amber-400" />
                <span className="text-xs text-white">Authentic</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Content Section */}
        <div className="px-6 py-8 sm:px-8 lg:col-span-3 lg:px-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            
            {/* Contact Info */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={containerVariants}
            >
              {/* Heading - Bottom to Top */}
              <motion.h3
                className="text-xl font-bold mb-6 flex items-center gap-2 text-amber-400"
                variants={itemVariants}
              >
                <FaPhone />
                <span>Contact Us</span>
              </motion.h3>
              
              {/* Store Info Box - Bottom to Top */}
              <motion.div
                className="mb-6 p-4 bg-gray-800 rounded-lg"
                variants={itemVariants}
              >
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
              </motion.div>

              {/* Business Hours - Bottom to Top */}
              <motion.div
                className="space-y-2 text-sm text-gray-300"
                variants={itemVariants}
              >
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
              </motion.div>
            </motion.div>

            {/* Services */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={containerVariants}
            >
              {/* Heading - Bottom to Top */}
              <motion.h3
                className="text-xl font-bold mb-6 text-amber-400"
                variants={itemVariants}
              >
                Our Services
              </motion.h3>
              
              <ul className="space-y-3 text-sm text-gray-300">
                {[
                  "Custom Arabic Jewelry Design",
                  "Arabic Calligraphy Engraving",
                  "Gold Jewelry Appraisal",
                  "Jewelry Repair & Restoration",
                  "Wedding Jewelry Sets",
                  "Investment Gold Consultation"
                ].map((service, i) => (
                  <motion.li
                    key={i}
                    className="flex items-center gap-2 transition hover:text-amber-400 group cursor-pointer"
                    variants={itemVariants}
                  >
                    <FaChevronRight className="text-xs group-hover:translate-x-1 transition-transform" />
                    {service}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* About & Socials */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={containerVariants}
            >
              {/* Heading - Bottom to Top */}
              <motion.h3
                className="text-xl font-bold mb-6 text-amber-400"
                variants={itemVariants}
              >
                About Tannous
              </motion.h3>
              
              <ul className="space-y-3 text-sm text-gray-300 mb-8">
                {[
                  "Our Story & Heritage",
                  "Visit Our Stores",
                  "Authenticity Guarantee",
                  "Customer Reviews",
                  "Jewelry Care Guide"
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    className="flex items-center gap-2 transition hover:text-amber-400 group cursor-pointer"
                    variants={itemVariants}
                  >
                    <FaChevronRight className="text-xs group-hover:translate-x-1 transition-transform" />
                    {item}
                  </motion.li>
                ))}
              </ul>

              <div>
                {/* Social Heading - Bottom to Top */}
                <motion.h4
                  className="text-lg font-semibold mb-4 text-amber-400"
                  variants={itemVariants}
                >
                  Follow Our Journey
                </motion.h4>
                
                {/* Social Icons - Bottom to Top */}
                <motion.div
                  className="flex gap-4 mb-6"
                  variants={itemVariants}
                >
                  {[
                    { icon: <FaFacebookF />, color: "from-amber-500 to-amber-600" },
                    { icon: <FaInstagram />, color: "from-pink-500 to-purple-600" },
                    { icon: <FaWhatsapp />, color: "from-green-500 to-green-600" },
                    { icon: <FaTwitter />, color: "from-blue-500 to-blue-600" }
                  ].map((social, i) => (
                    <motion.div
                      key={i}
                      className={`flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br ${social.color} text-white transition-all hover:scale-110 hover:shadow-lg group cursor-pointer`}
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="text-lg">{social.icon}</span>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Trust Badges - Bottom to Top */}
                <motion.div className="space-y-3">
                  {[
                    { icon: <FaAward />, text: "40+ Years of Excellence" },
                    { icon: <FaCertificate />, text: "Certified Gold Dealer" },
                    { icon: <FaShieldAlt />, text: "Lifetime Authenticity Guarantee" }
                  ].map((badge, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-3 text-sm"
                      variants={itemVariants}
                    >
                      <span className="text-amber-400">{badge.icon}</span>
                      <span className="text-gray-300">{badge.text}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Section */}
          <motion.div
            className="mt-12 pt-8 border-t border-gray-700"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
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
          </motion.div>
        </div>
      </div>

      {/* Bottom Contact Bar */}
      <motion.div
        className="bg-black py-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
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
      </motion.div>
    </footer>
  );
};

export default Footer;