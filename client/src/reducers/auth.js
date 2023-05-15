import { AUTH, LOGOUT } from "../constants/actionTypes";
import jwt_decode from "jwt-decode";

const authReducer = (state = { authData: null }, action) => {
  console.log("In auth reducer");
  const credential = action.data?.res.credential;
  let decoded = null,
    name = null;

  if (credential) {
    decoded = jwt_decode(credential);
    name = decoded.name;
  }

  console.log(name);
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...decoded }));
      return { ...state, authData: decoded };

    default:
      return state;
  }
};

export default authReducer;
