import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/">
        <i className="pi pi-home"></i>
      </Link>
      <Link to="/signal">signal</Link>
      <Link to="/check">Check</Link>
      {/* <Link to="/loading">loading</Link> */}
    </div>
  );
};

export default Navbar;
