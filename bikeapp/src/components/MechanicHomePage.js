// src/components/MechanicHomePage.js
// src/components/MechanicHomePage.js

import React, { useState } from 'react';
import MechanicOnboardingForm from './MechanicOnboardingForm';
import './MechanicHomePage.css';

function MechanicHomePage() {
    const [showOnboarding, setShowOnboarding] = useState(false);

    const handleCloseForm = () => {
        setShowOnboarding(false);
    };

    return (
        <div className={`mechanic-home-container ${showOnboarding ? 'blur-background' : ''}`}>
            <div className="welcome-content">
                <h1 className="welcome-title">Welcome, Mechanic!</h1>
                <p className="welcome-subtitle">Get ready to streamline your services and reach more clients.</p>
                <button 
                    className="onboard-button" 
                    onClick={() => setShowOnboarding(true)}
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
