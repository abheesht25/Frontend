// src/App.js

import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
import TechnicianNavbar from './components/TechnicianNavbar';
import ScheduleBookingPage from './components/ScheduleBookingPage';
import ScheduleBookingForm from './components/ScheduleBookingForm';
import BookingHistory from './components/BookingHistory';
import AboutUs from './components/AboutUs';
import MechanicHomePage from './components/MechanicHomePage';
import TechnicianAcceptNow from './components/TechnicianAcceptNow';
import TechnicianMyBookings from './components/TechnicianMyBookings';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return JSON.parse(localStorage.getItem('isAuthenticated')) || false;
  });
  const [userType, setUserType] = useState(() => {
    return localStorage.getItem('userType') || 'customer';
  });
  const [requests, setRequests] = useState([
    { id: 1, serviceType: 'Repair', customerName: 'John Doe', details: 'Bike repair required.' },
    { id: 2, serviceType: 'Washing', customerName: 'Jane Smith', details: 'Bike washing needed.' },
  ]);
  const [acceptedRequests, setAcceptedRequests] = useState(
    JSON.parse(localStorage.getItem('acceptedRequests')) || []
  );

  useEffect(() => {
    localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
    localStorage.setItem('userType', userType);
    localStorage.setItem('acceptedRequests', JSON.stringify(acceptedRequests));
  }, [isAuthenticated, userType, acceptedRequests]);

  const handleLoginSuccess = (type) => {
    setIsAuthenticated(true);
    setUserType(type);
    localStorage.setItem('isAuthenticated', true);
    localStorage.setItem('userType', type);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserType('customer');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userType');
    localStorage.removeItem('acceptedRequests');
  };

  const onAccept = (id) => {
    const acceptedRequest = requests.find((request) => request.id === id);
    setAcceptedRequests([...acceptedRequests, acceptedRequest]);
    setRequests(requests.filter((request) => request.id !== id));
  };

  const onDecline = (id) => {
    setRequests(requests.filter((request) => request.id !== id));
  };

  return (
    <div className="app-container">
      {isAuthenticated ? (
        <>
          {userType === 'customer' ? (
            <Navbar onLogout={handleLogout} />
          ) : (
            <TechnicianNavbar onLogout={handleLogout} />
          )}
          <div className="dashboard-view">
            <Routes>
              {userType === 'customer' && (
                <>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/schedule-booking" element={<ScheduleBookingPage />} />
                  <Route path="/schedule-booking-form" element={<ScheduleBookingForm />} />
                  <Route path="/booking-history" element={<BookingHistory />} />
                  <Route path="/about-us" element={<AboutUs />} />
                  <Route path="/Login" element={<Login />} />
                </>
              )}
              {userType === 'technician' && (
                <>
                  <Route path="/" element={<MechanicHomePage />} />
                  <Route 
                    path="/accept-now" 
                    element={<TechnicianAcceptNow requests={requests} onAccept={onAccept} onDecline={onDecline} />} 
                  />
                  <Route 
                    path="/my-bookings" 
                    element={<TechnicianMyBookings bookings={acceptedRequests} />} 
                  />
                  <Route path="/profile" element={<div>Technician Profile Page</div>} />
                </>
              )}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </>
      ) : (
        <>
          <div className="company-section">
            <div className="company-content">
              <h1 className="company-text">MechanIX</h1>
            </div>
          </div>
          <div className="form-container">
            <Routes>
              <Route path="/" element={<Login onLoginSuccess={handleLoginSuccess} />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
