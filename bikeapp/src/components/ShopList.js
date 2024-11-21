// src/components/ShopList.js
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ShopList.css';
 
function ShopList() {
  const navigate = useNavigate();
  const location = useLocation();
  const shops = location.state?.shops || [];
 
  const handleBook = (shop) => {
    navigate('/schedule-booking', { state: { shop } });
  };
 
  return (
    <div className="shop-list-container">
      <h1>Select a Shop</h1>
      {shops.length === 0 ? (
        <p>No shops available at the moment.</p>
      ) : (
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
      )}
    </div>
  );
}
 
export default ShopList;
 