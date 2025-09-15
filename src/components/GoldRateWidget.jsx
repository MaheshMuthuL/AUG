import React, { useEffect, useState, useRef } from "react";
import { Chart, LineController, LineElement, PointElement, CategoryScale, LinearScale } from "chart.js";
import "../goldrate.css";

Chart.register(LineController, LineElement, PointElement, CategoryScale, LinearScale);

export default function GoldRateWidget() {
  const [rate, setRate] = useState(57840);
  const [history, setHistory] = useState([]);
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const sampleHistory = [
      { date: "Aug 24", price: 56200 }, { date: "Aug 25", price: 56450 },
      { date: "Aug 26", price: 55980 }, { date: "Aug 27", price: 56120 },
      { date: "Aug 28", price: 56340 }, { date: "Aug 29", price: 56500 },
      { date: "Aug 30", price: 56750 }, { date: "Aug 31", price: 56620 },
      { date: "Sep 01", price: 56800 }, { date: "Sep 02", price: 56720 },
      { date: "Sep 03", price: 56900 }, { date: "Sep 04", price: 57120 },
      { date: "Sep 05", price: 57340 }, { date: "Sep 06", price: 57200 },
      { date: "Sep 07", price: 57450 }, { date: "Sep 08", price: 57500 },
      { date: "Sep 09", price: 57620 }, { date: "Sep 10", price: 57480 },
      { date: "Sep 11", price: 57700 }, { date: "Sep 12", price: 57840 },
    ];
    setHistory(sampleHistory);
  }, []);

  useEffect(() => {
    if (!history.length || !chartRef.current) return;

    const labels = history.map((h) => h.date);
    const dataPoints = history.map((h) => h.price);

    if (!chartInstanceRef.current) {
      chartInstanceRef.current = new Chart(chartRef.current, {
        type: "line",
        data: {
          labels,
          datasets: [
            {
              label: "Gold Price (Last 20 days)",
              data: dataPoints,
              borderColor: "#d4af37",
              backgroundColor: "rgba(212, 175, 55, 0.1)",
              tension: 0.3,
              pointRadius: 3,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              grid: { display: false },
              ticks: { display: false },
            },
            y: {
              grid: { display: false },
              ticks: { display: false },
            },
          },
          plugins: { legend: { display: false } },
        },
      });

    } else {
      const chart = chartInstanceRef.current;
      chart.data.labels = labels;
      chart.data.datasets[0].data = dataPoints;
      chart.update();
    }
  }, [history]);

  return (
    <div className="goldrate-card goldrate-extended">
      <div className="goldrate-header">
        <h3 className="goldrate-title">Gold Rate</h3>
        <span className="goldrate-live">LIVE</span>
      </div>

      <div className="goldrate-chart-container">
        <canvas ref={chartRef}></canvas>
      </div>

      <p className="goldrate-rate">{rate.toLocaleString()} INR / oz</p>
    </div>
  );
}