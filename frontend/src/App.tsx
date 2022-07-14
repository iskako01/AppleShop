import React from "react";
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

function App() {
  return (
    <div className="App">
      <ToastContainer position="bottom-left" />
      <Navbar />
      {/* <Router> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="/*" element={<Navigate to="/not-found" />} />
      </Routes>
      {/* </Router> */}
    </div>
  );
}

export default App;
