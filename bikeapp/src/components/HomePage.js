import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./HomePage.css";
import bgVideo from '../assets/5198956-uhd_2160_4096_25fps.mp4'

// Fix default Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function HomePage() {
  const [vehicleType, setVehicleType] = useState("");
  const [modelName, setModelName] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [address, setAddress] = useState("");
  const [locationMessage, setLocationMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("User");
  const [greeting, setGreeting] = useState("");

  // Fetch username and greeting
  useEffect(() => {
    const storedUsername = localStorage.getItem("username") || "User"; 
    setUsername(storedUsername);

    // Determine greeting based on IST
    const now = new Date();
    const hour = (now.getUTCHours() + 5 + (now.getUTCMinutes() >= 30 ? 1 : 0)) % 24; // Adjust for IST
    if (hour >= 5 && hour < 12) {
      setGreeting("Good Morning");
    } else if (hour >= 12 && hour < 17) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, []);

  

  
  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
          fetchAddressFromCoords(latitude, longitude)
            .then((data) => {
              const fetchedAddress = `${data.neighbourhood || ""}, ${data.suburb || ""}, ${data.village || ""}, ${data.county || ""}, ${data.state_district || ""}, ${data.country || ""}${data.postcode ? ", " + data.postcode : ""}`.trim();
              setAddress(fetchedAddress);
              setLocationMessage("Location fetched successfully!");
            })
            .catch((error) => {
              console.error("Error fetching address:", error);
              setLocationMessage("Error fetching address. Please try again later.");
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
          return data.address;
        } else {
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
    setLoading(true);
    setError("");

    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("Authentication token not found. Please log in again.");
      setLoading(false);
      return;
    }

    const payload = {
      vehicleType,
      modelName,
      serviceDescription,
      serviceType,
      latitude,
      longitude,
    };

    try {
      const response = await fetch("https://user.c-09499df.kyma.ondemand.com/api/v1/u/createServiceRequest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const message = await response.text();
        alert(`Booking successful! ${message}`);
        setVehicleType("");
        setModelName("");
        setServiceDescription("");
        setServiceType("");
        setLatitude(null);
        setLongitude(null);
        setAddress("");
        setLocationMessage("");
      } else {
        const errorData = await response.text();
        setError(errorData || "Failed to book service. Please try again.");
      }
    } catch (err) {
      console.error("Error during service booking:", err);
      setError("An error occurred while trying to book the service. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-container">
      <div className="left-section">
      <div className="greeting-container">
          <h1 className="greeting">{greeting}</h1>
      </div>
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
            placeholder="Service Description"
            value={serviceDescription}
            onChange={(e) => setServiceDescription(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Service Type (e.g., Washing, Servicing, Breakdown)"
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            required
          />
          <p><b>Location:</b> {address}</p>
          <button type="button" className="location-btn" onClick={fetchLocation}>
            Fetch Location
          </button>
          {locationMessage && <p className="location-message">{locationMessage}</p>}
          {latitude && longitude && (
            <div className="map-container">
              <MapContainer center={[latitude, longitude]} zoom={13} style={{ height: "300px", width: "100%" }}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[latitude, longitude]} />
              </MapContainer>
            </div>
          )}
          <button type="submit" className="book-btn" disabled={loading}>
            {loading ? "Booking..." : "Book Now"}
          </button>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
      <div className="right-section">
      <video src = {bgVideo} autoPlay muted loop ></video> 
        <div className="why-choose-content">
          <h2>Why Choose Us</h2>
          <ul className="why-choose-list">
            <li><span className="animated-tick">✔</span> Reliable bike repair services with certified technicians.</li>
            <li><span className="animated-tick">✔</span> Pickup and delivery options, quality assurance, and experienced mechanics.</li>
            <li><span className="animated-tick">✔</span> Hassle-free bike services.</li>
          </ul>
        </div>   
      </div>
    </div>
  );
}

export default HomePage;
