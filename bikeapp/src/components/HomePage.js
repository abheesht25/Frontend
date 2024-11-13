// src/components/HomePage.js

import React, { useState } from 'react';
import './HomePage.css';
 
function HomePage() {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [company, setCompany] = useState('');
  const [model, setModel] = useState('');
  const [serviceCategory, setServiceCategory] = useState('');
  const [locationMessage, setLocationMessage] = useState(''); // New state for location message
 
  // Fetch token from local storage
  const token = localStorage.getItem('authToken');
 
  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setLocationMessage("Location fetched successfully!");
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
 
  const handleBooking = async (e) => {
    e.preventDefault();
 
    // Prepare the data to be sent in the API request
    const bookingData = {
      name,
      phone,
      address,
      company,
      model,
      serviceCategory,
      latitude,
      longitude
    };
 
    try {
      // Make a POST request to the booking API
      const response = await fetch('https://your-api-endpoint.com/book-service', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(bookingData)
      });
 
      if (response.ok) {
        alert("Booking successful!");
        // Reset form fields after successful booking
        setName('');
        setPhone('');
        setAddress('');
        setCompany('');
        setModel('');
        setServiceCategory('');
      } else {
        const errorData = await response.json();
        alert(`Booking failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error during booking:", error);
      alert("An error occurred while booking. Please try again.");
    }
  };
 
  return (
    <div className="home-container">
      <div className="left-section">
        <h2>Book a Service</h2>
        <form className="booking-form" onSubmit={handleBooking}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <select value={company} onChange={(e) => setCompany(e.target.value)} required>
            <option value="">Select Company</option>
            <option value="Honda">Honda</option>
            <option value="Yamaha">Yamaha</option>
          </select>
          <select value={model} onChange={(e) => setModel(e.target.value)} required>
            <option value="">Select Model</option>
            <option value="Model A">Model A</option>
            <option value="Model B">Model B</option>
          </select>
          <select value={serviceCategory} onChange={(e) => setServiceCategory(e.target.value)} required>
            <option value="">Select Service Category</option>
            <option value="Washing">Washing</option>
            <option value="Servicing">Servicing</option>
            <option value="Breakdown">Breakdown</option>
          </select>
          <button type="button" className="location-btn" onClick={fetchLocation}>
            Fetch Location
          </button>
          {/* Display location message here */}
          {locationMessage && <p className="location-message">{locationMessage}</p>}
          <button type="submit" className="book-btn">Book Now</button>
        </form>
      </div>
      <div className="right-section">
        {/* Video background */}
        <video autoPlay loop muted className="background-video">
          <source src="/Users/I528586/forntendxxx/Frontend/bikeapp/src/assets/5198956-uhd_2160_4096_25fps.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Content overlay */}
        <div className="why-choose-content">
          <h2>Why Choose Us</h2>
          <ul className="why-choose-list">
            <li><span className="animated-tick">✔</span> We offer reliable bike repair services with certified technicians.</li>
            <li><span className="animated-tick">✔</span> Pickup and delivery options, quality assurance, and experienced mechanics.</li>
            <li><span className="animated-tick">✔</span> Choose us for professional and hassle-free bike services.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
 
export default HomePage;