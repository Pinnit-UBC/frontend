import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/MobileEvent.css';
import MobileEventDrawer from './MobileEventDrawer';

function formatTime(time) {
  if (!time) return 'N/A';
  const [hours, minutes] = time.split(':');
  const period = hours >= 12 ? 'pm' : 'am';
  const formattedHours = hours % 12 || 12;
  return `${formattedHours}:${minutes}${period}`;
}

function MobileEvent({ event, onEventClick }) {
  const [imageUrl, setImageUrl] = useState('https://via.placeholder.com/120');
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (event && event.image_url) {
      const testImage = new Image();
      testImage.src = event.image_url;
      testImage.onload = () => setImageUrl(event.image_url);
      testImage.onerror = () => setImageUrl('https://via.placeholder.com/120');
    }
  }, [event]);

  const handleEventClick = () => setDrawerOpen(true);

  return (
    <>
      <div className="mobile-event-container" onClick={handleEventClick}>
        <div className="mobile-event-details">
          <div className="mobile-event-time">
            {event.start_time && event.end_time ? `${formatTime(event.start_time)} to ${formatTime(event.end_time)}` : 'Time not available'}
          </div>
          <div className="mobile-event-title">{event.event_title || 'Title not available'}</div>
          <div className="mobile-event-location">
            <img src="/assets/mdi_location.png" alt="Location Logo" className="mobile-location-logo" />
            {event.location || 'Location not available'}
          </div>
          <div className="mobile-event-host">
            <img src="/assets/teenyicons_user-solid.png" alt="Host Logo" className="mobile-host-logo" />
            {event.host_organization || 'Host not available'}
          </div>
          <div className="mobile-event-registration">
            <img src="/assets/Signing A Document.png" alt="Registration Logo" className="mobile-registration-logo" />
            {event.registration_status || 'Registration status not available'}
          </div>
          <div className="mobile-event-tags">
            {event.tags && event.tags.length > 0 ? event.tags.map((tag, index) => (
              <span key={index} className="mobile-tag">{tag}</span>
            )) : 'No tags available'}
          </div>
        </div>
        <div className="mobile-event-image">
          <img src={imageUrl} alt="Event" />
        </div>
      </div>
      <MobileEventDrawer event={event} open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}

MobileEvent.propTypes = {
  event: PropTypes.shape({
    start_time: PropTypes.string,
    end_time: PropTypes.string,
    event_title: PropTypes.string,
    host_organization: PropTypes.string,
    location: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    image_url: PropTypes.string,
    registration_status: PropTypes.string,
  }).isRequired,
  onEventClick: PropTypes.func.isRequired,
};

export default MobileEvent;
