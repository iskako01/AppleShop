import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { AppStore } from "../redux/store";
import { Iproduct } from "../type/productType";
import { arrowleft } from "../assets/icons/icons";
import { CartItem } from "./CartItem";
import { clearCart, getTotalPrice } from "../features/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector<AppStore, Iproduct[]>(
    (state) => state.cart.cartItems
  );
  const totalPrice = useSelector<AppStore, number>(
    (state) => state.cart.cartTotalAmount
  );

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  useEffect(() => {
    dispatch(getTotalPrice());
  }, [cartItems]);

  return (
    <div className="cart_container">
      <h2>Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <div className="cart_empty">
          <p>Your cart is empty.</p>
          <div className="start_shopping">
            <Link to="/">
              {arrowleft}
              <span>Start shopping</span>{" "}
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="cart_titels">
            <h3 className="cart_titels__title">Product</h3>
            <h3 className="cart_titels__price">Price</h3>
            <h3 className="cart_titels__quantity">Quantity</h3>
            <h3 className="cart_titels__total">Total</h3>
          </div>

          <div className="cart_items">
            {cartItems.map((cartItem) => (
              <CartItem key={cartItem.id} cartItem={cartItem} />
            ))}
          </div>

          <div className="cart_summary">
            <button className="cart_clear" onClick={handleClearCart}>
              Clear Cart
            </button>

            <div className="cart_checkout">
              <div className="subtotal">
                <span>Subtotal</span>
                <span className="cart_amount">$ {totalPrice}</span>
              </div>

              <p>Taxes and shipping calculated at checkout.</p>

              <button>Check out</button>

              <div className="continue_shopping">
                <Link to="/">
                  {arrowleft}
                  <span>Continue shopping</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
