// src/components/TechnicianNavbar.js

// import React from 'react';
// import { NavLink } from 'react-router-dom';

// function TechnicianNavbar({ onLogout }) {
//   return (
//     <nav className="navbar">
//       <div className="logo">BikeRepairShop</div>
//       <div className="nav-links">
//       <NavLink to="/" exact activeClassName="active">Home</NavLink>
//         <NavLink to="/accept-now" activeClassName="active">Accept Now</NavLink>
//         <NavLink to="/my-bookings" activeClassName="active">My Bookings</NavLink>
//         <button className="logout-button" onClick={onLogout}>Logout</button>
//       </div>
//     </nav>
//   );
// }

// export default TechnicianNavbar;


import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
 
function TechnicianNavbar( {onLogout} ) {
  const [requests, setRequests] = useState([]);  // State to hold the service requests
  const navigate = useNavigate();
 
  // Handle API call when "Accept Now" link is clicked
  const handleAcceptNowClick = async () => {
    const username = localStorage.getItem('username');
    const authToken = localStorage.getItem('authToken');
 
    if (!username || !authToken) {
      console.error('User is not authenticated');
      alert('User not authenticated. Please login again.');
      return;
    }
 
    const apiEndpoint = 'https://technician.c-09499df.kyma.ondemand.com/api/v1/currentRequests'; // The API endpoint
 
    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST', // Sending a POST request
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,  // Including the Authorization token
        },
        body: JSON.stringify({ username })  // Sending username in the request body
      });
 
      // If the response is successful, process the data
      if (!response.ok) {
        throw new Error('Failed to fetch service requests');
      }
 
      const data = await response.json();  // Parsing the response as JSON
      console.log('Service Requests:', data); // Log the entire response for debugging
 
      // Store the fetched data locally (in localStorage)
      localStorage.setItem('acceptNowData', JSON.stringify(data)); // Store the entire response
 
      // Check if the response is an array and contains requests
      if (!Array.isArray(data) || data.length === 0) {
        console.log('No service requests received from API.');
        // Navigate to accept now page with no requests
        navigate('/accept-now', { state: { requests: [] } });
      } else {
        console.log('Received service requests:', data); // Should show the array if it exists
        // Navigate to accept now page with requests data
        navigate('/accept-now', { state: { requests: data } });
      }
 
    } catch (error) {
      console.error('Error fetching service requests:', error);
      alert('An error occurred while fetching service requests. Please try again.');
    }
  };
 
  // Handle API call when "My Bookings" link is clicked
  const handleMyBookingsClick = async () => {
    const username = localStorage.getItem('username');
    const authToken = localStorage.getItem('authToken');
 
    if (!username || !authToken) {
      console.error('User is not authenticated');
      alert('User not authenticated. Please login again.');
      return;
    }
 
    const apiEndpoint = 'https://technician.c-09499df.kyma.ondemand.com/api/v1/previousRequests'; // Example endpoint for bookings
 
    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({ username })
      });
 
      // If the response is successful, process the data
      if (!response.ok) {
        throw new Error('Failed to fetch bookings');
      }
 
      const data = await response.json();  // Parsing the response as JSON
      console.log('Received bookings:', data); // Log the bookings for debugging
 
      // Check if the response contains bookings and is an array
      if (Array.isArray(data)) {
        // Pass bookings data to My Bookings page as state
        navigate('/my-bookings', { state: { bookings: data } });
      } else {
        alert('No bookings available.');
      }
 
    } catch (error) {
      console.error('Error fetching bookings:', error);
      alert('An error occurred while fetching bookings. Please try again.');
    }
  };
 
  return (
    <nav className="navbar">
      <div className="logo">BikeRepairShop</div>
      <div className="nav-links">
        <NavLink to="/" exact className="nav-link" activeClassName="active">
          Home
        </NavLink>
        <NavLink
          onClick={handleAcceptNowClick}
          className="nav-link"
        >
          Accept Now
        </NavLink>
        <NavLink
          to="/my-bookings"
          className="nav-link"
          onClick={handleMyBookingsClick} // Handle the click event to fetch bookings
        >
          My Bookings
        </NavLink>
        <button className="logout-button" onClick={onLogout}>Logout</button>
      </div>
    </nav>
  );
}
 
export default TechnicianNavbar;