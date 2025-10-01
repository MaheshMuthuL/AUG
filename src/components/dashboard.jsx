import React, { useState } from "react";
import { Menu, X, TrendingUp } from "lucide-react";
import "../Dashboard.css";
import Navbar from "./navbar.jsx";
import GoldRateWidget from "../components/GoldRateWidget";
import Footer from "./footer.jsx";
const Dashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="dashboard">
      {/* Navigation */}
      {/* <Navbar /> */}
      {/* Yellow Containers */}
      <div className="yellow-shape"></div>
      <div className="yellow-shape-right"></div>
      <div className="yellow-shape-1"></div>
      <div className="yellow-shape-right-1"></div>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content-center">
            <h1 className="hero-title">
              <span className="aug-text">AUG</span>
              <span className="subtitle">Digital Tokens</span>
            </h1>
          </div>
        </div>
      </section>
      <GoldRateWidget />
      {/* About Section */}
      <section className="about">
        <div className="about-container">
          <div className="about-text">
            <h2>What is AUG tokens ?</h2>
            <p>
              Our tokens can be used to get by staking your token with a fixed
              amount of one year. This allows people to trade at once and
              quickly without having to wait for confirmations. Our tokens are
              fully compatible with the convenience of digital transactions.
            </p>
          </div>
        </div>
      </section>
      {/* Products Section */}
      <section className="products">
        <div className="products-container">
          <h2 className="products-title">
            A suite of regulated digital products
          </h2>

          <div className="products-grid">
            <div className="product-card">
              <div className="card-header">
                <div className="card-placeholder"></div>
              </div>
              <div className="card-content">
                <h3>BLOCKCHAIN</h3>
                <p>
                  Secure and transparent blockchain technology for all your
                  digital transactions.
                </p>
                <button className="card-btn">Learn More</button>
              </div>
            </div>

            <div className="product-card">
              <div className="card-header">
                <div className="card-placeholder"></div>
              </div>
              <div className="card-content">
                <h3>TRADING INVESTMENTS</h3>
                <p>
                  Smart trading solutions and investment opportunities for
                  maximum returns.
                </p>
                <button className="card-btn">Learn More</button>
              </div>
            </div>

            <div className="product-card">
              <div className="card-header">
                <div className="card-placeholder"></div>
              </div>
              <div className="card-content">
                <h3>TOKENS</h3>
                <p>
                  Create, manage, and trade digital tokens with our
                  comprehensive platform.
                </p>
                <button className="card-btn">Learn More</button>
              </div>
            </div>

            <div className="product-card">
              <div className="card-header">
                <div className="card-placeholder"></div>
              </div>
              <div className="card-content">
                <h3>DIGITAL GOLD</h3>
                <p>
                  Invest in digital gold backed by real precious metals for
                  stable returns.
                </p>
                <button className="card-btn">Learn More</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* FAQ Section */}
      <section className="faq">
        <div className="faq-container">
          <h2>FAQs</h2>
          <div className="faq-list">
            <div className="faq-item">
              <h4>Q: What are AUG tokens?</h4>
              <p>
                A: AUG tokens are digital assets that can be used for staking
                and trading.
              </p>
            </div>
            <div className="faq-item">
              <h4>Q: How do I buy AUG tokens?</h4>
              <p>
                A: You can purchase AUG tokens through our secure trading
                platform.
              </p>
            </div>
            <div className="faq-item">
              <h4>Q: What is the minimum investment?</h4>
              <p>
                A: The minimum investment varies depending on the product you
                choose.
              </p>
            </div>
            <div className="faq-item">
              <h4>Q: Are AUG tokens secure?</h4>
              <p>
                A: Yes, our tokens are built on secure blockchain technology.
              </p>
            </div>
            <div className="faq-item">
              <h4>Q: How can I contact support?</h4>
              <p>
                A: You can reach our support team through the contact form or
                email.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
