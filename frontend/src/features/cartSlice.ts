import React from "react";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Iproduct } from "../type/productType";
import { toast } from "react-toastify";
import {
  getDataFromLocalStorage,
  addDataToLocalStorage,
} from "../util/localStorage";

interface IinitialState {
  cartItems: Iproduct[];
  cartTotalQuantity: number;
  cartTotalAmount: number;
}

const localCartItems = getDataFromLocalStorage("cartItems");

const initialState = {
  cartItems: localCartItems,
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state: IinitialState, action: PayloadAction<Iproduct>) => {
      const itemIndex = state.cartItems.findIndex(
        (i) => i.id === action.payload.id
      );

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
        toast.info("Increased product quantity");
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);
        toast.success(`${action.payload.name} added to cart.`);
      }

      addDataToLocalStorage("cartItems", JSON.stringify(state.cartItems));
    },

    decreaseQuantityItemTocart: (
      state: IinitialState,
      action: PayloadAction<Iproduct>
    ) => {
      const itemIndex = state.cartItems.findIndex(
        (i) => i.id === action.payload.id
      );

      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;
        toast.info(`Decreased ${action.payload.name} cart quantity.`);
      } else {
        state.cartItems = state.cartItems.filter(
          (cartItem) => cartItem.id !== action.payload.id
        );
        toast.error(`${action.payload.name} removed from cart.`);
      }
      addDataToLocalStorage("cartItems", JSON.stringify(state.cartItems));
    },

    removeItemCart: (state: IinitialState, action: PayloadAction<Iproduct>) => {
      state.cartItems = state.cartItems.filter(
        (cartItem) => cartItem.id !== action.payload.id
      );
      toast.error(`${action.payload.name} removed from cart.`);

      addDataToLocalStorage("cartItems", JSON.stringify(state.cartItems));
    },

    getTotalPrice: (state: IinitialState) => {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const itemTotal = price * cartQuantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
    clearCart: (state: IinitialState) => {
      state.cartItems = [];
      localStorage.clear();
    },
  },
});

{
}

export const {
  addToCart,
  clearCart,
  removeItemCart,
  decreaseQuantityItemTocart,
  getTotalPrice,
} = cartSlice.actions;
export default cartSlice.reducer;
