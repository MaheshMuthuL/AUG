import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { signupUser, sendOtp, verifyOtp } from "../api_backend/api.js";



const SignUp = () => {
  const [name, setName] = useState("");
//  const [username, setUsername] = useState("");
  const [username, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [passwordValid, setPasswordValid] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [otpMessage, setOtpMessage] = useState("");
  const validatePassword = (pass) => {
    const minLength = pass.length >= 8;
    let conditions = 0;
    if (/[a-z]/.test(pass)) conditions++;
    if (/[A-Z]/.test(pass)) conditions++;
    if (/[0-9]/.test(pass)) conditions++;
    if (/[^A-Za-z0-9]/.test(pass)) conditions++;
    const threeOfFour = conditions >= 3;
    const noTriple = !/(.)\1\1/.test(pass);
    return minLength && threeOfFour && noTriple;
  };

  const handlePasswordChange = (e) => {
    const val = e.target.value;
    setPassword(val);
    setPasswordValid(validatePassword(val));
  };
const validateForm = () => {
  if (!name.trim()) return "Name is required";
  
  if (!username.trim()) return "Email is required";
  if (!password.trim()) return "Password is required";
  if (!confirmPassword.trim()) return "Please confirm your password";
  if (password !== confirmPassword) return "Passwords do not match";
  if (!phoneNumber.trim()) return "Phone number is required";
  if (!address.trim()) return "Address is required";
  if (!emailVerified) return "Please verify your email before signing up";
  return null; // ✅ No errors
};

  const handleSignup = async (e) => {
    e.preventDefault();
    const errorMessage = validateForm();
     if (errorMessage) {
    alert(errorMessage);
    return;
  }
    if (!passwordValid) {
      alert("Password does not meet requirements!");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const response = await signupUser({
        name,
        username,      
        password,
        phoneNumber,
        address,
      });
      alert("Signup successful!");
      window.location.href = "/signin";
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Signup failed");
    }
  };
  

  const handleSendOtp = async () => {
  if (!username) return alert("Enter your email first");

  try {
    await sendOtp({ email:username}); // API call to backend
    setOtpSent(true);
    setOtpMessage("OTP sent to your email!");
  } catch (error) {
    setOtpMessage("Failed to send OTP. Try again.");
  }
};

const handleVerifyOtp = async () => {
  if (!otp) return alert("Enter the OTP");

  try {
    const res = await verifyOtp({ email: username, otp });
    if (res.success){
      setEmailVerified(true);
      setOtpMessage("✅ Email verified!");
      setOtpSent(false);  // hide OTP input
    } else {
      setOtpMessage("❌ Incorrect OTP!");
    }
  } catch (error) {
    setOtpMessage("Error verifying OTP");
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
        <h2>Sign Up</h2>
        <form onSubmit={handleSignup}>
          <label htmlFor="name" className="password-label">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          
          {/* <label htmlFor="username" className="password-label">Username</label>
          <input
            id="username"
            type="text"
            placeholder="Choose a username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          /> */}
          

          <label htmlFor="username" className="password-label">
 Username or Email
  {!emailVerified && (
    <button type="button" onClick={handleSendOtp} className="toggle-password">
      Verify
    </button>
  )}
</label>
<input
  id="username"
  type="email"
  placeholder="Email"
  value={username}
  onChange={(e) => setEmailOrPhone(e.target.value)}
  disabled={emailVerified}  // prevent editing after verification
/>

{otpSent && (
  <div style={{ marginTop: "6px" }}>
    <input
      type="text"
      placeholder="Enter OTP"
      value={otp}
      onChange={(e) => setOtp(e.target.value)}
      style={{ width: "60%", marginRight: "8px" }}
    />
    <button type="button" onClick={handleVerifyOtp}>
      Confirm
    </button>
    <p>{otpMessage}</p>
  </div>
)}

{emailVerified && <p style={{ color: "green", fontSize: "13px" }}>✅ Email verified</p>}


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
            onChange={handlePasswordChange}
          />

          <div className="password-rules">
            <p>Password must contain:</p>
            <ul>
              <li>At least 8 characters</li>
              <li>
                At least 3 of the following:
                <ul>
                  <li>Lowercase letters (a-z)</li>
                  <li>Uppercase letters (A-Z)</li>
                  <li>Numbers (0-9)</li>
                  <li>Special characters (e.g. !@#$%^&*)</li>
                </ul>
              </li>
              <li>No more than 2 identical characters in a row</li>
            </ul>
          </div>

          {password.length > 0 && (
            <div className="password-status">
              {passwordValid ? (
                <span className="success">✅ Password valid</span>
              ) : (
                <span className="error">❌ Password invalid</span>
              )}
            </div>
          )}

          <label htmlFor="confirmPassword" className="password-label">
            Re-enter Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Re-enter password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <label htmlFor="phoneNumber" className="password-label">Phone Number</label>
          <input
            id="phoneNumber"
            type="text"
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={(e) => setPhone(e.target.value)}
          />

          <label htmlFor="address" className="password-label">Address</label>
          <textarea
            id="address"
            placeholder="Enter your address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <button type="submit" className="signup-button" disabled={!emailVerified}>Sign up</button>

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
            Have an account? <Link to="/signin">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
