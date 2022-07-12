import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { bag } from "../assets/icons/icons";
import { AppStore } from "../redux/store";
const Navbar = () => {
  const totalQuantity = useSelector<AppStore, number>(
    (state) => state.cart.cartTotalQuantity
  );

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
    </nav>
  );
};

export default Navbar;
