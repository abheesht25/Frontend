// src/components/Signup.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
 
function Signup() {
  const [userType, setUserType] = useState('customer'); // 'customer' or 'technician'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
 
  // Handle user type change
  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
    setError(''); // Reset error when switching user type
  };
 
  // Handle form submission for registration
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
 
    try {
      // Prepare the API endpoint and request data based on user type
      const apiEndpoint =
        userType === 'customer'
          ? 'https://user.c-09499df.kyma.ondemand.com/api/v1/u/signup'
          : 'https://technician.c-09499df.kyma.ondemand.com/api/v1/signup';
 
      const requestData =
        userType === 'customer'
          ? { name, email, password }
          : { username, phone, password };
       
      console.log('Request Data:', requestData);
 
      // Make a POST request to the respective API endpoint
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
 
      // Get the raw response text (string) from the API
      const rawResponse = await response.text();
      console.log('Raw Response:', rawResponse);
 
      // Check if the response is successful (status 2xx)
      if (response.ok) {
        alert(`${userType === 'customer' ? 'Please Verify your email' : 'Registration Successful!'} `);
        navigate('/'); // Redirect to the login page after successful registration
      } else {
        // Handle error response (string message)
        setError(rawResponse || 'Registration failed. Please try again.');
      }
    } catch (err) {
      console.error('Error during registration:', err);
      setError('An error occurred while registering. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
 
  // Function to handle "Login here" click, redirecting to login page
  const handleLoginRedirect = () => {
    navigate('/'); // Redirect to the login page route (assuming "/" is the login route)
  };
 
  return (
    <div className="signup-form">
      <h2>Register</h2>
      <select onChange={handleUserTypeChange} value={userType}>
        <option value="customer">Customer</option>
        <option value="technician">Technician</option>
      </select>
 
      <form onSubmit={handleRegister}>
        {userType === 'customer' ? (
          <>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            <input
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </>
        )}
 
        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
 
      {/* Error message display */}
      {error && <p className="error">{error}</p>}
 
      <p>
        Already have an account?{' '}
        <span onClick={handleLoginRedirect} className="link">
          Login here
        </span>
      </p>
    </div>
  );
}
 
export default Signup;