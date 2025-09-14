import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import useProducts from "../Hooks/useProducts";
import Swal from "sweetalert2";
import useAxios from "../Hooks/useAxios";
import { Link } from "react-router-dom";
import Loading from "../Shared/Loading";

const AllProductAdmin = () => {
  const [products,isLoading , refetch] = useProducts([]);
  console.log(products);
  const axiosSecure = useAxios();

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to Deelte this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/products/${id}`)
          .then((res) => {
            Swal.fire({
              title: "Deleted!",
              text: `This Product Has been deleted`,
              icon: "success",
            });

            refetch();
            return
          })
          .catch((err) => {
            Swal.fire({
              title: "Error!",
              text: "Something went wrong.",
              icon: "error",
            });
            // console.error(err);
          });
      }
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-slate-950">All Products</h2>


      {
        isLoading ? <Loading></Loading>
        :
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Weight
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products &&
              products.map((product, idx) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {idx + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product?.weight}g
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        product.isAvailable
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {product.isAvailable ? "Available" : "Out of Stock"}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex gap-2 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-500 hover:text-blue-900">
                      <Link to={`/dashboard/editproducts/${product._id}`}>
                       <FaEdit></FaEdit>
                      </Link>
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="text-red-500 hover:text-blue-900"
                    >
                      <FaTrash></FaTrash>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      }


    </div>
  );
};

export default AllProductAdmin;
