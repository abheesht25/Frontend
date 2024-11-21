// src/components/ScheduleBookingPage.js
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "./ScheduleBookingPage.css";

function ScheduleBooking() {
  const [searchParams] = useSearchParams();
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const latitude = searchParams.get("lat");
  const longitude = searchParams.get("long");

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await fetch(
          `https://your-api-endpoint.com/shops?lat=${latitude}&long=${longitude}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setShops(data); // Store the API response in the shops list
        setLoading(false);
      } catch (err) {
        console.error("Error fetching shops:", err);
        setError("Failed to fetch shops. Please try again later.");
        setLoading(false);
      }
    };

    fetchShops();
  }, [latitude, longitude]);

  if (loading) {
    return <p>Loading shops...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="shop-list-container">
      <h2>Available Shops Near You</h2>
      <div className="shop-list">
        {shops.map((shop) => (
          <div className="shop-card" key={shop.id}>
            <h3>{shop.name}</h3>
            <p>{shop.address}</p>
            <p>Distance: {shop.distance} km</p>
            <button className="select-shop-button">Select Shop</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ScheduleBooking;
