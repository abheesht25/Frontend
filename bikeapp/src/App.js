// // src/App.js
// import React, { useState } from 'react';
// import Login from './components/Login';
// import Signup from './components/Signup';
// import './App.css';

// function App() {
//   const [isLoginView, setIsLoginView] = useState(true);

//   const toggleView = () => setIsLoginView(!isLoginView);

//   return (
//     <div className="app-container">
//       {/* Left section with background image and overlay text */}
//       <div className="company-section">
//         <div className="company-content">
//           <h1 className="company-text">Bike Repair Shop</h1>
//         </div>
//       </div>

//       {/* Right section for login or signup */}
//       <div className="form-container">
//         {isLoginView ? (
//           <Login onSwitch={toggleView} />
//         ) : (
//           <Signup onSwitch={toggleView} />
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;
// src/App.js
// src/App.js
// src/App.js
//----------------------------------------------------------------------------
// import React, { useState } from 'react';
// import { Routes, Route } from 'react-router-dom';
// import Login from './components/Login';
// import Signup from './components/Signup';
// import HomePage from './components/HomePage';
// import './App.css';

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   const handleLoginSuccess = () => {
//     setIsAuthenticated(true);
//   };

//   return (
//     <div className="app-container">
//       {/* Left section with background image and overlay text */}
//       <div className="company-section">
//         <div className="company-content">
//           <h1 className="company-text">Bike Repair Shop</h1>
//         </div>
//       </div>

//       {/* Right section for login, signup, or home */}
//       <div className="form-container">
//         <Routes>
//           {isAuthenticated ? (
//             <Route path="/home" element={<HomePage />} />
//           ) : (
//             <>
//               <Route path="/" element={<Login onLoginSuccess={handleLoginSuccess} />} />
//               <Route path="/signup" element={<Signup />} />
//             </>
//           )}
//         </Routes>
//       </div>
//     </div>
//   );
// }

// export default App;


//----------------------------------------------------------

// import React, { useState } from 'react';
// import { Routes, Route } from 'react-router-dom';
// import Login from './components/Login';
// import Signup from './components/Signup';
// import HomePage from './components/HomePage';
// import './App.css';

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   const handleLoginSuccess = () => {
//     setIsAuthenticated(true);
//   };

//   return (
//     <div className={`app-container ${isAuthenticated ? 'home-view' : ''}`}>
//       {isAuthenticated ? (
//         <HomePage />
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
//             </Routes>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default App;

//---------------------------------------------------------------------------------------------------
// import React, { useState } from 'react';
// import { Routes, Route } from 'react-router-dom';
// import Login from './components/Login';
// import Signup from './components/Signup';
// import HomePage from './components/HomePage';
// import './App.css';

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   const handleLoginSuccess = () => {
//     setIsAuthenticated(true);
//   };

//   return (
//     <div className={`app-container ${isAuthenticated ? 'home-view' : ''}`}>
//       {isAuthenticated ? (
//         <HomePage />
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
//             </Routes>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default App;

//--------------------------------------------------------------------------------------------
// import React, { useState } from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import Login from './components/Login';
// import Signup from './components/Signup';
// import HomePage from './components/HomePage';
// import './App.css';

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   const handleLoginSuccess = () => {
//     setIsAuthenticated(true);
//   };

//   console.log(`Rendering App with isAuthenticated = ${isAuthenticated}`);

//   return (
//     <div className={`app-container ${isAuthenticated ? 'home-view' : ''}`}>
//       {isAuthenticated ? (
//         <HomePage />
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
//               <Route path="*" element={<Navigate to="/" />} /> {/* Redirect unknown routes */}
//             </Routes>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default App;

//------------------------------------------------------------------------------------------------------------------


// import React, { useState } from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import Login from './components/Login';
// import Signup from './components/Signup';
// import HomePage from './components/HomePage';
// import Navbar from './components/Navbar';
// import ScheduleBooking from './components/ScheduleBooking';
// import BookingHistory from './components/BookingHistory';
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
//           <Navbar /> {/* Always visible at the top */}
//           <div className="dashboard-view">
//             <Routes>
//               <Route path="/" element={<HomePage />} />
//               <Route path="/schedule-booking" element={<ScheduleBooking />} />
//               <Route path="/booking-history" element={<BookingHistory />} />
//               <Route path="/about-us" element={<div>About Us Content</div>} />
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

//-------------

import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
import ScheduleBooking from './components/ScheduleBooking';
import ScheduleBookingPage from './components/ScheduleBookingPage';
import ScheduleBookingForm from './components/ScheduleBookingForm';
import BookingHistory from './components/BookingHistory';
import AboutUs from './components/AboutUs'; // Import the AboutUs component
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <div className="app-container">
      {isAuthenticated ? (
        <>
          <Navbar /> {/* Navbar always visible when authenticated */}
          <div className="dashboard-view">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/schedule-booking" element={<ScheduleBookingPage />} /> {/* Schedule booking cards */}
              <Route path="/schedule-booking-form" element={<ScheduleBookingForm />} /> {/* Schedule booking form */}
              <Route path="/booking-history" element={<BookingHistory />} />
              <Route path="/about-us" element={<AboutUs />} /> {/* About Us component */}
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
