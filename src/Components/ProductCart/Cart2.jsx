import { FiTrash2, FiShoppingCart } from "react-icons/fi";
import useAuth from "../Hooks/useAuth";
import useAxios from "../Hooks/useAxios";
import useCart from "../Hooks/useCart";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useState } from "react";

const Cart2 = () => {
  //   const { cart, setCart } = useAuth();
  const [cart, isLoading, refetch] = useCart([]);
  const axiosSecure = useAxios();
  const [order, setOrder] = useState([]);
  const { user } = useAuth();

  // ✅ Subtotal = sum of (price × quantity)
  const subtotal = cart
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);

  // ✅ Shipping = flat $10 (can change to weight-based if needed)
  const shipping = cart.length === 0 ? 0 : 10.0;

  // ✅ Tax = 8% of subtotal
  const tax = (parseFloat(subtotal) * 0.08).toFixed(2);

  // ✅ Total = subtotal + shipping + tax
  // const total = (parseFloat(subtotal) + shipping + parseFloat(tax)).toFixed(2);
  const total = (parseFloat(subtotal)  + parseFloat(tax)).toFixed(2);

  const handleRemove = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, remove it!",
      });

      if (result.isConfirmed) {
        const response = await axiosSecure.delete(`/cart/${id}`);

        if (response.data.deletedCount > 0) {
          Swal.fire(
            "Removed!",
            "Item has been removed from your cartlist.",
            "success"
          );

          refetch(); // ✅ reload cart data
        } else {
          Swal.fire("Error!", "Failed to remove item from cartlist.", "error");
        }
      }
    } catch (error) {
      console.error("Error removing item from cartlist:", error);
      Swal.fire(
        "Error!",
        "An error occurred while removing the item.",
        "error"
      );
    }
  };

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
                <button className="mt-4 bg-[#f8992d] text-white font-semibold py-2 px-6 rounded-lg hover:bg-amber-500 transition">
                  <Link to="/collection">Continue Shopping</Link>
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item._id}
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
                        ${item.price.toFixed(2)}
                      </p>
                      <p className="text-slate-600 mt-1">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemove(item._id)}
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

              {/* <div className="flex justify-between">
                <span className="text-slate-600">Shipping</span>
                <span className="font-medium text-slate-800">
                  ${shipping.toFixed(2)}
                </span>
              </div> */}

              <div className="flex justify-between">
                <span className="text-slate-600">Tax (8%)</span>
                <span className="font-medium text-slate-800">${tax}</span>
              </div>

              <div className="border-t border-slate-200 pt-4 mt-3">
                <div className="flex justify-between text-lg font-semibold">
                  <span className="text-slate-800">Total</span>
                  <span className="text-[#f8992d]">${total}</span>
                </div>
              </div>
            </div>

            {user ? (
              <Link to={"/payment"}>
                <button
                  className="w-full bg-[#f8992d] text-white py-3 rounded-lg font-semibold hover:bg-amber-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={cart.length === 0}
                >
                  Proceed to Checkout
                </button>
              </Link>
            ) : (
              <Link to={"/payment"}>
                <button
                  className="w-full bg-[#f8992d] text-white py-3 rounded-lg font-semibold hover:bg-amber-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!user}
                >
                  Log In to Checkout
                </button>
              </Link>
            )}

            {cart.length > 0 && (
              <button className="w-full mt-4 border border-slate-300 text-slate-700 py-3 rounded-lg font-medium hover:bg-slate-50 transition">
                <Link className="/collection">Continue Shopping</Link>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart2;
