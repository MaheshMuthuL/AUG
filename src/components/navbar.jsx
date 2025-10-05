// Navbar.jsx
import React, { useState, useEffect } from "react";
import { Menu, X, HelpCircle, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userEmail, setUserEmail] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log(decoded);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
          console.log("Token has expired");
          localStorage.removeItem("token");
          setUserEmail(null);
        } else {
          setUserEmail(decoded.name); // Assuming the token payload has an 'email' field
        }
      } catch (err) {
        console.error("Invalid token:", err);
        localStorage.removeItem("token");
        setUserEmail(null);
      }
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const handleSignOut = () => {
    localStorage.removeItem("token");
    setUserEmail(null);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Left: Logo */}
        <div className="nav-left">
          <Link to="/" className="logo-text">AUG</Link>
        </div>

        {/* Center: Menu Links */}
        <div className={`nav-center ${isMenuOpen ? "active" : ""}`}>
          <Link to="/" className="nav-link" onClick={toggleMenu}>Home</Link>
          <Link to="/digi" className="nav-link" onClick={toggleMenu}>Digi</Link>
          <Link to="/token" className="nav-link" onClick={toggleMenu}>Tokens</Link>
          <Link to="/about" className="nav-link" onClick={toggleMenu}>About</Link>
        </div>

        {/* Right: Buttons + Icon */}
        <div className="nav-right">
          {/* Dynamically render sign-in or user info/sign-out */}
          {userEmail ? (
            <>
              <span className="nav-user">{userEmail}</span>
              <button className="nav-btn-secondary" onClick={handleSignOut}>
                <LogOut size={20} />
              </button>
            </>
          ) : (
            <Link to="/signin" className="nav-btn-secondary">
              Sign In
            </Link>
          )}

          {/* Contact Us link */}
          <Link to="/contact" className="nav-btn-secondary">
            Contact Us
          </Link>
          
          {/* Help icon link */}
          <Link to="/help" className="help-btn">
            <HelpCircle size={27} />
          </Link>
        </div>

        {/* Hamburger for mobile */}
        <div className="hamburger" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;