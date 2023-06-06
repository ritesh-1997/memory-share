import express from "express";
import {
  signin,
  signup,
  googlesignin,
  getUserProfile,
} from "../controllers/user.js";

import {
  addAddress,
  updateAddress,
  removeAddress,
  getAddresses,
} from "../controllers/address.js";
const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/auth/google", googlesignin);
router.get("/profile", getUserProfile);

// Add an address to a user
router.post("/:userId/addresses", addAddress);

// Update an address of a user
router.put("/:userId/addresses/:addressId", updateAddress);

// Remove an address from a user
router.delete("/:userId/addresses/:addressId", removeAddress);

// Get all addresses of a user
router.get("/:userId/addresses", getAddresses);

export default router;
