import express from "express";
import {
  signin,
  signup,
  googlesignin,
  getUserProfile,
} from "../controllers/user.js";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/auth/google", googlesignin);
router.get("/profile", getUserProfile);

export default router;
