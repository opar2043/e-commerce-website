import React from "react";
import { FaAddressBook, FaPhone, FaTelegram } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="bg-white text-gray-800 font-sans p-6 w-full max-w-8xl mx-auto">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Locate Our Stores</h1>
      </div>

      {/* First Location - Houston, TX */}
      <div className="mb-16">
        <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">Houston Store</h2>
        <div className="rounded-lg overflow-hidden shadow-lg mb-8">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3464.073808553848!2d-95.57951182374415!3d29.73723588200097!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640c3f53a7b7b3d%3A0x6a1f6f2b2b2b2b2b!2s12121%20Westheimer%20Rd%2C%20Houston%2C%20TX%2077077!5e0!3m2!1sen!2sus!4v1726345234567!5m2!1sen!2sus"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Location Map - Tannous Jewelry, Houston, TX"
            className="w-full"
          ></iframe>
        </div>

        {/* Contact Information Grid for Houston */}
        <div className="grid my-10 grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
          {/* Phone Section */}
          <div className="text-center md:text-left border border-gray-300 hover:border-[#FEB564] p-6">
            <button className="bg-[#FEB564] p-4 rounded text-white">
              <FaPhone></FaPhone>
            </button>
            <h3 className="font-semibold text-[#7A7A8B] mb-3 text-lg md:text-xl mt-3">
              Phone
            </h3>
            <p className="text-gray-600 mb-1">Main: (713) 448-9916</p>
            <p className="text-gray-600">Toll-Free: 0803-080-3081</p>
          </div>

          {/* Email Section */}
          <div className="text-center md:text-left border border-gray-300 hover:border-[#FEB564] p-6">
            <button className="bg-[#FEB564] p-4 rounded text-white">
              <FaTelegram></FaTelegram>
            </button>
            <h3 className="font-semibold text-[#7A7A8B] mb-3 text-lg md:text-xl mt-3">
              Email
            </h3>
            <p className="text-gray-600 mb-1">houston@tannous.com</p>
            <p className="text-gray-600">Tannous Jewelry - Houston</p>
          </div>

          {/* Address Section */}
          <div className="text-center md:text-left border border-gray-300 hover:border-[#FEB564] p-6">
            <button className="bg-[#FEB564] p-4 rounded text-white">
              <FaAddressBook></FaAddressBook>
            </button>
            <h3 className="font-semibold text-[#7A7A8B] mb-3 text-lg md:text-xl mt-3">
              Address
            </h3>
            <p className="text-gray-600">
              12121 Westheimer Rd, Houston, TX 77077-6654
            </p>
          </div>
        </div>
      </div>

      {/* Second Location - Terrytown, LA */}
      <div className="mb-16">
        <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">Terrytown Store</h2>
        <div className="rounded-lg overflow-hidden shadow-lg mb-8">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3459.465406067702!2d-90.02381862373987!3d29.91023327499933!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8620a68ec4d9ffcd%3A0x5a0e6e5e9d65a2f1!2sTannous%20Jewelry!5e0!3m2!1sen!2sus!4v1726345234567!5m2!1sen!2sus"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Location Map - Tannous Jewelry, Terrytown, LA"
            className="w-full"
          ></iframe>
        </div>

        {/* Contact Information Grid for Terrytown */}
        <div className="grid my-10 grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
          {/* Phone Section */}
          <div className="text-center md:text-left border border-gray-300 hover:border-[#FEB564] p-6">
            <button className="bg-[#FEB564] p-4 rounded text-white">
              <FaPhone></FaPhone>
            </button>
            <h3 className="font-semibold text-[#7A7A8B] mb-3 text-lg md:text-xl mt-3">
              Phone
            </h3>
            <p className="text-gray-600 mb-1">Main: (504) 644-5836</p>
            <p className="text-gray-600">International: +1 504-644-5836</p>
          </div>

          {/* Email Section */}
          <div className="text-center md:text-left border border-gray-300 hover:border-[#FEB564] p-6">
            <button className="bg-[#FEB564] p-4 rounded text-white">
              <FaTelegram></FaTelegram>
            </button>
            <h3 className="font-semibold text-[#7A7A8B] mb-3 text-lg md:text-xl mt-3">
              Email
            </h3>
            <p className="text-gray-600 mb-1">tannousjewelryla@gmail.com</p>
            <p className="text-gray-600">Tannous Jewelry - Terrytown</p>
          </div>

          {/* Address Section */}
          <div className="text-center md:text-left border border-gray-300 hover:border-[#FEB564] p-6">
            <button className="bg-[#FEB564] p-4 rounded text-white">
              <FaAddressBook></FaAddressBook>
            </button>
            <h3 className="font-semibold text-[#7A7A8B] mb-3 text-lg md:text-xl mt-3">
              Address
            </h3>
            <p className="text-gray-600">
              Terrytown, LA, United States, Louisiana
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;