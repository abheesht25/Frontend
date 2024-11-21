import React from 'react';
import './MechanicOnboardingForm.css';

function MechanicOnboardingForm({ closeForm }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Form submitted successfully!"); // Confirmation of submission
        closeForm(); // Close form after submission
    };

    const handleCancel = (e) => {
        e.preventDefault(); // Prevent form reset behavior
        closeForm(); // Close the form modal
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
                    <div className="form-buttons">
                        <button type="submit" className="submit-button">Submit</button>
                        <button
                            type="button"
                            className="cancel-button"
                            onClick={handleCancel} // Correctly handle cancel
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
