import React, { useState } from "react";
import { FaAddressBook, FaPhone, FaTelegram, FaClock, FaMapMarkerAlt, FaWhatsapp, FaInstagram, FaFacebook, FaStar, FaGem } from "react-icons/fa";
import backgroundImage from "../../assets/gold3.jpg"
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    preferredContact: 'email'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        name: '', email: '', phone: '', subject: '', message: '', preferredContact: 'email'
      });
    }, 2000);
  };

  const businessHours = [
    { day: "Monday - Friday", hours: "10:00 AM - 7:00 PM" },
    { day: "Saturday", hours: "10:00 AM - 6:00 PM" },
    { day: "Sunday", hours: "12:00 PM - 5:00 PM" },
    { day: "Holidays", hours: "By Appointment" }
  ];

  return (
    <>
      {/* SEO Meta Tags */}
      <title>Contact Tannous Jewelry | Arabic Gold Jewelry Store | Terrytown, LA</title>
      <meta name="description" content="Visit Tannous Jewelry at 1180 Terry Pkwy Suite A, Terrytown, LA 70056. Call (504) 252-1732. Expert Arabic gold jewelry, custom designs, and traditional craftsmanship." />
      <meta name="keywords" content="Tannous Jewelry Terrytown, Arabic gold jewelry store Louisiana, contact jewelry store, custom gold jewelry New Orleans" />
      
      <div className="bg-gradient-to-b from-amber-50 to-white text-gray-800 font-sans min-h-screen">
        
        {/* Hero Section */}
{/* Hero Section */}
<section
  className="relative flex flex-col items-center justify-center text-center py-16 px-6 bg-gradient-to-b from-black/80 to-black/60 text-white overflow-hidden"
>
  <div
    className="absolute inset-0 z-0"
    style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      filter: "brightness(0.4)",
    }}
  ></div>

  <div className="relative z-10 max-w-4xl mx-auto">
    <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-wide">
      Visit Our Jewelry Stores
    </h1>
    <p className="text-lg md:text-xl text-amber-100 mb-8 leading-relaxed">
      Discover timeless Arabic gold jewelry crafted with passion and
      precision — at our Terrytown and Houston locations.
    </p>

    <div className="flex flex-wrap justify-center gap-4 md:gap-6">
      <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2 rounded-full shadow-sm hover:bg-white/20 transition">
        <FaGem className="text-yellow-300" />
        <span className="text-sm font-medium">Authentic Gold Jewelry</span>
      </div>
      <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2 rounded-full shadow-sm hover:bg-white/20 transition">
        <FaStar className="text-yellow-300" />
        <span className="text-sm font-medium">40+ Years Experience</span>
      </div>
      <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2 rounded-full shadow-sm hover:bg-white/20 transition">
        <FaMapMarkerAlt className="text-yellow-300" />
        <span className="text-sm font-medium">Two Locations</span>
      </div>
    </div>
  </div>
</section>


        {/* Main Store - Terrytown, LA */}
        <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Main Store - Terrytown, Louisiana</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-yellow-500 mx-auto mb-4"></div>
              <p className="text-gray-600 text-lg">Visit our flagship location in the heart of Terrytown, serving the Greater New Orleans area since 1985.</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Map */}
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3459.465406067702!2d-90.02381862373987!3d29.91023327499933!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8620a68ec4d9ffcd%3A0x5a0e6e5e9d65a2f1!2s1180%20Terry%20Pkwy%20Suite%20A%2C%20Terrytown%2C%20LA%2070056!5e0!3m2!1sen!2sus!4v1726345234567!5m2!1sen!2sus"
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Tannous Jewelry - Main Store Location, 1180 Terry Pkwy Suite A, Terrytown, LA 70056"
                    className="w-full"
                  ></iframe>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-amber-500 text-white p-4 rounded-xl shadow-lg">
                  <p className="font-bold">Main Store</p>
                  <p className="text-sm">Est. 1985</p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-6">
                {/* Phone */}
                <div className="group hover:scale-105 transition-all duration-300">
                  <div className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl border-l-4 border-amber-500">
                    <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                      <FaPhone className="text-white text-xl" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800 text-xl mb-2">Phone & WhatsApp</h3>
                      <p className="text-gray-700 font-semibold text-lg mb-1">(504) 252-1732</p>
                      <p className="text-gray-600 mb-3">Call or text for appointments and inquiries</p>
                      <div className="flex gap-3">
                        <a href="tel:+15042521732" className="bg-amber-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-amber-600 transition-colors">
                          Call Now
                        </a>
                        <a href="https://wa.me/15042521732" className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-600 transition-colors flex items-center gap-2">
                          <FaWhatsapp />
                          WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="group hover:scale-105 transition-all duration-300">
                  <div className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl border-l-4 border-amber-500">
                    <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                      <FaTelegram className="text-white text-xl" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800 text-xl mb-2">Email</h3>
                      <p className="text-gray-700 font-semibold text-lg mb-1">tannousjewelryla@gmail.com</p>
                      <p className="text-gray-600 mb-3">Send us your inquiries and custom design requests</p>
                      <a href="mailto:tannousjewelryla@gmail.com" className="bg-amber-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-amber-600 transition-colors">
                        Send Email
                      </a>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="group hover:scale-105 transition-all duration-300">
                  <div className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl border-l-4 border-amber-500">
                    <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                      <FaAddressBook className="text-white text-xl" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800 text-xl mb-2">Store Address</h3>
                      <p className="text-gray-700 font-semibold text-lg mb-1">1180 Terry Pkwy Suite A</p>
                      <p className="text-gray-700 font-semibold text-lg mb-1">Terrytown, LA 70056</p>
                      <p className="text-gray-600 mb-3">Convenient parking available</p>
                      <a href="https://maps.google.com/?q=1180+Terry+Pkwy+Suite+A,+Terrytown,+LA+70056" target="_blank" rel="noopener noreferrer" className="bg-amber-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-amber-600 transition-colors">
                        Get Directions
                      </a>
                    </div>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="group hover:scale-105 transition-all duration-300">
                  <div className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl border-l-4 border-amber-500">
                    <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                      <FaClock className="text-white text-xl" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800 text-xl mb-3">Business Hours</h3>
                      <div className="space-y-2">
                        {businessHours.map((schedule, index) => (
                          <div key={index} className="flex justify-between items-center py-1 border-b border-gray-100 last:border-b-0">
                            <span className="text-gray-700 font-medium">{schedule.day}</span>
                            <span className="text-gray-600">{schedule.hours}</span>
                          </div>
                        ))}
                      </div>
                      <p className="text-amber-600 text-sm font-semibold mt-3">
                        📞 Call for appointments outside business hours
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Social Media & Additional Info */}
        <section className="py-16 bg-gradient-to-r from-[#ffb056] via-[#f59426] to-[#ffb157] text-white">
          <div className="max-w-6xl mx-auto px-4 md:px-8 text-center">
            <h2 className="text-3xl font-bold mb-8">Connect With Us</h2>
            
            <div className="flex justify-center gap-6 mb-12">
              <a href="#" className="bg-white bg-opacity-20 p-4 rounded-full hover:bg-opacity-30 transition-all duration-300 transform hover:scale-110">
                <FaFacebook className="text-2xl" />
              </a>
              <a href="#" className="bg-white bg-opacity-20 p-4 rounded-full hover:bg-opacity-30 transition-all duration-300 transform hover:scale-110">
                <FaInstagram className="text-2xl" />
              </a>
              <a href="https://wa.me/15042521732" className="bg-white bg-opacity-20 p-4 rounded-full hover:bg-opacity-30 transition-all duration-300 transform hover:scale-110">
                <FaWhatsapp className="text-2xl" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <FaGem className="text-4xl mb-4 mx-auto text-yellow-300" />
                <h3 className="text-xl font-bold mb-2">Authentic Jewelry</h3>
                <p className="text-yellow-100">Certified Arabic gold and traditional designs</p>
              </div>
              <div>
                <FaStar className="text-4xl mb-4 mx-auto text-yellow-300" />
                <h3 className="text-xl font-bold mb-2">Expert Craftsmanship</h3>
                <p className="text-yellow-100">40+ years of jewelry making excellence</p>
              </div>
              <div>
                <FaMapMarkerAlt className="text-4xl mb-4 mx-auto text-yellow-300" />
                <h3 className="text-xl font-bold mb-2">Convenient Locations</h3>
                <p className="text-yellow-100">Terrytown, LA and Houston, TX</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;