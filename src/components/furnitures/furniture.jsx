import React from "react";
import "./furnitures.css";
export const Furniture = ({
  item: { productName, tags, price, rating, productImage },
}) => {
  return (
    <div className="furniture">
      <img src={productImage} alt={productName} />
      <div className="furniture-details">
        <span className="furniture-name">{productName}</span>
        <span className="furniture-tags">({tags.join(", ")})</span>
        <span className="furniture-price">₹{price}</span>
        <span className="furniture-tags">Rating: {rating}</span>
      </div>
    </div>
  );
};
