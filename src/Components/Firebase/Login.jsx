import { Link, useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { useRef } from "react";
import Swal from "sweetalert2";

const Login = () => {
  const { handleLogin, handleGoogle, resetPass } = useAuth();
  const navigate = useNavigate();
  const emailRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const pass = e.target.pass.value;

    handleLogin(email, pass)
      .then(() => {
        Swal.fire({ 
          title: "Logged In!", 
          icon: "success",
          background: "#1a1a1a",
          color: "#fff",
          confirmButtonColor: "#d4af37"
        });
        navigate("/");
        return;
      })
      .catch(() => {
        Swal.fire({ 
          title: "Something went wrong", 
          icon: "error",
          background: "#1a1a1a",
          color: "#fff",
          confirmButtonColor: "#d4af37"
        });
        return ;
      });
  }

  function handleForget() {
    const email = emailRef.current.value;
    if (!email) {
      Swal.fire({ 
        title: "Please enter your email address", 
        icon: "warning",
        background: "#1a1a1a",
        color: "#fff",
        confirmButtonColor: "#d4af37"
      });
      return;
    }
    resetPass(email)
      .then(() => {
        Swal.fire({ 
          title: "Please check your email", 
          icon: "success",
          background: "#1a1a1a",
          color: "#fff",
          confirmButtonColor: "#d4af37"
        });
      })
      .catch((error) => {
        Swal.fire({ 
          title: error.message, 
          icon: "error",
          background: "#1a1a1a",
          color: "#fff",
          confirmButtonColor: "#d4af37"
        });
      });
  }

  function handleGoogleLogin() {
    handleGoogle()
      .then(() => {
        Swal.fire({ 
          title: "Logged In!", 
          icon: "success",
          background: "#1a1a1a",
          color: "#fff",
          confirmButtonColor: "#d4af37"
        });
        navigate("/");
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
    <div className="min-h-screen flex items-center justify-center bg-black px-4 py-10">
      <div className="max-w-6xl w-full bg-gray-900 rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-0">
        
        {/* Left side - Form Section */}
        <div className="flex flex-col justify-center p-10 md:p-14">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">LUXE STAY</h1>
            <p className="text-gray-400">Premium hotel experiences worldwide</p>
          </div>
          
          <h2 className="text-2xl font-semibold text-white mb-6">Welcome Back</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-400 text-sm mb-2">Email</label>
              <input
                type="email"
                name="email"
                ref={emailRef}
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">Password</label>
              <input
                type="password"
                name="pass"
                placeholder="Enter your password"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={handleForget}
                className="text-sm text-yellow-600 hover:text-gold-400 transition-colors"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-gold-600 hover:bg-yellow-500 text-white font-semibold py-3 rounded-md transition-colors shadow-lg border border-white/20"
            >
              Sign In
            </button>
          </form>



          <p className="text-center text-gray-400 mt-6">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-gold-500 hover:text-yellow-400 font-semibold hover:text-gold-400 transition-colors"
            >
              Sign Up
            </Link>
          </p>
        </div>

        {/* Right side - Visual Section */}
        <div className="hidden md:block relative bg-gradient-to-br from-gray-900 to-black">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')"
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent"></div>
          <div className="relative z-10 flex flex-col justify-center h-full p-14">
            <div className="max-w-md">
              <h3 className="text-3xl font-bold text-white mb-4">Experience Luxury Stays</h3>
              <p className="text-gray-300 text-lg">
                Sign in to access exclusive deals and manage your bookings with our premium hotel collection worldwide.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;