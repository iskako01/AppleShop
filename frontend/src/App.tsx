import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.scss";
import Cart from "./components/Cart";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";
import { productsFetch } from "./features/productSlice";
import { AppDispatch, AppStore } from "./redux/store";
import { Iproduct } from "./type/productType";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector<AppStore, Iproduct[]>(
    (state) => state.products.items
  );
  console.log(items);

  useEffect(() => {
    dispatch(productsFetch());
  }, [dispatch]);

  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/cart" element={<Cart />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/*" element={<Navigate to="/not-found" />} />
      </Routes>
    </div>
  );
}

export default App;
