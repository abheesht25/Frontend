// src/components/Navbar.js

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');

  const handleScheduleBooking = async (e) => {
    e.preventDefault(); // Prevent the default link navigation
    try {
      const response = await fetch('https://your-api-endpoint.com/shops', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const shops = await response.json();
        // Navigate to the shop list page with fetched data
        navigate('/schedule-booking', { state: { shops } });
      } else {
        const errorData = await response.json();
        alert(`Failed to fetch shops: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error fetching shops:', error);
      alert('An error occurred while fetching shops.');
    }
  };

  const handleLogout = () => {
    // Clear localStorage and navigate to login or home
    localStorage.removeItem('authToken');
    alert('You have been logged out.');
    navigate('/'); // Navigate to home or login page
  };

  return (
    <nav className="navbar">
      <div className="logo">BikeRepairShop</div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/schedule-booking" onClick={handleScheduleBooking}>
          Schedule Booking
        </Link>
        <Link to="/booking-history">Booking History</Link>
        <Link to="/about-us">About Us</Link>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
