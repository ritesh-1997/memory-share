/**
 * Action
 * Here we will implement the Api function which method will do
 * what functionality. Simply API method definition
 *
 * Firstly we will import api to handle all the functionality
 */

import { AUTH } from "../constants/actionTypes";
import * as api from "../api";

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    //login the user
    const { data } = await api.signIn(formData);
    console.log("action/auth");
    //console.log(data);
    dispatch({ type: AUTH, data });
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    //sign up the user
    const { data } = await api.signUp(formData);
    //console.log("SignUpImplementation");
    dispatch({ type: AUTH, data });
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

export const googlesignin = (authCode, navigate) => async (dispatch) => {
  try {
    //sign up the user
    console.log("action/auth");
    const { data } = await api.googleSignIn(authCode);
    dispatch({ type: AUTH, data });
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};
