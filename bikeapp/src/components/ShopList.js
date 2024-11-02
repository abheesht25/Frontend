// src/components/ShopList.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ShopList.css';

function ShopList() {
  const navigate = useNavigate();

  const shops = [
    { id: 1, name: 'Bike Repair Central', address: '123 Main St', phone: '555-1234' },
    { id: 2, name: 'Cycle Fix Hub', address: '456 Elm St', phone: '555-5678' },
    { id: 3, name: 'Gear Up Garage', address: '789 Oak St', phone: '555-9012' },
  ];

  const handleBook = (shop) => {
    navigate('/schedule-booking', { state: { shop } });
  };

  return (
    <div className="shop-list-container">
      <h1>Select a Shop</h1>
      <div className="shop-cards">
        {shops.map((shop) => (
          <div key={shop.id} className="shop-card">
            <h3>{shop.name}</h3>
            <p>Address: {shop.address}</p>
            <p>Phone: {shop.phone}</p>
            <button onClick={() => handleBook(shop)} className="book-btn">
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShopList;
