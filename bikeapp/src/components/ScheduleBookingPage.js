// src/components/ScheduleBookingPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ScheduleBookingPage.css';

function ScheduleBookingPage() {
  const navigate = useNavigate();

  // Sample data for shops
  const shops = [
    { id: 1, name: 'Downtown Bike Repair', address: '123 Main St, Cityville', phone: '(123) 456-7890' },
    { id: 2, name: 'Uptown Cycle Service', address: '456 Elm St, Townsville', phone: '(987) 654-3210' },
    { id: 3, name: 'City Bike Fix', address: '789 Oak St, Village', phone: '(555) 123-4567' },
  ];

  const handleBookNow = (shop) => {
    navigate('/schedule-booking-form', { state: { shop } });
  };

  return (
    <div className="schedule-booking-container">
      <h2 className="page-title">Available Bike Repair Shops</h2>
      <div className="shop-cards">
        {shops.map((shop) => (
          <div key={shop.id} className="shop-card">
            <div className="card-content">
              <p><strong>Shop:</strong> {shop.name}</p>
              <p><strong>Address:</strong> {shop.address}</p>
              <p><strong>Phone:</strong> {shop.phone}</p>
            </div>
            <button onClick={() => handleBookNow(shop)} className="book-button">Book</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ScheduleBookingPage;
