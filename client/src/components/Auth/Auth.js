import React, { useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Typography,
  Container,
} from "@material-ui/core";
import { GoogleLogin } from "@react-oauth/google";
import useStyles from "./styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Form } from "react-router-dom";
import { useDispatch } from "react-redux";
import Input from "./Input";
import { TextField, Grid, InputAdornment, IconButton } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Icon from "./icon";

const Auth = () => {
  console.log("In Auth");
  const classes = useStyles();
  const [isSignUp, setIsSignUp] = useState(false);
  const dispatch = useDispatch();

  const [showPassword, setshowPassword] = useState(false);

  const handleShowPassword = () =>
    setshowPassword((prevShowPassword) => !prevShowPassword);

  const handleSubmit = () => {};
  const switchMode = () => {
    setIsSignUp((prevShowPassword) => !prevShowPassword);
    handleShowPassword(false);
  };

  const googleSuccess = async (res) => {
    console.log(res);

    try {
      dispatch({ type: "AUTH", data: { res } });
    } catch (error) {
      console.log(error);
    }
  };
  const googleFailure = (error) => {
    console.log(error);
    console.log("Google Sign In was UnSuccessfull. Try again Later!!");
  };

  const handleChange = () => {};
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">
          {" "}
          {isSignUp ? "Sign UP" : "Sing In"}
        </Typography>

        <Form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <TextField
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half={1}
                />
                <TextField
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Grid item xs={12}>
              <TextField
                name="email"
                label="Email Address"
                fullWidth
                type="email"
              />
              <TextField
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
        {/* <Form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignUp &&(
                                <>
                                    <TextField name ="firstName" label="First Name" handleChange={handleChange } autoFocus half/>
                                    <TextField name ="lastName" label="Last Name" handleChange={handleChange }  half/>
                                </>
                            )
                        }
                        <Input name ="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"}  handleShowPassword={handleShowPassword}/>
                        {isSignUp && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                    </Grid>
                    <Button type ="submit" fullWidth variant='contained' color='primary' className={classes.submit}>
                        {isSignUp ? "Sign Up" : "Sign In"}
                    </Button>
                </Form> */}
      </Paper>
    </Container>
  );
};

export default Auth;
