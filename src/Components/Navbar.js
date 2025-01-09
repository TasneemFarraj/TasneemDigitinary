import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { clearAuthState } from "../redux/features/auth/authSlice";
import { IoIosArrowDown } from "react-icons/io";
import { PiUserCircleLight } from "react-icons/pi";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const location = useLocation();
  const dispatch = useDispatch();

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const showCart = location.pathname === "/products" || location.pathname === "/cart";

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleLogout = () => {
    dispatch(clearAuthState());
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
          <NavLink to="/chat" className={({ isActive }) => (isActive ? "active-link" : "")}>
            Chat
          </NavLink>
        </li>
        <li>
          <NavLink to="/user-form" className={({ isActive }) => (isActive ? "active-link" : "")}>
            User Form
          </NavLink>
        </li>
        <li>
          <NavLink to="/tasks" className={({ isActive }) => (isActive ? "active-link" : "")}>
            Tasks
          </NavLink>
        </li>
        <li>
          <NavLink to="/products" className={({ isActive }) => (isActive ? "active-link" : "")}>
            Products
          </NavLink>
        </li>
        {showCart && (
          <li>
            <NavLink to="/cart" className={({ isActive }) => (isActive ? "active-link" : "")}>
              Cart {cartCount > 0 && `(${cartCount})`}
            </NavLink>
          </li>
        )}
        <div className="navbar-auth">
          {isAuthenticated ? (
            <div className="user-dropdown">
              <div className="user-avatar-container" onClick={toggleDropdown}>
                {user?.avatar ? (
                  <img src={user.avatar} alt="User Avatar" className="user-avatar" />
                ) : (
                  <PiUserCircleLight className="default-user-icon" />
                )}
                <IoIosArrowDown className={`arrow-icon ${isDropdownOpen ? "open" : ""}`} />
              </div>
              {isDropdownOpen && (
                <ul className="dropdown-menu">
                  <li>
                    <NavLink to="/account" className="manage-account-link">
                      Manage Account
                    </NavLink>
                  </li>
                  <li onClick={handleLogout}>Log Out</li>
                </ul>
              )}
            </div>
          ) : (
            <>
              <li>
                <NavLink to="/login" className={({ isActive }) => (isActive ? "active-link" : "")}>
                  <button className="auth-btn">Log In</button>
                </NavLink>
              </li>
              <li>
                <NavLink to="/signup" className={({ isActive }) => (isActive ? "active-link" : "")}>
                  <button className="auth-btn">Sign Up</button>
                </NavLink>
              </li>
            </>
          )}
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
