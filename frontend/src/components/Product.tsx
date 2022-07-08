import React from "react";
import { useDispatch } from "react-redux";
import { Iproduct } from "../type/productType";
import { addToCart } from "../features/cartSlice";

interface PropsType {
  product: Iproduct;
}

const Product: React.FC<PropsType> = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (product: Iproduct) => {
    dispatch(addToCart(product));
  };

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
      <button onClick={() => handleAddToCart(product)}>Add to cart</button>
    </div>
  );
};

export default Product;
