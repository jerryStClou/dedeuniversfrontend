import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm'; // Votre formulaire de paiement
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51ObImnHiXvTNLtuefWnTONSoTO9bjEsOpKM7VtO9qmM5L2gsdU1uyjZUx8amWbWTmhm9b09QvEopkqGMKVPNDDgb00UirBSKMG'); // Votre clé publique Stripe

const PaymentPage = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default PaymentPage;
