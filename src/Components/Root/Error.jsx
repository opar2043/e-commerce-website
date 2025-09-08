import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <h1 className="text-9xl font-bold text-gray-800">404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-gray-700">
        Oops! Page not found
      </h2>
      <p className="mt-2 text-gray-500">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-black text-white rounded-lg shadow-md hover:bg-gray-800 transition-all duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default Error;
