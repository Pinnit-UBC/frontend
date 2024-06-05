import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import subscribeIcon from '../assets/subscribe-icon.png';
import pinnitLogo from '../assets/pinnit_logo.png';
import '../styles/Header.css';
import '../styles/MobileHeader.css'; // Import the mobile-specific styles

function Header() {
  const navigate = useNavigate();

  const handleAddEventClick = () => {
    navigate('/add-event');
  };

  return (
    <header>
      <div className="background-image">
        <div className="logo-container">
          <img src={pinnitLogo} alt="Pinnit Logo" className="header-logo" />
        </div>
      </div>
      <div className="subscribe-banner">
        <img src={subscribeIcon} alt="Subscribe Icon" className="subscribe-icon" />
        <a href="/subscribe" className="subscribe-link">
          <span className="subscribe-text">Subscribe</span> to the UBC event newsletter
        </a>
      </div>
      <Button
        variant="contained"
        className="add-event-button"
        onClick={handleAddEventClick}
      >
        <span className="add-event-text">+ Add Event</span>
        <span className="add-event-icon">+</span>
      </Button>
    </header>
  );
}

export default Header;
