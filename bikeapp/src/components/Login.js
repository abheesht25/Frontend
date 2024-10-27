// src/components/Login.js
import React, { useState } from 'react';

function Login({ onSwitch }) {
  const [userType, setUserType] = useState('customer'); // 'customer' or 'technician'

  const handleUserTypeChange = (e) => setUserType(e.target.value);

  return (
    <div className="login-form">
      <h2>Login</h2>
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
      <p>
        Don't have an account? <span onClick={onSwitch} className="link">Register here</span>
      </p>
    </div>
  );
}

export default Login;
