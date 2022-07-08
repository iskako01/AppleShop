import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Iproduct } from "../type/productType";

interface IinitialState {
  cartItems: Iproduct[];
  cartTotalQuantity: number;
  cartTotalAmount: number;
}

const initialState: IinitialState = {
  cartItems: [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Iproduct>) {
      const itemIndex = state.cartItems.findIndex(
        (i) => i.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);
      }
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
