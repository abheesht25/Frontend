// src/components/Login.js
import React, { useState } from 'react';

function Login({ onSwitch }) {
  const [userType, setUserType] = useState('customer');

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  return (
    <div>
      <h2>Sign In</h2>
      <select onChange={handleUserTypeChange} value={userType}>
        <option value="customer">Customer</option>
        <option value="technician">Technician</option>
      </select>

      <form>
        {userType === 'customer' ? (
          <>
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
          </>
        ) : (
          <>
            <input type="text" placeholder="Phone Number" required />
            <input type="password" placeholder="Password" required />
          </>
        )}
        <button type="submit">Login</button>
      </form>
      <button onClick={onSwitch}>Don't have an account? Sign Up</button>
    </div>
  );
}

export default Login;
