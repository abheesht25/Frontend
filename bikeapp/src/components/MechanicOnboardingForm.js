import React, { useState } from 'react';
import './MechanicOnboardingForm.css';

function MechanicOnboardingForm({ closeForm }) {
    const [formData, setFormData] = useState({
        username: '',
        shopName: '',
        mobileNumber: '',
        shopDesc: '',
        openTime: '',
        closeTime: '',
        currentlyOpen: '',
        latitude: '',
        longitude: ''
    });

    const [locationMessage, setLocationMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const fetchLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setFormData((prevData) => ({
                        ...prevData,
                        latitude: latitude.toFixed(4), // Round to 4 decimal places
                        longitude: longitude.toFixed(4), // Round to 4 decimal places
                    }));
                    setLocationMessage('Location fetched successfully!');
                },
                (error) => {
                    console.error('Error fetching location:', error);
                    setLocationMessage('Unable to fetch location. Please check your settings.');
                }
            );
        } else {
            setLocationMessage('Geolocation is not supported by this browser.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('authToken'); // Retrieve token from localStorage
        if (!token) {
            alert('Authentication token is missing!');
            return;
        }

        const payload = {
            username: formData.username,
            shopName: formData.shopName,
            mobileNumber: parseInt(formData.mobileNumber, 10),
            shopDesc: formData.shopDesc,
            openTime: formData.openTime,
            closeTime: formData.closeTime,
            latitude: parseFloat(formData.latitude),
            longitude: parseFloat(formData.longitude),
            currentlyOpen: formData.currentlyOpen,
        };

        try {
            const response = await fetch('https://technician.c-09499df.kyma.ondemand.com/api/v1/shop', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                alert('Mechanic onboarded successfully!');
                closeForm();
            } else {
                const errorText = await response.text();
                alert(`Error: ${errorText || 'Something went wrong!'}`);
            }
        } catch (error) {
            console.error('Network error:', error);
            alert('Network error. Please try again later.');
        }
    };

    const handleCancel = (e) => {
        e.preventDefault();
        closeForm();
    };

    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

    return (
        <div className="overlay" onClick={closeForm}>
            <div className="onboarding-form fancy-form" onClick={(e) => e.stopPropagation()}>
                <h2 className="form-title">Onboard Yourself</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            name="username"
                            placeholder="Your Name"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            className="fancy-input"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            name="shopName"
                            placeholder="Shop Name"
                            value={formData.shopName}
                            onChange={handleChange}
                            required
                            className="fancy-input"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            name="mobileNumber"
                            placeholder="Phone Number"
                            value={formData.mobileNumber}
                            onChange={handleChange}
                            required
                            className="fancy-input"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            name="shopDesc"
                            placeholder="Shop Description"
                            value={formData.shopDesc}
                            onChange={handleChange}
                            required
                            className="fancy-input"
                        />
                    </div>
                    <div className="form-group">
                        <label className="fancy-label">Opening Time:</label>
                        <input
                            type="time"
                            name="openTime"
                            value={formData.openTime}
                            onChange={handleChange}
                            required
                            className="fancy-time-picker"
                        />
                    </div>
                    <div className="form-group">
                        <label className="fancy-label">Closing Time:</label>
                        <input
                            type="time"
                            name="closeTime"
                            value={formData.closeTime}
                            onChange={handleChange}
                            required
                            className="fancy-time-picker"
                        />
                    </div>
                    <div className="form-group">
                        <label className="fancy-label">Select Date:</label>
                        <input
                            type="date"
                            name="availableDate"
                            min={today} // Restrict past dates
                            value={formData.availableDate}
                            onChange={handleChange}
                            className="fancy-input"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <button type="button" className="fetch-location-btn" onClick={fetchLocation}>
                            Fetch Location
                        </button>
                        {locationMessage && <p className="location-message">{locationMessage}</p>}
                    </div>
                    <div className="form-group">
                        <select
                            name="currentlyOpen"
                            value={formData.currentlyOpen}
                            onChange={handleChange}
                            required
                            className="fancy-select"
                        >
                            <option value="" disabled>
                                Is Shop Currently Open?
                            </option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                    <div className="form-buttons">
                        <button type="submit" className="submit-button fancy-button">
                            Submit
                        </button>
                        <button
                            type="button"
                            className="cancel-button fancy-button"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default MechanicOnboardingForm;
