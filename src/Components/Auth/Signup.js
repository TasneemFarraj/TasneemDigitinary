import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../redux/features/auth/authThunks";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);

  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
    name: "",
    avatar: "https://via.placeholder.com/150",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!/^[a-zA-Z0-9]+$/.test(userDetails.password)) {
      alert("Password must contain only letters and numbers.");
      return;
    }

    dispatch(signup(userDetails)).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        navigate("/login"); 
      }
    });
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      {status === "loading" && <p>Loading...</p>}
      {error && <p className="error">Error: {error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={userDetails.name}
          onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={userDetails.email}
          onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={userDetails.password}
          onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
          required
        />
        <input
          type="url"
          placeholder="Avatar URL"
          value={userDetails.avatar}
          onChange={(e) => setUserDetails({ ...userDetails, avatar: e.target.value })}
        />
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <button onClick={() => navigate("/login")}>Log in</button>
      </p>
    </div>
  );
};

export default SignupPage;

