import React, { useState, useEffect } from 'react';
import { 
  FaShieldAlt, 
  FaCreditCard, 
  FaUndo, 
  FaShippingFast,
  FaCertificate,
  FaHeart,
  FaPhone,
  FaGem
} from 'react-icons/fa';

const Policy = () => {
  const [activePolicy, setActivePolicy] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('policy-section');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  const policies = [
    {
      icon: FaShieldAlt,
      title: "SECURE SHOPPING",
      subtitle: "Your Trust, Our Priority",
      description: "Advanced SSL encryption protects all your personal and payment information",
      features: ["256-bit SSL encryption", "PCI DSS compliant", "Secure payment gateway", "Data protection guarantee"],
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      hoverColor: "hover:border-blue-500"
    },
    {
      icon: FaCreditCard,
      title: "FLEXIBLE PAYMENTS",
      subtitle: "Multiple Payment Options",
      description: "Safe and secure payment methods for your convenience",
      features: ["Credit & debit cards", "PayPal & bank transfers", "Financing available", "Secure checkout"],
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
      hoverColor: "hover:border-green-500"
    },
    {
      icon: FaUndo,
      title: "EASY RETURNS",
      subtitle: "Hassle-Free Experience",
      description: "30-day return policy with full satisfaction guarantee",
      features: ["30-day return window", "Free return shipping", "Full refund guarantee", "No questions asked"],
      color: "from-amber-500 to-amber-600",
      bgColor: "bg-amber-50",
      textColor: "text-amber-600",
      hoverColor: "hover:border-amber-500"
    },
    {
      icon: FaShippingFast,
      title: "WORLDWIDE SHIPPING",
      subtitle: "Global Delivery Network",
      description: "Fast, insured shipping to customers around the world",
      features: ["Express shipping available", "Fully insured packages", "Real-time tracking", "International delivery"],
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
      hoverColor: "hover:border-purple-500"
    }
  ];

  const guarantees = [
    {
      icon: FaCertificate,
      title: "Authenticity Guarantee",
      description: "Every piece comes with a certificate of authenticity"
    },
    {
      icon: FaGem,
      title: "Quality Craftsmanship",
      description: "Handcrafted by master jewelers with 40+ years experience"
    },
    {
      icon: FaHeart,
      title: "Lifetime Service",
      description: "Free cleaning and maintenance for the life of your jewelry"
    },
    {
      icon: FaPhone,
      title: "Expert Support",
      description: "Dedicated customer service team ready to assist you"
    }
  ];

  return (
    <div id="policy-section" className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FaShieldAlt className="text-3xl text-amber-600" />
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800">Our Commitment</h2>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-yellow-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Your satisfaction and security are our top priorities. We've built our reputation on trust, 
            quality, and exceptional customer service for over four decades.
          </p>
        </div>

        {/* Main Policies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {policies.map((policy, index) => (
            <div
              key={index}
              className={`group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 ${policy.hoverColor} transform hover:scale-105 cursor-pointer ${
                isVisible ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
              onMouseEnter={() => setActivePolicy(index)}
            >
              {/* Icon Section */}
              <div className={`relative mb-6 ${policy.bgColor} rounded-2xl p-4 w-20 h-20 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300`}>
                <policy.icon className={`text-3xl ${policy.textColor}`} />
                <div className="absolute inset-0 bg-gradient-to-br opacity-20 rounded-2xl" style={{
                  background: `linear-gradient(135deg, ${policy.color.split(' ')[1]}, ${policy.color.split(' ')[3]})`
                }}></div>
              </div>

              {/* Content */}
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{policy.title}</h3>
                <p className={`text-sm font-semibold mb-3 ${policy.textColor}`}>{policy.subtitle}</p>
                <p className="text-gray-600 mb-6 leading-relaxed">{policy.description}</p>

                {/* Features List */}
                <div className="space-y-2">
                  {policy.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2 text-sm text-gray-700">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${policy.color}`}></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hover Effect Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${policy.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
            </div>
          ))}
        </div>

        {/* Additional Guarantees Section */}
        <div className="bg-[#f7992e] rounded-3xl p-12 text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }}></div>
          </div>

          <div className="relative z-10">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                The Tannous Promise
              </h3>
              <p className="text-xl text-amber-100 max-w-3xl mx-auto">
                Four decades of trust, authenticity, and craftsmanship excellence
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {guarantees.map((guarantee, index) => (
                <div key={index} className="text-center group">
                  <div className="bg-white bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <guarantee.icon className="text-2xl text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">{guarantee.title}</h4>
                  <p className="text-amber-100 text-sm leading-relaxed">{guarantee.description}</p>
                </div>
              ))}
            </div>

            {/* CTA Section */}
            <div className="text-center mt-12 pt-8 border-t border-white border-opacity-20">
              <h4 className="text-2xl font-bold text-white mb-4">
                Questions About Our Policies?
              </h4>
              <p className="text-amber-100 mb-6">
                Our customer service team is here to help with any questions or concerns.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/contact" className="px-6 py-3 bg-white text-amber-600 font-semibold rounded-lg hover:bg-amber-100 transition-colors">
                  Contact Us
                </a>
                <a href="tel:+15042521732" className="px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-amber-600 transition-colors">
                  Call (504) 252-1732
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="group">
            <div className="text-3xl md:text-4xl font-bold text-amber-600 mb-2 group-hover:scale-110 transition-transform">40+</div>
            <div className="text-gray-600 font-medium">Years in Business</div>
          </div>
          <div className="group">
            <div className="text-3xl md:text-4xl font-bold text-amber-600 mb-2 group-hover:scale-110 transition-transform">1000+</div>
            <div className="text-gray-600 font-medium">Happy Customers</div>
          </div>
          <div className="group">
            <div className="text-3xl md:text-4xl font-bold text-amber-600 mb-2 group-hover:scale-110 transition-transform">100%</div>
            <div className="text-gray-600 font-medium">Authentic Gold</div>
          </div>
          <div className="group">
            <div className="text-3xl md:text-4xl font-bold text-amber-600 mb-2 group-hover:scale-110 transition-transform">24/7</div>
            <div className="text-gray-600 font-medium">Customer Support</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Policy;