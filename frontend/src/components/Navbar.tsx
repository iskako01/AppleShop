import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { bag } from "../assets/icons/icons";
import { AppDispatch, AppStore } from "../redux/store";
import { IregisterState } from "../type/registerType";
import { StyledLogin, StyledLogout } from "./auth/StyledAuth";
import { logoutuser } from "../features/authSlice";

const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const totalQuantity = useSelector<AppStore, number>(
    (state) => state.cart.cartTotalQuantity
  );
  const auth = useSelector<AppStore, IregisterState>((state) => state.auth);

  const handleLogoutUser = () => {
    dispatch(logoutuser());
    navigate("/login");
  };

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
        <StyledLogout onClick={() => handleLogoutUser()}>Logout</StyledLogout>
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
