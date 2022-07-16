import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Route,
  Routes,
  Navigate,
  BrowserRouter as Router,
} from "react-router-dom";
import "./App.scss";
import Cart from "./components/Cart";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import { AppDispatch } from "./redux/store";
import { loadUser } from "./features/authSlice";

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  return (
    <div className="App">
      <ToastContainer position="bottom-left" />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="/*" element={<Navigate to="/not-found" />} />
      </Routes>
    </div>
  );
}

export default App;
