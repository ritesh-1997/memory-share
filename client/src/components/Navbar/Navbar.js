import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation, Link } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Button,
  Toolbar,
  Typography,
  Drawer,
  Grid,
  LinearProgress,
  Badge,
  withStyles,
} from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";
import { useStyles, StyledBadge } from "./styles";
import memoriesLogo from "../../images/memories-Logo.png";
import memoriesText from "../../images/memories-Text.png";
import { getUserProfile } from "../../actions/profile";

const Navbar = () => {
  console.log("Navbar.js");

  // Declare variables
  const classes = useStyles();
  const [cartItemCounter, setCartItemCounter] = useState(0);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const userId = user?.result?.sub || user?.result?._id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Logging out user from current session
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/auth");
    setUser(null);
  };

  // If user is logged in redirect to profile page
  const userProfileClick = () => {
    dispatch(getUserProfile(userId));
    navigate(`/user/profile?id=${userId}`);
  };

  // If user is not logged in redirect to auth page
  const handleSignIn = () => {
    navigate("/auth");
  };

  // Fetching cart data
  useEffect(() => {
    fetch(`/v1/cart?userId=${userId}`)
      .then((response) => response.json())
      .then((data) => {
        const { success, cart } = data;
        if (success && cart) {
          const itemCount = cart.items.length;
          setCartItemCounter(itemCount);
        }
      })
      .catch((error) => {
        console.log("Error fetching cart:", error);
      });
  }, [cartItemCounter]);

  // For user profile
  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  // Navbar component details and styling
  return (
    <AppBar className={classes.appBar} position="sticky" color="inherit">
      <Link to="/" className={classes.brandContainer}>
        <img src={memoriesText} alt="icon" height="45px" />
        <img src={memoriesLogo} alt="icon" height="40px" />
      </Link>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user?.result?.name}
              src={user?.result?.picture}
              onClick={userProfileClick}
            >
              {user?.result?.name}
            </Avatar>
            <Typography className={classes.userName} onClick={userProfileClick}>
              {user?.result?.name}
            </Typography>
            <Button
              className={classes.logout}
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
            <Button
              onClick={() => {
                navigate("/checkout/cart");
              }}
            >
              <StyledBadge badgeContent={cartItemCounter} color="secondary">
                <ShoppingCartIcon />
              </StyledBadge>
            </Button>
          </div>
        ) : (
          <Button onClick={handleSignIn} color="primary">
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
