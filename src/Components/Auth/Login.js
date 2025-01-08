import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/features/auth/authThunks";
import { useNavigate } from "react-router-dom";
import FormInput from "../Form/FormInput"; 
import { validateField } from "../Utils/Validation";  
import Button from "../Button"

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);
  
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      email: validateField("email", credentials.email),
      password: validateField("password", credentials.password),
    };

    setErrors(newErrors);

    if (!newErrors.email && !newErrors.password) {
      dispatch(login(credentials)).then((result) => {
        if (result.meta.requestStatus === "fulfilled") {
          navigate("/products");
        } else {
          console.error("Login failed:", result.error);
        }
      });
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {status === "loading" && <p>Loading...</p>}
      {error && <p className="error">Error: {error}</p>}
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          name="email"
          value={credentials.email}
          onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
          error={errors.email}
          placeholder="Email"
          required
        />
        <FormInput
          label="Password"
          type="password"
          name="password"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          error={errors.password}
          placeholder="Password"
          required
        />
        <Button
        text="Login"
        onClick={handleSubmit}
        className="primary"
      />
      <p className="login-note">
        Don't have an account?{" "}
      <a href="/signup" className="signup-link">Sign up</a>
      </p>
      </form>
    </div>
  );
};

export default LoginPage;
