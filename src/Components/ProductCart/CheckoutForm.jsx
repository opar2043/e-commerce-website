import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import useAxios from "../Hooks/useAxios";
import useCart from "../Hooks/useCart";
import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");
  const axiosSecure = useAxios();
  const [cart, isLoading, refetch] = useCart([]);
  const [clientSecret, setClientSecret] = useState("");
  const { user } = useAuth();
  const [processing, setProcessing] = useState(false);
  const tax = cart.reduce((total, item) => total + item.price, 0) * 0.08;
  const price = cart.reduce((total, item) => total + item.price, 0) + tax;
  const [order, setOrder] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (price > 0) {
      axiosSecure.post("/create-payment-intent", { price }).then((res) => {
        setClientSecret(res.data.clientSecret);
      });
    }
  }, [axiosSecure, price]);

  // Cart delet Option

  const clearCart = async () => {
    try {
      const response = await axiosSecure.delete(`/cart`);

      if (response.data.deletedCount > 0) {
        refetch(); // reload cart data
      } else {
        console.log("error happend in cart");
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
      Swal.fire(
        "Error!",
        "An error occurred while clearing the cart.",
        "error"
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      setProcessing(false);
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      setProcessing(false);
      return;
    }

    // Step 1: Create Payment Method
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setErr(error.message);
      setProcessing(false);
      return;
    } else {
      setErr("");
      console.log("[PaymentMethod]", paymentMethod);
    }

    // Step 2: Confirm Payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "N/A",
            name: user?.displayName || "N/A",
          },
        },
      });

    if (confirmError) {
      console.log("[confirmError]", confirmError);
      setErr(confirmError.message);
      setProcessing(false);
      return;
    }

    // Step 3: Payment Success → Save Order
    if (paymentIntent && paymentIntent.status === "succeeded") {
      console.log("[PaymentIntent]", paymentIntent);

      const orderData = {
        userEmail: user?.email,
        userName: user?.displayName,
        price,
        status: "pending",
        items: cart,
        transactionId: paymentIntent.id,
        date: new Date().toISOString(),
      };

      try {
        const res = await axiosSecure.post("/order", orderData);
        if (res.data.insertedId) {
          // here write a code for delete all the cart item array
          clearCart();
          setOrder(orderData);
          navigate("/confirm");
          Swal.fire({
            title: "✅ Payment Confirmed",
            text: "Your order has been placed!",
            icon: "success",
            confirmButtonColor: "#4F46E5",
          });
        }
      } catch (err) {
        console.error("Error saving order:", err);
        Swal.fire({
          title: "Error",
          text: "Payment succeeded but order save failed!",
          icon: "error",
          confirmButtonColor: "#4F46E5",
        });
      }
    }

    setProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h2>
          <p className="text-gray-600 mb-3">
            Complete your purchase securely (Log In Frist){" "}
          </p>
          <p className="text-gray-600 text-sm ">
            <span><strong>Current Email: </strong> </span>
            {user.email}
          </p>
          {/* Order Summary */}
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Order Summary
            </h3>

            <div className="space-y-4">
              {cart.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-gray-600">
                    {item.name || `Item ${index + 1}`}
                  </span>
                  <span className="text-gray-900">
                    ${item.price.toFixed(2)}
                  </span>
                </div>
              ))}

              <div className="flex justify-between">
                <span className="text-gray-600">Tax (8%)</span>
                <span className="text-gray-900">${tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t border-gray-200 mt-4 pt-4">
              <div className="flex justify-between">
                <span className="text-base font-medium text-gray-900">
                  Total{" "}
                </span>
                <span className="text-base font-bold text-gray-900">
                  ${price.toFixed(2)}$
                </span>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Payment Details
            </h3>

            <form onSubmit={handleSubmit}>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: "16px",
                        color: "#374151",
                        "::placeholder": {
                          color: "#9CA3AF",
                        },
                        backgroundColor: "#F9FAFB",
                      },
                      invalid: {
                        color: "#EF4444",
                      },
                    },
                    hidePostalCode: true,
                  }}
                />
              </div>

              {err && (
                <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-4 flex items-start">
                  <svg
                    className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{err}</span>
                </div>
              )}

              <button
                className={`w-full py-3 px-4 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  !stripe || !clientSecret || processing
                    ? "bg-indigo-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white"
                }`}
                type="submit"
                disabled={!stripe || !clientSecret || processing}
              >
                {processing ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  `Pay $${price.toFixed(2)}`
                )}
              </button>
            </form>
          </div>

          {/* Security Notice */}
          <div className="flex items-center text-sm text-gray-500">
            <svg
              className="w-4 h-4 mr-2 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>Your payment details are securely encrypted</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
