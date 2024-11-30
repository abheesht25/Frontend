import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MechanicHomePage.css';
import MechanicOnboardingForm from './MechanicOnboardingForm';
 
function MechanicHomePage() {
    const [showOnboarding, setShowOnboarding] = useState(false);
    const [username, setUsername] = useState(localStorage.getItem('username') || '');  // Get the username from localStorage
    const [shopName, setShopName] = useState(null);  // State to store shop name from the API response
    const navigate = useNavigate();
 
    const handleCloseForm = () => {
        setShowOnboarding(false);
    };
 
    const handleOnboardClick = async () => {
        if (!username) {
            console.error('Username not found');
            return;
        }
   
        const apiEndpoint = 'https://technician.c-09499df.kyma.ondemand.com/api/v1/technician'; // Keep the same URL
   
        // Log the URL for debugging
        console.log('API Endpoint:', apiEndpoint);
   
        try {
            // Making the GET request with a body (though it's unconventional)
            const response = await fetch(apiEndpoint, {
                method: 'POST', // Keep method as GET
                headers: {
                    'Content-Type': 'application/json', // Specify content type as JSON
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // Include the token in the Authorization header
                },
                body: JSON.stringify({ username })  // Send username in the body
            });
   
            // Check if the response is ok
            if (!response.ok) {
                console.error('Request failed with status:', response.status);
                const errorText = await response.text(); // Log the raw text response
                console.error('Error response text:', errorText);
                alert('Failed to fetch technician data. Please try again.');
                return;
            }
   
            // Check if the response is JSON
            const contentType = response.headers.get('Content-Type');
            if (contentType && contentType.includes('application/json')) {
                const data = await response.json();
                console.log('Technician Shop Data:', data); // Log response for debugging
   
                // Check if shopName is null
                if (data.shopName) {
                    setShopName(data.shopName);
                    // If shopName is not null, navigate to the onboarding form with the shop data prefilled
                    navigate('/onboarding', { state: { shopData: data } });
                } else {
                    // If shopName is null, show the onboarding form
                    setShowOnboarding(true);
                }
            } else {
                // If the response is not JSON, log and handle accordingly
                const textResponse = await response.text();
                console.error('Unexpected response format:', textResponse);
                alert('Received unexpected response format. Please try again.');
            }
        } catch (error) {
            console.error('Error during technician data fetch:', error);
            alert('An error occurred while fetching technician data. Please try again.');
        }
    };
   
   
 
    return (
        <div className={`mechanic-home-container ${showOnboarding ? 'blur-background' : ''}`}>
            <div className="welcome-content">
                <h1 className="welcome-title">Welcome, Mechanic!</h1>
                <p className="welcome-subtitle">Get ready to streamline your services and reach more clients.</p>
                <button
                    className="onboard-button"
                    onClick={handleOnboardClick}  // Trigger the onboard API call on button click
                >
                    Onboard Yourself
                </button>
            </div>
            {showOnboarding && (
                <div className="onboarding-form-overlay">
                    <MechanicOnboardingForm closeForm={handleCloseForm} />
                </div>
            )}
        </div>
    );
}
 
export default MechanicHomePage;