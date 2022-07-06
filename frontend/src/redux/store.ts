import { configureStore, combineReducers } from "@reduxjs/toolkit";
import productReducer from "../features/productSlice";


const rootReducer = combineReducers({
  products: productReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
