// src/components/TechnicianAcceptNow.js

// import React from 'react';
// import './TechnicianAcceptNow.css';

// function TechnicianAcceptNow({ requests, onAccept, onDecline }) {
//   return (
//     <div className="technician-accept-now-container">
//       <h2>Service Requests</h2>
//       <div className="technician-cards">
//         {requests.length === 0 ? (
//           <p className="no-requests">No requests available to accept.</p>
//         ) : (
//           requests.map((request) => (
//             <div key={request.id} className="technician-card">
//               <div className="technician-card-content">
//                 <div className="card-info">
//                   <h3>Service Type: {request.serviceType}</h3>
//                   <p>Customer: {request.customerName}</p>
//                   <p>Details: {request.details}</p>
//                 </div>
//                 <div className="technician-buttons">
//                   <button className="accept-button" onClick={() => onAccept(request.id)}>Accept</button>
//                   <button className="decline-button" onClick={() => onDecline(request.id)}>Decline</button>
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

// export default TechnicianAcceptNow;


import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './TechnicianAcceptNow.css';
 
function TechnicianAcceptNow() {
  const location = useLocation();  // Get the current location state
  const [requests, setRequests] = useState(location?.state?.requests || []); // Directly use the requests passed via location state
  const [error, setError] = useState(null);  // To store any error message
 
  console.log('Received requests in TechnicianAcceptNow:', requests);
 
  // Handle Accept button click
  const handleAccept = async (requestId) => {
    console.log(`Request ${requestId} accepted.`);
 
    // Find the request to accept
    const acceptedRequest = requests.find(request => request.serviceRequestUUID === requestId);
 
    if (!acceptedRequest) {
      console.error('Request not found.');
      return;
    }
 
    // Prepare the payload for the PATCH request
    const payload = {
      serviceRequestUUID: acceptedRequest.serviceRequestUUID,
      requestType: acceptedRequest.requestType,
      status: 'ACCEPTED', // Update status to ACCEPTED
      assignedTechnician: localStorage.getItem('username'),  // Get the logged-in technician's username
    };
 
    console.log('Payload for PATCH request:', payload);  // Log the payload for debugging
 
    // Make the PATCH request to accept the service request
    try {
      const response = await fetch('https://technician.c-09499df.kyma.ondemand.com/api/v1/updateStatus', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
 
      if (!response.ok) {
        throw new Error('Failed to accept the request');
      }
 
      const data = await response.text();
      console.log('Response from PATCH request:', data);
 
      // If the request was accepted successfully, remove it from the list of requests
      const updatedRequests = requests.filter(request => request.serviceRequestUUID !== requestId);
      setRequests(updatedRequests);
     
      alert('Request accepted successfully!');
 
    } catch (error) {
      console.error('Error accepting the request:', error);
      setError('Failed to accept the request. Please try again later.');
    }
  };
 
  // Handle Decline button click
  const handleDecline = async (requestId) => {
    console.log(`Request ${requestId} declined.`);
 
    // Find the request to decline
    const declinedRequest = requests.find(request => request.serviceRequestUUID === requestId);
 
    if (!declinedRequest) {
      console.error('Request not found.');
      return;
    }
 
    // Prepare the payload for the PATCH request
    const payload = {
      serviceRequestUUID: declinedRequest.serviceRequestUUID,
      requestType: declinedRequest.requestType,
      status: 'REJECTED', // Update status to REJECTED
      assignedTechnician: localStorage.getItem('username'),  // Get the logged-in technician's username
    };
 
    console.log('Payload for PATCH request:', payload);  // Log the payload for debugging
 
    // Make the PATCH request to decline the service request
    try {
      const response = await fetch('https://technician.c-09499df.kyma.ondemand.com/api/v1/updateStatus', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
 
      if (!response.ok) {
        throw new Error('Failed to decline the request');
      }
 
      const data = await response.text();
      console.log('Response from PATCH request:', data);
 
      // If the request was declined successfully, remove it from the list of requests
      const updatedRequests = requests.filter(request => request.serviceRequestUUID !== requestId);
      setRequests(updatedRequests);
     
      alert('Request declined successfully!');
 
    } catch (error) {
      console.error('Error declining the request:', error);
      setError('Failed to decline the request. Please try again later.');
    }
  };
 
  return (
    <div className="technician-accept-now-container">
      <h2>Service Requests</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="technician-cards">
        {requests.length === 0 ? (
          <p className="no-requests">Currently no service requests available.</p>
        ) : (
          requests.map((request) => (
            <div key={request.serviceRequestUUID} className="technician-card">
              <div className="card-content">
                <div className="card-info">
                  <h3>Service Type: {request.serviceType}</h3>
                  <p><strong>Model Name:</strong> {request.modelName}</p>
                  <p><strong>Request Type:</strong> {request.requestType}</p>
                  <p><strong>Service Description:</strong> {request.serviceDescription}</p>
                  <p><strong>Status:</strong> {request.status}</p>
                  <p><strong>Time:</strong> {request.time}</p>
                  <p><strong>Vehicle Type:</strong> {request.vehicleType}</p>
                  <p><strong>Date:</strong> {request.date}</p>
                </div>
                <div className="technician-buttons">
                  <button className="accept-button" onClick={() => handleAccept(request.serviceRequestUUID)}>
                    Accept
                  </button>
                  <button className="decline-button" onClick={() => handleDecline(request.serviceRequestUUID)}>
                    Decline
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
 
export default TechnicianAcceptNow;