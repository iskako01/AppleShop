import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authAPI } from "../api/api";
import { Iregister } from "../type/registerType";
import jwtDecode, { JwtPayload } from "jwt-decode";
import { AxiosError } from "axios";

interface IinitialState {
  token: string | Iregister;
  email: string;
  password: string;
  name: string;
  isAuth: boolean;
  _id: string;
  registerStatus: string;
  registerError: string;
  loginStatus: string;
  loginError: string;
}
interface IknownError {
  errorMessage: string;
}
interface IJwtDecode {
  email: string;
  iat: number;
  name: string;
  _id: string;
}

const initialState: IinitialState = {
  token: localStorage.getItem("token") || "",
  email: "",
  name: "",
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
      console.log(values);

      const token = await authAPI.registerUser({
        name: values.name,
        email: values.email,
        password: values.password,
        _id: values._id,
      });

      localStorage.setItem("token", token.data);

      return token.data;
    } catch (error) {
      const err = error as AxiosError;
      if (err.response) {
        console.log(err.response.status);
        console.log(err.response.data);
      }
      return rejectWithValue(err.response?.data);
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
      (state, action: PayloadAction<Iregister>) => {
        // const user = action.payload;
        const user = jwtDecode<IJwtDecode>(String(action.payload));
        if (action.payload) {
          console.log(user);
          state.token = action.payload;
          state._id = user._id;
          state.name = user.name;
          state.password = String(user.iat);
          state.email = user.email;
          state.registerStatus = "success";
        } else return state;
        // if (action.payload) {

        //   return {
        //     ...state,
        //     token: action.payload,
        //     // name: user.name,
        //     // email: user.email,
        //     // password: user.password,
        //     // _id: user._id,
        //     registerStatus: "success",
        //   };
        // } else return state;
      }
    );
    builder.addCase(
      registerUser.rejected,
      (state, action: PayloadAction<any>) => {
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
