import { Link, useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useAxios from "../Hooks/useAxios";
import Swal from "sweetalert2";


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
    <div className="min-h-screen flex items-center justify-center bg-black px-4 py-10">
      <div className="max-w-6xl w-full bg-gray-900 rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-0">
        
        {/* Left side - Visual Section */}
        <div className="hidden md:block relative bg-gradient-to-br from-gray-900 to-black">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')"
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-l from-black via-transparent to-transparent"></div>
          <div className="relative z-10 flex flex-col justify-center h-full p-14">
            <div className="max-w-md">
              <h1 className="text-3xl font-bold text-gold-500 mb-2">LUXE STAY</h1>
              <h3 className="text-3xl font-bold text-white mb-4">Create Your Account</h3>
              <p className="text-gray-300 text-lg">
                Join our exclusive community and unlock premium benefits for your hotel stays around the world.
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gold-600 flex items-center justify-center mr-3">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <p className="text-gray-300">Exclusive member rates</p>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gold-600 flex items-center justify-center mr-3">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <p className="text-gray-300">Free room upgrades</p>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gold-600 flex items-center justify-center mr-3">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <p className="text-gray-300">Priority booking</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Form Section */}
        <div className="flex flex-col justify-center p-10 md:p-14">
          <div className="md:hidden mb-8 text-center">
            <h1 className="text-3xl font-bold text-gold-500 mb-2">LUXE STAY</h1>
            <p className="text-gray-400">Premium hotel experiences worldwide</p>
          </div>
          
          <h2 className="text-2xl font-semibold text-white mb-2">Create an Account</h2>
          <p className="text-gray-400 mb-6">Join us and start your journey!</p>

          <form onSubmit={handleSignUp} className="space-y-5">
            <div>
              <label className="block text-gray-400 text-sm mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">Password</label>
              <input
                type="password"
                name="pass"
                placeholder="Create a password"
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="terms"
                required
                className="w-4 h-4 text-gold-600 bg-gray-700 border-gray-600 rounded focus:ring-gold-500"
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-300">
                I agree to the <span className="text-gold-500 hover:underline cursor-pointer">Terms and Conditions</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-gold-600 hover:bg-gold-700 text-white font-semibold py-3 rounded-md transition-colors shadow-lg hover:bg-yellow-500 border border-white/20"
            >
              Sign Up
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-700"></div>
            <span className="mx-4 text-gray-500">or</span>
            <div className="flex-grow border-t border-gray-700"></div>
          </div>

          <p className="text-center text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-gold-500 font-semibold hover:text-yellow-400 transition-colors"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;