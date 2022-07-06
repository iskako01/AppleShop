import React from "react";
import { Link } from "react-router-dom";
import { bag } from "../assets/icons/icons";

const Navbar = () => {
  return (
    <nav className="nav_bar">
      <Link to="/">
        <h2>Apple</h2>
      </Link>

      <Link to="/cart">
        <div className="nav_bag">
          {bag}
          <span className="bag_quantity">
            <span>0</span>
          </span>
        </div>
      </Link>
    </nav>
  );
};

export default Navbar;
