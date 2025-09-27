// import { FiTrash2, FiShoppingCart } from "react-icons/fi";
// import useAuth from "../Hooks/useAuth";
// import useAxios from "../Hooks/useAxios";
// import useCart from "../Hooks/useCart";
// import Swal from "sweetalert2";
// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { FaGoogle } from "react-icons/fa";

// const Cart2 = () => {
//   //   const { cart, setCart } = useAuth();
//   const [cart, isLoading, refetch] = useCart([]);
//   const axiosSecure = useAxios();
//   const [order, setOrder] = useState([]);
//   const { user , handleGoogle } = useAuth();
//   const navigate = useNavigate()
 
//   // ✅ Subtotal = sum of (price × quantity)
//   const subtotal = cart
//     .reduce((total, item) => total + item.price * item.quantity, 0)
//     .toFixed(2);

//   // ✅ Shipping = flat $10 (can change to weight-based if needed)
//   const shipping = cart.length === 0 ? 0 : 10.0;

//   // ✅ Tax = 8% of subtotal
//   const tax = (parseFloat(subtotal) * 0.08).toFixed(2);

//   // ✅ Total = subtotal + shipping + tax
//   // const total = (parseFloat(subtotal) + shipping + parseFloat(tax)).toFixed(2);
//   const total = (parseFloat(subtotal)  + parseFloat(tax)).toFixed(2);

//   const handleRemove = async (id) => {
//     try {
//       const result = await Swal.fire({
//         title: "Are you sure?",
//         text: "You won't be able to revert this!",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonColor: "#3085d6",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Yes, remove it!",
//       });

//       if (result.isConfirmed) {
//         const response = await axiosSecure.delete(`/cart/${id}`);

//         if (response.data.deletedCount > 0) {
//           Swal.fire(
//             "Removed!",
//             "Item has been removed from your cartlist.",
//             "success"
//           );

//           refetch(); // ✅ reload cart data
//         } else {
//           Swal.fire("Error!", "Failed to remove item from cartlist.", "error");
//         }
//       }
//     } catch (error) {
//       console.error("Error removing item from cartlist:", error);
//       Swal.fire(
//         "Error!",
//         "An error occurred while removing the item.",
//         "error"
//       );
//     }
//   };

//     // function handleGoogleLogin() {
//     //   handleGoogle()
//     //     .then(() => {
//     //       axiosSecure.post('/users')
//     //       Swal.fire({ 
//     //         title: "Logged In Successfully!", 
//     //         text: "Welcome to Tannous Jewelry",
//     //         icon: "success",
//     //         background: "#1a1a1a",
//     //         color: "#fff",
//     //         confirmButtonColor: "#d4af37"
//     //       });

//     //       navigate("/");
//     //     })
//     //     .catch(() => {
//     //       Swal.fire({ 
//     //         title: "Google Sign-in Failed", 
//     //         text: "Please try again",
//     //         icon: "error",
//     //         background: "#1a1a1a",
//     //         color: "#fff",
//     //         confirmButtonColor: "#d4af37"
//     //       });
//     //     });
//     // }


//   function handleGoogleLogin() {
//   handleGoogle()
//     .then((result) => {
//       const loggedUser = result.user;

//       // ✅ Prepare user data
//       const userInfo = {
//         name: loggedUser.displayName,
//         email: loggedUser.email,
//         photo: loggedUser.photoURL,
//       };

//       // ✅ Post to backend (only insert if not exists)
//       axiosSecure.post("/users", userInfo)
//         .then((res) => {
//           if (res.data.insertedId || res.data.message === "User already exists") {
//             Swal.fire({ 
//               title: "Logged In Successfully!", 
//               text: "Welcome to Tannous Jewelry",
//               icon: "success",
//               background: "#1a1a1a",
//               color: "#fff",
//               confirmButtonColor: "#d4af37"
//             });
//             navigate("/");
//           }
//         })
//         .catch((err) => {
//           console.error("Error saving user:", err);
//           Swal.fire({ 
//             title: "Error saving user!", 
//             text: "Please try again later",
//             icon: "error",
//             background: "#1a1a1a",
//             color: "#fff",
//             confirmButtonColor: "#d4af37"
//           });
//         });
//     })
//     .catch(() => {
//       Swal.fire({ 
//         title: "Google Sign-in Failed", 
//         text: "Please try again",
//         icon: "error",
//         background: "#1a1a1a",
//         color: "#fff",
//         confirmButtonColor: "#d4af37"
//       });
//     });
// }





//   return (
//     <div className="min-h-screen bg-white py-8 px-4">
//       <div className="max-w-6xl mx-auto">
//         <h2 className="text-3xl font-bold mb-8 flex items-center gap-2 text-slate-800">
//           <FiShoppingCart className="text-[#f8992d]" />
//           Shopping Cart
//         </h2>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Cart Items */}
//           <div className="lg:col-span-2 space-y-6">
//             {cart.length === 0 ? (
//               <div className="bg-slate-100 rounded-xl p-8 text-center">
//                 <FiShoppingCart className="text-5xl mx-auto text-slate-400 mb-4" />
//                 <p className="text-slate-600 text-lg">Your cart is empty.</p>
//                 <button className="mt-4 bg-[#f8992d] text-white font-semibold py-2 px-6 rounded-lg hover:bg-amber-500 transition">
//                   <Link to="/collection">Continue Shopping</Link>
//                 </button>
//               </div>
//             ) : (
//               cart.map((item) => (
//                 <div
//                   key={item._id}
//                   className="flex flex-col sm:flex-row items-center justify-between bg-white p-6 rounded-xl shadow-md border border-slate-200"
//                 >
//                   <div className="flex items-center space-x-4 mb-4 sm:mb-0">
//                     <img
//                       src={item.image}
//                       alt={item.name}
//                       className="w-24 h-24 object-cover rounded-xl"
//                     />
//                     <div>
//                       <h3 className="font-semibold text-lg text-slate-800">
//                         {item.name}
//                       </h3>
//                       <p className="text-[#f8992d] font-medium">
//                         ${item.price.toFixed(2)}
//                       </p>
//                       <p className="text-slate-600 mt-1">
//                         Quantity: {item.quantity}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-center space-x-4">
//                     {/* Remove Button */}
//                     <button
//                       onClick={() => handleRemove(item._id)}
//                       className="text-red-500 hover:text-red-600 transition p-3 bg-slate-100 rounded-lg hover:bg-slate-200"
//                       aria-label="Remove item"
//                     >
//                       <FiTrash2 size={20} />
//                     </button>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
         




//           {/* Order Summary */}
//           <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200 h-fit sticky top-6">

//           <div>
//             <p className="text-black">Register Frist</p>
//           </div>

//             <h3 className="text-xl font-semibold mb-6 pb-3 border-b border-slate-200 text-slate-800">
//               Order Summary
//             </h3>

            

//             <div className="space-y-4 mb-6">
//               <div className="flex justify-between">
//                 <span className="text-slate-600">Subtotal</span>
//                 <span className="font-medium text-slate-800">${subtotal}</span>
//               </div>



//               <div className="flex justify-between">
//                 <span className="text-slate-600">Tax (8%)</span>
//                 <span className="font-medium text-slate-800">${tax}</span>
//               </div>

//               <div className="border-t border-slate-200 pt-4 mt-3">
//                 <div className="flex justify-between text-lg font-semibold">
//                   <span className="text-slate-800">Total</span>
//                   <span className="text-[#f8992d]">${total}</span>
//                 </div>
//               </div>
//             </div>

//             {user ? (
//               <Link to={"/payment"}>
//                 <button
                

//                   className="w-full bg-[#f8992d] text-white py-3 rounded-lg font-semibold hover:bg-amber-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
//                   disabled={cart.length === 0}
//                 >
//                   Proceed to Checkout
//                 </button>
//               </Link>
//             ) : (
//               <Link to={"/payment"}>
//                 <button
//                   className="w-full bg-[#f8992d] text-white py-3 rounded-lg font-semibold hover:bg-amber-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
//                   disabled={!user}
//                 >
//                   Log In to Checkout
//                 </button>
//               </Link>
//             )}


//             <button className="w-full mt-4 border border-slate-300 text-slate-700 py-3 rounded-lg font-medium hover:bg-slate-50 transition flex justify-center items-center gap-2"
//              onClick={()=>handleGoogleLogin()}><FaGoogle></FaGoogle> Google Login</button>
//           </div>
//         </div>
//       </div>

      
//     </div>
//   );
// };

// export default Cart2;



















import { FiTrash2, FiShoppingCart, FiX } from "react-icons/fi";
import useAuth from "../Hooks/useAuth";
import useAxios from "../Hooks/useAxios";
import useCart from "../Hooks/useCart";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";

const Cart2 = () => {
  const [cart, isLoading, refetch] = useCart([]);
  const axiosSecure = useAxios();
  const [order, setOrder] = useState([]);
  const { user, handleGoogle, isCartSidebarOpen, setIsCartSidebarOpen } = useAuth();
  const navigate = useNavigate();

  // ✅ Subtotal = sum of (price × quantity)
  const subtotal = cart
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);

  // ✅ Shipping = flat $10 (can change to weight-based if needed)
  const shipping = cart.length === 0 ? 0 : 10.0;

  // ✅ Tax = 8% of subtotal
  const tax = (parseFloat(subtotal) * 0.08).toFixed(2);

  // ✅ Total = subtotal + shipping + tax
  const total = (parseFloat(subtotal) + parseFloat(tax)).toFixed(2);

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

  function handleGoogleLogin() {
    handleGoogle()
      .then((result) => {
        const loggedUser = result.user;

        // ✅ Prepare user data
        const userInfo = {
          name: loggedUser.displayName,
          email: loggedUser.email,
          photo: loggedUser.photoURL,
        };

        // ✅ Post to backend (only insert if not exists)
        axiosSecure.post("/users", userInfo)
          .then((res) => {
            if (res.data.insertedId || res.data.message === "User already exists") {
              Swal.fire({ 
                title: "Logged In Successfully!", 
                text: "Welcome to Tannous Jewelry",
                icon: "success",
                background: "#1a1a1a",
                color: "#fff",
                confirmButtonColor: "#d4af37"
              });
              navigate("/");
            }
          })
          .catch((err) => {
            console.error("Error saving user:", err);
            Swal.fire({ 
              title: "Error saving user!", 
              text: "Please try again later",
              icon: "error",
              background: "#1a1a1a",
              color: "#fff",
              confirmButtonColor: "#d4af37"
            });
          });
      })
      .catch(() => {
        Swal.fire({ 
          title: "Google Sign-in Failed", 
          text: "Please try again",
          icon: "error",
          background: "#1a1a1a",
          color: "#fff",
          confirmButtonColor: "#d4af37"
        });
      });
  }

  const closeSidebar = () => {
    setIsCartSidebarOpen(false);
  };

  return (
    <>
      {/* Overlay */}
      {isCartSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
        isCartSidebarOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200">
            <h2 className="text-xl font-bold flex items-center gap-2 text-slate-800">
              <FiShoppingCart className="text-[#f8992d]" />
              Shopping Cart ({cart.length})
            </h2>
            <button 
              onClick={closeSidebar}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <FiX size={20} className="text-red-600" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {cart.length === 0 ? (
              <div className="text-center py-8">
                <FiShoppingCart className="text-4xl mx-auto text-slate-400 mb-4" />
                <p className="text-slate-600">Your cart is empty.</p>
                <button 
                  onClick={closeSidebar}
                  className="mt-4 bg-[#f8992d] text-white font-semibold py-2 px-6 rounded-lg hover:bg-amber-500 transition"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-between bg-slate-50 p-4 rounded-lg border-b border-orange-200"
                  >
                    <div className="flex items-center space-x-3 ">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-md text-slate-800">
                          {item.name}
                        </h3>
                        <p className="text-[#f8992d] font-medium text-md">
                          ${item.price.toFixed(2)}
                        </p>
                        <p className="text-slate-600 text-xs">
                          Quntity: {item.quantity}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleRemove(item._id)}
                      className="text-red-500 hover:text-red-600 transition p-2 hover:bg-red-50 rounded-lg"
                      aria-label="Remove item"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Order Summary */}
          {cart.length > 0 && (
            <div className="border-t border-slate-200 p-6">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Subtotal</span>
                  <span className="font-medium text-slate-800 text-lg">${subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600 ">Tax (8%)</span>
                  <span className="font-medium text-slate-800 text-lg">${tax}</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-semibold">
                    <span className="text-slate-800">Total</span>
                    <span className="text-[#f8992d] text-lg">${total}</span>
                  </div>
                </div>
              </div>

              {user ? (
                <Link to="/payment" onClick={closeSidebar}>
                  <button className="w-full bg-[#f8992d] text-white py-3 rounded-lg font-semibold hover:bg-amber-500 transition">
                    Proceed to Checkout
                  </button>
                </Link>
              ) : (
                <>
                  <p className="text-sm text-[#f8992d] mb-3 text-center">
                    Please log in to checkout
                  </p>
                  <button
                    className="w-full border border-slate-300 text-slate-700 py-3 rounded-lg font-medium hover:bg-slate-50 transition flex justify-center items-center gap-2"
                    onClick={handleGoogleLogin}
                  >
                    <FaGoogle />
                    Google Login
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart2;
