// Navbar.jsx
import React, { useState } from "react";
import { Menu, X, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Left: Logo */}
        <div className="nav-left">
          <span className="logo-text">aug</span>
        </div>

        {/* Center: Menu Links */}
        <div className={`nav-center ${isMenuOpen ? "active" : ""}`}>
          <a href="#" className="nav-link">Home</a>
          <a href="#" className="nav-link">About</a>
          <a href="#" className="nav-link">Digi</a>
          <a href="#" className="nav-link">Tokens</a>
        </div>

        {/* Right: Buttons + Icon */}
        <div className="nav-right">
          <button className="nav-btn">Contact - Us</button>
          <button className="nav-btn-secondary">Sign in</button>
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
