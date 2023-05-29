import express from "express";
import {
  addItemToCart,
  updateCartItem,
  removeCartItem,
  getCart,
} from "../controllers/cart.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// POST /v1/cart/add
router.post("/add", addItemToCart);

// PUT /v1/cart/update
router.put("/update", updateCartItem);

// DELETE /v1/cart/remove
router.delete("/remove", removeCartItem);

// GET /v1/cart
router.get("/", getCart);
export default router;
