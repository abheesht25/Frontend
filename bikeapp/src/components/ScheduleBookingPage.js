// src/components/ScheduleBookingPage.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ScheduleBookingPage.css';
 
function ScheduleBookingPage() {
  const location = useLocation();
  const navigate = useNavigate();
 
  // Get the technicians passed from Navbar (via navigation state)
  const technicians = location.state?.technicians || [];
 
  const handleBookNow = (technician) => {
    navigate('/schedule-booking-form', { state: { shop: technician } });
  };
 
  return (
    <div className="schedule-booking-container">
      <h2 className="page-title">Available Bike Repair Shops</h2>
      {technicians.length > 0 ? (
        <div className="shop-cards">
          {technicians.map((technician, index) => (
            <div key={index} className="shop-card">
              <div className="card-content">
                <p><strong>Shop: {technician.shopName}</strong></p>
                <p><strong>Username:</strong> {technician.userName}</p>
                <p><strong>Distance:</strong> {technician.distance} meters</p>
                <p><strong>Mobile:</strong> {technician.mobileNo}</p>
                <p><strong>Description:</strong> {technician.shopDesc}</p>
              </div>
              <button onClick={() => handleBookNow(technician)} className="book-button">
                Book
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No technicians available at this location.</p>
      )}
    </div>
  );
}
 
export default ScheduleBookingPage;