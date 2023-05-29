import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';
import useStyles from "../Cart/shippingFormStyles";
import '../Cart/shippingFormStyles.js';
import {
  Button,
  Typography,
  
} from "@mui/material";


import { Box,TextField, Grid } from '@material-ui/core';

const CheckoutAddress = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [shippingAddress, setshippingAddress] = useState({
    firstname: "",
    lastname: "",
    address: '',
    city: '',
    state: '',
    country:'',
    postalCode: '',
  });
  const [shippingAddressFormError, setshippingAddressFormError] = useState({
    firstname: "",
    lastname: "",
    address: '',
    city: '',
    state: '',
    country:'',
    postalCode: '',
  });


  const handleCheckoutAddressClick =() => {
    // bind the data and send it to the location
    const shippingData = {
      description: "Shipping Data",
      name: `${shippingAddress.firstname.trim()} ${shippingAddress.lastname.trim()}`,
      address:{
        line1: shippingAddress.address,
        city: shippingAddress.city,
        state: shippingAddress.state,
        postal_code: shippingAddress.postalCode,
        country: shippingAddress.country
      },
      // Need it to be dynamically updated
      currency:"USD",

      // Need it to be change it based on cart data
      productId: [1233,12345]
    }
    navigate("/checkout/payment",{state:{shippingData:shippingData,billingData:shippingData}});
  }
  const handleCheckoutAddressBackClick = () => {
    navigate('/checkout/cart');
  }
  const handleChange = (event) => {
    setshippingAddress({
      ...shippingAddress,
      [event.target.name]: event.target.value,
    });
  };

  // Form validation code
  const validateForm = (shippingAddress) => {
    const errors = {};

    // Validate name
    if (!shippingAddress.firstname.trim()) {
      errors.firstname = 'First Name is required';
    }

    // Validate Address
    if (!shippingAddress.address.trim()) {
      errors.address = 'Address is required';
    }

    // Validate City 
    if (!shippingAddress.city.trim()) {
      errors.city = 'City is required';
    } 
    // Validate state 
    if (!shippingAddress.state.trim()) {
      errors.state = 'state is required';
    } 
    // Validate country
    if (!shippingAddress.country.trim()) {
      errors.country = 'country is required';
    } 
    // Validate postalCode 
    if (!shippingAddress.postalCode.trim()) {
      errors.postalCode = 'Postal Code is required';
    } 

    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // TODO: Validate the form and submit it
    const validationErrors = validateForm(shippingAddress);
    setErrors(validationErrors);  

    if (Object.keys(validationErrors).length === 0) {
      // Form is valid, submit or perform further actions
      console.log('Form submitted:', shippingAddress);
    }
    

  };
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Box elevation={6} className={classes.form} borderBottom="1px solid #ccc" padding="8px 20px">
        <form onSubmit={handleSubmit} className={classes.formContainer}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="firstname"
                label="First Name"
                fullWidth
                value={shippingAddress.name}
                onChange={handleChange}
                className={classes.textField}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="lastname"
                label="Last Name"
                fullWidth
                value={shippingAddress.lastname}
                onChange={handleChange}
                className={classes.textField}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="address"
                label="Address"
                fullWidth
                value={shippingAddress.address}
                onChange={handleChange}
                className={classes.textField}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="city"
                label="City"
                fullWidth
                value={shippingAddress.city}
                onChange={handleChange}
                className={`${classes.textField} ${shippingAddressFormError.city ? 'error' : ''}`}
                />
               {shippingAddressFormError.city && <span className="error-message">{shippingAddressFormError.city}</span>}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="state"
                label="State"
                fullWidth
                value={shippingAddress.state}
                onChange={handleChange}
                className={classes.textField}
              />
            </Grid>
            <Grid item xs={12}>
              
              <TextField
                name="country"
                label="Country"
                fullWidth
                value={shippingAddress.country}
                onChange={handleChange}
                className={`${classes.textField} ${shippingAddressFormError.country ? 'error' : ''}`}
                />
               {shippingAddressFormError.country && <span className="error-message">{shippingAddressFormError.country}</span>}
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="postalCode"
                label="Postal Code"
                fullWidth
                value={shippingAddress.postalCode}
                onChange={handleChange}
                className={classes.textField}
              />
            </Grid>
          </Grid>
          <br/>
          <Button type="submit" variant="contained" color="primary" className={classes.submitButton}>
            Submit
          </Button>
        </form>
      </Box>
        In payment address. 
      <Button
        class="cta"
        onClick={handleCheckoutAddressClick}
        
      >
        <span> Continue </span>
        <svg viewBox="0 0 13 10" height="10px" width="15px">
          <path d="M1,5 L11,5"></path>
          <polyline points="8 1 12 5 8 9"></polyline>
        </svg>
      </Button>
      <Button onClick={handleCheckoutAddressBackClick}>
        Go Back
      </Button>
    </div>
  )
}

export default CheckoutAddress
