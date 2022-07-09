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

console.log(localCartItems);

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
        toast.success("Added product to cart.");
      }

      addDataToLocalStorage("cartItems", JSON.stringify(state.cartItems));
    },
  },
});

{
}

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
