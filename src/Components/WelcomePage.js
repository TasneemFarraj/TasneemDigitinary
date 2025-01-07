import { Link } from "react-router-dom";

const WelcomePage = () => {
  return (
    <div className="welcome-container">
      <p>Please Sign in to continue</p>
      <div className="welcome-buttons">
        <Link to="/login">
          <button>Log in</button>
        </Link>
        <Link to="/signup">
          <button>Sign Up</button>
        </Link>
        <Link to="/home">
          <button>Continue as a gest</button>
        </Link>
      </div>
    </div>
  );
};

export default WelcomePage;
