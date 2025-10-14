import React from 'react'
import Swal from 'sweetalert2';
import useAxios from '../Hooks/useAxios';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import gold from "../../assets/gold3.jpg"    // this will bgimg
const Register = () => {
   const { handleRegister } = useAuth();
  const axiosSecure = useAxios();
  const navigate = useNavigate();

  function handleSignUp(e) {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const pass = e.target.pass.value;

    const userObj = {
      name,
      email,
      pass,
      role: "customer",
    };

    handleRegister(email, pass)
      .then((userCredential) => {
        axiosSecure.post("/users", userObj).then(() => {
          Swal.fire({ 
            title: "Registered Successfully!", 
            icon: "success",
            background: "#1a1a1a",
            color: "#fff",
            confirmButtonColor: "#d4af37"
          });
          navigate("/");
        });
      })
      .catch(() => {
        Swal.fire({ 
          title: "Something went wrong", 
          icon: "error",
          background: "#1a1a1a",
          color: "#fff",
          confirmButtonColor: "#d4af37"
        });
      });
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 py-10">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-0 bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">

        {/* use background Image Section */}
        <div className="hidden md:flex bg-gradient-to-br from-[#f8f4ed] to-[#f1e6d3] items-center justify-center p-8">
          <div className="text-center">
            <div className="w-full max-w-xs mx-auto mb-8">
              <img src={gold} alt="Gold" className="rounded-lg shadow-lg" /> 
            </div>
            <h3 className="text-2xl font-semibold text-slate-800 mb-2">Join Tannous Jewelry</h3>
            <p className="text-slate-600">Be a Happy Customer!</p>
          </div>
        </div>

        {/* Form Section */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-8 text-center md:text-left">
            <h2 className="text-3xl font-bold text-slate-800 mb-2">
              Create an Account
            </h2>
            <p className="text-slate-600">
              Join us and start your journey today!
            </p>
          </div>

          <form onSubmit={handleSignUp} className="space-y-5">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#d99b55] focus:border-transparent outline-none transition text-slate-800"
              />
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#d99b55] focus:border-transparent outline-none transition text-slate-800"
              />
            </div>

            <div>
              <input
                type="password"
                name="pass"
                placeholder="Password"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#d99b55] focus:border-transparent outline-none transition text-slate-800"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#d99b55] hover:bg-[#c68a46] text-white font-semibold py-3 rounded-lg transition shadow-md hover:shadow-lg"
            >
              Sign Up
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-center text-sm text-slate-600">
              Already have an account?
              <Link
                to="/login"
                className="ml-1 text-[#d99b55] hover:underline font-medium"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register