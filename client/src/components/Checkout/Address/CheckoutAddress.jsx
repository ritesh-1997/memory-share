import React,{useState,useEffect} from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import {Paper,Card,
  CardActions,
  CardContent,Checkbox,
  CardMedia} from '@material-ui/core';

import '../styles.css';
import useStyles from "../Cart/shippingFormStyles";
import '../Cart/shippingFormStyles.js';
import {
  Button,
  Typography,
  
} from "@mui/material";
import AddressFormPopup from './AddressFormPopup';


import { Box,TextField, Grid } from '@material-ui/core';

const CheckoutAddress = () => {

  const [showForm, setShowForm]               = useState(false);
  const [activeCard, setActiveCard]           = useState(null);
  const [user, setUser]                       = useState(JSON.parse(localStorage.getItem("profile")));
  const [addresses, setAddresses]             = useState([]);
  const location                              = useLocation();
  const navigate                              = useNavigate();
  const [shippingAddress, setshippingAddress] = useState({
    firstname: "",
    lastname: "",
    address: '',
    city: '',
    state: '',
    country:'',
    postalCode: '',
  });
  const userId  = user?.result?.sub || user?.result?._id;

  useEffect(() => {
    // Fetch addresses from the database and update the state
    const fetchAddresses = async () => {
      try {
        const response = await fetch(`/user/${userId}/addresses`); // Replace with your API endpoint
        const data = await response.json();
        setAddresses(data);
      } catch (error) {
        console.error('Error fetching addresses:', error);
      }
    };

    fetchAddresses();
  }, []);
  const handleOpenForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleSaveAddress = (addressObj) => {
    // Handle saving the address data
    console.log("In CheckoutAddress");
    shippingAddress.city = addressObj.city;
    shippingAddress.address = addressObj.address;
    shippingAddress.postalCode = addressObj.postalCode;
    shippingAddress.country = addressObj.country;
    shippingAddress.phone = addressObj.mobile;
    shippingAddress.state = addressObj.state;

    console.log(addressObj);
    setShowForm(false);
  };

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

  const handleCardClick = (cardId) => {
    setActiveCard(cardId);
  };
  
  return (
    <Grid container className="grid-container">
      <Grid item xs={8} className="item-1">
        <Typography variant="h6" gutterBottom>
          Shipping address
        </Typography>

        <Typography variant="h6" gutterBottom>
          <Button onClick={handleOpenForm}> Add Address</Button>
          {showForm && (
              <AddressFormPopup onSave={handleSaveAddress} onCancel={handleCloseForm} />
          )}
        </Typography>
        
        <Typography variant="h6" gutterBottom>
           Address List        
        </Typography>
        <Grid container spacing={2}>
          {addresses.map((address) => (
            <Grid item xs={4} key={address.id}>
          <Card className={`card ${address.id === activeCard ? 'active' : ''}`}
                raised
                elevation={6}
                onClick={() => handleCardClick(address.id)}>
           <CardContent>
           <div key={address._id} className="address-card">
           {/* <Box display="flex" alignItems="center"> */}
                    <Checkbox
                      checked={activeCard === address._id}
                      onChange={() => handleCardClick(address._id)}
                      color="primary"
                      inputProps={{ 'aria-label': 'Select Card' }}
                    />          
            {/* </Box> */}
               <h3>{address.firstName} {address.lastName}</h3>
               
               <Typography variant="body2">Phone: {address.phone}</Typography>
               <Typography variant="body2">Type: {address.type}</Typography>
               <Typography variant="body2">Address: {address.address1}</Typography>
               {address.address2 && <Typography variant="body2">{address.address2}</Typography>}
               <Typography variant="body2">{address.city}, {address.state}, {address.country}</Typography>
               <Typography variant="body2">Postal Code: {address.postalCode}</Typography>
            </div>
           </CardContent>   
         </Card>
         </Grid>
       ))}
        </Grid>
       
       


      </Grid>
      <Grid item xs={4} className="item-2">
        <Typography variant="h6" gutterBottom>
          Shipping address
        </Typography>

        <Paper raised elevation={6} >
          <Button onClick={handleCheckoutAddressBackClick}>
            Go Back
          </Button>
          <Button
           className="cta"
           onClick={handleCheckoutAddressClick}
          >
            <span> Continue </span>
            <svg viewBox="0 0 13 10" height="10px" width="15px">
              <path d="M1,5 L11,5"></path>
              <polyline points="8 1 12 5 8 9"></polyline>
            </svg>
          </Button>
        </Paper>   
      </Grid>
    </Grid>
  )
}

export default CheckoutAddress
