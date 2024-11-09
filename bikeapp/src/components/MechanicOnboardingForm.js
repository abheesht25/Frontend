import React from 'react';
import './MechanicOnboardingForm.css';

function MechanicOnboardingForm({ closeForm }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Form submitted successfully!"); // Confirmation of submission
        closeForm(); // Close form after submission
    };

    return (
        <div className="overlay" onClick={closeForm}>
            <div className="onboarding-form" onClick={(e) => e.stopPropagation()}>
                <h2>Onboard Yourself</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Your Name" required />
                    <input type="text" placeholder="Shop Name" required />
                    <input type="text" placeholder="Phone Number" required />
                    <input type="text" placeholder="Shop Address" required />
                    <button type="submit" className="submit-button">Submit</button>
                    <button type="button" className="cancel-button" onClick={closeForm}>Cancel</button>
                </form>
            </div>
        </div>
    );
}

export default MechanicOnboardingForm;
