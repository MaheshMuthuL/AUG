import React, { useEffect, useState } from "react";
import axios from "axios";
import "../dashboard.css";

export default function GoldRateWidget() {
  // 👇 declare a piece of state and its setter
  const [rate, setRate] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGoldRate = async () => {
      try {
        const response = await axios.get("https://www.goldapi.io/api/XAU/INR", {
          headers: {
            "x-access-token": "goldapi-ddsw6smfgs67u0-io",
            "Content-Type": "application/json",
          },
        });
        setRate(response.data.price); // <-- this will now work
      } catch (err) {
        setError("Failed to fetch gold rate");
        console.error(err);
      }
    };

    fetchGoldRate();
  }, []);

  return (
    <div className="gold-box">
      {error ? (
        <p>{error}</p>
      ) : rate ? (
        <>
          <h3>Live Gold Rate</h3>
          <p>{rate.toLocaleString()} INR / oz</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}


