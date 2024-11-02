// src/components/TechnicianNavbar.js

import React from 'react';
import { NavLink } from 'react-router-dom';
// import './Navbar.css'; // Use the same CSS for consistency

function TechnicianNavbar() {
  return (
    <nav className="navbar">
      <div className="logo">BikeRepairShop</div>
      <div className="nav-links">
        <NavLink to="/" exact className="nav-link" activeClassName="active">
          Home
        </NavLink>
        <NavLink to="/accept-now" className="nav-link" activeClassName="active">
          Accept Now
        </NavLink>
        <NavLink to="/my-bookings" className="nav-link" activeClassName="active">
          My Bookings
        </NavLink>
      </div>
    </nav>
  );
}

export default TechnicianNavbar;
