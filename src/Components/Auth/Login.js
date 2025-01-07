import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/features/auth/authThunks";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);
  

  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login credentials:", credentials); 
    dispatch(login(credentials)).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        navigate("/products");
      } else {
        console.error("Login failed:", result.error);
      }
    });
  };
  

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {status === "loading" && <p>Loading...</p>}
      {error && <p className="error">Error: {error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={credentials.email}
          onChange={(e) =>
            setCredentials({ ...credentials, email: e.target.value })
          }
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account?{" "}
        <button onClick={() => navigate("/signup")}>Sign up</button>
      </p>
    </div>
  );
};

export default LoginPage;
