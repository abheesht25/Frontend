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

// // src/App.js

// import React, { useState } from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import Login from './components/Login';
// import Signup from './components/Signup';
// import HomePage from './components/HomePage';
// import MechanicHomePage from './components/MechanicHomePage'; // Mechanic's Home Page component
// import Navbar from './components/Navbar';
// import ScheduleBookingPage from './components/ScheduleBookingPage';
// import ScheduleBookingForm from './components/ScheduleBookingForm';
// import BookingHistory from './components/BookingHistory';
// import AboutUs from './components/AboutUs';
// import TechnicianNavbar from './components/TechnicianNavbar';
// import './App.css';

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [userType, setUserType] = useState(null); // New state to track user type ("customer" or "mechanic")

//   // Function to handle successful login and set the user type
//   const handleLoginSuccess = (type) => {
//     setIsAuthenticated(true);
//     setUserType(type); // Set user type to either "customer" or "mechanic"
//   };

//   return (
//     <div className="app-container">
//       {isAuthenticated ? (
//         <>
//           <Navbar />
//           <div className="dashboard-view">
//             <Routes>
//               {/* Conditionally render routes based on userType */}
//               {userType === "customer" && (
//                 <>
//                   <Route path="/" element={<HomePage />} />
//                   <Route path="/schedule-booking" element={<ScheduleBookingPage />} />
//                   <Route path="/schedule-booking-form" element={<ScheduleBookingForm />} />
//                   <Route path="/booking-history" element={<BookingHistory />} />
//                   <Route path="/about-us" element={<AboutUs />} />
//                 </>
//               )}
//               {userType === "mechanic" && (
//                 <>
//                   <Route path="/" element={<MechanicHomePage />} />
//                   {/* Add more mechanic-specific routes here if needed */}
//                   <Route path="/about-us" element={<AboutUs />} />
//                 </>
//               )}
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
//               <Route
//                 path="/"
//                 element={<Login onLoginSuccess={(type) => handleLoginSuccess(type)} />}
//               />
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



// src/App.js

// src/App.js

import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
import TechnicianNavbar from './components/TechnicianNavbar';
import ScheduleBookingPage from './components/ScheduleBookingPage';
import ScheduleBookingForm from './components/ScheduleBookingForm';
import BookingHistory from './components/BookingHistory';
import AboutUs from './components/AboutUs';
import MechanicHomePage from './components/MechanicHomePage';
import TechnicianAcceptNow from './components/TechnicianAcceptNow';
import TechnicianMyBookings from './components/TechnicianMyBookings';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return JSON.parse(localStorage.getItem('isAuthenticated')) || false;
  });
  const [userType, setUserType] = useState(() => {
    return localStorage.getItem('userType') || 'customer';
  });
  const [requests, setRequests] = useState([
    { id: 1, serviceType: 'Repair', customerName: 'John Doe', details: 'Bike repair required.' },
    { id: 2, serviceType: 'Washing', customerName: 'Jane Smith', details: 'Bike washing needed.' },
  ]);
  const [acceptedRequests, setAcceptedRequests] = useState(
    JSON.parse(localStorage.getItem('acceptedRequests')) || []
  );

  useEffect(() => {
    localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
    localStorage.setItem('userType', userType);
    localStorage.setItem('acceptedRequests', JSON.stringify(acceptedRequests));
  }, [isAuthenticated, userType, acceptedRequests]);

  const handleLoginSuccess = (type) => {
    setIsAuthenticated(true);
    setUserType(type);
    localStorage.setItem('isAuthenticated', true);
    localStorage.setItem('userType', type);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserType('customer');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userType');
    localStorage.removeItem('acceptedRequests');
  };

  const onAccept = (id) => {
    const acceptedRequest = requests.find((request) => request.id === id);
    setAcceptedRequests([...acceptedRequests, acceptedRequest]);
    setRequests(requests.filter((request) => request.id !== id));
  };

  const onDecline = (id) => {
    setRequests(requests.filter((request) => request.id !== id));
  };

  return (
    <div className="app-container">
      {isAuthenticated ? (
        <>
          {userType === 'customer' ? (
            <Navbar onLogout={handleLogout} />
          ) : (
            <TechnicianNavbar onLogout={handleLogout} />
          )}
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
                  <Route 
                    path="/accept-now" 
                    element={<TechnicianAcceptNow requests={requests} onAccept={onAccept} onDecline={onDecline} />} 
                  />
                  <Route 
                    path="/my-bookings" 
                    element={<TechnicianMyBookings bookings={acceptedRequests} />} 
                  />
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
              <h1 className="company-text">MechanIX</h1>
            </div>
          </div>
          <div className="form-container">
            <Routes>
              <Route path="/" element={<Login onLoginSuccess={handleLoginSuccess} />} />
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
