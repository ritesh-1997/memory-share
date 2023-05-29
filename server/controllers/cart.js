import mongoose from "mongoose";
import express from "express";
import Cart from "../models/cart.js";

// Add item to cart
export const addItemToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Check if the user already has a cart
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // If the cart doesn't exist, create a new one
      cart = new Cart({ userId, items: [] });
    }

    // Find the item in the cart and update the quantity
    const checkItem = cart.items.find((item) => item.productId === productId);
    if (checkItem) {
      checkItem.quantity += 1; // Update the quantity
    } else {
      // Add the item to the cart
      cart.items.push({ productId, quantity: 1 });
    }
    // Save the cart to the database
    await cart.save();

    res.status(201).json({ success: true, message: "Item added to cart" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to add item to cart" });
  }
};

// Update cart item quantity
export const updateCartItem = async (req, res) => {
  try {
    const { userId, itemId, quantity } = req.body;

    // Find the cart for the user
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    // Find the item in the cart and update the quantity
    const item = cart.items.id(itemId);

    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found in cart" });
    }

    item.quantity = quantity;

    // Save the updated cart
    await cart.save();

    res.json({ success: true, message: "Cart item updated" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to update cart item" });
  }
};

// Remove item from cart
export const removeCartItem = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    // Find the cart for the user
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    // Find the item in the cart and remove it
    const item = cart.items.id(itemId);
    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found in cart" });
    }

    // Remove the item from the cart
    cart.items.pull(itemId);

    // Save the updated cart
    await cart.save();

    res.json({ success: true, message: "Cart item removed" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to remove cart item" });
  }
};

// Get cart for a user
export const getCart = async (req, res) => {
  try {
    const { userId } = req.query;

    // Find the cart for the user
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    res.json({ success: true, cart });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to retrieve cart" });
  }
};
