import React, { useState, useRef } from 'react';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MobileDrawerMap from './MobileDrawerMap';
import '../styles/MobileEventDrawer.css';

function formatTime(time) {
  if (!time) {
    return ''; // Return an empty string if time is undefined or invalid
  }

  const [hours, minutes] = time.split(':');
  const period = hours >= 12 ? 'pm' : 'am';
  const formattedHours = hours % 12 || 12;
  return `${formattedHours}:${minutes}${period}`;
}

function MobileEventDrawer({ event, open, onClose }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const descriptionRef = useRef(null);

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  if (!event) {
    return (
      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: {
            width: '100vw',
            backgroundColor: '#393838',
            borderRadius: '15px 0px 0px 15px',
            overflow: 'auto',
            border: 'none',
          },
        }}
      >
        <Box className="drawer-container">
          <Typography variant="body1" color="white">
            No event data available.
          </Typography>
        </Box>
      </Drawer>
    );
  }

  const imageUrl = event.image_url || 'https://via.placeholder.com/120';

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: '100vw',
          backgroundColor: '#393838',
          borderRadius: '15px 0px 0px 15px',
          overflow: 'auto',
          border: 'none',
        },
      }}
    >
      <Box className="drawer-container">
        <Box className="drawer-header">
          <button className="drawer-close-button" onClick={onClose}>
            &times;
          </button>
        </Box>
        <Typography variant="h6" className="drawer-event-title">
          {event.event_title}
        </Typography>
        <Typography variant="subtitle1" className="drawer-event-time">
          {formatTime(event.start_time)} to {formatTime(event.end_time)}
        </Typography>
        {event.image_url && (
          <Box sx={{ mt: 2, textAlign: 'center' }} className="drawer-event-image-container">
            <img src={imageUrl} alt="Event" className="drawer-event-image" />
          </Box>
        )}
        <Box className="drawer-info-container">
          <Typography variant="h6" className="drawer-section-header">
            The Event
          </Typography>
          <Divider variant="middle" sx={{ borderColor: 'white', width: '100%', margin: '4px 0 16px' }} />
          <Box className="drawer-info-item">
            <img src="/assets/mdi_location.png" alt="Location Logo" className="drawer-location-icon" />
            <Typography variant="body2" className="drawer-info-text">
              {event.location}
            </Typography>
          </Box>
          <Box className="drawer-info-item">
            <img src="/assets/teenyicons_user-solid.png" alt="Host Logo" className="drawer-host-icon" />
            <Typography variant="body2" className="drawer-info-text">
              {event.host_organization}
            </Typography>
          </Box>
          <Box className="drawer-info-item">
            <img src="/assets/Signing A Document.png" alt="Registration Logo" className="drawer-registration-icon" />
            <Typography variant="body2" className="drawer-info-text">
              {event.registration_status}
            </Typography>
          </Box>
          {/* Add the tags inside the "The Event" container */}
          {event.tags && (
            <Box className="drawer-info-item drawer-tag-container">
              {event.tags.map((tag, index) => (
                <Typography key={index} component="span" className="drawer-event-tag">
                  {tag}
                </Typography>
              ))}
            </Box>
          )}
          {event.reference_link && (
            <Box className="drawer-info-item drawer-check-it-out-container">
              <Button
                variant="contained"
                href={event.reference_link}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  backgroundColor: '#6AA6F8',
                  color: 'white',
                  fontWeight: 'bold',
                  width: '75%',
                  textAlign: 'center',
                  margin: '8px auto 0',
                  borderRadius: '10px',
                  boxShadow: 'none',
                  '&:hover': {
                    backgroundColor: '#5f94e6',
                  },
                }}
              >
                Check it out
              </Button>
            </Box>
          )}
        </Box>
        {event.activity_description && (
          <Box className="drawer-event-details-container">
            <Typography variant="h6" className="drawer-section-header">
              The Details
            </Typography>
            <Divider variant="middle" sx={{ borderColor: 'white', width: '100%', margin: '4px 0 8px' }} />
            <Typography
              variant="body2"
              ref={descriptionRef}
              className={`drawer-event-description ${isExpanded ? 'expanded' : ''}`}
              style={{
                display: '-webkit-box',
                WebkitLineClamp: isExpanded ? 'unset' : 8, // Show only 8 lines when not expanded
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                whiteSpace: 'normal',
              }}
            >
              {event.activity_description}
            </Typography>
            <Button
              sx={{ color: '#6AA6F8', marginTop: '8px' }}
              onClick={handleToggleExpand}
            >
              {isExpanded ? 'see less' : 'see more'}
            </Button>
            <MobileDrawerMap latitude={event.latitude} longitude={event.longitude} />
          </Box>
        )}
      </Box>
    </Drawer>
  );
}

export default MobileEventDrawer;
