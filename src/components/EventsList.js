import React, { useState } from 'react';
import Event from './Event';
import EventDrawer from './EventDrawer';

function EventsList({ events }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setDrawerOpen(true);
  };

  return (
    <>
      <section id="events">
        {events.map(event => (
          <Event key={event._id} event={event} onEventClick={handleEventClick} />
        ))}
      </section>
      <EventDrawer 
        open={drawerOpen} 
        onClose={() => setDrawerOpen(false)} 
        event={selectedEvent}
      />
    </>
  );
}

export default EventsList;
