// src/components/BookingForm.js
import React, { useState } from 'react';
import bikeData from '../data/bikeData.json';
import './HomePage.css';

function BookingForm() {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    address: '',
    company: '',
    model: '',
    serviceCategory: '',
    latitude: '',
    longitude: ''
  });
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData({
            ...formData,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        () => alert("Unable to fetch location.")
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleBooking = () => {
    const success = true; // Replace with actual booking logic
    if (success) {
      setMessage({ type: 'success', text: 'Service booked successfully!' });
    } else {
      setMessage({ type: 'error', text: 'Something went wrong.' });
    }
  };

  return (
    <div className="booking-form">
      <h2>Book a Service</h2>
      <form>
        <input name="name" placeholder="Name" onChange={handleInputChange} />
        <input name="phoneNumber" placeholder="Phone Number" onChange={handleInputChange} />
        <input name="address" placeholder="Address" onChange={handleInputChange} />

        <select name="company" onChange={handleInputChange}>
          <option value="">Select Company</option>
          {bikeData.companies.map((company) => (
            <option key={company} value={company}>{company}</option>
          ))}
        </select>

        <select name="model" onChange={handleInputChange}>
          <option value="">Select Model</option>
          {(bikeData.models[formData.company] || []).map((model) => (
            <option key={model} value={model}>{model}</option>
          ))}
        </select>

        <select name="serviceCategory" onChange={handleInputChange}>
          <option value="">Select Service Category</option>
          {bikeData.serviceCategories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>

        <button type="button" className="location-button" onClick={fetchLocation}>
          Fetch Location
        </button>
        {formData.latitude && (
          <p>Location: {formData.latitude}, {formData.longitude}</p>
        )}

        <button type="button" onClick={handleBooking}>Book Now</button>
      </form>

      {message && (
        <div className={message.type === 'success' ? 'success-message' : 'error-message'}>
          {message.text}
        </div>
      )}
    </div>
  );
}

export default BookingForm;
