import React, { useState, useEffect } from "react";
import "../styles/Token.css";
import leftCard from "../assets/left-card.png";
import goldCard from "../assets/gold-card.png";
import TokenRightCard from "../assets/token-right-card.png";

export default function Token() {
  const [activeForm, setActiveForm] = useState("rs");
  const [amount, setAmount] = useState("");
  const [grams, setGrams] = useState("");
  const [loading, setLoading] = useState(false);
  const [walletAddress, setWalletAddress] = useState(null); // ✅ to store MetaMask address

  // 🟡 Example API call (mocked)
  useEffect(() => {
    // Replace this with your real API call
    async function fetchUserWallet() {
      try {
        // Example: assume we get null from API if not connected
        const response = await fetch("https://example.com/api/user-wallet");
        const data = await response.json();
        if (data.walletAddress) {
          setWalletAddress(data.walletAddress);
        } else {
          setWalletAddress(null);
        }
      } catch (error) {
        console.error("Error fetching wallet:", error);
        setWalletAddress(null);
      }
    }

    fetchUserWallet();
  }, []);

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);
    setGrams((value / 7000).toFixed(3));
  };

  const handleGramsChange = (e) => {
    const value = e.target.value;
    setGrams(value);
    setAmount((value * 7000).toFixed(2));
  };

  // 🟡 Connect MetaMask
  const handleConnectWallet = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        const userAddress = accounts[0];
        setWalletAddress(userAddress);
        console.log(userAddress);
        // ✅ POST it to your API
        const response = await fetch("https://example.com/api/connect-wallet", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ address: userAddress }),
        });

        const result = await response.json();
        console.log("Wallet connected:", result);
      } else {
        alert("MetaMask not detected. Please install MetaMask extension.");
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  const handleBuyNow = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first!");
      window.location.href = "/signin";
      return;
    }

    setLoading(true);
    setTimeout(() => {
      alert("Purchase Successful!");
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="lp-container">
      {/* DigiToken Section */}
      <section className="lp-digitoken">
        <div className="lp-left-box">
          <img src={TokenRightCard} alt="DigiToken" className="lp-digitoken-image" />
        </div>

        <div className="lp-right-box">
          <h1 className="lp-digi">
            DigiToken <span>?</span>
          </h1>
          <p className="lp-description right-align">
            A digital token is a digital representation of an asset or value that is
            created and tracked on a blockchain or distributed ledger technology (DLT)
            network. These tokens can represent various things, such as cryptocurrencies,
            ownership of physical or digital assets (like real estate or art), access
            rights to a service, or even loyalty points.
          </p>
        </div>
      </section>

      {/* BUY GOLD Section */}
      <section className="lp-content-block buygold-section">
        <div className="yellow-shape-lp-right"></div>

        <div className="lp-hero-right lp-card">
          {/* Toggle Switch */}
          <div className="toggle-wrapper">
            <div className={`toggle-slider ${activeForm}`}></div>
            <button
              className={`toggle-btn ${activeForm === "rs" ? "active" : ""}`}
              onClick={() => setActiveForm("rs")}
              disabled={loading}
            >
              Buy in ₹
            </button>
            <button
              className={`toggle-btn ${activeForm === "grams" ? "active" : ""}`}
              onClick={() => setActiveForm("grams")}
              disabled={loading}
            >
              Buy in Grams
            </button>
          </div>

          {/* Form Container */}
          <div className="form-box">
            {activeForm === "rs" ? (
              <div className="form-content fade-in">
                <div className="input-row">
                  <div className="input-group">
                    <label>Rupees (₹)</label>
                    <input
                      type="number"
                      placeholder="Enter Amount"
                      min="0"
                      value={amount}
                      onChange={handleAmountChange}
                      disabled={loading}
                    />
                  </div>
                  <div className="input-group">
                    <label>Grams</label>
                    <div className="display-box">{grams || "0"}</div>
                  </div>
                </div>

                {/* ✅ Conditional Button */}
                {!walletAddress ? (
                  <button className="lp-connect-wallet" onClick={handleConnectWallet}>
                    Connect to Wallet
                  </button>
                ) : (
                  <button className="lp-primary" onClick={handleBuyNow} disabled={loading}>
                    {loading ? "Processing..." : "Buy Now"}
                  </button>
                )}
              </div>
            ) : (
              <div className="form-content fade-in">
                <div className="input-row">
                  <div className="input-group">
                    <label>Grams</label>
                    <input
                      type="number"
                      min="0"
                      placeholder="Enter Grams"
                      value={grams}
                      onChange={handleGramsChange}
                      disabled={loading}
                    />
                  </div>
                  <div className="input-group">
                    <label>Rupees (₹)</label>
                    <div className="display-box">{amount || "0"}</div>
                  </div>
                </div>

                {!walletAddress ? (
                  <button className="lp-connect-wallet" onClick={handleConnectWallet}>
                    Connect to Wallet
                  </button>
                ) : (
                  <button className="lp-primary" onClick={handleBuyNow} disabled={loading}>
                    {loading ? (
                      <div className="spinner-wrapper">
                        <div className="spinner"></div>
                        <span>Processing...</span>
                      </div>
                    ) : (
                      "Buy Now"
                    )}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Section 3 */}
      <section className="lp-content-block">
        <div className="lp-image">
          <img src={leftCard} alt="Gold Token" style={{ transform: "scaleX(-1)" }} />
        </div>

        <div className="lp-text" style={{ margin: "0 100px 0 0" }}>
          <h2>Why link gold with tokens?</h2>
          <p>
            Gold has always been a timeless symbol of wealth and stability, trusted for
            its intrinsic value across generations. By linking it with digital tokens,
            its enduring strength is combined with modern technology, making gold easy to
            trade, store, and transfer digitally.
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
          <button className="lp-primary">See now →</button>
        </div>
        <div className="lp-image">
          <img src={goldCard} alt="" />
        </div>
      </section>
    </div>
  );
}
