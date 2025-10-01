import React from "react";
import "../Landing.css";
import leftCard from "../assets/left-card.png";
import rightCard from "../assets/right-card.png";
import goldCard from "../assets/gold-card.png";


export default function LandingPage() {
  return (
    <div className="lp-container">
      {/* Hero Section */}
      <section className="lp-hero">
      <div className="yellow-shape" style={{height:"350px"}}></div>
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
          <h2>Why link gold with tokens?</h2>
          <p>
            Gold has always been a timeless symbol of wealth and stability,
            trusted for its intrinsic value across generations. By linking it
            with digital tokens, its enduring strength is combined with modern
            technology, making gold easy to trade, store, and transfer
            digitally.
          </p>
        </div>
        <div className="lp-image">
          <img src={leftCard} alt="Gold Token" />
        </div>
      </section>

      {/* Section 3 */}
      <section className="lp-content-block">
        <div className="lp-image">
          <img src={leftCard} alt="Gold Token" style={{transform: "scaleX(-1)"}}/>
        </div>

        <div className="lp-text" style={{margin:"0 100px 0 0"}}>
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

      {/* Final CTA */}
      <section className="lp-cta">
        <div className="lp-cta-left">
          <div className="lp-icon">➜</div>
          <h1>Ready to take on many<br/> challenges</h1>
          <button className="lp-primary">See now ? →</button>
        </div>
        <div className="lp-image">
            <img src={goldCard} alt="" />
        </div>
      </section>
    </div>
  );
}
