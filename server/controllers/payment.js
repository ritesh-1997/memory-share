import mongoose from "mongoose";
import express from "express";
import PostMessage from "../models/postMessage.js";
import stripe from "stripe";
import helmet from "helmet";

const router = express.Router();

export const getConfig = async (req, res) => {
  try {
    const key = process.env.STRIPE_PUBLISHABLE_KEY;
    res.status(200).json({ publishableKey: key });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPaymentIntent = async (req, res) => {
  const value = req.body;
  console.log(value);
  console.log("description: ", value.shippingData.description);
  console.log("name: ", value.shippingData.name);
  console.log("address: ", value.shippingData.address.line1);

  try {
    const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);
    const paymentIntent = await stripeInstance.paymentIntents.create({
      description: "Software development services",
      shipping: {
        name: value.shippingData.name,
        address: {
          line1: value.shippingData.address.line1,
          postal_code: "98140",
          city: "San Francisco",
          state: "CA",
          country: "US",
        },
      },
      amount: 2000,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });
    // Send publishable key and PaymentIntent details to client
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
