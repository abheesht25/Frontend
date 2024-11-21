import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // React Router for navigation
import MechanicOnboardingForm from "./MechanicOnboardingForm";
import "./MechanicHomePage.css";

function MechanicHomePage() {
    const [showOnboarding, setShowOnboarding] = useState(false);
    const [isOnboarded, setIsOnboarded] = useState(false);
    const [mechanicName, setMechanicName] = useState("");

    const navigate = useNavigate(); // Hook for navigation

    // Load onboarding state from localStorage
    useEffect(() => {
        const onboarded = localStorage.getItem("isMechanicOnboarded") === "true";
        const name = localStorage.getItem("mechanicName") || "Mechanic";
        setIsOnboarded(onboarded);
        setMechanicName(name);
    }, []);

    // Handle onboarding completion
    const handleOnboardingComplete = (name) => {
        localStorage.setItem("isMechanicOnboarded", "true");
        localStorage.setItem("mechanicName", name || "Mechanic");
        setIsOnboarded(true);
        setMechanicName(name || "Mechanic");
        setShowOnboarding(false);
    };

    // Close onboarding form
    const handleCloseForm = () => {
        setShowOnboarding(false);
    };

    // Greeting based on time of day
    const getTimeGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good Morning";
        if (hour < 18) return "Good Afternoon";
        return "Good Evening";
    };

    // Navigate to My Bookings
    const handleViewBookings = () => {
        navigate("/my-bookings"); // Redirect to the "My Bookings" route
    };

    // Onboarding screen
    if (isOnboarded) {
        return (
            <div className={`mechanic-home-container ${showOnboarding ? "blur-background" : ""}`}>
                {showOnboarding ? (
                    <div className="overlay">
                        <MechanicOnboardingForm
                            onComplete={handleOnboardingComplete}
                            closeForm={handleCloseForm}
                        />
                    </div>
                ) : (
                    <div className="welcome-content">
                        <h1 className="welcome-title">Welcome to MechaninX!</h1>
                        <p className="welcome-subtitle">
                            Onboard yourself to start providing professional bike repair services.
                        </p>
                        <button
                            className="onboard-button"
                            onClick={() => setShowOnboarding(true)}
                        >
                            Onboard Yourself
                        </button>
                    </div>
                )}
            </div>
        );
    }

    // Onboarded mechanic's view
    return (
        <div className="mechanic-home-container onboarded">
            <div className="onboarded-content">
                <h1 className="onboarded-title">Welcome, {mechanicName}!</h1>
                <h2 className="onboarded-greeting">{getTimeGreeting()}!</h2>
                <div className="onboarded-details">
                    <p><strong>Completed Jobs:</strong> 30</p>
                    <p><strong>Average Rating:</strong> 4.8/5</p>
                    <p><strong>Revenue:</strong> $12,000</p>
                </div>
                <button className="dashboard-button" onClick={handleViewBookings}>
                    My Bookings
                </button>
            </div>
        </div>
    );
}

export default MechanicHomePage;
