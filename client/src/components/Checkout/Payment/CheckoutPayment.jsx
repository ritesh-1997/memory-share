import React,{useEffect, useState} from 'react'
import StripeCheckout from 'react-stripe-checkout';
import { useDispatch, useSelector } from 'react-redux';
import { getConfig } from '../../../actions/payments';
import { Box } from "@mui/system";
import {loadStripe} from '@stripe/stripe-js';
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from './PaymentForm';
import { useNavigate,useLocation } from 'react-router-dom';

import {
    Button,
    Grid,
    IconButton,
    Link,
    Typography,
    useTheme,
  } from "@mui/material";

const CheckoutPayment = () => {
    const [stripePromise,setStripePromise] = useState(null);
    const [clientSecret, setClientSecret]  = useState("");
    const [isProcessing, setIsProcessing]  = useState(false);
    const navigate                         = useNavigate();
    const location                         = useLocation();

    console.log('Form data:', JSON.stringify({data:location.state}));
    useEffect(() => {
        fetch("/payments/stripe/config").then(async (r) => {
          const { publishableKey } = await r.json();
          setStripePromise(loadStripe(publishableKey));
        });
      }, []);
    
      useEffect(() => { 
        fetch("/payments/stripe/create-payment-intent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          }, 
          body: JSON.stringify({shippingData:location.state.shippingData}),
        }).then(async (result) => {
          if (result.ok) {
            const { clientSecret } = await result.json();
            console.log(clientSecret);
            setClientSecret(clientSecret);
          } else {
            throw new Error("Failed to create payment intent");
          }
        })
        .catch((error) => {
          console.error("Error creating payment intent:", error);
        });
    }, []);
      const handleCheckoutPaymentBackClick = () => {
        navigate('/checkout/address');
      }
  return (
    <div>
        <Box>
        In Payment checkout payment.
        {stripePromise && clientSecret &&
        ( <Elements stripe={stripePromise} options={{clientSecret}}>
            {/* Add Checkout form too */}
            <PaymentForm/>
        </Elements>)}
        </Box>
        <Button onClick={handleCheckoutPaymentBackClick}>
            Go back
        </Button>
    </div>
    
  )
}

export default CheckoutPayment;
