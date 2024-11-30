import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

// Chargez Stripe avec votre clé publique
const stripePromise = loadStripe('pk_test_51ObImnHiXvTNLtuefWnTONSoTO9bjEsOpKM7VtO9qmM5L2gsdU1uyjZUx8amWbWTmhm9b09QvEopkqGMKVPNDDgb00UirBSKMG');

const CheckoutForm = () => {
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
//     setLoading(true);

//     if (!stripe || !elements) {
//       console.error('Stripe.js or Elements has not loaded yet.');
//       setLoading(false);
//       return;
//     }

//     Récupérer l'élément de carte
//     const cardElement = elements.getElement(CardElement);

//     if (!cardElement) {
//       console.error('Card element not found');
//       setLoading(false);
//       return;
//     }

//     try {
//       Créer une requête vers votre backend pour obtenir un clientSecret
//       const res = await fetch('http://localhost:9196/api/payment/create-payment-intent', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ amount: 5000 })   Montant en cents
//       });
//     const res = await fetch('http://localhost:9196/api/payment/create-payment-intent', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           amount: 5000,        Montant en cents
//           currency: 'usd',    Devise, par exemple "usd" pour les dollars
//           description: 'Test Payment'
//         })
//       });
      
//       if (!res.ok) {
//         throw new Error('Failed to fetch client secret');
//       }

//       const { clientSecret } = await res.json();

//       Confirmer le paiement avec l'élément de carte
//       const { error } = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: cardElement, // Utilise cardElement ici
//         }
//       });

//       if (error) {
//         console.error(error.message);
//       } else {
//         console.log('Payment successful!');
//       }
//     } catch (error) {
//       console.error('Error during payment process:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
  
    if (!stripe || !elements) {
      console.error('Stripe.js or Elements has not loaded yet.');
      setLoading(false);
      return;
    }
  
    const cardElement = elements.getElement(CardElement);
  
    if (!cardElement) {
      console.error('Card element not found');
      setLoading(false);
      return;
    }
  
    try {
      // Envoyer la requête pour créer un PaymentIntent
      const response = await axios.post('http://localhost:9196/api/payment/create-payment-intent', {
        amount: 5000, // Montant en cents
        currency: 'usd', // Devise
        description: 'Test Payment'
      });
  
      const { clientSecret } = response.data;
  
      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement }
      });
  
      if (error) {
        console.error('Error confirming payment:', error.message);
      } else {
        console.log('Payment successful!');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error response:', error.response?.data);
      } else {
        console.error('Error during payment process:', error);
      }
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={loading}>
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  );
};

export default CheckoutForm;
