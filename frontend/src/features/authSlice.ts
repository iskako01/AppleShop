import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authAPI } from "../api/api";
import { Iregister } from "../type/authType";
import jwtDecode from "jwt-decode";

interface IinitialState {
  token: string;
  email: string;
  password: string;
  isAuth: boolean;
  _id: string;
  registerStatus: string;
  registerError: string;
  loginStatus: string;
  loginError: string;
}

const initialState: IinitialState = {
  token: localStorage.getItem("token") || "",
  email: "",
  password: "",
  isAuth: false,
  _id: "",
  registerStatus: "",
  registerError: "",
  loginStatus: "",
  loginError: "",
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (values: Iregister, { rejectWithValue }) => {
    try {
      const token = await authAPI.registerUser({
        name: values.name,
        email: values.email,
        password: values.password,
        _id: values._id,
      });

      localStorage.setItem("token", token.data);

      return token.data;
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
        return rejectWithValue(err.message);
      } else {
        console.log("Unexpected error", err);
      }
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      return { ...state, registerStatus: "pending" };
    });
    builder.addCase(
      registerUser.fulfilled,
      (state, action: PayloadAction<any>) => {
        if (action.payload) {
          const user = jwtDecode(action.payload);

          return {
            ...state,
            token: action.payload,
            name: user.name,
            email: user.email,
            password: user.password,
            _id: user._id,
            registerStatus: "success",
          };
        } else return state;
      }
    );
    builder.addCase(
      registerUser.rejected,
      (state, action: PayloadAction<string>) => {
        return {
          ...state,
          registerStatus: "rejected",
          registerError: action.payload,
        };
      }
    );
  },
});

export default authSlice.reducer;
