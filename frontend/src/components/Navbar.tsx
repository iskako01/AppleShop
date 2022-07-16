import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { bag } from "../assets/icons/icons";
import { AppStore } from "../redux/store";
import { IregisterState } from "../type/registerType";
import { StyledLogin, StyledLogout } from "./auth/StyledAuth";

const Navbar = () => {
  const totalQuantity = useSelector<AppStore, number>(
    (state) => state.cart.cartTotalQuantity
  );
  const auth = useSelector<AppStore, IregisterState>((state) => state.auth);

  return (
    <nav className="nav_bar">
      <Link to="/">
        <h2>Apple</h2>
      </Link>

      <Link to="/cart">
        <div className="nav_bag">
          {bag}
          <span className="bag_quantity">
            <span>{totalQuantity}</span>
          </span>
        </div>
      </Link>

      {auth._id ? (
        <StyledLogout>Logout</StyledLogout>
      ) : (
        <StyledLogin>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </StyledLogin>
      )}
    </nav>
  );
};

export default Navbar;
