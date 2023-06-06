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
  console.log("address: ", value.shippingData.address.line1);
  const name = value.shippingData.name;
  const line1 = value.shippingData.address.line1;
  const postal_code = value.shippingData.address.postal_code;
  const city = value.shippingData.address.city;
  const state = value.shippingData.address.state;
  const country = value.shippingData.address.country;

  try {
    const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);
    const paymentIntent = await stripeInstance.paymentIntents.create({
      description: "Hello Payment",
      shipping: {
        name: "Ritesh Gupta",
        address: {
          line1: line1,
          postal_code: postal_code,
          city: city,
          state: state,
          country: "US",
        },
      },
      amount: 2000,
      currency: "usd",
      statement_descriptor: "Statement Descriptor ",
      capture_method: "automatic",
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
