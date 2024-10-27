// src/components/Signup.js
import React, { useState } from 'react';

function Signup({ onSwitch }) {
  const [userType, setUserType] = useState('customer'); // 'customer' or 'technician'

  const handleUserTypeChange = (e) => setUserType(e.target.value);

  return (
    <div className="signup-form">
      <h2>Register</h2>
      <select onChange={handleUserTypeChange} value={userType}>
        <option value="customer">Customer</option>
        <option value="technician">Technician</option>
      </select>

      <form>
        <input type="text" placeholder="Name" required />
        {userType === 'customer' ? (
          <>
            <input type="email" placeholder="Email" required />
            <input type="text" placeholder="Phone Number" required />
          </>
        ) : (
          <>
            <input type="text" placeholder="Phone Number" required />
            <input type="text" placeholder="Shop Name" required />
            <input type="text" placeholder="Shop Address" required />
          </>
        )}
        <input type="password" placeholder="Password" required />
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <span onClick={onSwitch} className="link">Login here</span>
      </p>
    </div>
  );
}

export default Signup;
