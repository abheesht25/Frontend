// src/components/HomePage.js
import React, { useState } from "react";
import "./HomePage.css";

function HomePage() {
  const [vehicleType, setVehicleType] = useState("");
  const [modelName, setModelName] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [address, setAddress] = useState("");
  const [locationMessage, setLocationMessage] = useState("");

  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
          fetchAddressFromCoords(latitude, longitude)
            .then((data) => {
              console.log("Address:", data);
              const fetchedAddress = `${data.neighbourhood || ''}, ${data.suburb || ''}, ${data.village || ''}, ${data.county || ''}, ${data.state_district || ''}, ${data.country || ''}${data.postcode ? ', ' + data.postcode : ''}`.trim();
              setAddress(fetchedAddress);
            })
            .catch((error) => {
              console.error("Error fetching address:", error);
              alert("Error fetching address. Please try again later.");
            });
        },
        (error) => {
          console.error("Error fetching location:", error);
          setLocationMessage("Unable to retrieve location. Please check your settings.");
        }
      );
    } else {
      setLocationMessage("Geolocation is not supported by this browser.");
    }
  };

  const fetchAddressFromCoords = (latitude, longitude) => {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
    return fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data && data.address) {
          const address = data.address;
          return address;
        } else {
          console.error("Address data not found in response");
          throw new Error("Address not found");
        }
      })
      .catch((error) => {
        console.error("Error fetching address:", error);
        throw error;
      });
  };

  const handleBooking = async (e) => {
    e.preventDefault();

    // Prepare the payload
    const payload = {
      vehicleType,
      modelName,
      serviceDescription,
      latitude,
      longitude,
    };

    try {
      // Make the REST API call
      const response = await fetch("https://your-api-endpoint.com/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        // Show success message on successful booking
        alert("Booking successful!");
        // Clear the form fields
        setVehicleType("");
        setModelName("");
        setServiceDescription("");
        setLatitude("");
        setLongitude("");
        setAddress("");
        setLocationMessage("");
      } else {
        // Handle error responses
        const errorData = await response.json();
        alert(`Error: ${errorData.message || "Booking failed. Please try again."}`);
      }
    } catch (error) {
      // Handle network errors
      console.error("Error during booking:", error);
      alert("An error occurred while booking. Please try again later.");
    }
  };

  return (
    <div className="home-container">
      <div className="left-section">
        <h2>Book a Service</h2>
        <form className="booking-form" onSubmit={handleBooking}>
          <input
            type="text"
            placeholder="Vehicle Type"
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Model Name"
            value={modelName}
            onChange={(e) => setModelName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Service Description"
            value={serviceDescription}
            onChange={(e) => setServiceDescription(e.target.value)}
            required
          />
          <button type="button" className="location-btn" onClick={fetchLocation}>
            Fetch Location
          </button>
          {locationMessage && <p className="location-message">{locationMessage}</p>}
          {address && (
            <p className="address-message">
              <b>Address:</b> {address}
            </p>
          )}
          <button type="submit" className="book-btn">
            Book Now
          </button>
        </form>
      </div>
      <div className="right-section">
        {/* Video background */}
        <video autoPlay loop muted className="background-video">
          <source src="/src/assets/5198956-uhd_2160_4096_25fps.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Content overlay */}
        <div className="why-choose-content">
          <h2>Why Choose Us</h2>
          <ul className="why-choose-list">
            <li>
              <span className="animated-tick">✔</span> We offer reliable bike repair services with
              certified technicians.
            </li>
            <li>
              <span className="animated-tick">✔</span> Pickup and delivery options, quality assurance,
              and experienced mechanics.
            </li>
            <li>
              <span className="animated-tick">✔</span> Choose us for professional and hassle-free bike
              services.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
