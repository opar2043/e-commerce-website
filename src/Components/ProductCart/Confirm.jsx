import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const Confirm = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
        {/* Success Icon */}
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Payment Successful 
        </h1>

        {/* Message */}
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order has been confirmed and will be
          processed shortly.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate("/")}
            className="w-full sm:w-auto bg-[#D99B55] hover:bg-[#C68A4A] text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
