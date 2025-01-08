import { Link } from "react-router-dom";
import React from "react";
import "../Style/WelcomePage.css";

const WelcomePage = ({ onGuestContinue }) => {
  return (
    <div className="welcome-overlay">
      <div className="welcome-modal animate-modal">
        <h1>Welcome!</h1>
        <p>Please login to continue or choose an option below:</p>
        <div className="welcome-buttons">
          <Link to="/login">
            <button className="btn login-btn">Login</button>
          </Link>
          <Link to="/signup">
            <button className="btn signup-btn">Sign Up</button>
          </Link>
          <div className="guest-link" onClick={onGuestContinue}>
            <span>Continue as Guest</span>
            <span className="arrow">→</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
