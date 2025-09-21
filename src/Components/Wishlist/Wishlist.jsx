import { FiShoppingCart, FiTrash2 } from "react-icons/fi";
import useAuth from "../Hooks/useAuth";
import useWish from "../Hooks/useWish";
import Loading from "../Shared/Loading";
import useAxios from "../Hooks/useAxios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Wishlist = () => {
  const [wish, isLoading, refetch] = useWish([]);
  const axiosSecure = useAxios();
  
  const handleRemove = async (id) => {
    try {
      // Show confirmation dialog
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, remove it!'
      });

      if (result.isConfirmed) {
        // Make DELETE request to remove item from wishlist
        const response = await axiosSecure.delete(`/wish/${id}`);
        
        if (response.data.deletedCount > 0) {
          // Show success message
          Swal.fire(
            'Removed!',
            'Item has been removed from your wishlist.',
            'success'
          );
          
          // Refresh the wishlist data
          refetch();
        } else {
          Swal.fire(
            'Error!',
            'Failed to remove item from wishlist.',
            'error'
          );
        }
      }
    } catch (error) {
      console.error('Error removing item from wishlist:', error);
      Swal.fire(
        'Error!',
        'An error occurred while removing the item.',
        'error'
      );
    }
  };

  return (
    <div className="">
      <div className="w-full md:w-2/3 mx-auto px-3 py-6">
        <h2 className="text-2xl font-semibold text-black mb-7">My Wish List</h2>

        {isLoading ? (
          <Loading></Loading>
        ) : (
          <div className="lg:col-span-2 space-y-6">
            {wish.length === 0 ? (
              <div className="bg-slate-100 rounded-xl p-8 text-center">
                <FiShoppingCart className="text-5xl mx-auto text-slate-400 mb-4" />
                <p className="text-slate-600 text-lg">Your wishlist is empty.</p>
                <Link to={'/collection'}>
                  <button className="mt-4 bg-[#f8992d] text-white font-semibold py-2 px-6 rounded-lg hover:bg-amber-500 transition">
                    Continue Shopping
                  </button>
                </Link>
              </div>
            ) : (
              wish.map((item) => (
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
                      <h3 className="font-semibold text-lg text-slate-800">{item.name}</h3>
                      <p className="text-[#f8992d] font-medium">${parseFloat(item.price || 0).toFixed(2)}</p>
                      <p className="text-slate-600 mt-1">Quantity: {item.quantity || 1}</p>
                      <p className="text-slate-800 font-medium mt-1">
                        Subtotal: ${((parseFloat(item.price || 0)) * (parseInt(item.quantity || 1))).toFixed(2)}
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
        )}
      </div>
    </div>
  );
};

export default Wishlist;