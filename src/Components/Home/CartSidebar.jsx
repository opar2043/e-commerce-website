



import { useContext, useEffect, useState } from "react";
import { AuthContex } from "../Firebase/AuthProvider";
const CartSidebar = () => {
  const { cart } = useContext(AuthContex);
  const [isOpen, setIsOpen] = useState(false);

  // open sidebar whenever cart changes
  useEffect(() => {
    if (cart.length > 0) {
      setIsOpen(true);
    }
  }, [cart]);

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-black shadow-lg transform transition-transform duration-300 z-50 
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold">Shopping Cart</h2>
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-500 hover:text-black"
        >
          fix
        </button>
      </div>

      {/* Cart Items */}
      <div className="p-4 space-y-3 overflow-y-auto h-[calc(100%-120px)]">
        {cart.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty</p>
        ) : (
          cart.map((item, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center border p-2 rounded-lg"
            >
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">${item.price}</p>
              </div>
              <span className="text-sm font-semibold">x{item.qty || 1}</span>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t">
        <button className="btn btn-primary w-full">Checkout</button>
      </div>
    </div>
  );
};

export default CartSidebar;













// import { useEffect, useState } from "react";
// import useAxios from "../Hooks/useAxios";
// import useCart from "../Hooks/useCart";
// import Swal from "sweetalert2";
// import { FiTrash2 } from "react-icons/fi";
// import { Link } from "react-router-dom";

// const CartSidebar = () => {
//   const [cart,  refetch] = useCart([]);
//   const axiosSecure = useAxios();
//   const [isOpen, setIsOpen] = useState(false);

//   // open sidebar whenever cart changes
//   useEffect(() => {
//     if (cart.length > 0) {
//       setIsOpen(true);
//     }
//   }, [cart]);

//   // ✅ Subtotal = sum of (price × quantity)
//   const subtotal = cart
//     .reduce((total, item) => total + item.price * item.quantity, 0)
//     .toFixed(2);

//   // ✅ Remove item
//   const handleRemove = async (id) => {
//     try {
//       const result = await Swal.fire({
//         title: "Are you sure?",
//         text: "This item will be removed from your cart.",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonColor: "#3085d6",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Yes, remove it!",
//       });

//       if (result.isConfirmed) {
//         const response = await axiosSecure.delete(`/cart/${id}`);
//         if (response.data.deletedCount > 0) {
//           Swal.fire("Removed!", "Item has been removed.", "success");
//           refetch();
//         }
//       }
//     } catch (err) {
//       console.error("Remove error:", err);
//       Swal.fire("Error", "Could not remove item", "error");
//     }
//   };

//   return (
//     <div
//       className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 z-50 
//         ${isOpen ? "translate-x-0" : "translate-x-full"}`}
//     >
//       {/* Header */}
//       <div className="flex justify-between items-center p-4 border-b">
//         <h2 className="text-lg font-semibold">Shopping Cart</h2>
//         <button
//           onClick={() => setIsOpen(false)}
//           className="text-gray-500 hover:text-black"
//         >
//           ✕
//         </button>
//       </div>

//       {/* Cart Items */}
//       <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-160px)]">
//         {cart.length === 0 ? (
//           <p className="text-center text-gray-500">Your cart is empty</p>
//         ) : (
//           cart.map((item) => (
//             <div
//               key={item._id}
//               className="flex items-center justify-between bg-slate-100 p-3 rounded-lg"
//             >
//               <div className="flex items-center gap-3">
//                 <img
//                   src={item.image}
//                   alt={item.name}
//                   className="w-12 h-12 object-cover rounded"
//                 />
//                 <div>
//                   <p className="font-medium">{item.name}</p>
//                   <p className="text-sm text-gray-500">
//                     ${item.price.toFixed(2)}
//                   </p>
//                   <p className="text-sm text-gray-600">
//                     Qty: {item.quantity}
//                   </p>
//                 </div>
//               </div>
//               <button
//                 onClick={() => handleRemove(item._id)}
//                 className="text-red-500 hover:text-red-600"
//               >
//                 <FiTrash2 size={18} />
//               </button>
//             </div>
//           ))
//         )}
//       </div>

//       {/* Footer */}
//       <div className="p-4 border-t space-y-3">
//         <div className="flex justify-between text-lg font-semibold">
//           <span>Total</span>
//           <span className="text-[#f8992d]">${subtotal}</span>
//         </div>

//         {cart.length > 0 && (
//           <Link to="/cart">
//             <button className="w-full bg-[#f8992d] text-white py-2 rounded-lg hover:bg-amber-500 transition">
//               View Cart
//             </button>
//           </Link>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CartSidebar;
