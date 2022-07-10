import React from "react";
import { useDispatch } from "react-redux";
import {
  removeItemCart,
  addToCart,
  decreaseQuantityItemTocart,
} from "../features/cartSlice";
import { Iproduct } from "../type/productType";

interface PropsType {
  cartItem: Iproduct;
}

export const CartItem: React.FC<PropsType> = ({ cartItem }) => {
  const dispatch = useDispatch();

  const handleRemoveItemCart = (cartItem: Iproduct) => {
    dispatch(removeItemCart(cartItem));
  };
  const handleIncreaseQuantityItem = (cartItem: Iproduct) => {
    dispatch(addToCart(cartItem));
  };
  const handleDecreaseQuantityItemTocart = (cartItem: Iproduct) => {
    dispatch(decreaseQuantityItemTocart(cartItem));
  };

  return (
    <div className="cart_Item">
      <div className="cart_Item__product">
        <img src={cartItem.image} alt={cartItem.name} />
        <div>
          <h3>{cartItem.name}</h3>
          <p>{cartItem.desc}</p>
          <button onClick={() => handleRemoveItemCart(cartItem)}>Remove</button>
        </div>
      </div>

      <div className="cart_Item__price">$ {cartItem.price}</div>

      <div className="cart_Item__quantity">
        <button onClick={() => handleDecreaseQuantityItemTocart(cartItem)}>
          -
        </button>
        <div className="count">{cartItem.cartQuantity}</div>
        <button onClick={() => handleIncreaseQuantityItem(cartItem)}>+</button>
      </div>

      <div className="cart_Item__total_price">
        $ {cartItem.price * cartItem.cartQuantity}
      </div>
    </div>
  );
};
