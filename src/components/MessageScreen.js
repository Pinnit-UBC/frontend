import React, { useState, useEffect } from 'react';
import '../styles/MessageScreen.css';

const MessageScreen = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const messageSeen = localStorage.getItem('messageSeen');
    if (messageSeen === 'true') {
      setIsVisible(false);
    }
  }, []);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleClose = () => {
    if (isChecked) {
      localStorage.setItem('messageSeen', 'true');
    }
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="message-overlay">
      <div className="message-box">
        <h2>Welcome to Pinnit UBC!</h2>
        <p>Check out everything happening on campus!</p>
        <h3 className="update-notes">September 7 update notes</h3>
        <ul>
          <li><strong>Added master list</strong> with all clubs and faculties on campus</li>
          <li><strong>UI changes</strong> to mobile viewing</li>
          <li><strong>Bug fix</strong> to mobile viewing</li>
        </ul>
        <div className="checkbox-container">
          <input type="checkbox" id="acknowledge" checked={isChecked} onChange={handleCheckboxChange} />
          <label htmlFor="acknowledge">Don't show me again</label>
        </div>
        <button onClick={handleClose}>Got it!</button>
      </div>
    </div>
  );
};

export default MessageScreen;
