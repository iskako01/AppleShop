import React from "react";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Iproduct } from "../type/productType";
import { toast } from "react-toastify";

interface IinitialState {
  cartItems: Iproduct[];
  cartTotalQuantity: number;
  cartTotalAmount: number;
}

const initialState = {
  cartItems: [],
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
        toast.success("Added product to cart.");
      }
    },
  },
});

{
}

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
