import Swal from "sweetalert2";
import useAxios from "../../Hooks/useAxios";
import { useEffect, useState } from "react";

const User = () => {
  const axiosSecure = useAxios();
  const [userData, setUserData] = useState([]);
  
  useEffect(() => {
    fetch('/user.json')
      .then(res => res.json())
      .then(data => setUserData(data))
  }, [])

  function handleRoleUpdate(id, currentRole) {
    const newRole = currentRole === "customer" ? "admin" : "customer";

    Swal.fire({
      title: "Are you sure?",
      text: `Change role to ${newRole}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/users/${id}`, { role: newRole })
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: `User role updated to ${newRole}`,
                showConfirmButton: false,
                timer: 1500,
              });
              // refetch();
              return;
            } 
          });
      }
    });
  }

  return (
    <div className="p-6 bg-white min-h-screen text-slate-800">
      <h2 className="text-2xl font-bold mb-6 text-slate-800">User Management</h2>

      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="w-full border-collapse">
          <thead className="bg-[#D99B55] text-white">
            <tr>
              <th className="p-4 text-left font-semibold">Name</th>
              <th className="p-4 text-left font-semibold">Email</th>
              <th className="p-4 text-left font-semibold">Role</th>
              <th className="p-4 text-left font-semibold">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {userData.map((user) => (
              <tr
                key={user._id}
                className={`border-b border-slate-200 hover:bg-slate-50 ${
                  user.role === "admin" ? "bg-blue-50" : ""
                }`}
              >
                <td className="p-4 text-slate-700">{user.name}</td>
                <td className="p-4 text-slate-700">{user.email}</td>
                <td
                  className={`p-4 font-semibold ${
                    user.role === "admin" ? "text-blue-600" : "text-green-600"
                  }`}
                >
                  {user.role}
                </td>
                <td className="p-4">
                  <button
                    onClick={() => handleRoleUpdate(user._id, user.role)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      user.role === "customer"
                        ? "bg-[#D99B55] hover:bg-[#c58a4a] text-white"
                        : "bg-slate-200 hover:bg-slate-300 text-slate-700"
                    }`}
                  >
                    {user.role === "customer" ? "Make Admin" : "Make Customer"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default User;