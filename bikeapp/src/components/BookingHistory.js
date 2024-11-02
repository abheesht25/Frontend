import React, { useState } from 'react';
import './BookingHistory.css';

function BookingHistory() {
  const [selectedBooking, setSelectedBooking] = useState(null);

  const bookings = [
    { id: 1, type: 'Servicing', date: '2023-10-10', status: 'Completed' },
    { id: 2, type: 'Washing', date: '2023-10-11', status: 'In Process' },
    { id: 3, type: 'Repair', date: '2023-10-12', status: 'Failed' },
  ];

  const handleClick = (booking) => {
    setSelectedBooking(booking);
  };

  return (
    <div className="booking-history-container">
      <h1>Your Bookings</h1>
      <div className="content-container">
        <div className="cards-container">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="booking-card"
              onClick={() => handleClick(booking)}
            >
              <p>Service Type: {booking.type}</p>
              <p>Date: {booking.date}</p>
              <p>Status: {booking.status}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BookingHistory;
