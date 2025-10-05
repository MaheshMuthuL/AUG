import React from "react";
import "../styles/Token.css";
import leftCard from "../assets/left-card.png";
import rightCard from "../assets/right-card.png";
import goldCard from "../assets/gold-card.png";

import TokenRightCard from "../assets/token-right-card.png";

export default function Token() {
  return (
    <div className="lp-container">
      {/* DigiToken Section */}
      <section className="lp-digitoken">
        <div className="lp-left-box">
          <img src={TokenRightCard} alt="DigiToken" className="lp-digitoken-image" />
        </div>
        {/* <div className="yellow-shape-lp-left" ></div> */}        

        <div className="lp-right-box">
          <h1 className="lp-digi">DigiToken <span>?</span></h1>
          <p className="lp-description right-align">
            A digital token is a digital representation of an asset or value
            that is created and tracked on a blockchain or distributed ledger
            technology (DLT) network. These tokens can represent various things,
            such as cryptocurrencies, ownership of physical or digital assets
            (like real estate or art), access rights to a service, or even
            loyalty points.
          </p>
        </div>
      </section>

      {/* BUY GOLD Section (centered card) */}
      

      {/* Section 2 */}
     <section className="lp-content-block buygold-section">
  <div className="yellow-shape-lp-right"></div>

  <div className="lp-card lp-card-center">
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


      {/* Section 3 */}
      <section className="lp-content-block">
        <div className="lp-image">
          <img
            src={leftCard}
            alt="Gold Token"
            style={{ transform: "scaleX(-1)" }}
          />
        </div>

        <div className="lp-text" style={{ margin: "0 100px 0 0" }}>
          <h2>Why link gold with tokens?</h2>
          <p>
            Gold has always been a timeless symbol of wealth and stability,
            trusted for its intrinsic value across generations. By linking it
            with digital tokens, its enduring strength is combined with modern
            technology, making gold easy to trade, store, and transfer digitally.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="lp-cta">
        <div className="lp-cta-left">
          <div className="lp-icon">➜</div>
          <h1>
            Ready to take on many
            <br /> challenges
          </h1>
          <button className="lp-primary">See now ? →</button>
        </div>
        <div className="lp-image">
          <img src={goldCard} alt="" />
        </div>
      </section>
    </div>
  );
}