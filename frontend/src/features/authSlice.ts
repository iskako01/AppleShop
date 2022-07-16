import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authAPI } from "../api/api";
import { Iregister } from "../type/registerType";
import jwtDecode, { JwtPayload } from "jwt-decode";
import { AxiosError } from "axios";
import { Ilogin } from "../type/authType";

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
  userLoaded: boolean;
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
  userLoaded: false,
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

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (values: Ilogin, { rejectWithValue }) => {
    try {
      console.log(values);

      await authAPI.loginUser({
        email: values.email,
        password: values.password,
        _id: values._id,
      });
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
  reducers: {
    loadUser(state: IinitialState, ) {
      const token = state.token;
	  console.log(token);
	  

      if (token) {
        const user = jwtDecode<IJwtDecode>(String(token));

        state._id = user._id;
        state.name = user.name;
        state.email = user.email;
        state.userLoaded = true;
      }
    },
    logoutuser(state: IinitialState) {
      localStorage.removeItem("token");

      return {
        ...state,
        token: "",
        email: "",
        name: "",
        password: "",
        isAuth: false,
        _id: "",
        registerStatus: "",
        registerError: "",
        loginStatus: "",
        loginError: "",
        userLoaded: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      return { ...state, registerStatus: "pending" };
    });
    builder.addCase(
      registerUser.fulfilled,
      (state, action: PayloadAction<Iregister>) => {
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
    builder.addCase(loginUser.pending, (state) => {
      return { ...state, loginStatus: "pending" };
    });
    builder.addCase(
      loginUser.fulfilled,
      (state, action: PayloadAction<any>) => {}
    );
    builder.addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
      return {
        ...state,
        loginStatus: "rejected",
        loginError: action.payload,
      };
    });
  },
});

export const { loadUser, logoutuser } = authSlice.actions;

export default authSlice.reducer;
