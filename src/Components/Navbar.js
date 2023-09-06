import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import "./Navbar.css";

function Navbar() {
  const [account, setAccount] = useState();

  return (
    <div>
      <nav id="nav">
        <div className="container flex">
          {/* Socialstar logo with a link to the home page */}
          <NavLink to="/" style={{ textDecoration: "none" }}>
            <h2 style={{ color: "white" }}> Socialstar ✨</h2>
          </NavLink>

          {/* Navigation links and user account button */}
          <div className="links">
            {/* Home link with HomeIcon */}
            <NavLink to="/">
              <a href=" ">
                <HomeIcon />
              </a>
            </NavLink>

            {/* Search link with SearchOutlinedIcon */}
            <NavLink to="/Search">
              <a href=" ">
                <SearchOutlinedIcon />
              </a>
            </NavLink>

            {/* Profile link with PersonOutlineOutlinedIcon */}
            <NavLink to="/profile">
              <a href=" ">
                <PersonOutlineOutlinedIcon />
              </a>
            </NavLink>

            {/* User account button */}
            <button style={{ textTransform: "capitalize" }}>
              {" "}
              Shabbiryk.eth
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
