import * as api from "../api/cart";
export const addItemToCart = (cartItem) => async (dispatch) => {
  try {
    console.log("Adding Item to Cart");
    const { data } = await api.addItemToCart(cartItem);
  } catch (error) {
    console.error(error);
  }
};

export const getCart = (userID) => async (userID) => {
  try {
    console.log("Getting item of Cart");
    const { data } = await api.getCart(userID);
  } catch (error) {
    console.error(error);
  }
};

export const updateCartItem = (cartItem) => async (dispatch) => {
  try {
    console.log("Updating Item of Cart");
    const { data } = await api.updateCartItem(cartItem);
  } catch (error) {
    console.error(error);
  }
};

export const removeCartItem = (cartItem) => async (dispatch) => {
  try {
    console.log("Removing Item from Cart");
    const { data } = await api.removeCartItem(cartItem);
  } catch (error) {
    console.error(error);
  }
};
