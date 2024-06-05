import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/Event.css';
import userIcon from '../assets/teenyicons_user-solid.png'; // Import the host logo
import locationIcon from '../assets/mdi_location.png'; // Import the location logo
import registrationIcon from '../assets/Signing A Document.png'; // Import the registration logo

function formatTime(time) {
  const [hours, minutes] = time.split(':');
  const period = hours >= 12 ? 'pm' : 'am';
  const formattedHours = hours % 12 || 12;
  return `${formattedHours}:${minutes}${period}`;
}

function Event({ event, onEventClick }) {
  const [imageUrl, setImageUrl] = useState(event.image_url || 'https://via.placeholder.com/120');

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

  return (
    <div className="event-container" onClick={() => onEventClick(event)}>
      <div className="event-details">
        <div className="event-time">
          {`${formatTime(event.start_time)} to ${formatTime(event.end_time)}`}
        </div>
        <div className="event-title">{event.event_title}</div>
        <div className="event-location">
          <img src={locationIcon} alt="Location Logo" className="location-logo" />
          {event.location}
        </div>
        <div className="event-host">
          <img src={userIcon} alt="Host Logo" className="host-logo" />
          {event.host_organization}
        </div>
        <div className="event-registration">
          <img src={registrationIcon} alt="Registration Logo" className="registration-logo" />
          {event.registration_status}
        </div>
        <div className="event-tags">
          {event.tags && event.tags.map((tag, index) => (
            <span key={index} className="tag">{tag}</span>
          ))}
        </div>
      </div>
      <div className="event-image">
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
  );
}

Event.propTypes = {
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

export default Event;
