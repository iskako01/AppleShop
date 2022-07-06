import { Iproduct } from "./../type/productType";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { productsAPI } from "../api/api";

interface IinitialState {
  items: Iproduct[];
  status: string | null;
  error: string | null | unknown;
}

const initialState: IinitialState = {
  items: [],
  status: null,
  error: null,
};

export const productsFetch = createAsyncThunk(
  "products/productsFeatch",
  async (_, { rejectWithValue }) => {
    try {
      const data = await productsAPI.getProducts();
      return data;
    } catch (error) {
      return rejectWithValue("an error ocured");
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(productsFetch.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(
      productsFetch.fulfilled,
      (state, action: PayloadAction<Iproduct[]>) => {
        state.status = "success";
        state.items = action.payload;
      }
    );
    builder.addCase(
      productsFetch.rejected,
      (state, action: PayloadAction<string | null | unknown>) => {
        state.status = "rejected";
        state.error = action.payload;
      }
    );
  },
});

export default productSlice.reducer;
