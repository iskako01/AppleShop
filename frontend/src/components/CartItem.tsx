import React from "react";
import { Iproduct } from "../type/productType";

interface PropsType {
  cartItem: Iproduct;
}

export const CartItem: React.FC<PropsType> = ({ cartItem }) => {
  return (
    <div className="cart_Item">
      <div className="cart_Item__product">
        <img src={cartItem.image} alt={cartItem.name} />
        <div>
          <h3>{cartItem.name}</h3>
          <p>{cartItem.desc}</p>
          <button>Remove</button>
        </div>
      </div>

      <div className="cart_Item__price">$ {cartItem.price}</div>

      <div className="cart_Item__quantity">
        <button>-</button>
        <div className="count">{cartItem.cartQuantity}</div>
        <button>+</button>
      </div>

      <div className="cart_Item__total_price">
       $ {cartItem.price * cartItem.cartQuantity}
      </div>
    </div>
  );
};
