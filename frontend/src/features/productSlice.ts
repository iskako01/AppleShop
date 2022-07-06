import { Iproduct } from "./../type/productType";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


interface IinitialState {
  items: Iproduct[];
  status: string | null;
}

const initialState: IinitialState = {
  items: [],
  status: null,
};

export const productsFetch = createAsyncThunk({
	"products/productsFeatch",
	()=>{

	}
}) 

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
});

export default productSlice.reducer;
