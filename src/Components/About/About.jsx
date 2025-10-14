import React, { useState, useEffect } from 'react';
import { FaGem, FaAward, FaUsers, FaHandHoldingHeart, FaShippingFast, FaHeadset, FaStar, FaQuoteLeft } from "react-icons/fa";
import gold from "../../assets/gold3.jpg"

const About = () => {
  const [isVisible, setIsVisible] = useState({});
  
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: true
          }));
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const testimonials = [
    {
      name: "Sarah Al-Mahmoud",
      text: "Exceptional craftsmanship and authentic Arabic designs. My gold jewelry from Tannous is absolutely stunning!",
      rating: 5,
      location: "Houston, TX"
    },
    {
      name: "Omar Hassan",
      text: "Three generations of our family have trusted Tannous for our gold jewelry. Quality and tradition at its finest.",
      rating: 5,
      location: "New Orleans, LA"
    },
    {
      name: "Fatima Khalil",
      text: "The custom Arabic calligraphy pieces they created were beyond my expectations. True artisans!",
      rating: 5,
      location: "Terrytown, LA"
    }
  ];

  return (
    <>
      {/* SEO Meta Tags */}
      <title>About Tannous Jewelry | Authentic Arabic Gold Jewelry | Terrytown, LA</title>
      <meta name="description" content="Discover 40+ years of authentic Arabic gold jewelry craftsmanship at Tannous Jewelry. Located in Terrytown, LA. Custom designs, traditional patterns, and modern elegance." />
      <meta name="keywords" content="Arabic gold jewelry, Terrytown jewelry store, custom gold designs, traditional jewelry, Lebanese jewelry, Middle Eastern jewelry" />
      
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
        {/* Hero Section with Arabic Pattern */}
        <section className="relative py-20 px-4 md:px-8 overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="w-full h-full" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='0.4'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }}></div>
          </div>
          
          <div className="max-w-6xl mx-auto relative z-10">
            <div 
              id="hero-section"
              data-animate
              className={`text-center transform transition-all duration-1000 ${
                isVisible['hero-section'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            >
              <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-700 mb-6">
                تنوس للمجوهرات
              </h1>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800 mb-8">
                Tannous Jewelry
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Authentic Arabic Gold Jewelry & Traditional Craftsmanship Since 1985
              </p>
            </div>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-16 px-4 md:px-8 max-w-6xl mx-auto">
          <div 
            id="intro-section"
            data-animate
            className={`flex flex-col lg:flex-row items-center gap-12 transform transition-all duration-1000 delay-200 ${
              isVisible['intro-section'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-serif font-bold text-gray-800 mb-6 border-b-4 border-amber-500 pb-2 inline-block">
                Welcome to Tannous Jewelry
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                For over four decades, Tannous Jewelry has been the premier destination for authentic Arabic gold jewelry in Louisiana. 
                Founded in 1985 by master jeweler George Tannous, our family-owned business specializes in traditional Middle Eastern 
                designs, Lebanese craftsmanship, and contemporary Arabic-inspired pieces.
              </p>
              <p className="text-gray-700 mb-8 leading-relaxed text-lg">
                Located in the heart of Terrytown at 1180 Terry Pkwy Suite A, we serve the Greater New Orleans area with 
                exquisite gold jewelry that celebrates Arabic heritage while embracing modern elegance. Each piece tells a story 
                of tradition, craftsmanship, and cultural pride.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-lg border-l-4 border-amber-500">
                  <FaGem className="text-amber-600 text-2xl" />
                  <div>
                    <p className="font-bold text-gray-800">40+ Years</p>
                    <p className="text-sm text-gray-600">Experience</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-lg border-l-4 border-amber-500">
                  <FaAward className="text-amber-600 text-2xl" />
                  <div>
                    <p className="font-bold text-gray-800">100% Authentic</p>
                    <p className="text-sm text-gray-600">Gold Jewelry</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-6 bg-gradient-to-r from-amber-100 to-yellow-100 rounded-xl shadow-md">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center shadow-lg">
                  <FaGem className="text-white text-2xl" />
                </div>
                <div>
                  <p className="text-gray-800 font-bold text-lg">Authenticity Guaranteed</p>
                  <p className="text-gray-600">Certified Arabic Gold • Traditional Craftsmanship</p>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-2xl opacity-20 blur-lg"></div>
                <div className="relative bg-white p-8 rounded-2xl shadow-2xl">
                  <img 
                    src= {gold} 
                    alt="Arabic Gold Jewelry Craftsmanship at Tannous Jewelry" 
                    className="rounded-xl shadow-lg w-full h-80 object-cover"
                  />
                  <div className="absolute -bottom-4 -right-4 bg-amber-500 text-white p-4 rounded-xl shadow-lg">
                    <p className="font-bold text-lg">Est. 1985</p>
                    <p className="text-sm">Terrytown, LA</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section with Arabic Motifs */}
        <section className="py-20 bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50">
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            <div 
              id="values-section"
              data-animate
              className={`text-center mb-16 transform transition-all duration-1000 delay-300 ${
                isVisible['values-section'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            >
              <h2 className="text-4xl font-serif font-bold text-gray-800 mb-4">Our Heritage & Values</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-yellow-500 mx-auto mb-6"></div>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Rooted in Arabic tradition, committed to excellence, and dedicated to preserving the art of Middle Eastern jewelry craftsmanship.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group hover:scale-105 transition-all duration-300">
                <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl border-2 border-transparent hover:border-amber-200">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                      <FaHandHoldingHeart className="text-white text-3xl" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full opacity-80"></div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">Traditional Craftsmanship</h3>
                  <p className="text-gray-600 leading-relaxed">Authentic Arabic jewelry techniques passed down through generations, ensuring each piece reflects our rich cultural heritage.</p>
                </div>
              </div>

              <div className="group hover:scale-105 transition-all duration-300">
                <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl border-2 border-transparent hover:border-amber-200">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                      <FaUsers className="text-white text-3xl" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full opacity-80"></div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">Family Trust</h3>
                  <p className="text-gray-600 leading-relaxed">Building lasting relationships with the Arabic community and beyond, based on transparency, respect, and cultural understanding.</p>
                </div>
              </div>

              <div className="group hover:scale-105 transition-all duration-300">
                <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl border-2 border-transparent hover:border-amber-200">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                      <FaAward className="text-white text-3xl" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full opacity-80"></div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">Premium Quality</h3>
                  <p className="text-gray-600 leading-relaxed">Only the finest 18K and 22K gold, ethically sourced gemstones, and traditional Arabic design patterns in every piece.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Timeline Section */}
        <section className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
          <div 
            id="timeline-section"
            data-animate
            className={`text-center mb-16 transform transition-all duration-1000 delay-400 ${
              isVisible['timeline-section'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <h2 className="text-4xl font-serif font-bold text-gray-800 mb-4">Our Journey Through Time</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-yellow-500 mx-auto mb-6"></div>
          </div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-amber-400 to-amber-600"></div>
            
            {[
              { year: "1985", text: "Founded by George Tannous as a small family workshop specializing in traditional Arabic gold jewelry", side: "left" },
              { year: "1995", text: "Expanded to serve the growing Middle Eastern community in Greater New Orleans", side: "right" },
              { year: "2005", text: "Moved to our current location at 1180 Terry Pkwy, Terrytown, becoming a landmark destination", side: "left" },
              { year: "2015", text: "Launched online presence while maintaining our traditional in-store experience", side: "right" },
              { year: "2025", text: "Celebrating 40 years of authentic Arabic jewelry craftsmanship and community service", side: "left" }
            ].map((item, index) => (
              <div key={index} className="relative mb-16 last:mb-0">
                <div className={`flex flex-col md:flex-row items-center ${item.side === 'right' ? 'md:flex-row-reverse' : ''}`}>
                  <div className={`md:w-1/2 ${item.side === 'left' ? 'md:pr-12 md:text-right' : 'md:pl-12'} mb-4 md:mb-0`}>
                    <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-amber-500">
                      <h3 className="text-3xl font-bold text-amber-600 mb-2">{item.year}</h3>
                      <p className="text-gray-700 text-lg leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                  
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full border-4 border-white shadow-lg z-10">
                    <div className="w-full h-full rounded-full bg-yellow-400 opacity-50 animate-pulse"></div>
                  </div>
                  
                  <div className="md:w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Customer Testimonials */}
        <section className="py-20 bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50">
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            <div 
              id="testimonials-section"
              data-animate
              className={`text-center mb-16 transform transition-all duration-1000 delay-500 ${
                isVisible['testimonials-section'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            >
              <h2 className="text-4xl font-serif font-bold text-gray-800 mb-4">What Our Customers Say</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-yellow-500 mx-auto mb-6"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-amber-500">
                  <div className="flex justify-center mb-4">
                    <FaQuoteLeft className="text-amber-500 text-3xl" />
                  </div>
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400 text-xl" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic leading-relaxed">"{testimonial.text}"</p>
                  <div className="text-center">
                    <p className="font-bold text-gray-800 text-lg">{testimonial.name}</p>
                    <p className="text-gray-600">{testimonial.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Services Section */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            <div 
              id="services-section"
              data-animate
              className={`text-center mb-16 transform transition-all duration-1000 delay-600 ${
                isVisible['services-section'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            >
              <h2 className="text-4xl font-serif font-bold text-gray-800 mb-4">Our Specialized Services</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-yellow-500 mx-auto mb-6"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: FaShippingFast,
                  title: "Worldwide Shipping",
                  description: "Secure delivery of authentic Arabic gold jewelry to customers globally with full insurance coverage.",
                  features: ["Insured Shipping", "Global Delivery", "Tracking Included"]
                },
                {
                  icon: FaHeadset,
                  title: "Custom Arabic Designs",
                  description: "Bespoke jewelry featuring traditional Arabic calligraphy, Islamic patterns, and personalized engravings.",
                  features: ["Arabic Calligraphy", "Traditional Patterns", "Personal Engravings"]
                },
                {
                  icon: FaAward,
                  title: "Lifetime Guarantee",
                  description: "Comprehensive warranty covering craftsmanship, gold purity, and authenticity of all Arabic jewelry pieces.",
                  features: ["Craftsmanship Warranty", "Gold Purity Guarantee", "Authenticity Certificate"]
                }
              ].map((service, index) => (
                <div key={index} className="group hover:scale-105 transition-all duration-300">
                  <div className="bg-gradient-to-br from-white to-amber-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl border-2 border-transparent hover:border-amber-200">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                        <service.icon className="text-white text-2xl" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800">{service.title}</h3>
                    </div>
                    <p className="text-gray-700 mb-6 leading-relaxed">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced CTA Section */}
        <section className="py-20 bg-gradient-to-r from-[#FEB564] via-[#f59426] to-[#FEB564] text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='m40 50l20-20-20-20-20 20 20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '80px 80px'
            }}></div>
          </div>
          
          <div className="max-w-4xl mx-auto px-4 md:px-8 relative z-10">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Experience the Tannous Legacy</h2>
            <p className="text-xl md:text-2xl mb-8 text-yellow-100 leading-relaxed">
              Visit our Terrytown showroom or explore our collections to discover authentic Arabic gold jewelry that celebrates your heritage.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <a href="/collection">
                <button className="bg-white text-amber-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                  Explore Collections
                </button>
              </a>
              <a href="/contact">
                <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                  Visit Our Store
                </button>
              </a>
            </div>
            
            <div className="flex items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <FaGem className="text-yellow-300" />
                <span>Authentic Gold</span>
              </div>
              <div className="flex items-center gap-2">
                <FaAward className="text-yellow-300" />
                <span>40+ Years Experience</span>
              </div>
              <div className="flex items-center gap-2">
                <FaUsers className="text-yellow-300" />
                <span>Trusted by Community</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;