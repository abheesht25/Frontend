// src/components/ScheduleBooking.js
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './HomePage.css';

function ScheduleBooking() {
  const [serviceDate, setServiceDate] = useState(null);

  return (
    <div className="home-container">
      <h2>Schedule a Future Booking</h2>
      <form className="booking-form">
        <input type="text" placeholder="Name" required />
        <input type="text" placeholder="Phone Number" required />
        <input type="text" placeholder="Address" required />

        {/* Date Picker */}
        <label>Choose Service Date</label>
        <DatePicker
          selected={serviceDate}
          onChange={(date) => setServiceDate(date)}
          minDate={new Date()}  // Prevents selecting past dates
          placeholderText="Select a date"
          className="date-picker-input"
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
        />

        <select>
          <option>Select Service Type</option>
          <option>Washing</option>
          <option>Servicing</option>
          <option>Repair</option>
        </select>
        <button type="submit" className="book-btn">Schedule Now</button>
      </form>
    </div>
  );
}

export default ScheduleBooking;