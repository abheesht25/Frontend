// src/App.js
import React, { useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import './App.css';

function App() {
  const [isLoginView, setIsLoginView] = useState(true);

  const toggleView = () => setIsLoginView(!isLoginView);

  return (
    <div className="app-container">
      {/* Left section with background image and overlay text */}
      <div className="company-section">
        <div className="company-content">
          <h1 className="company-text">Bike Repair Shop</h1>
        </div>
      </div>

      {/* Right section for login or signup */}
      <div className="form-container">
        {isLoginView ? (
          <Login onSwitch={toggleView} />
        ) : (
          <Signup onSwitch={toggleView} />
        )}
      </div>
    </div>
  );
}

export default App;
