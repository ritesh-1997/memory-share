import express from "express";
import { getConfig, createPaymentIntent } from "../controllers/payment.js";

const router = express.Router();

router.get("/stripe/config", getConfig);
router.post("/stripe/create-payment-intent", createPaymentIntent);
export default router;
