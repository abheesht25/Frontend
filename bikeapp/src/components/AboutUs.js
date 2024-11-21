// src/components/AboutUs.js
import React, { useState } from "react";
import "./AboutUs.css";
import { useNavigate } from "react-router-dom";

function AboutUs() {
  const navigate = useNavigate();

  // State for "Our Mission" card
  const [showCities, setShowCities] = useState(false);

  // Hardcoded list of cities
  const cities = [
    "Delhi",
    "Mumbai",
    "Bangalore",
    "Hyderabad",
    "Chennai",
    "Kolkata",
    "Pune",
    "Ahmedabad",
    "Jaipur",
    "Lucknow",
  ];

  // Toggle visibility for city list in "Our Mission" card
  const toggleCities = () => {
    setShowCities(!showCities);
  };

  return (
    <div className="about-us-container">
      {/* Background */}
      <div className="about-us-background"></div>
      <h1 className="about-us-title">Welcome to Bike Repair Shop</h1>
      <div className="about-us-cards">
        {/* Our Mission Card */}
        <div className="about-us-card mission-card">
          <h2>Our Mission</h2>
          <p>
            We strive to keep your bike in the best condition possible, offering
            a variety of repair services to meet all your biking needs.
          </p>
          <div className="card-expandable-content">
            <button
              onClick={toggleCities}
              className="city-button"
            >
              {showCities ? "Hide Cities We Serve" : "Show Cities We Serve"}
            </button>
            {/* Conditionally render the city list */}
            {showCities && (
              <ul className="city-list">
                {cities.map((city, index) => (
                  <li key={index}>{city}</li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Our Services Card */}
        <div className="about-us-card services-card">
          <h2>Our Services</h2>
          <p>
            Our experienced mechanics are skilled in handling all types of
            repairs, from routine tune-ups to major overhauls. Please do have a
            look at our services.
          </p>
          <button
            onClick={() => navigate("/services")}
            className="explore-button"
          >
            Explore Our Services
          </button>
        </div>

        {/* Why Choose Us Card */}
        <div className="about-us-card why-choose-card">
          <h2>Why Choose Us?</h2>
          <p>
            We prioritize customer satisfaction, ensuring quality, reliability,
            and a smooth ride every time.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
