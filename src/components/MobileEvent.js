import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/MobileEvent.css';
import MobileEventDrawer from './MobileEventDrawer'; // Import the drawer

function formatTime(time) {
  const [hours, minutes] = time.split(':');
  const period = hours >= 12 ? 'pm' : 'am';
  const formattedHours = hours % 12 || 12;
  return `${formattedHours}:${minutes}${period}`;
}

function MobileEvent({ event, onEventClick }) {
  const [imageUrl, setImageUrl] = useState(event.image_url || 'https://via.placeholder.com/120');
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    console.log('Event image URL:', event.image_url);

    // Check if the image URL is valid
    const testImage = new Image();
    testImage.src = event.image_url;
    testImage.onload = () => {
      console.log('Image loaded successfully:', event.image_url);
      setImageUrl(event.image_url);
    };
    testImage.onerror = () => {
      console.error('Image failed to load:', event.image_url);
      setImageUrl('https://via.placeholder.com/120');
    };
  }, [event.image_url]);

  const handleEventClick = () => {
    setDrawerOpen(true);
  };

  return (
    <>
      <div className="mobile-event-container" onClick={handleEventClick}>
        <div className="mobile-event-details">
          <div className="mobile-event-time">
            {`${formatTime(event.start_time)} to ${formatTime(event.end_time)}`}
          </div>
          <div className="mobile-event-title">{event.event_title}</div>
          <div className="mobile-event-location">
            <img src="/assets/mdi_location.png" alt="Location Logo" className="mobile-location-logo" />
            {event.location}
          </div>
          <div className="mobile-event-host">
            <img src="/assets/teenyicons_user-solid.png" alt="Host Logo" className="mobile-host-logo" />
            {event.host_organization}
          </div>
          <div className="mobile-event-registration">
            <img src="/assets/Signing A Document.png" alt="Registration Logo" className="mobile-registration-logo" />
            {event.registration_status}
          </div>
          <div className="mobile-event-tags">
            {event.tags && event.tags.map((tag, index) => (
              <span key={index} className="mobile-tag">{tag}</span>
            ))}
          </div>
        </div>
        <div className="mobile-event-image">
          <img 
            src={imageUrl} 
            alt="Event" 
            onError={(e) => {
              console.error("Image failed to load: ", e.target.src);
              e.target.src = 'https://via.placeholder.com/120';
            }}
          />
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
