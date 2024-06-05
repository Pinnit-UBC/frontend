import React from 'react';
import PropTypes from 'prop-types';
import Divider from '@mui/material/Divider';
import '../styles/Summary.css';

function Summary({ eventCount }) {
  return (
    <section id="summary">
      <div className="summary-container">
        <div className="summary-numbers-wrapper">
          <div className="summary-et-numbers">{eventCount}</div>
          <div className="summary-et-titles">Events today</div>
        </div>
        <Divider sx={{ bgcolor: '#fff', width: '100%', height: '2px' }} />
        <div className="sponsored-event">
          <img src="fire.png" alt="Fire Logo" className="left-logo" />
          <span>Working at GeoComply: Vancouver's Tech Unicorn</span>
        </div>
      </div>
    </section>
  );
}

Summary.propTypes = {
  eventCount: PropTypes.number.isRequired,
};

export default Summary;
