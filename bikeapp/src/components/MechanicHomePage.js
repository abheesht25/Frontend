// src/components/MechanicHomePage.js
import React, { useState } from 'react';
import MechanicOnboardingForm from './MechanicOnboardingForm';
import './MechanicHomePage.css';

function MechanicHomePage() {
  const [showOnboardingForm, setShowOnboardingForm] = useState(false);

  const handleOnboardClick = () => {
    setShowOnboardingForm(true);
  };

  return (
    <div className="mechanic-home-container">
      <div className="welcome-section">
        <h1>Welcome, Mechanic!</h1>
        <p>Onboard yourself to get started and manage your services.</p>
        <button className="onboard-button" onClick={handleOnboardClick}>
          Onboard Yourself
        </button>
      </div>
      
      <div className="dashboard-section">
        <h2>Your Dashboard</h2>
        <div className="dashboard-cards">
          <div className="dashboard-card">Profile</div>
          <div className="dashboard-card">Services</div>
          <div className="dashboard-card">Appointments</div>
          <div className="dashboard-card">Earnings</div>
        </div>
      </div>

      {showOnboardingForm && <MechanicOnboardingForm onClose={() => setShowOnboardingForm(false)} />}
    </div>
  );
}

export default MechanicHomePage;
