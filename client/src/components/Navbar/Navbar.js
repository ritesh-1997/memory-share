import React, { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import useStyles from "./styles";
import memories from "../../images/memories.png";

const Navbar = () => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  console.log("In Nav bar ::");
  console.log(user?.name);
  console.log("In Nav bar ::");
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography
          component={NavLink}
          to="/"
          className={classes.heading}
          align="center"
        >
          Memories
        </Typography>
        <img src={memories} alt="memories" height="60" />
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.profile}
              alt={user?.name}
              src={user?.picture}
            >
              {user?.name}
            </Avatar>
            <Typography className={classes.userName}>{user?.name}</Typography>
            <Button className={classes.logout} color="secondary">
              Logout
            </Button>
          </div>
        ) : (
          <Button component={NavLink} to="/auth" color="primary">
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
