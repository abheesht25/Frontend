// src/components/TechnicianNavbar.js

import React from 'react';
import { NavLink } from 'react-router-dom';

function TechnicianNavbar({ onLogout }) {
  return (
    <nav className="navbar">
      <div className="logo">BikeRepairShop</div>
      <div className="nav-links">
      <NavLink to="/" exact activeClassName="active">Home</NavLink>
        <NavLink to="/accept-now" activeClassName="active">Accept Now</NavLink>
        <NavLink to="/my-bookings" activeClassName="active">My Bookings</NavLink>
        <button className="logout-button" onClick={onLogout}>Logout</button>
      </div>
    </nav>
  );
}

export default TechnicianNavbar;
