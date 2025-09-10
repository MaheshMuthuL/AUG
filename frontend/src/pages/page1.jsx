import React, { useEffect, useState } from "react";
import "./page1.css";

const Page1 = () => {
  const [goldPrice, setGoldPrice] = useState("$0.00");

  useEffect(() => {
    const fetchGoldPrice = async () => {
      try {
        const response = await fetch("https://api.metals.live/v1/spot/gold");
        const data = await response.json();
        setGoldPrice(`$${data[0].price.toFixed(2)}`);
      } catch (error) {
        console.error("Error fetching gold price:", error);
        setGoldPrice("$0.00");
      }
    };
    fetchGoldPrice();
  }, []);

  const faqs = [
    {
      q: "What is AUG?",
      a: "AUG is a suite of digital products for secure and stable investments.",
    },
    {
      q: "What is AUG token?",
      a: "AUG token is a digital token issued by AUG and backed by a fixed amount of gold.",
    },
    {
      q: "What is AUG blockchain?",
      a: "AUG blockchain is a private blockchain used to issue AUG tokens and maintain the ledger of transactions.",
    },
    {
      q: "What is AUG trading platform?",
      a: "AUG trading platform is used to trade AUG tokens and other digital assets.",
    },
    {
      q: "What is AUG digital gold?",
      a: "AUG digital gold is backed by physical gold and can be traded on the AUG platform.",
    },
  ];

  return (
    <div className="page1-container">
      {/* Navbar */}
      <nav className="page1-navbar">
        <div className="page1-logo">AUG</div>
        <ul className="page1-nav-links">
          <li>Home</li>
          <li>About</li>
          <li>Our Tokens</li>
          <li>More</li>
        </ul>
      </nav>

      {/* Hero Section */}
      <div className="page1-section-wrapper">
        <section className="page1-hero">
          <div className="page1-token-display">
            <h1 className="page1-token-title">AUG</h1>
            <p className="page1-token-price">{goldPrice}</p>
            <div className="page1-chart-placeholder">📈</div>
          </div>
        </section>
      </div>

      {/* About Section */}
      <div className="page1-section-wrapper">
        <section className="page1-about">
          <h2>What is AUG tokens?</h2>
          <p>
            They have a stable value for purchasing each product in the suite of
            regulated digital products.
          </p>
          <p>
            They are backed by a fixed amount of gold and are issued by AUG.
          </p>
          <p>
            They maintain a stable value with the convenience of blockchain.
          </p>
        </section>
      </div>

      {/* Products Section */}
      <div className="page1-section-wrapper">
        <section className="page1-products">
          <h2>A suite of regulated digital products</h2>
          <div className="page1-product-grid">
            <div className="page1-product-card">
              <h3>BLOCKCHAIN</h3>
              <p>
                AUG blockchain is a private blockchain that is used to issue AUG
                tokens and maintain the ledger of transactions.
              </p>
            </div>
            <div className="page1-product-card">
              <h3>TRADING INVESTMENTS</h3>
              <p>
                AUG trading platform is used to trade AUG tokens and other digital
                assets.
              </p>
            </div>
            <div className="page1-product-card">
              <h3>TOKENS</h3>
              <p>
                AUG tokens are used to purchase digital products on the AUG
                platform.
              </p>
            </div>
            <div className="page1-product-card">
              <h3>DIGITAL GOLD</h3>
              <p>
                AUG digital gold is backed by physical gold and can be traded on
                the AUG platform.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* FAQ Section */}
      <div className="page1-section-wrapper">
        <section className="page1-faq">
          <h2>FAQs</h2>
          {faqs.map((item, index) => (
            <div key={index} className="page1-faq-item">
              <p className="page1-faq-question">{item.q}</p>
              <p className="page1-faq-answer">{item.a}</p>
            </div>
          ))}
        </section>
      </div>

      {/* Footer */}
      <footer className="page1-footer">
        © 2023 All rights reserved AUG Digital Products. All Rights Reserved.
      </footer>
    </div>
  );
};

export default Page1;