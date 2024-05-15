import React from 'react';
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

function Event({ event }) {
  const startTime = event.start_time ? formatTime(event.start_time) : '';
  const endTime = event.end_time ? formatTime(event.end_time) : '';
  const displayTime = endTime ? `${startTime} to ${endTime}` : startTime;

  const proxyImageUrl = `http://localhost:3001/proxy-image?url=${encodeURIComponent(event.image_url)}`;

  return (
    <div className="event-container">
      <div className="event-details">
        <div className="event-time">{displayTime}</div>
        <div className="event-title">{event.event_name}</div>
        <div className="event-host">
          <img src={userIcon} alt="Host Logo" className="host-logo" />
          {event.club}
        </div>
        <div className="event-location">
          <img src={locationIcon} alt="Location Logo" className="location-logo" />
          {event.location}
        </div>
        <div className="event-registration">
          <img src={registrationIcon} alt="Registration Logo" className="registration-logo" />
          {event.registration}
        </div>
        <div className="event-tags">
          {event.tags && event.tags.map((tag, index) => (
            <span key={index} className="tag">{tag}</span>
          ))}
        </div>
      </div>
      <div className="event-image">
        <img 
          src={proxyImageUrl} 
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
    event_name: PropTypes.string,
    club: PropTypes.string,
    location: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    image_url: PropTypes.string,
    registration: PropTypes.string,
  }).isRequired,
};

export default Event;
