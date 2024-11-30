// src/components/TechnicianMyBookings.js

// import React from 'react';
// import './TechnicianMyBookings.css';

// function TechnicianMyBookings({ bookings }) {
//   return (
//     <div className="technician-my-bookings-container">
//       <h2>Accepted Bookings</h2>
//       {bookings.length === 0 ? (
//         <p className="no-bookings-message">No accepted bookings yet.</p>
//       ) : (
//         <div className="booking-cards">
//           {bookings.map((booking) => (
//             <div key={booking.id} className="booking-card">
//               <h3 className="booking-service-type">Service Type: {booking.serviceType}</h3>
//               <p className="booking-customer">Customer: {booking.customerName}</p>
//               <p className="booking-details">Details: {booking.details}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default TechnicianMyBookings;


import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './TechnicianMyBookings.css';
 
function TechnicianMyBookings() {
  const [bookings, setBookings] = useState([]);   // State to hold the bookings
  const [loading, setLoading] = useState(true);    // State to track loading status
  const [error, setError] = useState(null);        // State for error messages
  const location = useLocation();                  // Access location for state
 
  // Fetch bookings from location.state when the component mounts
  useEffect(() => {
    const fetchBookings = () => {
      const bookingsFromState = location?.state?.bookings;
 
      if (bookingsFromState && Array.isArray(bookingsFromState) && bookingsFromState.length > 0) {
        setBookings(bookingsFromState);  // Set bookings from the API response state
      } else {
        setBookings([]);  // If no bookings, set an empty array
      }
 
      setLoading(false);  // End loading
    };
 
    fetchBookings();  // Fetch bookings based on location state
  }, [location.state]); // Dependency on location.state to trigger fetch when it changes
 
  // If still loading, show loading message
  if (loading) {
    return <p>Loading bookings...</p>;
  }
 
  // If there's an error, show the error message
  if (error) {
    return <p>{error}</p>;
  }
 
  // If no bookings are available, show the "No bookings available" message
  if (bookings.length === 0) {
    return (
      <div className="technician-my-bookings-container">
        <h2>Accepted Bookings</h2>
        <p className="no-bookings-message">No bookings available.</p>
      </div>
    );
  }
 
  // If there are bookings, display them
  return (
    <div className="technician-my-bookings-container">
      <h2>Accepted Bookings</h2>
      <div className="booking-cards">
        {bookings.map((booking) => (
          <div key={booking.serviceRequestUUID} className="booking-card">
            <h3 className="booking-service-type">Service Type: {booking.serviceType}</h3>
            <p className="booking-status">Status: {booking.status}</p>
            <p className="booking-time">Time: {booking.time}</p>
            <p className="booking-vehicle">Vehicle Type: {booking.vehicleType}</p>
            <p className="booking-date">Date: {booking.date}</p>
            <p className="booking-model">Model Name: {booking.modelName}</p>
            <p className="booking-uuid">Request UUID: {booking.serviceRequestUUID}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
 
export default TechnicianMyBookings;