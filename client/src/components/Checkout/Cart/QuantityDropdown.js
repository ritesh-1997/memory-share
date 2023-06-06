import React, { useState } from "react";

const QuantityDropdown = ({ initialValue, onChange }) => {
  const [quantity, setQuantity] = useState(initialValue);

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    setQuantity(newQuantity);
    onChange(newQuantity);
  };

  return (
    <select variant="body2" value={quantity} onChange={handleQuantityChange}>
      {[1, 2, 3, 4, 5, 6].map((value) => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </select>
  );
};

export default QuantityDropdown;
