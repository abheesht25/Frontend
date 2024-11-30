// src/components/ScheduleBookingForm.js

import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './ScheduleBookingForm.css'; // Ensure your CSS file is correctly imported

function ScheduleBookingForm() {
  const { state } = useLocation();
  const shop = state?.shop || {};

  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [modelName, setModelName] = useState('');
  const [serviceDesc, setServiceDesc] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [assignedTechnician] = useState(shop.userName || '');

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [locationMessage, setLocationMessage] = useState('');

  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setLocationMessage('Location fetched successfully!');
          console.log('Latitude:', position.coords.latitude, 'Longitude:', position.coords.longitude);
        },
        (error) => {
          console.error('Error getting location: ', error);
          setLocationMessage('Unable to retrieve location. Please try again.');
        }
      );
    } else {
      setLocationMessage('Geolocation is not supported by this browser.');
    }
  };

  const handleSchedule = async () => {
    if (!date || !timeSlot || !vehicleType || !modelName || !serviceDesc || !serviceType) {
      alert('Please fill in all required fields.');
      return;
    }

    if (latitude === null || longitude === null) {
      alert('Please fetch your location first.');
      return;
    }

    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('You are not authenticated. Please log in.');
      return;
    }

    const payload = {
      latitude,
      longitude,
      date,
      time: timeSlot,
      vehicleType,
      modelName,
      serviceDescription: serviceDesc,
      serviceType,
      assignedTechnician,
      shopName: shop.shopName,
    };

    console.log('Payload:', JSON.stringify(payload, null, 2));

    const apiUrl = 'https://user.c-09499df.kyma.ondemand.com/api/v1/u/scheduleServiceRequest';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const responseData = await response.text();
        alert(`Booking successfully scheduled: ${responseData}`);
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error scheduling booking:', error);
      alert('An error occurred while scheduling the booking.');
    }
  };

  const today = new Date().toISOString().split('T')[0];
  const nextMonthDate = new Date();
  nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
  const lastSelectableDate = nextMonthDate.toISOString().split('T')[0];

  return (
    <div className="schedule-booking-form-container">
      <div className="schedule-booking-form">
        <h3 className="form-title">Schedule Booking at {shop.shopName}</h3>
        <p>Shop Name: {shop.shopName || 'Not Available'}</p>
        <p>Phone: {shop.mobileNo || 'Not Available'}</p>

        <input
          type="text"
          placeholder="Vehicle Type"
          value={vehicleType}
          onChange={(e) => setVehicleType(e.target.value)}
          required
          className="fancy-input"
        />
        <input
          type="text"
          placeholder="Model Name"
          value={modelName}
          onChange={(e) => setModelName(e.target.value)}
          required
          className="fancy-input"
        />
        <textarea
          placeholder="Service Description"
          value={serviceDesc}
          onChange={(e) => setServiceDesc(e.target.value)}
          required
          className="fancy-textarea"
        />
        <input
          type="text"
          placeholder="Service Type"
          value={serviceType}
          onChange={(e) => setServiceType(e.target.value)}
          required
          className="fancy-input"
        />
        <input
          type="text"
          placeholder="Assigned Technician"
          value={assignedTechnician}
          readOnly
          className="fancy-input"
        />

        <button onClick={fetchLocation} type="button" className="fetch-location-btn">
          Fetch Location
        </button>
        {locationMessage && <p className="location-message">{locationMessage}</p>}

        <label>Select Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          min={today}
          max={lastSelectableDate}
          required
          className="fancy-input"
        />

        <label>Select Time Slot:</label>
        <select
          value={timeSlot}
          onChange={(e) => setTimeSlot(e.target.value)}
          required
          className="fancy-select"
        >
          <option value="">Select a Time Slot</option>
          <option value="9:00 AM - 11:00 AM">9:00 AM - 11:00 AM</option>
          <option value="11:00 AM - 1:00 PM">11:00 AM - 1:00 PM</option>
          <option value="2:00 PM - 4:00 PM">2:00 PM - 4:00 PM</option>
          <option value="4:00 PM - 6:00 PM">4:00 PM - 6:00 PM</option>
        </select>

        <button onClick={handleSchedule} className="schedule-btn">
          Schedule Booking
        </button>
      </div>
    </div>
  );
}

export default ScheduleBookingForm;
