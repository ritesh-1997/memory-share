import { PROFILE, START_LOADING, END_LOADING } from "../constants/actionTypes";
import * as api from "../api";

export const getUserProfile = (userID) => async (dispatch) => {
  try {
    console.log("Loading user profile");
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchUserProfile(userID);
    // console.log(data.data);
    dispatch({ type: PROFILE, payload: { post: data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log({ error });
  }
};
