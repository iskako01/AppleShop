import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.scss";
import Cart from "./components/Cart";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";

function App() {
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
