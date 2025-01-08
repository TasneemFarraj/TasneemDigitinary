import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../redux/features/auth/authThunks";
import { useNavigate } from "react-router-dom";
import FormInput from "../Form/FormInput";  
import { validateField } from "../Utils/Validation"; 
import Button from "../Button";

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

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    name: "",
  });

  const [rememberMe, setRememberMe] = useState(false); 

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      email: validateField("email", userDetails.email),
      password: validateField("password", userDetails.password),
      name: validateField("fullName", userDetails.name),
    };

    setErrors(newErrors);

    if (!newErrors.email && !newErrors.password && !newErrors.name) {
      dispatch(signup(userDetails)).then((result) => {
        if (result.meta.requestStatus === "fulfilled") {
          navigate("/login");
        }
      });
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      {status === "loading" && <p>Loading...</p>}
      {error && <p className="error">Error: {error}</p>}
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Name"
          type="text"
          name="name"
          value={userDetails.name}
          onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
          error={errors.name}
          placeholder="Name"
          required
        />
        <FormInput
          label="Email"
          type="email"
          name="email"
          value={userDetails.email}
          onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
          error={errors.email}
          placeholder="Email"
          required
        />
        <FormInput
          label="Password"
          type="password"
          name="password"
          value={userDetails.password}
          onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
          error={errors.password}
          placeholder="Password"
          required
        />
        <FormInput
          label="Avatar URL"
          type="url"
          name="avatar"
          value={userDetails.avatar}
          onChange={(e) => setUserDetails({ ...userDetails, avatar: e.target.value })}
          placeholder="Avatar URL (optional)"
        />
        
        <div className="remember-me">
          <input 
            type="checkbox" 
            id="rememberMe" 
            checked={rememberMe} 
            onChange={() => setRememberMe(!rememberMe)} 
          />
          <label htmlFor="rememberMe">Remember Me</label>
        </div>

        <Button
          text="Signup"
          onClick={handleSubmit}
          className="primary"
        />
      </form>
    </div>
  );
};

export default SignupPage;
