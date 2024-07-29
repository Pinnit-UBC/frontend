import React from 'react';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import closeButton from '../assets/close-button.png';
import '../styles/MenuDrawer.css';

const DarkModeButton = styled(Button)(({ theme, darkMode }) => ({
  color: darkMode ? '#FFFFFF' : '#000000',
  backgroundColor: darkMode ? '#000000' : '#FFFFFF',
  '&:hover': {
    backgroundColor: darkMode ? '#333333' : '#DDDDDD',
  },
  textTransform: 'none',
  fontSize: 16,
  padding: '6px 12px',
  border: 'none', // Remove the border
  lineHeight: 1.5,
  boxShadow: 'none', // Remove the box shadow
  '&:active': {
    boxShadow: 'none',
    backgroundColor: darkMode ? '#000000' : '#FFFFFF',
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(0,0,0,.5)',
  },
}));

function MenuDrawer({ open, onClose }) {
  const [darkMode, setDarkMode] = React.useState(false);

  const handleToggle = () => {
    setDarkMode(!darkMode);
    // Implement dark mode functionality here
  };

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      classes={{ paper: 'menu-drawer-paper' }}
    >
      <Box className="drawer-container">
        <Box className="drawer-header">
          <img src={closeButton} alt="Close" className="drawer-close-button" onClick={onClose} />
        </Box>
        <Typography variant="h6" className="drawer-title">
          Menu
        </Typography>
        {/* Add more menu items here */}
        <Box className="drawer-footer">
          <Stack direction="row" spacing={2} justifyContent="center">
            <DarkModeButton darkMode={darkMode ? 1 : 0} variant="contained" onClick={handleToggle}>
              {darkMode ? "Light Mode" : "Dark Mode"}
            </DarkModeButton>
          </Stack>
        </Box>
      </Box>
    </Drawer>
  );
}

export default MenuDrawer;
