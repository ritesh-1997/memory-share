import axios from "axios";

const localserverURL = "http://localhost:5001";
const serverURL = "https://memory-share-xip0.zeet-team-ritesh-1997.zeet.app";
const API = axios.create({ baseURL: localserverURL });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const addItemToCart = (cartItem) => API.post(`/v1/cart/add`, cartItem);

export const updateCartItem = (cartItem) =>
  API.put(`/v1/cart/update`, cartItem);

export const removeCartItem = (cartItem) =>
  API.delete(`/v1/cart/remove/`, cartItem);

export const getCart = (userID) => API.get(`/v1/cart?userId=${userID}`);
