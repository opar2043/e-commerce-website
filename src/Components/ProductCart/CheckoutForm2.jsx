// import { useElements, useStripe } from "@stripe/react-stripe-js";
// import useAuth from "../Hooks/useAuth";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import Swal from "sweetalert2";


// const CheckoutForm = ({ submitData }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const { setCart } = useAuth();
//   const navigate = useNavigate()

//   const [message, setMessage] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   async function handleSubmit(e) {
//     e.preventDefault();
//     if (!stripe || !elements) return;

//     setIsLoading(true);

//     const { error, paymentIntent } = await stripe.confirmPayment({
//       elements,
//       redirect: "if_required", 
//     });

//     if (error) {
//       setMessage(error.message || "An unexpected error occurred.");
//       setIsLoading(false);
//       return;
//     }

//     if (paymentIntent && paymentIntent.status === "succeeded") {
//       try {
//         // ✅ Call parent submitData() instead of axios again
//         await submitData();
//         Swal.fire({
//           title: "Confirmed",
//           text: "Your Payment is successful!",
//           icon: "success",
//         });
//         setCart([]); // reset cart
//         setMessage("Payment succeeded!");
//         // navigate('/confirmed')
//       } catch (err) {
//         console.error(err);
//         Swal.fire({
//           title: "Something went wrong",
//           icon: "error",
//         });
//       }
//     }

//     setIsLoading(false);
//   }

//   return (
//     <form id="payment-form" onSubmit={handleSubmit}>
//       <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
//       <button
//         disabled={isLoading || !stripe || !elements}
//         id="submit"
//         className="bg-blue-600 w-full py-2 px-5 mt-2 text-white rounded-md"
//       >
//         {isLoading ? "Processing..." : "Pay now"}
//       </button>
//       {message && (
//         <div id="payment-message" className="mt-2 text-white">{message}</div>
//       )}
//     </form>
//   );
// };

// export default CheckoutForm;











import { useElements, useStripe, PaymentElement } from "@stripe/react-stripe-js";
import useAuth from "../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";

const CheckoutForm2 = ({ submitData, onClose, total }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { setCart } = useAuth();
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    
    if (!stripe || !elements) {
      console.log("Stripe not loaded yet");
      return;
    }

    setIsLoading(true);
    setMessage("");

    console.log("Starting payment confirmation...");

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
        confirmParams: {
          return_url: window.location.href,
        },
      });

      console.log("Payment confirmation result:", { error, paymentIntent });

      if (error) {
        console.error("Payment error:", error);
        
        // Handle specific error types
        if (error.type === 'card_error' || error.type === 'validation_error') {
          setMessage(error.message);
        } else {
          setMessage('An unexpected error occurred.');
        }
        
        Swal.fire({
          title: "Payment Failed",
          text: error.message || "An unexpected error occurred.",
          icon: "error",
        });
      } else if (paymentIntent) {
        console.log("Payment intent status:", paymentIntent.status);
        
        if (paymentIntent.status === "succeeded") {
          console.log("Payment succeeded! Submitting cart data...");
          
          try {
            await submitData();
            console.log("Cart data submitted successfully");
            
            Swal.fire({
              title: "Payment Successful!",
              text: `Your payment of $${total.toFixed(2)} has been processed successfully.`,
              icon: "success",
            });
            
            onClose();
            // Optional: Navigate to success page
            // navigate("/order-success");
            
          } catch (submitError) {
            console.error("Error submitting cart data:", submitError);
            Swal.fire({
              title: "Payment Processed",
              text: "Your payment was successful, but there was an issue saving your order. Please contact support.",
              icon: "warning",
            });
          }
        } else if (paymentIntent.status === "processing") {
          setMessage("Your payment is being processed.");
          Swal.fire({
            title: "Processing",
            text: "Your payment is being processed. You will receive a confirmation email shortly.",
            icon: "info",
          });
        } else if (paymentIntent.status === "requires_payment_method") {
          setMessage("Your payment was not successful, please try again.");
          Swal.fire({
            title: "Payment Failed",
            text: "Your payment was not successful, please try again.",
            icon: "error",
          });
        } else {
          setMessage("Something went wrong.");
          Swal.fire({
            title: "Something went wrong",
            text: `Payment status: ${paymentIntent.status}`,
            icon: "error",
          });
        }
      } else {
        console.error("No payment intent received");
        setMessage("No payment intent received");
        Swal.fire({
          title: "Error",
          text: "No payment intent received. Please try again.",
          icon: "error",
        });
      }
    } catch (confirmError) {
      console.error("Error confirming payment:", confirmError);
      setMessage("An error occurred while processing your payment.");
      Swal.fire({
        title: "Error",
        text: "An error occurred while processing your payment. Please try again.",
        icon: "error",
      });
    }

    setIsLoading(false);
  }

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <div className="mb-6">
        <PaymentElement 
          id="payment-element" 
          options={{ 
            layout: "tabs",
            defaultValues: {
              billingDetails: {
                // You can pre-fill billing details here if available
              }
            }
          }} 
        />
      </div>
      
      {message && (
        <div id="payment-message" className="mb-4 p-3 bg-red-100 text-red-600 rounded-md border border-red-200">
          {message}
        </div>
      )}
      
      <div className="flex gap-4">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 border border-gray-300 text-gray-700 py-3 px-5 rounded-md font-semibold hover:bg-gray-50 transition"
          disabled={isLoading}
        >
          Cancel
        </button>
        
        <button
          disabled={isLoading || !stripe || !elements}
          id="submit"
          type="submit"
          className="flex-1 bg-[#f8992d] py-3 px-5 text-white rounded-md font-semibold hover:bg-amber-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Processing...
            </div>
          ) : (
            `Pay $${total.toFixed(2)}`
          )}
        </button>
      </div>
      
      {/* Debug Information (Remove in production) */}
      <div className="mt-4 p-3 bg-gray-100 rounded text-xs">
        <p>Debug Info:</p>
        <p>Stripe loaded: {stripe ? 'Yes' : 'No'}</p>
        <p>Elements loaded: {elements ? 'Yes' : 'No'}</p>
        <p>Total: ${total.toFixed(2)}</p>
      </div>
    </form>
  );
};

export default CheckoutForm2;