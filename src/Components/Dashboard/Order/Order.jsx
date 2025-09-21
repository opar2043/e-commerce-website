import React, { useState, useMemo } from 'react';
import { Search, Filter, Eye, CheckCircle, Clock, XCircle } from 'lucide-react';
import useOrder from '../../Hooks/useOrder';
import useAxios from '../../Hooks/useAxios';
import Swal from 'sweetalert2';
import Loading from '../../Shared/Loading';



const Order = () => {
  const [order, isLoading, refetch] = useOrder();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const axiosSecure = useAxios();

  // Function to toggle order status
  const handleStatusToggle = (id, currentStatus) => {
    const newStatus = currentStatus === "pending" ? "confirmed" : "pending";
    
    Swal.fire({
      title: "Are you sure?",
      text: `Change status to ${newStatus}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/order/${id}`, { status: newStatus })
          .then(() => {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `Order status updated to ${newStatus}`,
              showConfirmButton: false,
              timer: 1500,
            });
            
            // Refetch data to update the UI
            refetch();
          })
          .catch((error) => {
            console.error("Error updating order status:", error);
            Swal.fire({
              title: "Something went wrong",
              text: "Failed to update order status",
              icon: "error",
            });
          });
      }
    });
  };

  // Filter and search orders
  const filteredOrders = useMemo(() => {
    if (!order || order.length === 0) return [];
    
    return order.filter(orderItem => {
      const matchesSearch = 
        orderItem.userEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (orderItem.userName && orderItem.userName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        orderItem.items.some(item => 
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
      
      const matchesStatus = statusFilter === 'all' || orderItem.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [order, searchTerm, statusFilter]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium cursor-pointer";
    switch (status) {
      case 'confirmed':
        return `${baseClasses} bg-green-100 text-green-800 hover:bg-green-200`;
      case 'pending':
        return `${baseClasses} bg-yellow-100 text-yellow-800 hover:bg-yellow-200`;
      case 'cancelled':
        return `${baseClasses} bg-red-100 text-red-800 hover:bg-red-200`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800 hover:bg-gray-200`;
    }
  };

  if (isLoading) {
    return <Loading></Loading>
  }

  return (
    <div className="text-black p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl   mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Management</h1>
          <p className="text-gray-600">Manage and track all customer orders</p>
        </div>

        {/* Summary Stats */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-yellow-500" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Pending Orders</p>
                <p className="text-2xl font-bold text-gray-900">
                  {order ? order.filter(o => o.status === 'pending').length : 0}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Confirmed Orders</p>
                <p className="text-2xl font-bold text-gray-900">
                  {order ? order.filter(o => o.status === 'confirmed').length : 0}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">$</span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${order ? order.reduce((sum, o) => sum + o.price, 0).toLocaleString('en-US', { minimumFractionDigits: 2 }) : '0.00'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Controls */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search by email, name, product, or category..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Status Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <select
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Categories
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {!order || filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                      <div className="flex flex-col items-center">
                        <Search className="h-12 w-12 text-gray-300 mb-4" />
                        <p className="text-lg font-medium">No orders found</p>
                        <p className="text-sm">Try adjusting your search or filter criteria</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((orderItem, idx) => (
                    <tr key={orderItem._id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-3 whitespace-nowrap text-sm font-mono text-gray-900">
                        {idx + 1}
                      </td>
                      <td className="py-3 px-5 whitespace-nowrap">
                        <div>

                          <div className="text-sm text-gray-500">{orderItem.userEmail}</div>
                        </div>
                      </td>
                      <td className="px-3 py-4">
                        <div className="max-w-xs">
                          {orderItem.items.slice(0, 2).map((item, index) => (
                            <div key={item._id} className="text-sm text-gray-900 truncate">
                              • {item.name} (Qty: {item.quantity})
                            </div>
                          ))}
                          {orderItem.items.length > 2 && (
                            <div className="text-sm text-gray-500">
                              +{orderItem.items.length - 2} more items
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-wrap gap-1">
                          {[...new Set(orderItem.items.map(item => item.category))].map((category) => (
                            <span 
                              key={category}
                              className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                            >
                              {category}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="p-3 whitespace-nowrap text-sm font-medium text-gray-900">
                        ${orderItem.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span
                            onClick={() => handleStatusToggle(orderItem._id, orderItem.status)}
                            className={getStatusBadge(orderItem.status)}
                          >
                            {orderItem.status.charAt(0).toUpperCase() + orderItem.status.slice(1)}
                          </span>
                        </div>
                      </td>
                      <td className="p-3 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => setSelectedOrder(orderItem)}
                          className="text-blue-600 hover:text-blue-900 flex items-center gap-1"
                        >
                          <Eye className="h-4 w-4" />
                          Details
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Details Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Order Details</h2>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Order ID</p>
                      <p className="font-mono">#{selectedOrder._id.slice(-8).toUpperCase()}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Status</p>
                      <span className={getStatusBadge(selectedOrder.status)}>
                        {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Customer</p>
                      <p>{selectedOrder?.name || selectedOrder.userEmail.split("@")[0] }</p>

                      <p className="text-sm text-gray-500">{selectedOrder.userEmail}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Total Price</p>
                      <p className="text-lg font-bold">${selectedOrder.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-2">Items Ordered</p>
                    <div className="space-y-2">
                      {selectedOrder.items.map((item) => (
                        <div key={item._id} className="border rounded-lg p-3">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h4 className="font-medium">{item.name}</h4>
                              <p className="text-sm text-gray-500">Category: {item.category}</p>
                              {item.weight && <p className="text-sm text-gray-500">Weight: {item.weight}g</p>}
                              <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">${item.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;