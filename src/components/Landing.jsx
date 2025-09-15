import React from "react";
import "../Landing.css";

export default function LandingPage() {
  return (
    <div className="lp-container">
      {/* Hero Section */}
      <section className="lp-hero">
      <div className="yellow-shape" ></div>
        <div className="lp-hero-left">
          <h1>Ready to <br/>take on many<br/> challenges</h1>
        </div>
        <div className="lp-hero-right lp-card">
          <div className="lp-card-header">
            <button className="lp-active">Buy in ₹</button>
            <button>Buy in Grams</button>
          </div>
          <div className="lp-card-body">
            <input type="text" placeholder="Amount" />
            <input type="text" placeholder="Grams" />
            <button className="lp-primary">Buy Now</button>
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section className="lp-content-block">
        <div className="lp-text">
            <div className="yellow-shape-right"></div>
          <h2>Why link gold with tokens?</h2>
          <p>
            Gold has always been a timeless symbol of wealth and stability,
            trusted for its intrinsic value across generations. By linking it
            with digital tokens, its enduring strength is combined with modern
            technology, making gold easy to trade, store, and transfer
            digitally.
          </p>
        </div>

      </section>

      {/* Section 3 */}
      <section className="lp-content-block lp-reverse">
        <div className="lp-text">
          <h2>Why link gold with tokens?</h2>
          <p>
            Gold-backed tokens combine the traditional value of gold with the
            modern efficiency of blockchain technology. By linking digital
            tokens to physical gold reserves, these assets offer stability,
            accessibility, and trust, allowing investors to trade or hold
            fractional ownership of gold with ease. This fusion bridges the gap
            between physical wealth and digital innovation.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="lp-cta">
        <div className="lp-cta-left">
          <div className="lp-icon">➜</div>
          <h2>Ready to take on many challenges</h2>
          <button className="lp-primary">See now ? →</button>
        </div>
        <div className="lp-cta-right">
          <div className="lp-card lp-small-card">$0.00</div>
        </div>
      </section>
    </div>
  );
}
