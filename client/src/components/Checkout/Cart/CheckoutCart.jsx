import React,{useEffect,useState} from 'react'
import './styles.css';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  IconButton,
  Link,
  useTheme,
} from "@mui/material";

import { Card, CardContent, Checkbox,Typography,Paper, Button } from '@material-ui/core';
import QuantityDropdown from './QuantityDropdown';



const CheckoutCart = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const userId = user?.result?.sub || user?.result?._id;
  const [activeCard, setActiveCard] = useState(null);

  const [cartItem, setCartItem] = useState([]);
  useEffect(() => {
    // Fetch addresses from the database and update the state
    const fetchCartItems = async () => {
      try {
        const response = await fetch(`/v1/cart?userId=${userId}`); // Replace with your API endpoint
        const data = await response.json();
        // console.log(data.cart.items);
        setCartItem(data.cart.items);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };
  
    fetchCartItems();
  }, []);
  const cartItems = [
    {
      id: 1,
      title: 'Product 1',
      price: 10.99,
      quantity: 2,
    },
    {
      id: 2,
      title: 'Product 2',
      price: 19.99,
      quantity: 1,
    },
    {
      id: 3,
      title: 'Product 3',
      price: 5.99,
      quantity: 4,
    },
  ];

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const navigate = useNavigate();
  const removeFromCart = () => {}
  const handleQuantityChange = (newQuantity) => {
    // Handle the quantity change here
    console.log('New quantity:', newQuantity);
  };
  const handleCheckoutCartClick = () => {
    const cartOverview ={
      TotalQuantity: 3,
      TotalPrice: 100
    }
      navigate('/checkout/address',{state:{cartOverview: cartOverview}});
  }
  const handleCheckoutCartBackClick = () => {
    navigate('/posts');
  }
  const handleCardClick = (cardId) => {
    console.log('Card clicked:', cardId);
    setActiveCard(cardId);
  };

  return (
    <Grid container className="grid-container">
      <Grid item xs={8} className="item-1">
        <Typography variant="h6" gutterBottom>
          Cart Items
        </Typography>
        
        <Typography variant="h6" gutterBottom>
           Item Lists      
        </Typography>
        <Grid container spacing={2}>
          {cartItem.map((cart) => (
            <Grid item xs={6} key={cart.id}>
          <Card className={`card ${cart.id === activeCard ? 'active' : ''}`}
                raised
                elevation={6}
                onClick={() => handleCardClick(cart.id)}>
           <CardContent>
           <div key={cart._id} className="address-card">
              <Checkbox
                checked={activeCard === cart._id}
                onChange={() => handleCardClick(cart._id)}
                color="primary"
                inputProps={{ 'aria-label': 'Select Card' }}
              />                         
               <Typography variant="body2">Quantity: {cart.quantity}</Typography>
               <Typography variant="body2">ProductId: {cart.productId}</Typography>
               <Typography variant="body2">Price: ${10}</Typography>
               
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

        <Paper raised elevation={6} className='Paper' >
         <Typography variant="h6">Total: ${100}</Typography>
        <div className="buttons">
          <Button className="cta" onClick={handleCheckoutCartClick}>
            <span> Continue </span>
            <svg viewBox="0 0 13 10" height="10px" width="15px">
              <path d="M1,5 L11,5"></path>
              <polyline points="8 1 12 5 8 9"></polyline>
            </svg>
            </Button>
          <Button variant="contained" color="secondary" onClick={handleCheckoutCartBackClick}>Go Back</Button>
        </div>
        </Paper>   
      </Grid>
    </Grid>
    // <div>
    // <>
    // <Typography variant="h5" gutterBottom>
    //       Shopping Cart
    // </Typography>
    // <Grid container>
    //   <Grid item xs={9}>
    //   {cartItems.length === 0 ? (
    //       <Typography variant="body1">Your cart is empty.</Typography>
    //     ) : (
    //       <Grid className="cart-container" >
    //       {cartItems.map((item) => (
    //           <Card key={item.id} variant="outlined">
    //             <CardContent>
    //               <Typography variant="h6">{item.title}</Typography>
    //               <Typography variant="body2">Price: ${item.price}</Typography>
    //               <Typography variant="body2">
    //                 Quantity :
    //                 <QuantityDropdown variant="body2" initialValue={item.quantity} onChange={handleQuantityChange} />
    //               </Typography>
    //               <br/>
    //               <Button variant="outlined" onClick={() => removeFromCart(item.id)}>
    //                 Remove
    //               </Button>
    //             </CardContent>
    //           </Card>
    //         ))}
    //   </Grid>
    //     )}
    //   </Grid>
    //   <Grid item xs={3}>

    //   </Grid>
    // </Grid>
    // </>
    
  )
}

export default CheckoutCart
