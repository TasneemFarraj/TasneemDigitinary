import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../redux/features/auth/authThunks";
import { useNavigate } from "react-router-dom";
import '../../Style/Form.css';
import Button from '../Button';


const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);

  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
    name: "",
    avatar: "https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper.png",
  });

  const [validationErrors, setValidationErrors] = useState({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });

  const [rememberMe, setRememberMe] = useState(false); 

  const validateField = (name, value) => {
    switch (name) {
      case "email":
        return !/\S+@\S+\.\S+/.test(value) ? "Invalid email address" : "";
      case "password":
        return !/^[a-zA-Z0-9]+$/.test(value)
          ? "Password must contain only letters and numbers."
          : value.length < 6
          ? "Password must be at least 6 characters."
          : "";
      case "name":
        return value.trim() === "" ? "Name is required." : "";
      case "avatar":
        return value && !/^https?:\/\/.*\.(jpg|jpeg|png|gif|webp)$/.test(value)
          ? "Avatar must be a valid image URL."
          : "";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });

    setValidationErrors({
      ...validationErrors,
      [name]: validateField(name, value),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = {
      email: validateField("email", userDetails.email),
      password: validateField("password", userDetails.password),
      name: validateField("name", userDetails.name),
      avatar: validateField("avatar", userDetails.avatar),
    };

    setValidationErrors(errors);

    if (Object.values(errors).some((error) => error)) {
      return;
    }

    dispatch(signup({ ...userDetails, rememberMe })).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        navigate("/login");
      }
    });
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      {status === "loading" && <p>Loading...</p>}
      {error && <p className="form-error">Error: {error}</p>}
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <input
            type="text"
            name="name"
            className="form-input"
            placeholder="Name"
            value={userDetails.name}
            onChange={handleChange}
            required
          />
          {validationErrors.name && (
            <p className="form-error">{validationErrors.name}</p>
          )}
        </div>

        <div className="form-group">
          <input
            type="email"
            name="email"
            className="form-input"
            placeholder="Email"
            value={userDetails.email}
            onChange={handleChange}
            required
          />
          {validationErrors.email && (
            <p className="form-error">{validationErrors.email}</p>
          )}
        </div>

        <div className="form-group">
          <input
            type="password"
            name="password"
            className="form-input"
            placeholder="Password"
            value={userDetails.password}
            onChange={handleChange}
            required
          />
          {validationErrors.password && (
            <p className="form-error">{validationErrors.password}</p>
          )}
        </div>

        <div className="form-group">
          <input
            type="url"
            name="avatar"
            className="form-input"
            placeholder="Avatar URL"
            value={userDetails.avatar}
            onChange={handleChange}
          />
          {validationErrors.avatar && (
            <p className="form-error">{validationErrors.avatar}</p>
          )}
        </div>

        <div className="remember-me">
          <input 
            type="checkbox" 
            id="rememberMe" 
            className="form-input-checkbox"
            checked={rememberMe} 
            onChange={() => setRememberMe(!rememberMe)} 
          />
          <label htmlFor="rememberMe">Remember Me</label>
        </div>

        <Button
        text="SignUp"
        onClick={handleSubmit}
        className="primary"
      />
      </form>
    </div>
  );
};

export default SignupPage;
