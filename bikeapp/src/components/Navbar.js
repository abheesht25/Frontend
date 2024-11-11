// src/components/Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ onLogout }) {
  return (
    <nav className="navbar">
      <div className="logo">BikeRepairShop</div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/schedule-booking">Schedule Booking</Link>
        <Link to="/booking-history">Booking History</Link>
        <Link to="/about-us">About Us</Link>
        <button className="logout-button" onClick={onLogout}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;
