import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { signinUser } from "../api_backend/api.js";



const SignIn = () => {
  const [username, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      const response = await signinUser({ username, password });
      console.log("Login API response:", response.data);
      const token = response.token;
      localStorage.setItem("token", token);
      alert("Signin successful!");
      window.location.href = "/dashboard";
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Signin failed");
    }
  };

  return (
    <div className="signup-container">
      <div className="yellow-shape" />
      <div className="signup-form-wrapper">
        <div className="header">
          <button className="back-button" aria-label="Back">
            &larr; Back
          </button>
          <button className="close-button" aria-label="Close">
            &times;
          </button>
        </div>
        <h2>Sign in</h2>
        <form onSubmit={handleSignin}>
          <label htmlFor="email" className="password-label">
            Username or Email 
          </label>
          <input
            id="username"
            type="text"
            placeholder="Username or Email "
            value={username}
            onChange={(e) => setEmailOrPhone(e.target.value)}
          />

          <label htmlFor="password" className="password-label">
            Password
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="signup-button">Sign in</button>

          <div className="options-row">
            <label className="remember-me">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe((prev) => !prev)}
              />
              Remember me
            </label>
            <button type="button" className="help-button">Need help?</button>
          </div>

          <p className="signin-link">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
