// src/components/TechnicianAcceptNow.js

import React from 'react';
import './TechnicianAcceptNow.css';

function TechnicianAcceptNow({ requests, onAccept, onDecline }) {
  return (
    <div className="technician-accept-now-container">
      <h2>Service Requests</h2>
      <div className="technician-cards">
        {requests.length === 0 ? (
          <p className="no-requests">No requests available to accept.</p>
        ) : (
          requests.map((request) => (
            <div key={request.id} className="technician-card">
              <div className="card-content">
                <div className="card-info">
                  <h3>Service Type: {request.serviceType}</h3>
                  <p>Customer: {request.customerName}</p>
                  <p>Details: {request.details}</p>
                </div>
                <div className="technician-buttons">
                  <button className="accept-button" onClick={() => onAccept(request.id)}>Accept</button>
                  <button className="decline-button" onClick={() => onDecline(request.id)}>Decline</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TechnicianAcceptNow;
