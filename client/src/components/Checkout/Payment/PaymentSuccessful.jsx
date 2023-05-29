import React from 'react';
import { Typography,Button } from '@material-ui/core';
import useStyles from "./paymentSuccessStyles";


const PaymentSuccessful = () => {
    const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography variant="h4" className={classes.successIcon}>
        &#10003;
      </Typography>
      <Typography variant="h5" className={classes.title}>
        Payment Successful!
      </Typography>
      <Typography variant="body1">
        Thank you for your purchase. Your payment was successful.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        href="/"
      >
        Back to Home
      </Button>
    </div>
  )
}

export default PaymentSuccessful;
