import React, { useState } from 'react';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [showLoginOptions, setShowLoginOptions] = useState(false);
  const navigate = useNavigate();

  const handleSignInClick = () => {
    setShowLoginOptions(true);
  };

  const handleUserLogin = () => {
    // Add logic for user login here
    console.log('User Login');
    navigate('/loginuser')
  };

  const handleStaffLogin = () => {
    // Add logic for staff login here
    console.log('Staff Login');
    // Navigate to the StaffLoginPage
    navigate('/login');
  };


  return (
    <div className="container">
      <header>
        <div className="hospital-logo">
          <img src="hospital_logo.png" alt="Hospital Logo" />
        </div>
        <div className="hospital-info">
          <h1>Hospital Name</h1>
          <p>Hospital Tagline</p>
        </div>
        <button className="sign-in-button" onClick={handleSignInClick}>Sign In</button>
        {showLoginOptions && (
          <div className="login-options">
            <button className="user-login-button" onClick={handleUserLogin}>Login as User</button>
            <button className="staff-login-button" onClick={handleStaffLogin}>Login as Staff</button>
          </div>
        )}
      </header>

      {/* Rest of the content */}
    </div>
  );
};

export default HomePage;
