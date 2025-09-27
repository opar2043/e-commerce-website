
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import useAxios from "../Hooks/useAxios";
import useCart from "../Hooks/useCart";
import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [err, setErr] = useState("");
  const axiosSecure = useAxios();
  const [cart, isLoading, refetch] = useCart([]);
  const [clientSecret, setClientSecret] = useState("");
  const { user } = useAuth();
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  // User details
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [adress , setAdress] = useState('');
  const [zip , setZip] = useState('');
  const [city , setCity] = useState('');
  const [state , setState] = useState('');


  const shipping = 15; // fixed shipping
  const subtotal = cart.reduce((total, item) => total + item.price, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax ;
  // const total = subtotal + tax + shipping;

  useEffect(() => {
    if (total > 0) {
      axiosSecure.post("/create-payment-intent", { price: total }).then((res) => {
        setClientSecret(res.data.clientSecret);
      });
    }
  }, [axiosSecure, total]);


    const clearCart = async () => {
    try {
      const response = await axiosSecure.delete(`/cart`);

      if (response.data.deletedCount > 0) {
        refetch(); // reload cart data
      } else {
        console.log("error happend in cart");
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
      Swal.fire(
        "Error!",
        "An error occurred while clearing the cart.",
        "error"
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      setProcessing(false);
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      setProcessing(false);
      return;
    }

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setErr(error.message);
      setProcessing(false);
      return;
    } else {
      setErr("");
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "N/A",
            name: user?.displayName || "N/A",
          },
        },
      });

    if (confirmError) {
      setErr(confirmError.message);
      setProcessing(false);
      return;
    }

    if (paymentIntent && paymentIntent.status === "succeeded") {


        const orderData = {
        userEmail: user?.email,
        userName: user?.displayName,
        price : total,
        status: "pending",
        items: cart,
        transactionId: paymentIntent.id,
        date: new Date().toISOString(),
      };

      userDetail()
      clearCart()

      try {
        const res = await axiosSecure.post("/order", orderData);
        if (res.data.insertedId) {
          refetch();
          navigate("/confirm");
          Swal.fire({
            title: "✅ Payment Confirmed",
            text: "Your order has been placed!",
            icon: "success",
            confirmButtonColor: "#4F46E5",
          });
        }
      } catch (err) {
        Swal.fire("Error", "Payment succeeded but order save failed!", "error");
      }
    }

    setProcessing(false);
  };



async function userDetail() {
  const userObj = {
    name,
    email: user?.email,
    phone, 
    zip, 
    adress, 
    city, 
    state, 
    total ,
    quantity: cart?.length || 1,
    item : cart?.map(car => car.name),
    date: new Date().toISOString(),
  };
  try {
    const res = await axiosSecure.post("/user-data", userObj);
    console.log("User details posted", res.data);
    return res.data;
  } catch (err) {
    console.error("Error posting user details", err);
  }
}

  return (
    <div className="min-h-screen bg-yellow-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Customer + Shipping + Payment */}
        <div className="lg:col-span-2 bg-white p-8 rounded-xl shadow-md">
          {/* Customer Info */}
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
             Step 1 : Customer Information 
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              name="name"
              onChange={e=>setName(e.target.value)}
              placeholder="Name."
              className="border rounded-lg px-4 bg-white text-slate-950/90 w-full focus:ring focus:ring-indigo-200"
            />
          <input
            type="email"
            name="email"
            placeholder="Email"
            defaultValue={user?.email}
            className="border rounded-lg px-4 py-3 bg-white text-slate-950/90 w-full mb-4 focus:ring focus:ring-indigo-200"
          />
          </div>

          <input
            type="text"
            name="phone"
            onChange={e=>setPhone(e.target.value)}
            placeholder="Phone"
            className="border rounded-lg px-4 py-3 bg-white text-slate-950/90 w-full mb-6 focus:ring focus:ring-indigo-200"
          />

          {/* Shipping Address */}
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Shipping Address
          </h2>
          <input
            type="text"
            name="adress"
            onChange={e=>setAdress(e.target.value)}
            placeholder="Street Address"
            className="border rounded-lg px-4 py-3 bg-white text-slate-950/90 w-full mb-4 focus:ring focus:ring-indigo-200"
          />
          <div className="grid grid-cols-3 gap-4 mb-6">
            <input
              type="text"
              name="city"
              onChange={e=>setCity(e.target.value)}
              placeholder="City"
              className="border rounded-lg px-4 bg-white text-slate-950/90 py-3 focus:ring focus:ring-indigo-200"
            />
<select
  onChange={(e) => setState(e.target.value)}
  className="border rounded-lg bg-white text-slate-950/90 px-4 py-3 focus:ring focus:ring-indigo-200"
>
  <option value="">Select State</option>
  <option value="AL">Alabama</option>
  <option value="AK">Alaska</option>
  <option value="AZ">Arizona</option>
  <option value="AR">Arkansas</option>
  <option value="CA">California</option>
  <option value="CO">Colorado</option>
  <option value="CT">Connecticut</option>
  <option value="DE">Delaware</option>
  <option value="FL">Florida</option>
  <option value="GA">Georgia</option>
  <option value="HI">Hawaii</option>
  <option value="ID">Idaho</option>
  <option value="IL">Illinois</option>
  <option value="IN">Indiana</option>
  <option value="IA">Iowa</option>
  <option value="KS">Kansas</option>
  <option value="KY">Kentucky</option>
  <option value="LA">Louisiana</option>
  <option value="ME">Maine</option>
  <option value="MD">Maryland</option>
  <option value="MA">Massachusetts</option>
  <option value="MI">Michigan</option>
  <option value="MN">Minnesota</option>
  <option value="MS">Mississippi</option>
  <option value="MO">Missouri</option>
  <option value="MT">Montana</option>
  <option value="NE">Nebraska</option>
  <option value="NV">Nevada</option>
  <option value="NH">New Hampshire</option>
  <option value="NJ">New Jersey</option>
  <option value="NM">New Mexico</option>
  <option value="NY">New York</option>
  <option value="NC">North Carolina</option>
  <option value="ND">North Dakota</option>
  <option value="OH">Ohio</option>
  <option value="OK">Oklahoma</option>
  <option value="OR">Oregon</option>
  <option value="PA">Pennsylvania</option>
  <option value="RI">Rhode Island</option>
  <option value="SC">South Carolina</option>
  <option value="SD">South Dakota</option>
  <option value="TN">Tennessee</option>
  <option value="TX">Texas</option>
  <option value="UT">Utah</option>
  <option value="VT">Vermont</option>
  <option value="VA">Virginia</option>
  <option value="WA">Washington</option>
  <option value="WV">West Virginia</option>
  <option value="WI">Wisconsin</option>
  <option value="WY">Wyoming</option>
</select>

            <input
              type="text"
              name="zip"
              onChange={e=>setZip(e.target.value)}
              placeholder="ZIP Code"
              className="border rounded-lg bg-white text-slate-950/90 px-4 py-3 focus:ring focus:ring-indigo-200"
            />
          </div>

          {/* Payment Info */}
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
           Step 2 : Payment Information
          </h2>
          <div className="border rounded-lg p-4 mb-6 bg-gray-50">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#374151",
                    "::placeholder": { color: "#9CA3AF" },
                  },
                  invalid: { color: "#EF4444" },
                },
              }}
            />
          </div>
          {err && (
            <div className="bg-red-100 border border-red-300 text-red-700 p-3 rounded-lg text-sm mb-4">
              {err}
            </div>
          )}

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={!stripe || !clientSecret || processing}
            className={`w-full py-3 px-4 rounded-lg font-medium transition ${
              !stripe || !clientSecret || processing
                ? "bg-indigo-300 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 text-white shadow"
            }`}
          >
            {processing ? "Processing..." : `Pay $${total.toFixed(2)}`}
          </button>
        </div>

        {/* Right Column - Order Summary */}
        <div className="bg-white p-8 rounded-xl shadow-md h-fit">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Order Summary
          </h2>
          <div className="space-y-3 text-sm text-gray-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            {/* <div className="flex justify-between">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div> */}
            <div className="flex justify-between">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold border-t pt-3 text-lg">
              <span>Total</span>
              <span className="text-orange-500">${total.toFixed(2)}</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            SSL Encrypted | Stripe Secure Payment
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;








