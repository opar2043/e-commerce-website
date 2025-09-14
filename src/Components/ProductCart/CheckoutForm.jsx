import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import useAxios from "../Hooks/useAxios";
import useCart from "../Hooks/useCart";
import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [err , setErr] = useState('')
  const [msg , setMsg] = useState('');
  const axiosSecure = useAxios();
  const [cart] = useCart([]);  //here is the cart item array 
  const [clientSecrate , setClientSecrate] = useState('')
  const {user} = useAuth()
  const price  = cart.reduce((total , item) => total + item.price , 0);
  console.log(price);
  const [order , setOrder] = useState([])



  useEffect(() => {
  if (price > 0) {
    axiosSecure.post("/create-payment-intent", { price }).then((res) => {
      console.log(res.data.clientSecret); // ✅ should log something like: pi_3XXXX_secret_XXXX
      setClientSecrate(res.data.clientSecret); // ✅ correct property
    });
  }
}, [axiosSecure, price]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!stripe || !elements) {
//       // Stripe.js has not loaded yet. Make sure to disable
//       // form submission until Stripe.js has loaded.
//       return;
//     }
//     const card = elements.getElement(CardElement);
//     if (card == null) {
//       return;
//     }

//     // Use your card Element with other Stripe.js APIs
//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: "card",
//       card,
//     });

//     if (error) {
//       console.log("[error]", error);
//       setErr(err.message);
//     } else {
//       console.log("[PaymentMethod]", paymentMethod);
//       setErr('')
//     }

//     // Confirm Payment
// const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
//   clientSecrate,
//   {
//     payment_method: {
//       card: card,
//       billing_details: {
//         email: user?.email || "N/A",
//         name: user?.displayName || "N/A",
//       },
//     },
//   }
// );

// if (confirmError) {
//   console.log("[confirmError]", confirmError); // ✅ show the real error
//   setErr(confirmError.message);
// } else if (paymentIntent && paymentIntent.status === "succeeded") {
//   console.log("[PaymentIntent]", paymentIntent);
//   // put the cart into order and make put email , price , "status : 'pending'" 
//   axiosSecure.post('/order' , )
//   // in cart array 
//   Swal.fire("Payment Confirmed ✅");
// }

//   };







const handleSubmit = async (e) => {
  e.preventDefault();
  if (!stripe || !elements) {
    return;
  }

  const card = elements.getElement(CardElement);
  if (!card) return;

  // Step 1: Create Payment Method
  const { error, paymentMethod } = await stripe.createPaymentMethod({
    type: "card",
    card,
  });

  if (error) {
    console.log("[error]", error);
    setErr(error.message);
    return;
  } else {
    setErr("");
    console.log("[PaymentMethod]", paymentMethod);
  }

  // Step 2: Confirm Payment
  const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
    clientSecrate,
    {
      payment_method: {
        card: card,
        billing_details: {
          email: user?.email || "N/A",
          name: user?.displayName || "N/A",
        },
      },
    }
  );

  if (confirmError) {
    console.log("[confirmError]", confirmError);
    setErr(confirmError.message);
    return;
  }

  // Step 3: Payment Success → Save Order
  if (paymentIntent && paymentIntent.status === "succeeded") {
    console.log("[PaymentIntent]", paymentIntent);

    const orderData = {
      userEmail: user?.email,
      userName: user?.displayName,
      price,
      status: "pending",
      items: cart,   
    };

    try {
      const res = await axiosSecure.post("/order", orderData);
      if (res.data.insertedId) {
        // here write a code for delete all the cart item array 
          
        Swal.fire("✅ Payment Confirmed", "Your order has been placed!", "success");
      }
    } catch (err) {
      console.error("Error saving order:", err);
      Swal.fire("Error", "Payment succeeded but order save failed!", "error");
    }
  }
};


console.log(order , 'order');





  return (
    <div className="py-10 w-1/2 mx-auto">
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        <button
          className="btn btn-primary "
          type="submit"
          disabled={!stripe }
        >
          Pay
        </button>
        {
          err && <p className="text-red-500 text-center">
            {err}
          </p>
        }
      </form>
    </div>
  );
};

export default CheckoutForm;
