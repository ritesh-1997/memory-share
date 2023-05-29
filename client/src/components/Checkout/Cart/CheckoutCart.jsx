import React from 'react'
import './styles.css';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Grid,
  IconButton,
  Link,
  Typography,
  useTheme,
} from "@mui/material";

const CheckoutCart = () => {
    const navigate = useNavigate();
    const handleCheckoutCartClick = () => {
        navigate('/checkout/address');
    }
    const handleCheckoutCartBackClick = () => {
      navigate('/posts');
    }
  return (
    <div>
      In checkout Form, Checkout Cart
      <div>
      <button
        class="cta"
        onClick={handleCheckoutCartClick}
      >
        <span> CONTINUE </span>
        <svg viewBox="0 0 13 10" height="10px" width="15px">
          <path d="M1,5 L11,5"></path>
          <polyline points="8 1 12 5 8 9"></polyline>
        </svg>
      </button>
      </div>
      <Button onClick={handleCheckoutCartBackClick}>
        Go Back
      </Button>
    </div>
  )
}

export default CheckoutCart
