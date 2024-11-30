// src/components/Login.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
 
function Login({ onLoginSuccess }) {
  const [userType, setUserType] = useState('customer'); // 'customer' or 'technician'
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
 
  // Handle the form submission (login)
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // Reset error state
 
    // Create loginData based on userType (customer or technician)
    let loginData = {
      password,
    };
 
    if (userType === 'customer') {
      loginData = { ...loginData, email };
    } else if (userType === 'technician') {
      loginData = { ...loginData, username };
    }
 
    console.log('Login Payload:', loginData); // Log the payload for debugging
 
    try {
      // Define the API endpoint based on the user type
      const apiEndpoint =
        userType === 'customer'
          ? 'https://user.c-09499df.kyma.ondemand.com/api/v1/u/login'
          : 'https://technician.c-09499df.kyma.ondemand.com/api/v1/login';
 
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
 
      if (response.ok) {
        if (userType === 'customer') {
          // For customers, the token is returned in the response header
          const token = response.headers.get('Authorization'); // Token in the response header
          if (token) {
            localStorage.setItem('authToken', token);
            console.log('Customer Token:', token); // Log token
            onLoginSuccess(userType);
            navigate('/'); // Redirect to home page after successful login
          } else {
            const message = await response.text();
            setError(message || 'Login failed. Please check your credentials and try again.');
          }
        } else if (userType === 'technician') {
          // For technicians, the token is in the response body
          const data = await response.json().catch(() => null); // Catch any JSON parsing error
 
          if (data && data.token) {
            localStorage.setItem('authToken', data.token); // Store the token
            localStorage.setItem('username', username); // Store the username locally
            console.log('Technician Token:', data.token); // Log token
            console.log('Technician Username:', username); // Log username
            onLoginSuccess(userType);
            navigate('/'); // Redirect to home page after successful login
          } else {
            const message = data?.message || 'Login failed. Please check your credentials and try again.';
            setError(message);
          }
        }
      } else {
        // Handle API error response
        const errorText = await response.text(); // Get the response as text
        try {
          const errorData = JSON.parse(errorText); // Try to parse the text as JSON
          setError(errorData.message || 'Login failed. Please check your credentials and try again.');
        } catch (jsonError) {
          // If JSON parsing fails, just show the text response
          setError(errorText || 'Login failed. Please check your credentials and try again.');
        }
      }
    } catch (err) {
      console.error('Login Error:', err);
      setError('An error occurred while trying to login. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <div className="login-form">
      <h2>Login</h2>
 
      {/* User type selection (Customer or Technician) */}
      <select onChange={(e) => setUserType(e.target.value)} value={userType}>
        <option value="customer">Customer</option>
        <option value="technician">Technician</option>
      </select>
 
      <form onSubmit={handleLogin}>
        {/* Conditional form fields for Customer vs Technician */}
        {userType === 'customer' ? (
          <>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </>
        )}
 
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
 
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
 
      {/* Error message display */}
      {error && <p className="error">{error}</p>}
 
      <p>
        Don't have an account?{' '}
        <span onClick={() => navigate('/signup')} className="link">
          Register here
        </span>
      </p>
    </div>
  );
}
 
export default Login;