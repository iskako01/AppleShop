import React from "react";
import { Iproduct } from "../type/productType";

interface PropsType {
  product: Iproduct;
}

const Product: React.FC<PropsType> = ({ product }) => {
  return (
    <div className="product">
      <h3>{product.name}</h3>
      <div className="product_img">
        <img src={product.image} alt="Phone" />
      </div>
      <div className="details">
        <span>{product.desc}</span>
        <span>${product.price}</span>
      </div>
      <button>Add to cart</button>
    </div>
  );
};

export default Product;
