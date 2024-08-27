import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MobileEvent from './MobileEvent';
import '../styles/MobileEventsList.css';

function MobileEventsList({ events, onEventClick }) {
  const [filteredEvents, setFilteredEvents] = useState(events);

  useEffect(() => {
    setFilteredEvents(events); // Reset filtered events whenever the events prop changes
  }, [events]);

  const handleFilterChange = (selectedTags, selectedFaculty, selectedDegreeLevel) => {
    const filtered = events.filter(event => {
      const eventTags = event.tags || [];
      const eventFaculty = event.faculty || [];
      const eventDegreeLevel = event.degree_level || [];

      const matchTags = selectedTags.length === 0 || eventTags.some(tag => selectedTags.includes(tag));
      const matchFaculty = selectedFaculty.length === 0 || eventFaculty.some(fac => selectedFaculty.includes(fac));
      const matchDegreeLevel = selectedDegreeLevel.length === 0 || eventDegreeLevel.some(degree => selectedDegreeLevel.includes(degree));
      return matchTags && matchFaculty && matchDegreeLevel;
    });

    setFilteredEvents(filtered);
  };

  if (!filteredEvents || filteredEvents.length === 0) {
    return <div>No events found for the selected filters.</div>;
  }

  return (
    <section id="mobile-events">
      {filteredEvents.map(event => (
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
