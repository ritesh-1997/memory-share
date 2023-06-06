import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  firstName: { type: "string", required: true },
  lastName: { type: "string", required: true },
  phone: { type: "string", required: true },
  type: {
    type: String,
    enum: ["home", "office"],
    required: true,
  },
  address1: {
    type: String,
    required: true,
  },
  address2: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
});

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String },
  addresses: [addressSchema],
});

export default mongoose.model("User", userSchema);
