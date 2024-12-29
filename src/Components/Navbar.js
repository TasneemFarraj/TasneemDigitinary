import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <NavLink to="/">
          <img src="\DigitLogo.png" alt="Logo" className="logo-image" />
        </NavLink>
      </div>
      <ul className="navbar-links">
        <li>
          <NavLink
            to="/chat"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Chat
          </NavLink>
        </li>
        
        <li>
          <NavLink
            to="/user-form"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            User Form
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/tasks"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Tasks
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
