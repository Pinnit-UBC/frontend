import React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import fireIcon from '../assets/fire.png'; // Import the fire icon

const actions = [
  { label: 'Popular events today', name: 'PopularEvents' },
  { label: '# of events today', name: 'EventsCount' },
];

export default function MobileSpeedDial({ onEventsCountClick, onPopularEventsClick }) {
  return (
    <Box 
      sx={{ 
        position: 'fixed', 
        bottom: 40,  // Adjusted for more space from the bottom
        left: 40,    // Adjusted for more space from the left
        zIndex: 1500,  // Ensures it's on top of other elements
        transform: 'translateZ(0px)', 
        flexGrow: 1 
      }}
    >
      <SpeedDial
        ariaLabel="SpeedDial mobile view"
        icon={<img src={fireIcon} alt="Fire Icon" style={{ width: 50, height: 50 }} />} // Use fire.png with increased size
        FabProps={{
          sx: {
            width: 80, // Increase the size of the main button
            height: 80,
            backgroundColor: '#ff5722', // Optional: Change background color
            '&:hover': {
              backgroundColor: '#e64a19', // Optional: Change hover background color
            },
          },
        }}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={
              <Box 
                sx={{
                  minWidth: '150px',  // Minimum width to fit text
                  padding: '8px 16px',  // Padding for extra space around the text
                  backgroundColor: '#333', // Darker background for better contrast
                  color: 'white',
                  borderRadius: '20px',  // Rounded edges for the button
                  fontSize: '14px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',  // Prevent text wrapping
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {action.label}
              </Box>
            }
            tooltipTitle="" // Disable the default tooltip
            onClick={action.name === 'EventsCount' ? onEventsCountClick : onPopularEventsClick}
            sx={{
              marginBottom: 1, // Space between actions
            }}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
