import React, { useState, useEffect, useRef } from 'react';
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
import DrawerMap from './DrawerMap';
import '../styles/EventDrawer.css';

function formatTime(time) {
  const [hours, minutes] = time.split(':');
  const period = hours >= 12 ? 'pm' : 'am';
  const formattedHours = hours % 12 || 12;
  return `${formattedHours}:${minutes}${period}`;
}

function EventDrawer({ event, open, onClose }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const descriptionRef = useRef(null);

  useEffect(() => {
    const checkDescriptionHeight = () => {
      if (descriptionRef.current) {
        const lineHeight = parseInt(window.getComputedStyle(descriptionRef.current).lineHeight, 10);
        const maxHeight = lineHeight * 4; // 4 lines
        setIsTruncated(descriptionRef.current.scrollHeight > maxHeight);
      }
    };
    if (event && event.activity_description) {
      checkDescriptionHeight();
      window.addEventListener('resize', checkDescriptionHeight);
    }
    return () => window.removeEventListener('resize', checkDescriptionHeight);
  }, [event]);

  if (!event) {
    return (
      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: {
            width: '50vw', // 50% of viewport width
            backgroundColor: '#393838',
            borderRadius: '15px 0px 0px 15px',
            overflow: 'auto',
            border: 'none', // Ensure no border from the Drawer itself
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

  const truncatedDescription = event.activity_description
    ? event.activity_description.split(' ').slice(0, 50).join(' ') + '...'
    : '';

  const imageUrl = event.image_url || 'https://via.placeholder.com/120';

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: '50vw', // 50% of viewport width
          backgroundColor: '#393838',
          borderRadius: '15px 0px 0px 15px',
          overflow: 'auto',
          border: 'none', // Ensure no border from the Drawer itself
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
          <Divider variant="middle" sx={{ borderColor: 'white', width: '100%', margin: '4px 0 8px' }} />
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
            <Box className="drawer-info-item" sx={{ mt: 2, width: '100%', display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="contained"
                href={event.reference_link}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: 'white',
                  fontWeight: 'bold',
                  backgroundColor: '#6AA6F8',
                  borderColor: 'transparent',
                  width: '75%',
                  '&:hover': {
                    backgroundColor: '#6AA6F8',
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
            >
              {isExpanded || !isTruncated ? event.activity_description : truncatedDescription}
              {isTruncated && !isExpanded && (
                <span
                  className="drawer-see-more"
                  onClick={() => setIsExpanded(true)}
                >
                  see more
                </span>
              )}
              {isExpanded && (
                <span
                  className="drawer-see-more"
                  onClick={() => setIsExpanded(false)}
                >
                  see less
                </span>
              )}
            </Typography>
          </Box>
        )}
        <Box sx={{ mt: 2 }}>
          <DrawerMap latitude={event.latitude} longitude={event.longitude} />
        </Box>
        <Box className="drawer-info-container">
          <Typography variant="h6" className="drawer-section-header">
            About Us
          </Typography>
          <Divider variant="middle" sx={{ borderColor: 'white', width: '100%', margin: '4px 0 8px' }} />
          <Typography variant="body2" className="drawer-about-us-description">
            We are a team of dedicated professionals committed to organizing and promoting events that enrich the community. Join us and be a part of the excitement!
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );
}

export default EventDrawer;
