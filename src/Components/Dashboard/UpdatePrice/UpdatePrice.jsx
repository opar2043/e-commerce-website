import React, { useEffect, useState } from "react";
import {
  FiRefreshCw,
  FiTrendingUp,
  FiTrendingDown,
  FiDollarSign,
  FiSave,
} from "react-icons/fi";
import Loading from "../../Shared/Loading";

const UpdatePrice = () => {
  const [metal, setMetal] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    // Simulate API loading
    setIsLoading(true);
    setTimeout(() => {
      fetch("/metal.json")
        .then((response) => response.json())
        .then((data) => {
          setMetal(data);
          setLastUpdated(new Date().toLocaleTimeString());
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching metal data:", error);
          setIsLoading(false);
        });
    }, 1000);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    alert("Prices updated successfully!");
  };

  // Function to determine if price increased or decreased (for demo purposes)
  const getTrend = () => {
    return Math.random() > 0.5 ? "up" : "down";
  };

  // Function to generate random change percentage (for demo purposes)
  const getChangePercent = () => {
    return (Math.random() * 3).toFixed(2);
  };

  // 🔹 Show full-page loader until data is fetched
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-4xl font-bold text-slate-800">
              Precious Metal Tracker
            </h2>
            <p className="text-slate-600 mt-2">
              Monitor and update metal prices in real-time
            </p>
          </div>
          <div className="flex items-center mt-4 md:mt-0">
            {lastUpdated && (
              <p className="text-sm text-slate-500 mr-3">
                Last updated: {lastUpdated}
              </p>
            )}
            <button
              onClick={() => window.location.reload()}
              className="flex items-center text-sm bg-slate-800 text-white py-2 px-4 rounded-lg hover:bg-slate-700 transition"
            >
              <FiRefreshCw className="mr-1" /> Refresh
            </button>
          </div>
        </div>

        {/* Current Metal Prices Section */}
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <FiDollarSign className="text-2xl text-[#FEB564] mr-2" />
            <h3 className="text-2xl font-bold text-slate-700">
              Current Metal Prices
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {metal.map((m) => {
              const trend = getTrend();
              const changePercent = getChangePercent();

              return (
                <div
                  key={m.metal}
                  className="bg-white p-6 rounded-xl shadow-md border border-slate-200 hover:shadow-lg transition"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-slate-800">
                      {m.metal}
                    </h3>
                    <span
                      className={`flex items-center text-sm font-medium ${
                        trend === "up" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {trend === "up" ? (
                        <FiTrendingUp className="mr-1" />
                      ) : (
                        <FiTrendingDown className="mr-1" />
                      )}
                      {changePercent}%
                    </span>
                  </div>
                  <p className="text-3xl font-bold text-[#FEB564]">
                    ${m.price.toFixed(2)}
                  </p>
                  <p className="text-slate-600 mt-2">per gram</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="border-t border-slate-200 my-8"></div>

        {/* Update Metal Prices Section */}
        <div>
          <div className="flex items-center mb-6">
            <FiSave className="text-2xl text-[#FEB564] mr-2" />
            <h3 className="text-2xl font-bold text-slate-700">
              Update Metal Prices
            </h3>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-xl shadow-md border border-slate-200"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {metal.map((m) => (
                <div key={m.metal} className="flex flex-col">
                  <label className="text-lg font-medium text-slate-700 mb-2">
                    {m.metal}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-500">$</span>
                    <input
                      type="number"
                      step="0.01"
                      defaultValue={m.price}
                      className="w-full border border-slate-300 rounded-lg p-2 pl-7 focus:ring-2 focus:ring-[#FEB564] focus:border-transparent"
                    />
                  </div>
                </div>
              ))}
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
    </div>
  );
};

export default UpdatePrice;
