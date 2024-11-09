// src/components/TechnicianMyBookings.js

import React from 'react';
import './TechnicianMyBookings.css';

function TechnicianMyBookings({ bookings }) {
  return (
    <div className="technician-my-bookings-container">
      <h2>Accepted Bookings</h2>
      {bookings.length === 0 ? (
        <p className="no-bookings-message">No accepted bookings yet.</p>
      ) : (
        <div className="booking-cards">
          {bookings.map((booking) => (
            <div key={booking.id} className="booking-card">
              <h3 className="booking-service-type">Service Type: {booking.serviceType}</h3>
              <p className="booking-customer">Customer: {booking.customerName}</p>
              <p className="booking-details">Details: {booking.details}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TechnicianMyBookings;
