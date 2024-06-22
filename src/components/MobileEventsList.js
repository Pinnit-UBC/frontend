import React from 'react';
import PropTypes from 'prop-types';
import MobileEvent from './MobileEvent';
import '../styles/MobileEventsList.css';

function MobileEventsList({ events, onEventClick }) {
  return (
    <section id="mobile-events">
      {events.map(event => (
        <MobileEvent key={event._id} event={event} onEventClick={onEventClick} />
      ))}
    </section>
  );
}

MobileEventsList.propTypes = {
  events: PropTypes.array.isRequired,
  onEventClick: PropTypes.func.isRequired,
};

export default MobileEventsList;
