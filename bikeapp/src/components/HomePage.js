// src/components/HomePage.js

import React, { useState } from 'react';
import './HomePage.css';

function HomePage() {
  const [latitude, setLatitude] = useState('...');
  const [longitude, setLongitude] = useState('...');

  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error("Error fetching location:", error);
          alert("Unable to retrieve location. Please check your settings.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="home-container">
      <div className="left-section">
        <h2>Book a Service</h2>
        <form className="booking-form">
          <input type="text" placeholder="Name" required />
          <input type="text" placeholder="Phone Number" required />
          <input type="text" placeholder="Address" required />
          <select>
            <option>Select Company</option>
            <option>Honda</option>
            <option>Yamaha</option>
            {/* Add other companies */}
          </select>
          <select>
            <option>Select Model</option>
            <option>Model A</option>
            <option>Model B</option>
            {/* Add other models */}
          </select>
          <select>
            <option>Select Service Category</option>
            <option>Washing</option>
            <option>Servicing</option>
            <option>Breakdown</option>
          </select>
          <button type="button" className="location-btn" onClick={fetchLocation}>Fetch Location</button>
          <p>Latitude: {latitude}</p>
          <p>Longitude: {longitude}</p>
          <button type="submit" className="book-btn">Book Now</button>
        </form>
      </div>
      <div className="right-section">
        {/* Video background */}
        <video autoPlay loop muted className="background-video">
            <source src="/Users/I528586/forntendxxx/Frontend/bikeapp/src/assets/5198956-uhd_2160_4096_25fps.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        {/* Content overlay */}
        <div className="why-choose-content">
          <h2>Why Choose Us</h2>
          <ul className="why-choose-list">
            <li><span className="animated-tick">✔</span> We offer reliable bike repair services with certified technicians.</li>
            <li><span className="animated-tick">✔</span> Pickup and delivery options, quality assurance, and experienced mechanics.</li>
            <li><span className="animated-tick">✔</span> Choose us for professional and hassle-free bike services.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HomePage;