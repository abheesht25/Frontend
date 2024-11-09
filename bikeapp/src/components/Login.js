// src/components/Login.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ onLoginSuccess }) {
  const [userType, setUserType] = useState('customer');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    onLoginSuccess(userType); // Pass userType to set correct state in App
    navigate('/'); // Redirect to Home page after login
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <select onChange={(e) => setUserType(e.target.value)} value={userType}>
        <option value="customer">Customer</option>
        <option value="technician">Technician</option>
      </select>
      <form onSubmit={handleLogin}>
        {userType === 'customer' ? (
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        ) : (
          <input
            type="text"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        )}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <span onClick={() => navigate('/signup')} className="link">Register here</span>
      </p>
    </div>
  );
}

export default Login;
