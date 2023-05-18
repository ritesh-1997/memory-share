import React, { useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Typography,
  Container,
} from "@material-ui/core";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import useStyles from "./styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Form } from "react-router-dom";
import { useDispatch } from "react-redux";
import { gapi } from "gapi-script";
import Input from "./Input";
import { TextField, Grid, InputAdornment, IconButton } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Icon from "./icon";
import { signin, signup, googlesignin } from "../../actions/auth";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const Auth = () => {
  console.log("In Auth");
  const classes = useStyles();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setshowPassword] = useState(false);

  const handleShowPassword = () =>
    setshowPassword((prevShowPassword) => !prevShowPassword);

  const googleLogin = useGoogleLogin({
    onSuccess: async ({ code }) => {
      try {
        // const tokens = await axios.post(
        //   "http://localhost:5001/user/auth/google",
        //   {
        //     code,
        //   }
        // );
        dispatch(googlesignin({ code }, navigate));
      } catch (error) {
        console.log(error);
      }
    },
    onError: async (errorResponse) => {
      console.log(errorResponse);
      console.log("Google Sign In was UnSuccessfull. Try again Later!!");
    },
    flow: "auth-code",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      console.log(formData);
      dispatch(signup(formData, navigate));
    } else {
      dispatch(signin(formData, navigate));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const switchMode = () => {
    setIsSignUp((prevShowPassword) => !prevShowPassword);
    setshowPassword(false);
  };

  const googleSuccess = async (res) => {
    try {
      dispatch({ type: "AUTH", data: { res } });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = (error) => {
    console.log(error);
    console.log("Google Sign In was UnSuccessfull. Try again Later!!");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">
          {" "}
          {isSignUp ? "Sign Up" : "Sign In"}
        </Typography>

        <Form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half={1}
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Grid item xs={12}>
              <Input
                name="email"
                label="Email Address"
                fullWidth
                type="email"
                handleChange={handleChange}
              />
              <Input
                name="password"
                label="Password"
                handleChange={handleChange}
                type={showPassword ? "text" : "password"}
                handleShowPassword={handleShowPassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassword}>
                        {<Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {isSignUp && (
                <Input
                  name="confirmPassword"
                  label="Repeat Password"
                  handleChange={handleChange}
                  type="password"
                />
              )}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
          <Button
            className={classes.googleButton}
            color="primary"
            fullWidth
            onClick={() => googleLogin()}
            startIcon={<Icon />}
            variant="contained"
          >
            Sign in with Google 🚀{" "}
          </Button>
          <GoogleLogin
            clientId="671086080216-lpjet8hhuf3i3eskg8t5pees4fhq3esa.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                {" "}
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy={"single_host_origin"}
          />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignUp
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </Form>
      </Paper>
    </Container>
  );
};

export default Auth;
