import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/Event.css';

function formatTime(time) {
  const [hours, minutes] = time.split(':');
  const period = hours >= 12 ? 'pm' : 'am';
  const formattedHours = hours % 12 || 12;
  return `${formattedHours}:${minutes}${period}`;
}

// Function to format the tags from MongoDB format to display format
function formatTag(tag) {
  return tag
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' & ');
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
          {formatTime(event.start_time)}
          {event.end_time && ` to ${formatTime(event.end_time)}`}
        </div>
        <div className="event-title">{event.event_title}</div>
        <div className="event-location">
          <img src="/assets/mdi_location.png" alt="Location Logo" className="location-logo" />
          {event.location}
        </div>
        <div className="event-host">
          <img src="/assets/teenyicons_user-solid.png" alt="Host Logo" className="host-logo" />
          {event.host_organization}
        </div>
        <div className="event-registration">
          <img src="/assets/Signing A Document.png" alt="Registration Logo" className="registration-logo" />
          {event.registration_status}
        </div>
        <div className="event-tags">
          <img src="/assets/Tag.png" alt="Tag Icon" className="tag-logo" />
          {event.tags && event.tags.map((tag, index) => (
            <span key={index} className="tag">
              {formatTag(tag)}
            </span>
          ))}
          {event.faculty && event.faculty.map((faculty, index) => (
            <span key={index} className="tag">
              {formatTag(faculty)}
            </span>
          ))}
          {event.degree_level && event.degree_level.map((degree, index) => (
            <span key={index} className="tag">
              {formatTag(degree)}
            </span>
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
    faculty: PropTypes.arrayOf(PropTypes.string), // Added propType for faculty
    degree_level: PropTypes.arrayOf(PropTypes.string), // Added propType for degree_level
    image_url: PropTypes.string,
    registration_status: PropTypes.string,
  }).isRequired,
  onEventClick: PropTypes.func.isRequired,
};

export default Event;
