// // src/components/Navbar.js


import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
 
function Navbar({ onLogout }) {
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken'); // Retrieve token from localStorage
 
  // Handle "Booking History" API call
  const handleBookingHistory = async () => {
    try {
      const response = await fetch('https://user.c-09499df.kyma.ondemand.com/api/v1/u/getBookingHistory', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Add Bearer token to the header
        },
      });
 
      if (response.ok) {
        const bookings = await response.json();
        // Navigate to the BookingHistory page with the fetched data
        navigate('/booking-history', { state: { bookings } });
      } else {
        const errorData = await response.json();
        alert(`Failed to fetch booking history: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error fetching booking history:', error);
      alert('An error occurred while fetching booking history.');
    }
  };
 
  // Handle "Schedule Booking" link click (fetch location and technicians)
  const handleScheduleBookingClick = async (event) => {
    // Prevent default Link navigation behavior
    event.preventDefault();
 
    try {
      // Get user location (latitude and longitude)
      const position = await getUserLocation();
      const { latitude, longitude } = position.coords;
 
      // Log the Bearer token and the URL being used for the API call
      console.log('Using Bearer token:', token);
      const url = `https://user.c-09499df.kyma.ondemand.com/api/v1/u/getAvailableTechnician/${latitude}/${longitude}`;
      console.log('API Request URL:', url); // Log the URL
 
      // Fetch available technicians based on location and include Bearer token in the request
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Pass Bearer token
        },
      });
 
      if (response.ok) {
        // Get the response as JSON (array of technician data)
        const technicians = await response.json();
        console.log('Available technicians:', technicians);
 
        // Navigate to ScheduleBookingPage and pass the technicians data
        navigate('/schedule-booking', { state: { technicians } });
      } else {
        const errorData = await response.json();
        console.error('API error:', errorData);
        alert('Failed to fetch technician data');
      }
    } catch (error) {
      console.error('Error getting location or fetching technician data:', error);
      alert('Failed to get your location or technician data');
    }
  };
 
  // Function to get user's geolocation
  const getUserLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      } else {
        reject('Geolocation not supported');
      }
    });
  };
 
  return (
    <nav className="navbar">
      <div className="logo">MechanIX</div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        {/* Use Link for "Schedule Booking" and trigger the API call in onClick */}
        <Link to="#" onClick={handleScheduleBookingClick}>
          Schedule Booking
        </Link>
        <Link to="/booking-history" onClick={handleBookingHistory}>
          Booking History
        </Link>
        <Link to="/about-us">About Us</Link>
        <button onClick={onLogout} className="logout-button">
          Logout
        </button>
      </div>
    </nav>
  );
}
 
export default Navbar;