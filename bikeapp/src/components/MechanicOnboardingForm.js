// src/components/MechanicOnboardingForm.js
import React, { useState } from 'react';
import './MechanicOnboardingForm.css';

function MechanicOnboardingForm({ onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    shopName: '',
    phoneNumber: '',
    address: '',
    servicesOffered: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to save formData to the backend or state
    alert('Onboarding Successful!');
    onClose();
  };

  return (
    <div className="onboarding-form-container">
      <h2>Onboard Yourself</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
        <input type="text" name="shopName" placeholder="Shop Name" value={formData.shopName} onChange={handleChange} required />
        <input type="text" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} required />
        <input type="text" name="address" placeholder="Shop Address" value={formData.address} onChange={handleChange} required />
        <textarea name="servicesOffered" placeholder="Services Offered" value={formData.servicesOffered} onChange={handleChange} required />
        <button type="submit" className="submit-button">Submit</button>
        <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
}

export default MechanicOnboardingForm;
