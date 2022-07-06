import { configureStore, combineReducers } from "@reduxjs/toolkit";
import productReducer from "../features/productSlice";

const rootReducer = combineReducers({
  products: productReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof store.getState>;

export default store;
