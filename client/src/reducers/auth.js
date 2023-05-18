/**
 * Store both the SignIn/SignUp form data and token.
 */

import { AUTH, LOGOUT } from "../constants/actionTypes";
import jwt_decode from "jwt-decode";

const authReducer = (state = { authData: null }, action) => {
  const localAuthCredential = action?.data;

  switch (action.type) {
    case AUTH:
      localStorage.setItem(
        "profile",
        JSON.stringify({ ...localAuthCredential })
      );
      return { ...state, authData: localAuthCredential };
    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null };
    default:
      return state;
  }
};

export default authReducer;
