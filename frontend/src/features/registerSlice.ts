import { createSlice } from "@reduxjs/toolkit";

interface IinitialState {
  name: string;
  email: string;
  password: string;
}

const initialState = {
  name: "",
  email: "",
  password: "",
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {},
});

export default registerSlice.reducer;
