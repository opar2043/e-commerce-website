import { FcGoogle } from "react-icons/fc";
import { RiVipCrownLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import img from "../../assets/footer.webp"
import Swal from "sweetalert2";
import { useRef } from "react";
import useAuth from "../Hooks/useAuth";

const Login = () => {

   const { resetPass, handleLogin , handleGoogle } = useAuth();
  const navigate = useNavigate();
  const emailRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const pass = e.target.pass.value;

    handleLogin(email, pass)
      .then(() => {
        Swal.fire({ 
          title: "Logged In Successfully!", 
          text: "Welcome back to Tannous Jewelry",
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
          title: "Authentication Failed", 
          text: "Please check your credentials",
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
          title: "Password Reset Sent", 
          text: "Please check your email for reset instructions",
          icon: "success",
          background: "#1a1a1a",
          color: "#fff",
          confirmButtonColor: "#d4af37"
        });
      })
      .catch((error) => {
        Swal.fire({ 
          title: "Error Sending Reset", 
          text: error.message,
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
          title: "Logged In Successfully!", 
          text: "Welcome to Tannous Jewelry",
          icon: "success",
          background: "#1a1a1a",
          color: "#fff",
          confirmButtonColor: "#d4af37"
        });
        navigate("/");
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


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-white px-4 py-10">
      <div className="max-w-6xl w-full bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-0 border border-gray-200">
        
        {/* Left side - Form Section */}
        <div className="flex flex-col justify-center p-10 md:p-14 bg-white">
          <div className="flex items-center mb-8">
            <RiVipCrownLine className="text-4xl text-gray-900 mr-2" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1 tracking-wide">TANNOUS JEWELRY</h1>
              <p className="text-gray-600 text-sm">Exquisite craftsmanship since 1975</p>
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 tracking-tight">Welcome Back</h2>

          <form
          onSubmit={handleSubmit}
          className="space-y-5">
            <div>
              <label className="block text-gray-700 text-sm mb-2 font-medium">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm mb-2 font-medium">Password</label>
              <input
                type="password"
                name="pass"
                placeholder="Enter your password"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent transition-all"
                required
              />
            </div>

            <div className="flex justify-between items-center">
              <button
              onClick={handleForget}
                type="button"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors font-medium"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-gray-900 hover:bg-black text-white font-semibold py-3 rounded-md transition-all shadow-lg hover:shadow-gray-900/20 border border-gray-800"
            >
              Sign In
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* <button
            className="w-full bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 rounded-md transition-all flex items-center justify-center gap-2 border border-gray-300 shadow-sm"
          >
            <FcGoogle className="text-lg" />
            Sign in with Google
          </button> */}

          <p className="text-center text-gray-600 mt-6 font-medium">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-gray-900 hover:text-black font-semibold transition-colors underline"
            >
              Create Account
            </Link>
          </p>
        </div>

        {/* Right side - Visual Section */}
        <div className="hidden md:block relative bg-gradient-to-br from-gray-900 to-black overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-90"
            style={{
              backgroundImage: `url(${img})`
            }}
          ></div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
          
          <div className="relative z-10 flex flex-col justify-center h-full p-14">
            <div className="max-w-md">
              <h3 className="text-4xl font-bold text-white mb-4">Discover Timeless Elegance</h3>
              <p className="text-gray-200 text-lg mb-6">
                Sign in to access your exclusive collection of handcrafted jewelry and personalized recommendations.
              </p>
              
              <div className="flex items-center mt-10 text-white">
                <div className="w-12 h-px bg-white mr-3"></div>
                <span className="text-sm tracking-wider">EXQUISITE CRAFTSMANSHIP</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;