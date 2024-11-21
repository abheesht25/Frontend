// src/components/ScheduleBookingForm.js
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './ScheduleBookingForm.css'; // Ensure your CSS file is correctly imported

function ScheduleBookingForm() {
  const { state } = useLocation();
  const shop = state?.shop || {};
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [address, setAddress] = useState('Fetching address...');
  const [locationMessage, setLocationMessage] = useState('');

  const handleSchedule = () => {
    if (date && timeSlot) {
      alert(`Booking at ${shop.name} successfully scheduled for ${date} at ${timeSlot}!`);
    } else {
      alert("Please select a date and a time slot for the booking.");
    }
  };

  // Function to fetch the current location
  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
          fetchAddressFromCoords(latitude, longitude)
            .then((data) => {
              const fetchedAddress = `${data.neighbourhood || ''}, ${data.suburb || ''}, ${data.village || ''}, ${data.county || ''}, ${data.state_district || ''}, ${data.country || ''}${data.postcode ? ', ' + data.postcode : ''}`.trim();
              setAddress(fetchedAddress || 'Address not found');
            })
            .catch((error) => {
              console.error("Error fetching address:", error);
              setAddress('Unable to fetch address. Please try again later.');
            });
        },
        (error) => {
          console.error("Error fetching location:", error);
          setLocationMessage("Unable to retrieve location. Please check your settings.");
        }
      );
    } else {
      setLocationMessage("Geolocation is not supported by this browser.");
    }
  };

  // Function to fetch the address from latitude and longitude
  const fetchAddressFromCoords = (latitude, longitude) => {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
    return fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data && data.address) {
          return data.address;
        } else {
          throw new Error("Address not found");
        }
      })
      .catch((error) => {
        console.error("Error fetching address:", error);
        throw error;
      });
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

        {/* Fetch Location Button */}
        <button type="button" onClick={fetchLocation} className="fetch-location-btn">
          Fetch Location
        </button>
        {address && (
          <p>
            <b>Address:</b> {address}
          </p>
        )}
        {locationMessage && <p className="location-message">{locationMessage}</p>}

        <button onClick={handleSchedule}>Schedule Booking</button>
      </div>
    </div>
  );
}

export default ScheduleBookingForm;
