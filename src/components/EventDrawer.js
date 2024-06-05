import React from 'react';
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
import learnIcon from '../assets/Info.png';
import DrawerMap from './DrawerMap';
import '../styles/EventDrawer.css';

function formatTime(time) {
  const [hours, minutes] = time.split(':');
  const period = hours >= 12 ? 'pm' : 'am';
  const formattedHours = hours % 12 || 12;
  return `${formattedHours}:${minutes}${period}`;
}

function EventDrawer({ event, open, onClose }) {
  if (!event) {
    return (
      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: {
            width: {
              xs: '30vw', // 30% of viewport width on extra small screens
              sm: '30vw', // 30% of viewport width on small screens
              md: '50vw', // 50% of viewport width on medium screens and larger
            },
            maxWidth: '50vw', // Ensure the drawer doesn't exceed 50% of viewport width
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

  const imageUrl = event.image_url || 'https://via.placeholder.com/120';

  console.log('Event data:', event); // Debugging statement

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: {
            xs: '30vw', // 30% of viewport width on extra small screens
            sm: '30vw', // 30% of viewport width on small screens
            md: '50vw', // 50% of viewport width on medium screens and larger
          },
          maxWidth: '50vw', // Ensure the drawer doesn't exceed 50% of viewport width
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
        </Box>
        {event.reference_link && (
          <Box className="drawer-info-item">
            <Button
              variant="outlined"
              href={event.reference_link}
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<img src={learnIcon} alt="Learn More" className="button-icon" />}
              sx={{ color: 'white', fontWeight: 'bold', borderColor: 'white' }}
            >
              Learn more
            </Button>
          </Box>
        )}
        {event.activity_description && (
          <>
            <Typography variant="h6" className="drawer-section-header">
              The Event
            </Typography>
            <Divider variant="middle" sx={{ borderColor: 'white', width: '100%', margin: '4px 0 8px' }} />
            <Typography variant="body2" className="drawer-event-description">
              {event.activity_description}
            </Typography>
          </>
        )}
        <Box className="drawer-event-tags">
          {event.tags && event.tags.map((tag, index) => (
            <Typography key={index} component="span" className="drawer-event-tag">
              {tag}
            </Typography>
          ))}
        </Box>
        <Box sx={{ mt: 2 }}>
          <DrawerMap latitude={event.latitude} longitude={event.longitude} />
        </Box>
        {/* New section "About Us" */}
        <Typography variant="h6" className="drawer-section-header" sx={{ mt: 2 }}>
          About Us
        </Typography>
        <Divider variant="middle" sx={{ borderColor: 'white', width: '100%', margin: '4px 0 8px' }} />
        <Typography variant="body2" className="drawer-about-us-description">
          {/* Add your "About Us" content here */}
          We are a team of dedicated professionals committed to organizing and promoting events that enrich the community. Join us and be a part of the excitement!
        </Typography>
      </Box>
    </Drawer>
  );
}

export default EventDrawer;
