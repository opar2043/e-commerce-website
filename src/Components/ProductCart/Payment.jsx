import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react'
import CheckoutForm from './CheckoutForm';
const stripePromise = loadStripe('pk_test_51QfDLMIXauIQhi9zpYyko394OCzT9oOQKPvLFEn5siB1Eld53WIRA6H63Oowd9ldwe1lkzoOO6WrEjUq2bQM1Tgi004aRSvT6f');
const Payment = () => {
  return (
    <div>
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
    </div>
  )
}

export default Payment