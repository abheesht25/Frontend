// src/components/ScheduleBookingForm.js
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './ScheduleBookingForm.css'; // Ensure your CSS file is correctly imported

function ScheduleBookingForm() {
  const { state } = useLocation();
  const shop = state?.shop || {};
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');

  const handleSchedule = () => {
    if (date && timeSlot) {
      alert(`Booking at ${shop.name} successfully scheduled for ${date} at ${timeSlot}!`);
    } else {
      alert("Please select a date and a time slot for the booking.");
    }
  };

  return (
    <div className="schedule-booking-form-container">
      <div className="schedule-booking-form">
        <h3 className="form-title">Schedule Booking at {shop.name}</h3>
        <p>Address: {shop.address}</p>
        <p>Phone: {shop.phone}</p>

        {/* Customer Details Section */}
        <input type="text" placeholder="Your Name" required />
        <input type="text" placeholder="Phone Number" required />
        <input type="email" placeholder="Email Address" required />
        <input type="text" placeholder="Bike Model" required />
        <input type="text" placeholder="Model Variant" required />
        <input type="text" placeholder="Service Category" required />

        {/* Date and Time Picker */}
        <label>Select Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <label>Select Time Slot:</label>
        <select value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)} required>
          <option value="">Select a Time Slot</option>
          <option value="9:00 AM - 11:00 AM">9:00 AM - 11:00 AM</option>
          <option value="11:00 AM - 1:00 PM">11:00 AM - 1:00 PM</option>
          <option value="2:00 PM - 4:00 PM">2:00 PM - 4:00 PM</option>
          <option value="4:00 PM - 6:00 PM">4:00 PM - 6:00 PM</option>
        </select>

        <button onClick={handleSchedule}>Schedule Booking</button>
      </div>
    </div>
  );
}

export default ScheduleBookingForm;
