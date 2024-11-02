// // // // src/App.js

// import React, { useState } from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import Login from './components/Login';
// import Signup from './components/Signup';
// import HomePage from './components/HomePage';
// import Navbar from './components/Navbar';
// import ScheduleBooking from './components/ScheduleBooking';
// import ScheduleBookingPage from './components/ScheduleBookingPage';
// import ScheduleBookingForm from './components/ScheduleBookingForm';
// import BookingHistory from './components/BookingHistory';
// import AboutUs from './components/AboutUs'; // Import the AboutUs component
// import './App.css';

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   const handleLoginSuccess = () => {
//     setIsAuthenticated(true);
//   };

//   return (
//     <div className="app-container">
//       {isAuthenticated ? (
//         <>
//           <Navbar /> {/* Navbar always visible when authenticated */}
//           <div className="dashboard-view">
//             <Routes>
//               <Route path="/" element={<HomePage />} />
//               <Route path="/schedule-booking" element={<ScheduleBookingPage />} /> {/* Schedule booking cards */}
//               <Route path="/schedule-booking-form" element={<ScheduleBookingForm />} /> {/* Schedule booking form */}
//               <Route path="/booking-history" element={<BookingHistory />} />
//               <Route path="/about-us" element={<AboutUs />} /> {/* About Us component */}
//               <Route path="*" element={<Navigate to="/" />} />
//             </Routes>
//           </div>
//         </>
//       ) : (
//         <>
//           <div className="company-section">
//             <div className="company-content">
//               <h1 className="company-text">Bike Repair Shop</h1>
//             </div>
//           </div>
//           <div className="form-container">
//             <Routes>
//               <Route path="/" element={<Login onLoginSuccess={handleLoginSuccess} />} />
//               <Route path="/signup" element={<Signup />} />
//               <Route path="*" element={<Navigate to="/" />} />
//             </Routes>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default App;
//----------------------------------------------------------------------------------------------------

// src/App.js

import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import HomePage from './components/HomePage';
import Navbar from './components/Navbar'; // Customer Navbar
import TechnicianNavbar from './components/TechnicianNavbar'; // Technician Navbar
import ScheduleBookingPage from './components/ScheduleBookingPage';
import ScheduleBookingForm from './components/ScheduleBookingForm';
import BookingHistory from './components/BookingHistory';
import AboutUs from './components/AboutUs';
import MechanicHomePage from './components/MechanicHomePage'; // Technician's Home Page
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState('customer'); // 'customer' or 'technician'

  const handleLoginSuccess = (type) => {
    setIsAuthenticated(true);
    setUserType(type); // Set userType based on the selected type in the Login component
  };

  return (
    <div className="app-container">
      {isAuthenticated ? (
        <>
          {userType === 'customer' ? <Navbar /> : <TechnicianNavbar />}
          <div className="dashboard-view">
            <Routes>
              {userType === 'customer' && (
                <>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/schedule-booking" element={<ScheduleBookingPage />} />
                  <Route path="/schedule-booking-form" element={<ScheduleBookingForm />} />
                  <Route path="/booking-history" element={<BookingHistory />} />
                  <Route path="/about-us" element={<AboutUs />} />
                </>
              )}
              {userType === 'technician' && (
                <>
                  <Route path="/" element={<MechanicHomePage />} />
                  <Route path="/accept-now" element={<div>Accept Now Page</div>} />
                  <Route path="/my-bookings" element={<div>My Bookings Page</div>} />
                  <Route path="/profile" element={<div>Technician Profile Page</div>} />
                </>
              )}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </>
      ) : (
        <>
          <div className="company-section">
            <div className="company-content">
              <h1 className="company-text">Bike Repair Shop</h1>
            </div>
          </div>
          <div className="form-container">
            <Routes>
              <Route
                path="/"
                element={<Login onLoginSuccess={handleLoginSuccess} />}
              />
              <Route path="/signup" element={<Signup />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
