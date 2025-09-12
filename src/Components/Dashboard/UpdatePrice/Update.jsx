import React, { useState } from 'react'
import useMetal from '../../Hooks/useMetal'
import { useParams } from 'react-router-dom';
import { FiSave, FiRefreshCw } from 'react-icons/fi';
import useAxios from '../../Hooks/useAxios';
import Swal from 'sweetalert2';

const Update = () => {
  const [metal, isLoading , refetch] = useMetal([]);
  const [price , setPrice] = useState(1);
  const axiosSecure = useAxios();
  const {id} = useParams();
  const single = metal.find( m => m._id == id);

  function handleUpdate(e){
    e.preventDefault()
    axiosSecure.patch(`/metal/${id}`, { price })
      .then(() => {
        Swal.fire({
          title: "Product Updated",
          icon: "success",
        });
        refetch();
      })
      .catch(() => {
        Swal.fire({
          title: "Something went wrong",
          icon: "error",
        });
      });
  }

  const handleRefresh = () => {
    window.location.reload();
  }

  return (
    <div>
      {/* Update Metal Prices Section */}
      <div>
        <div className="flex items-center mb-6 justify-between">
          <div className="flex items-center">
            <FiSave className="text-2xl text-[#FEB564] mr-2" />
            <h3 className="text-2xl font-bold text-slate-700">
              Update Metal Prices
            </h3>
          </div>

          {/* Refresh Button */}
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 bg-slate-200 hover:bg-slate-300 text-slate-700 px-4 py-2 rounded-lg transition"
          >
            <FiRefreshCw className="text-lg" />
            Refresh
          </button>
        </div>

        <form
          onSubmit={handleUpdate}
          className="bg-white p-6 rounded-xl shadow-md border border-slate-200"
        >
          <div className="grid grid-cols-1 gap-3">
            {single && (
              <div className="flex flex-col">
                <label className="text-lg font-medium text-slate-700 mb-2">
                  {single.metal}
                </label>
              {
                   single.price &&             <div className="relative">
                  <span className="absolute left-3 top-3 text-slate-500">$</span>
                  <input
                    type="number"
                    step="0.01"
                    onChange={e => setPrice(parseFloat(e.target.value))}
                    name={`${single.metal}`}
                    defaultValue={single.price}
                    className="w-full border border-slate-300 rounded-lg p-2 pl-7 focus:ring-2 focus:ring-[#FEB564] focus:border-transparent"
                  />
                </div>
              }
              </div>
            )}
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="bg-[#df7c0c] text-white font-semibold py-3 px-6 rounded-lg hover:bg-amber-500 transition flex items-center"
            >
              <FiSave className="mr-2" />
              Update Prices
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Update
