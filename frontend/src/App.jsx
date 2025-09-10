import React, { useState } from "react";
import "./App.css";

function App() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    { q: "What are Digi Tokens?", a: "Digi Tokens are digital units of value used for secure and fast online transactions." },
    { q: "How are Digi Tokens related to gold?", a: "Some Digi Tokens are backed by physical gold, meaning each token represents a fixed amount of real gold." },
    { q: "Can I trade Digi Tokens like money?", a: "Yes, Digi Tokens can be traded, stored, or used to purchase services depending on the platform." },
    { q: "Are Digi Tokens safe to use?", a: "Yes, they use secure digital or blockchain technology to ensure safe transfers and ownership." },
    { q: "Why choose gold-backed Digi Tokens?", a: "They provide the stability of gold with the flexibility of digital currency." }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="app">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">aug</div>
        <ul className="nav-links">
          <li>Home</li>
          <li>About</li>
          <li>Digi</li>
          <li>Tokens</li>
        </ul>
        <div className="nav-buttons">
          <button className="invest-btn">D-Invest</button>
          <button className="sign-btn">Sign In</button>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="bg-shape left-shape"></div>
        <div className="hero-center">
          <h1 className="logo-text">aug</h1>
          <p className="subtext">Digi Tokens</p>
        </div>
        <div className="gold-card">
          <h4>Live Gold Price</h4>
          <p className="price">₹5,000</p>
          <span className="pergm">per gm</span>
          <span className="trend up">+1.5%</span>
        </div>
        <div className="bg-shape right-shape"></div>
      </section>

      {/* About */}
      <section className="about">
        <h2>What is AUG tokens ?</h2>
        <p className="italic">
          Digi tokens can be linked to gold by backing each token with a fixed amount of real gold.
        </p>
        <p>
          This allows people to trade or store gold digitally without holding it physically. It combines gold’s stable value with the convenience of digital transactions.
        </p>
      </section>

      {/* Products */}
      <section className="products">
        <h2>A suite of regulated digital products</h2>
        <div className="cards">
          <div className="card-wrapper left-bg">
            <div className="card">
              <h3>BLOCKCHAIN</h3>
              <p>Enable global settlement acceptance and payouts</p>
              <button className="learn-btn">Learn More</button>
            </div>
          </div>
          <div className="card-wrapper">
            <div className="card">
              <h3>TRADING INVESTMENTS</h3>
              <p>Enable global settlement acceptance and payouts</p>
              <button className="learn-btn">Learn More</button>
            </div>
          </div>
          <div className="card-wrapper">
            <div className="card">
              <h3>TOKENS</h3>
              <p>Enable global settlement acceptance and payouts</p>
              <button className="learn-btn">Learn More</button>
            </div>
          </div>
          <div className="card-wrapper right-bg">
            <div className="card">
              <h3>DIGITAL GOLD</h3>
              <p>Enable global settlement acceptance and payouts</p>
              <button className="learn-btn">Learn More</button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq">
        <h2>FAQs</h2>
        {faqs.map((item, index) => (
          <div key={index} className="faq-item" onClick={() => toggleFAQ(index)}>
            <p>{item.q}</p>
            <span>{openIndex === index ? "-" : "+"}</span>
            {openIndex === index && <p className="faq-answer">{item.a}</p>}
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="footer">
        © 2025 AUG Digi Tokens Company, LLC All Rights Reserved.
      </footer>
    </div>
  );
}

export default App;
