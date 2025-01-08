import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const showCart = location.pathname === "/products" || location.pathname === "/cart";

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <NavLink to="/">
          <img src="/DigitLogo.png" alt="Logo" className="logo-image" />
        </NavLink>
        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>
      </div>

      <ul className={`navbar-links ${isMenuOpen ? "open" : ""}`}>
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
        <li>
          <NavLink
            to="/products"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Products
          </NavLink>
        </li>
        {showCart && (
          <li>
            <NavLink
              to="/cart"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Cart {cartCount > 0 && `(${cartCount})`}
            </NavLink>
          </li>
        )}
        <div className="navbar-auth">
          <li>
            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              <button className="auth-btn">LogIn</button>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/signup"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              <button className="auth-btn">SignUp</button>
            </NavLink>
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
