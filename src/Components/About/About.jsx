import React from 'react';
import { FaGem, FaAward, FaUsers, FaHandHoldingHeart, FaShippingFast, FaHeadset } from "react-icons/fa";
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen bg-white">


      {/* Introduction Section */}
      <section className="py-16 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-serif font-bold text-black mb-6">Welcome to Tannous Jewelry</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              For over three decades, Tannous Jewelry has been synonymous with exceptional craftsmanship, 
              timeless designs, and unparalleled quality. Founded in 1985 by master jeweler George Tannous, 
              our family-owned business has grown from a small workshop to a renowned jewelry destination.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Each piece in our collection is meticulously crafted with attention to detail, ensuring that 
              every customer receives jewelry that not only meets but exceeds their expectations. We believe 
              that jewelry is more than just adornment; it's a reflection of personal stories, cherished memories, 
              and milestones worth celebrating.
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
                <FaGem className="text-gray-200 text-xl" />
              </div>
              <p className="text-gray-800 font-semibold">Authenticity Guaranteed</p>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="bg-gray-50 p-8 rounded-lg shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                alt="Jewelry Craftsmanship" 
                className="rounded-lg shadow-lg w-full h-64 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-serif font-bold text-black text-center mb-16">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="flex justify-center mb-4">
                <FaHandHoldingHeart className="text-4xl text-gray-700" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-black">Craftsmanship</h3>
              <p className="text-gray-600">Every piece is handcrafted with precision and care by our skilled artisans.</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="flex justify-center mb-4">
                <FaUsers className="text-4xl text-gray-700" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-black">Customer Trust</h3>
              <p className="text-gray-600">We build lasting relationships based on transparency and integrity.</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="flex justify-center mb-4">
                <FaAward className="text-4xl text-gray-700" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-black">Quality</h3>
              <p className="text-gray-600">We use only the finest materials and ethically sourced gemstones.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 px-4 md:px-8 max-w-6xl mx-auto">
        <h2 className="text-3xl font-serif font-bold text-black text-center mb-12">Our Journey</h2>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-300"></div>
          
          {/* Timeline items */}
          <div className="relative mb-12">
            <div className="flex flex-col md:flex-row items-center mb-8">
              <div className="md:w-1/2 md:pr-8 md:text-right mb-4 md:mb-0">
                <h3 className="text-2xl font-semibold text-gray-800">1985</h3>
                <p className="text-gray-600">Founded by George Tannous as a small family workshop</p>
              </div>
              <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gray-600 rounded-full border-4 border-white"></div>
              <div className="md:w-1/2 md:pl-8"></div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center mb-8">
              <div className="md:w-1/2 md:pr-8 md:text-right"></div>
              <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gray-600 rounded-full border-4 border-white"></div>
              <div className="md:w-1/2 md:pl-8 mb-4 md:mb-0">
                <h3 className="text-2xl font-semibold text-gray-800">2000</h3>
                <p className="text-gray-600">Expanded to our first retail location in the city center</p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center mb-8">
              <div className="md:w-1/2 md:pr-8 md:text-right mb-4 md:mb-0">
                <h3 className="text-2xl font-semibold text-gray-800">2015</h3>
                <p className="text-gray-600">Launched our online store, reaching customers worldwide</p>
              </div>
              <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gray-600 rounded-full border-4 border-white"></div>
              <div className="md:w-1/2 md:pl-8"></div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-8 md:text-right"></div>
              <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gray-600 rounded-full border-4 border-white"></div>
              <div className="md:w-1/2 md:pl-8 mb-4 md:mb-0">
                <h3 className="text-2xl font-semibold text-gray-800">2023</h3>
                <p className="text-gray-600">Celebrated 38 years of excellence in jewelry craftsmanship</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-serif font-bold text-black text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
                  <FaShippingFast className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-semibold text-black">Worldwide Shipping</h3>
              </div>
              <p className="text-gray-600">We deliver our exquisite pieces to customers around the globe with secure packaging.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
                  <FaHeadset className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-semibold text-black">Custom Design</h3>
              </div>
              <p className="text-gray-600">Create your unique piece with our bespoke jewelry design service.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
                  <FaAward className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-semibold text-black">Lifetime Warranty</h3>
              </div>
              <p className="text-gray-600">All our jewelry comes with a lifetime warranty against manufacturing defects.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16  text-slate-950 text-center">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-serif font-bold mb-6">Experience the Tannous Difference</h2>
          <p className="text-xl mb-8 text-slate-700">Visit our store or browse our collections to discover jewelry that tells your story.</p>
           <Link to={'/collection'}>
            <button className="bg-gray-700 text-white px-8 py-3 rounded-md font-semibold hover:bg-gray-600 transition-colors duration-300">
            Explore Collections
          </button>
           </Link>
        </div>
      </section>
    </div>
  );
};

export default About;