import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MobileEvent from './MobileEvent';
import MobileEventDrawer from './MobileEventDrawer';
import '../styles/MobileEventsList.css';

function MobileEventsList({ events }) {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseDrawer = () => {
    setSelectedEvent(null);
  };

  return (
    <section id="mobile-events">
      {events.map(event => (
        <MobileEvent key={event._id} event={event} onEventClick={handleEventClick} />
      ))}
      <div className={`drawer-container ${selectedEvent ? 'open' : ''}`}>
        <MobileEventDrawer event={selectedEvent} onClose={handleCloseDrawer} />
      </div>
    </section>
  );
}

MobileEventsList.propTypes = {
  events: PropTypes.array.isRequired,
};

export default MobileEventsList;
