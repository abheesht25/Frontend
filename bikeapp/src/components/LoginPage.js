// src/components/LoginPage.js
import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';

function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5f5f5' }}>
        <h1>MechaninX</h1>
      </div>
      <div style={{ flex: 1, padding: '2rem' }}>
        {isSignUp ? <Signup onSwitch={toggleAuthMode} /> : <Login onSwitch={toggleAuthMode} />}
      </div>
    </div>
  );
}

export default LoginPage;
