import React from 'react';
import Title from '../Shared/Title';

const Policy = () => {
  const policies = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "SECURE SHOPPING",
      description: "Your data is always protected"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
      title: "CASHLESS PAYMENTS",
      description: "Safe and secure online payment"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      title: "FREE RETURNS",
      description: "30 Days free returns"
    }
  ];

  return (
    <div className=" px-4 bg-transparent mb-16">
      {/* <Title head={"Our"} head2={"Policy"} para={"We prioritize your satisfaction and security"}></Title> */}
      <div className="max-w-8xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {policies.map((policy, index) => (
            <div 
              key={index} 
              className="bg-transparent border-r border-gray-300 p-6  hover:shadow-md transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="text-slate-900 mb-6">
                {policy.icon}
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">{policy.title}</h3>
              <p className="text-gray-600">{policy.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Policy;