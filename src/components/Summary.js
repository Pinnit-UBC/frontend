import React from 'react';
import '../styles/Summary.css';
import PropTypes from 'prop-types';

function Summary({ eventCount }) {
  return (
    <section id="summary">
      <div className="summary-container">
        <div className="summary-numbers-wrapper">
          <div className="summary-et-numbers">{eventCount}</div>
          <div className="summary-et-titles">Events today</div>
        </div>
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
