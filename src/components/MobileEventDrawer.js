import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import userIcon from '../assets/teenyicons_user-solid.png';
import locationIcon from '../assets/mdi_location.png';
import registrationIcon from '../assets/Signing A Document.png';
import closeButton from '../assets/close-button.png';
import shareButton from '../assets/share-button.png';
import MobileDrawerMap from './MobileDrawerMap';
import '../styles/MobileEventDrawer.css';

function formatTime(time) {
  const [hours, minutes] = time.split(':');
  const period = hours >= 12 ? 'pm' : 'am';
  const formattedHours = hours % 12 || 12;
  return `${formattedHours}:${minutes}${period}`;
}

function MobileEventDrawer({ event, open, onClose }) {
  const [isExpanded, setIsExpanded] = useState(false);

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
  const truncatedDescription = event.activity_description.split(' ').slice(0, 50).join(' ') + '... see more';

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
          <img src={closeButton} alt="Close" className="drawer-close-button" onClick={onClose} />
          <img src={shareButton} alt="Share" className="drawer-share-button" />
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
            <img src={locationIcon} alt="Location Logo" className="drawer-location-icon" />
            <Typography variant="body2" className="drawer-info-text">
              {event.location}
            </Typography>
          </Box>
          <Box className="drawer-info-item">
            <img src={userIcon} alt="Host Logo" className="drawer-host-icon" />
            <Typography variant="body2" className="drawer-info-text">
              {event.host_organization}
            </Typography>
          </Box>
          <Box className="drawer-info-item">
            <img src={registrationIcon} alt="Registration Logo" className="drawer-registration-icon" />
            <Typography variant="body2" className="drawer-info-text">
              {event.registration_status}
            </Typography>
          </Box>
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
            <Typography variant="body2" className={`drawer-event-description ${isExpanded ? 'expanded' : ''}`}>
              {isExpanded ? event.activity_description : truncatedDescription}
              <span
                className="drawer-see-more"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? ' see less' : ' see more'}
              </span>
            </Typography>
            <MobileDrawerMap latitude={event.latitude} longitude={event.longitude} />
          </Box>
        )}
        <Box className="drawer-event-tags">
          {event.tags && event.tags.map((tag, index) => (
            <Typography key={index} component="span" className="drawer-event-tag">
              {tag}
            </Typography>
          ))}
        </Box>
      </Box>
    </Drawer>
  );
}

export default MobileEventDrawer;
