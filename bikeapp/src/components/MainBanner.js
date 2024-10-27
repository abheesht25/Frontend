// src/components/MainBanner.js
import React from 'react';
import './MainBanner.css';

function MainBanner() {
  return (
    <div className="main-banner">
      <nav className="navbar">
        <h1 className="logo">Ride<span>Repair</span></h1>
        <ul className="nav-links">
          <li>Home</li>
          <li>Services</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
        <button className="cta-btn">Book Now</button>
      </nav>
      
      <div className="banner-content">
        <h1 className="headline">Quality Bike & Car Repair at Your Doorstep</h1>
        <p className="subtext">Fast, reliable, and affordable services across Bangalore</p>
        <div className="button-group">
          <button className="banner-btn">Explore Services</button>
          <button className="banner-btn outline">Contact Us</button>
        </div>
      </div>
    </div>
  );
}

export default MainBanner;
