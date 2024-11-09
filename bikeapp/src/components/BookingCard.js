// src/components/BookingCard.js

import React from 'react';
import './BookingCard.css';

function BookingCard({ booking, onAccept, onDecline }) {
    return (
        <div className="booking-card">
            <h3>{booking.serviceType}</h3>
            <p><strong>Customer Name:</strong> {booking.customerName}</p>
            <p><strong>Phone Number:</strong> {booking.phoneNumber}</p>
            <p><strong>Address:</strong> {booking.address}</p>
            <div className="card-buttons">
                <button className="accept-button" onClick={() => onAccept(booking.id)}>Accept</button>
                <button className="decline-button" onClick={() => onDecline(booking.id)}>Decline</button>
            </div>
        </div>
    );
}

export default BookingCard;
