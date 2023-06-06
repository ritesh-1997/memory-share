import React, { useState } from "react";
import "./AddressFormPopup.css";
import { Divider, Paper } from "@material-ui/core";
import Footer from "./Footer";

const AddressFormPopup = ({ onSave, onCancel }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [pincode, setPincode] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");
  const [country, setLocality] = useState("");
  const [city, setCity] = useState("");
  const [addressType, setAddressType] = useState("");
  const [openOnSaturday, setOpenOnSaturday] = useState(false);
  const [openOnSunday, setOpenOnSunday] = useState(false);
  const [makeDefaultAddress, setMakeDefaultAddress] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const addressObj = {
      firstName,
      lastName,
      mobile,
      pincode,
      state,
      address,
      country,
      city,
      addressType,
      openOnSaturday,
      openOnSunday,
      makeDefaultAddress,
    };

    onSave(addressObj);
  };

  return (
    <div className="popup-container">
      <div className="popup-content">
        <h2>Add New Address</h2>
        <form onSubmit={handleSubmit}>
          {/* Contact Details */}
          <Paper className="my-paper" elevation={6}>
            <div className="form-group">
              <label className="required" htmlFor="firstName">
                First Name *
              </label>
              <input
                type="text"
                placeholder="First Name"
                className="single-line-input"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="required" htmlFor="lastName">
                Last Name *
              </label>
              <input
                type="text"
                placeholder="Last Name"
                className="single-line-input"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="mobile">Mobile *</label>
              <input
                type="text"
                id="mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
              />
            </div>
          </Paper>
          <br />
          {/* Address */}
          <Paper className="my-paper" elevation={6}>
            {/* Address */}
            <div className="form-group">
              <label htmlFor="address">
                Address (House No, Building, Street, Area) *
              </label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            {/* City */}
            <div className="form-group">
              <label htmlFor="city">City/ District *</label>
              <input
                type="text"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>

            {/* Pincode */}
            <div className="form-group">
              <label htmlFor="pincode">Pincode *</label>
              <input
                type="text"
                id="pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                required
              />
            </div>

            {/* State */}
            <div className="form-group">
              <label htmlFor="state">State *</label>
              <input
                type="text"
                id="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              />
            </div>

            {/* Country */}
            <div className="form-group">
              <label htmlFor="country">Country *</label>
              <input
                type="text"
                id="country"
                value={country}
                onChange={(e) => setLocality(e.target.value)}
                required
              />
            </div>
          </Paper>
          <br />
          {/* Save Address */}
          <Paper className="my-paper" elevation={6}>
            <div className="form-group">
              <label htmlFor="addressType">Type of Address *</label>
              <select
                id="addressType"
                value={addressType}
                onChange={(e) => setAddressType(e.target.value)}
                required
              >
                <option value="">Select</option>
                <option value="Home">Home</option>
                <option value="Office">Office</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="makeDefaultAddress">
                Make this my default address
              </label>
              <input
                type="checkbox"
                id="makeDefaultAddress"
                checked={makeDefaultAddress}
                onChange={(e) => setMakeDefaultAddress(e.target.checked)}
              />
            </div>
          </Paper>

          {/* Footer */}
          <Paper class="popup-footer" elevation={6}>
            <div className="button-container">
              <button type="submit">Save</button>
              <button type="button" onClick={onCancel}>
                Cancel
              </button>
            </div>
          </Paper>
        </form>
      </div>
    </div>
  );
};

export default AddressFormPopup;
