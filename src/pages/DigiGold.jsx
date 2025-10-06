import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // if you’re using this elsewhere
import "../DigiGold.css";
import leftCard from "../assets/left-card.png";
import goldCard from "../assets/gold-card.png";

export default function LandingPage() {
  const [activeForm, setActiveForm] = useState("rs");
  const [amount, setAmount] = useState("");
  const [grams, setGrams] = useState("");
  const [goldRate, setGoldRate] = useState(6000); // fallback default
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");
  const [inputsDisabled, setInputsDisabled] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailedModal, setShowFailedModal] = useState(false);
  const [showWaitingModal, setShowWaitingModal] = useState(false);



  const API_BASE = "https://unconglomerated-loreta-nonconsoling.ngrok-free.dev";

  // ✅ Fetch live gold price
  useEffect(() => {
    const fetchGoldPrice = async () => {
      try {
        const res = await fetch("https://www.goldapi.io/api/XAU/INR", {
          headers: {
            "x-access-token": "goldapi-1nx7c9ismfmgh3a1-io", // your API key
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();
        console.log("API Response:", data);

        if (data && data.price) {
          const perGram = data.price / 31.1035; // ounce → gram
          setGoldRate(perGram);
          console.log("Gold Price (1g) [Market Rate]: ₹", perGram.toFixed(2));
          console.log(
            "Gold Price (1g) [With 3% Fee]: ₹",
            (perGram * 1.03).toFixed(2)
          );
        }
      } catch (err) {
        console.error("Error fetching gold price:", err);
      }
    };

    fetchGoldPrice();
  }, []);

  const effectiveRate = goldRate * 1.03;

  // ✅ Handle typing in ₹
  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);
    if (!isNaN(value) && value !== "") {
      setGrams((value / effectiveRate).toFixed(3));
    } else {
      setGrams("");
    }
  };

  // ✅ Handle typing in grams
  const handleGramsChange = (e) => {
    const value = e.target.value;
    setGrams(value);
    if (!isNaN(value) && value !== "") {
      setAmount((value * effectiveRate).toFixed(2));
    } else {
      setAmount("");
    }
  };

  // ✅ Poll payment status
  const checkPaymentStatus = async (orderId) => {
  try {
    setShowWaitingModal(true); // show waiting modal

    const token = localStorage.getItem("token");
    if (!token) return;

    const res = await fetch(`${API_BASE}/api/gold/status/${orderId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });

    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      console.error("Non-JSON response:", text);
      return;
    }

    if (data.status === "CAPTURED") {
      setPaymentStatus("✅ Payment successful!");
      setShowWaitingModal(false);
      setShowSuccessModal(true);
    } else if (data.status === "FAILED") {
      setPaymentStatus("❌ Payment failed!");
      setShowWaitingModal(false);
      setShowFailedModal(true);
    } else {
      setPaymentStatus("⏳ Waiting for payment...");
      setTimeout(() => checkPaymentStatus(orderId), 3000);
    }
  } catch (err) {
    console.error("Error checking status:", err);
    setShowWaitingModal(false);
  }
};


  // ✅ Handle Buy Now
const handleBuyNow = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first!");
      window.location.href = "/signin";
      return;
    }

    if (!amount || !grams || isNaN(amount) || isNaN(grams)) {
      alert("Please enter a valid amount or grams before buying.");
      return;
    }

    setLoading(true);
    setInputsDisabled(true); // ⛔ disable inputs

    const payload = { grams: parseFloat(grams) };
    const apiUrl = `${API_BASE}/api/gold/buy?amount=${parseFloat(amount)}`;

    console.log("📤 Sending Buy Request:", apiUrl, payload);

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    let result;
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      result = await response.json();
    } else {
      result = await response.text();
    }

    setLoading(false);

    if (!response.ok) throw new Error(result.message || "Purchase failed");

    console.log("✅ Server Response:", result);

    const orderId = result.OrderId || result.orderId;
    if (!orderId) {
      alert("No Order ID received from server!");
      return;
    }

    // ✅ Launch Razorpay
    const options = {
      key: "rzp_test_REd2QhwIgG7gTq",
      amount: parseFloat(amount) * 100,
      currency: "INR",
      name: "Digital Gold Store",
      description: "Gold Purchase",
      order_id: orderId,
      handler: function (response) {
        console.log("💳 Payment Success:", response);
        setPaymentStatus("⏳ Verifying payment...");
        checkPaymentStatus(orderId);
        setInputsDisabled(false); // ✅ re-enable inputs after closing Razorpay
      },
      modal: {
        ondismiss: () => {
          setInputsDisabled(false); // ✅ also re-enable if user closes Razorpay
        },
      },
      prefill: {
        name: "Test User",
        email: "test@example.com",
        contact: "9999999999",
      },
      theme: { color: "#3399cc" },
    };

    if (window.Razorpay) {
      const rzp = new window.Razorpay(options);
      rzp.open();
    } else {
      console.error("❌ Razorpay SDK not loaded.");
      setInputsDisabled(false);
    }
  } catch (error) {
    setLoading(false);
    setInputsDisabled(false);
    console.error("Buy Now Error:", error);
    alert(error.message || "Something went wrong!");
  }
};


  return (
<div className="lp-container">
  {/* Hero Section */}
  <section className="lp-hero">
    <div className="yellow-shape" style={{ height: "350px" }}></div>
    <div className="lp-hero-left">
      <h1>
        Ready to <br /> take on many
        <br /> challenges
      </h1>
    </div>

    <div className="lp-hero-right lp-card">
      {/* Toggle Switch */}
      <div className="toggle-wrapper">
        <div className={`toggle-slider ${activeForm}`}></div>
        <button
          className={`toggle-btn ${activeForm === "rs" ? "active" : ""}`}
          onClick={() => setActiveForm("rs")}
          disabled={loading} // ✅ prevent switching during process
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
                  disabled={loading} // ✅ disable input when loading
                />
              </div>
              <div className="input-group">
                <label>Grams</label>
                <div className="display-box">{grams || "0"}</div>
              </div>
            </div>
            <div className="instruct">
              <h4>Instructions:</h4>
              <p className="gold-summary">
                <b>Conversion Rule:</b> 1 AUG = 1 gram of gold. <br/>
                <b>Gold Price:</b> ₹6000/gram → 1 AUG = ₹6000. <br/>
                <b>Your Balance:</b> 15 AUG (15 grams of gold). <br/>
                <b>Options:</b> Buy, Sell, or Redeem AUG.<br/>
              </p>
            </div>
            <button
              className="lp-primary"
              onClick={handleBuyNow}
              disabled={loading}
            >
              {loading ? "Processing..." : "Buy Now"}
            </button>
          </div>
        ) : (
          <div className="form-content fade-in">
            <div className="input-row">
              <div className="input-group">
                <label>Grams</label>
                <input
                  type="number"
                  placeholder="Enter Grams"
                  min="0"
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
            <div className="instruct">
              <h4>Instructions:</h4>
              <p className="gold-summary">
                <b>Conversion Rule:</b> 1 AUG = 1 gram of gold. <br/>
                <b>Gold Price:</b> ₹6000/gram → 1 AUG = ₹6000. <br/>
                <b>Your Balance:</b> 15 AUG (15 grams of gold). <br/>
                <b>Options:</b> Buy, Sell, or Redeem AUG.<br/>
              </p>
            </div>

            <button
                className="lp-primary"
                onClick={handleBuyNow}
                disabled={loading}
              >
                {loading ? (
                  <div className="spinner-wrapper">
                    <div className="spinner"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  "Buy Now"
                )}
              </button>

            {/* {paymentStatus && <p className="status-text">{paymentStatus}</p>} */}
          </div>
        )}
      </div>
    </div>
  </section>

  {/* Info Section */}
  <section
    className="lp-content-block"
    style={{ justifyContent: "space-between" }}
  >
    <div className="lp-text">
      <h2>Why link gold with tokens?</h2>
      <p>
        Gold has always been a timeless symbol of wealth and stability, trusted
        for its intrinsic value across generations. By linking it with digital
        tokens, its enduring strength is combined with modern technology, making
        gold easy to trade, store, and transfer digitally.
      </p>
    </div>
    <div className="lp-image">
      <img src={leftCard} alt="Gold Token" />
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
        Gold has always been a timeless symbol of wealth and stability, trusted
        for its intrinsic value across generations. By linking it with digital
        tokens, its enduring strength is combined with modern technology, making
        gold easy to trade, store, and transfer digitally.
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

  {showSuccessModal && (
  <div className="modal-overlay">
    <div className="modal-box">
      <button className="modal-close" onClick={() => setShowSuccessModal(false)}>✕</button>
      <h2>🎉 Payment Successful!</h2>
      <p>Your gold purchase has been completed successfully.</p>
      <div className="modal-actions">
        <button
          className="lp-primary"
          onClick={() => window.location.href = "/history"}
        >
          View History
        </button>
        <button
          className="lp-secondary"
          onClick={() => setShowSuccessModal(false)}
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}
{showFailedModal && (
  <div className="modal-overlay">
    <div className="modal-box modal-failed">
      <button className="modal-close" onClick={() => setShowFailedModal(false)}>✕</button>
      <h2>❌ Payment Failed!</h2>
      <p>Something went wrong with your transaction. Please try again.</p>
      <div className="modal-actions">
        <button
          className="lp-primary"
          onClick={() => {
            setShowFailedModal(false);
            handleBuyNow(); // retry payment
          }}
        >
          Retry
        </button>
        <button
          className="lp-secondary"
          onClick={() => setShowFailedModal(false)}
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}

{showWaitingModal && (
  <div className="modal-overlay">
    <div className="modal-box modal-waiting">
      <button className="modal-close" onClick={() => setShowWaitingModal(false)}>✕</button>
      <h2>⏳ Waiting for Payment...</h2>
      <p>Your payment is being processed. Please do not close this window.</p>
      <div className="spinner"></div>
    </div>
  </div>
)}


</div>

  );
}
