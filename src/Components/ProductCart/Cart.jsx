import { FiTrash2, FiShoppingCart } from "react-icons/fi";
import useAuth from "../Hooks/useAuth";
import useAxios from "../Hooks/useAxios";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm2";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, setCart } = useAuth();
  const axiosSecure = useAxios();
  const stripePromise = loadStripe(
    "pk_test_51QfDLMIXauIQhi9zpYyko394OCzT9oOQKPvLFEn5siB1Eld53WIRA6H63Oowd9ldwe1lkzoOO6WrEjUq2bQM1Tgi004aRSvT6f"
  );
  const [clientSecret, setClientSecret] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);

  // ✅ Subtotal = sum of (price × quantity)
  const subtotal = cart
    .reduce((total, item) => {
      const itemPrice = parseFloat(item.price) || 0;
      const itemQuantity = parseInt(item.quantity) || 1;
      return total + itemPrice  }, 0)
    .toFixed(2);




  // ✅ Shipping = flat $10 (can change to weight-based if needed)
  const shipping = cart.length === 0 ? 0 : 10.0;

  // ✅ Tax = 8% of subtotal
  const tax = (parseFloat(subtotal) * 0.08).toFixed(2);

  // ✅ Total = subtotal + shipping + tax
  const totalPrice = (
    parseFloat(subtotal) +
    parseFloat(shipping) +
    parseFloat(tax)
  ).toFixed(2);
  const total = parseFloat(totalPrice);

  console.log("Cart items:", cart);
  console.log("Subtotal:", subtotal);
  console.log("Total:", total);

  // ✅ Handle removing an item
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // Create payment intent when total changes
  useEffect(() => {
    console.log(
      "UseEffect triggered - Cart length:",
      cart.length,
      "Total:",
      total
    );

    if (cart.length > 0 && total > 0) {
      setPaymentLoading(true);
      console.log("Creating payment intent for total:", total);

      fetch("https://gold-web-server.vercel.app/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ total }),
      })
        .then((res) => {
          console.log("Response status:", res.status);
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          console.log("Payment intent response:", data);
          if (data.clientSecret) {
            setClientSecret(data.clientSecret);
          } else {
            console.error("No clientSecret in response:", data);
          }
        })
        .catch((err) => {
          console.error("Error creating payment intent:", err);
          Swal.fire({
            title: "Error",
            text: "Failed to initialize payment. Please try again.",
            icon: "error",
          });
        })
        .finally(() => {
          setPaymentLoading(false);
        });
    } else {
      setClientSecret("");
    }
  }, [total, cart.length]);

  // console.log("Client Secret:", clientSecret);

  const appearance = {
    theme: "stripe",
  };

  const options = {
    clientSecret,
    appearance,
  };

  async function submitData() {
    try {
      console.log("Submitting cart data:", cart);
      const response = await axiosSecure.post("/cart", cart);
      console.log("Cart submission response:", response.data);

      Swal.fire({
        title: "Confirmed",
        text: `Successfully paid for ${cart.length} item(s)`,
        icon: "success",
      });

      setCart([]);
      setIsModalOpen(false);
      setClientSecret("");

      return response.data;
    } catch (err) {
      // console.error("Error submitting cart:", err);
      Swal.fire({
        title: "Something Went Wrong",
        text: "Failed to process your order. Please contact support.",
        icon: "error",
      });
      throw err;
    }
  }

  function handleOpen() {
    if (cart.length > 0) {
      if (!clientSecret && !paymentLoading) {
        Swal.fire({
          title: "Loading",
          text: "Initializing payment...",
          icon: "info",
        });
        return;
      }
      setIsModalOpen(true);
    } else {
      Swal.fire({
        title: "Empty Cart",
        text: "Please add items to your cart before checkout.",
        icon: "warning",
      });
    }
  }

  function handleClose() {
    setIsModalOpen(false);
  }

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-2 text-slate-800">
          <FiShoppingCart className="text-[#f8992d]" />
          Shopping Cart
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cart.length === 0 ? (
              <div className="bg-slate-100 rounded-xl p-8 text-center">
                <FiShoppingCart className="text-5xl mx-auto text-slate-400 mb-4" />
                <p className="text-slate-600 text-lg">Your cart is empty.</p>
                <Link to={"/collection"}>
                  <button className="mt-4 bg-[#f8992d] text-white font-semibold py-2 px-6 rounded-lg hover:bg-amber-500 transition">
                    Continue Shopping
                  </button>
                </Link>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-center justify-between bg-white p-6 rounded-xl shadow-md border border-slate-200"
                >
                  <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-xl"
                    />
                    <div>
                      <h3 className="font-semibold text-lg text-slate-800">
                        {item.name}
                      </h3>
                      <p className="text-[#f8992d] font-medium">
                        ${parseFloat(item.price || 0).toFixed(2)}
                      </p>
                      <p className="text-slate-600 mt-1">
                        Quantity: {item.quantity || 1}
                      </p>
                      <p className="text-slate-800 font-medium mt-1">
                        Subtotal: $
                        {(
                          parseFloat(item.price || 0) *
                          parseInt(item.quantity || 1)
                        ).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-600 transition p-3 bg-slate-100 rounded-lg hover:bg-slate-200"
                      aria-label="Remove item"
                    >
                      <FiTrash2 size={20} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Order Summary */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200 h-fit sticky top-6">
            <h3 className="text-xl font-semibold mb-6 pb-3 border-b border-slate-200 text-slate-800">
              Order Summary
            </h3>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-slate-600">Subtotal</span>
                <span className="font-medium text-slate-800">${subtotal}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-600">Shipping</span>
                <span className="font-medium text-slate-800">
                  ${shipping.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-600">Tax (8%)</span>
                <span className="font-medium text-slate-800">${tax}</span>
              </div>

              <div className="border-t border-slate-200 pt-4 mt-3">
                <div className="flex justify-between text-lg font-semibold">
                  <span className="text-slate-800">Total</span>
                  <span className="text-[#f8992d]">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleOpen}
              className="w-full bg-[#f8992d] text-white py-3 rounded-lg font-semibold hover:bg-amber-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={cart.length === 0 || paymentLoading}
            >
              {paymentLoading
                ? "Initializing Payment..."
                : "Proceed to Checkout"}
            </button>

            {cart.length > 0 && (
              <button className="w-full mt-4 border border-slate-300 text-slate-700 py-3 rounded-lg font-medium hover:bg-slate-50 transition">
                Continue Shopping 
              </button>
            )}

            {/* Debug Information (Remove in production) */}
            <div className="mt-4 p-3 bg-gray-100 rounded text-xs">
              <p>Debug Info:</p>
              <p>Cart Length: {cart.length}</p>
              <p>Total: {total}</p>
              <p>
                Client Secret: {clientSecret ? "Available" : "Not Available"}
              </p>
              <p>Payment Loading: {paymentLoading ? "Yes" : "No"}</p>
            </div>

            {/* Modal */}
            {isModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg w-11/12 max-w-2xl max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg">Complete Your Payment</h3>
                    <button
                      onClick={handleClose}
                      className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-2">Order Summary</h4>
                    <p>Items: {cart.length}</p>
                    <p>Total: ${total.toFixed(2)}</p>
                  </div>

                  {clientSecret ? (
                    <Elements options={options} stripe={stripePromise}>
                      <CheckoutForm
                        submitData={submitData}
                        onClose={handleClose}
                        total={total}
                      />
                    </Elements>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-600">Initializing payment...</p>
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#f8992d] mx-auto mt-4"></div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
