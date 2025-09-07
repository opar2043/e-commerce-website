import React from 'react';
import { FaAddressBook, FaPhone, FaTelegram } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="bg-white text-gray-800 font-sans p-6 w-full max-w-8xl mx-auto">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Our Location</h1>
        <h2 className="text-xl font-semibold text-gray-700">Alabama</h2>
      </div>

      {/* Map Section */}
      <div className="mb-16 rounded-lg overflow-hidden shadow-lg">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193398.874392635!2d-90.58020694999999!3d32.735471!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86282f6bb8f75933%3A0x2d658c5bd38f6a98!2sMississippi%2C%20USA!5e0!3m2!1sen!2s!4v1698765432100!5m2!1sen!2s"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Location Map - Mississippi, USA"
          className="w-full"
        ></iframe>
      </div>


      {/* Contact Information Grid */}
      <div className='grid my-10 grid-cols-1 md:grid-cols-3 gap-8 md:gap-4'>
        {/* Phone Section */}
        <div className="text-center md:text-left border border-gray-300 hover:border-[#FEB564] p-6">
            <button className='bg-[#FEB564] p-4 rounded text-white'>
                <FaPhone></FaPhone>
            </button>
          <h3 className="font-semibold text-[#7A7A8B] mb-3 text-lg md:text-xl mt-3">Phone</h3>
          <p className="text-gray-600 mb-1">Toll-Free : 0803 - 080 - 3081</p>
          <p className="text-gray-600">Fax : 0803 - 080 - 3082</p>
        </div>

        {/* Email Section */}
        <div className="text-center md:text-left border border-gray-300 hover:border-[#FEB564] p-6">
            <button className='bg-[#FEB564] p-4 rounded text-white'>
                <FaTelegram></FaTelegram>
            </button>
          <h3 className="font-semibold text-[#7A7A8B] mb-3 text-lg md:text-xl mt-3">Email</h3>
          <p className="text-gray-600 mb-1">mail@example.com</p>
          <p className="text-gray-600">support@example.com</p>
        </div>

        {/* Address Section */}
        <div className="text-center md:text-left border border-gray-300 hover:border-[#FEB564] p-6">
            <button className='bg-[#FEB564] p-4 rounded text-white'>
                <FaAddressBook></FaAddressBook>
            </button>
          <h3 className="font-semibold text-[#7A7A8B] mb-3 text-lg md:text-xl mt-3">Adress</h3>
          <p className="text-gray-600">No: 58 A, East Madison Street, Baltimore, MD, USA 4508</p>
        </div>
      </div>


    </div>
  );
};

export default Contact;