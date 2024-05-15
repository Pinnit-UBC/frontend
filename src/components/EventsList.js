import React from 'react';
import Event from './Event';
import '../styles/Events.css';

function EventsList({ events }) {
  return (
    <section id="events">
      {events.length > 0 ? (
        events.map(event => <Event key={event._id} event={event} />)
      ) : (
        <p>No events available.</p>
      )}
    </section>
  );
}

export default EventsList;
