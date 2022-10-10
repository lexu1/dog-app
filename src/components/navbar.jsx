import React from "react";

import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        Home
      </Link>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <Link className="nav-link" to="/myImages">
              My images
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/upload">
              Upload
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/inf-scroll">
              Infinite Scroll
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/inf-scroll-my-img">
              Inf Scroll on my imgs
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
