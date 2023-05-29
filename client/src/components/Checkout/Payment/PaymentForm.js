import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import "../styles.css";
import { Paper, CircularProgress, Divider } from "@material-ui/core/";
import { Box } from "@mui/system";
import {
  Button,
  Grid,
  IconButton,
  Link,
  Typography,
  useTheme,
} from "@mui/material";
export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);
    console.log(window.location.origin);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/completion`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsProcessing(false);
  };

  return (
    <Box
      elevation={6}
      borderBottom="1px solid #ccc"
      padding="8px 20px"
      class="PaymentBoxBody"
    >
      <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" />
        <Divider />
        <br />
        <button
          class="cta"
          disabled={isProcessing || !stripe || !elements}
          id="submit"
        >
          <span id="button-text">
            {isProcessing ? "Processing ... " : "Pay now"}
          </span>
          <svg viewBox="0 0 13 10" height="10px" width="15px">
            <path d="M1,5 L11,5"></path>
            <polyline points="8 1 12 5 8 9"></polyline>
          </svg>
        </button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
    </Box>
  );
}
