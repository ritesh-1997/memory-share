// import { uuidv4 } from "uuid";
import User from "../models/user.js";

// Add an address to a user
export const addAddress = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(userId);
    const {
      firstName,
      lastName,
      type,
      phone,
      address1,
      address2,
      city,
      state,
      country,
      postalCode,
    } = req.body;

    // Find the user by ID
    const user = await User.findById(userId);
    console.log(user);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Create a new address
    const newAddress = {
      firstName,
      lastName,
      phone,
      postalCode,
      state,
      address1,
      address2,
      city,
      country,
      type,
    };

    // Add the address to the user's addresses array
    user.addresses.push(newAddress);
    console.log(user);
    // Save the user with the new address
    const savedUser = await user.save();

    res.status(200).json(savedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to add address" });
  }
};

// Update an address of a user
export const updateAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const {
      firstName,
      lastName,
      type,
      address1,
      address2,
      city,
      state,
      country,
      postalCode,
      phone,
    } = req.body;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Find the address within the user's addresses array
    const address = user.addresses.id(addressId);

    if (!address) {
      return res.status(404).json({ error: "Address not found" });
    }

    // Update the address fields
    address.firstName = firstName;
    address.lastName = lastName;
    address.type = type;
    address.address1 = address1;
    address.address2 = address2;
    address.city = city;
    address.state = state;
    address.country = country;
    address.postalCode = postalCode;
    address.phone = phone;

    // Save the user with the updated address
    const savedUser = await user.save();

    res.status(200).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to update address" });
  }
};

// Remove an address from a user
export const removeAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Find the address within the user's addresses array
    const address = user.addresses.id(addressId);
    console.log(address);

    if (!address) {
      return res.status(404).json({ error: "Address not found" });
    }

    // Remove the address from the user's addresses array
    user.addresses.pull(addressId);

    // Save the user with the updated addresses
    const savedUser = await user.save();

    res.status(200).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to remove address" });
  }
};

// Get all addresses of a user
export const getAddresses = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const addresses = user.addresses;

    res.status(200).json(addresses);
  } catch (error) {
    res.status(500).json({ error: "Failed to get addresses" });
  }
};
