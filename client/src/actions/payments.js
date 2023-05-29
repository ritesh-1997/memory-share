import * as api from "../api";
import { CONFIG, START_LOADING, END_LOADING } from "../constants/actionTypes";
export const getConfig = () => async (dispatch) => {
  try {
    const { data } = await api.getConfig();
    console.log(data);
    dispatch({ type: CONFIG, payload: { key: data } });
    return data;
  } catch (error) {
    console.log({ error });
  }
};
