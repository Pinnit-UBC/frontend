import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import '../styles/ClubsAndOrganizations.css';

const faculties = [
  'All',
  'Faculty & Academic',
  'Arts & Performance',
  'Culture & Community',
  'Health & Wellness',
  'Social',
  'Sorority & Fraternity',
  'Sports & Fitness',
  'Varcity Sports'
];

const facultiesAcademic = [
  'All',
  'Applied Science',
  'Arts',
  'Commerce',
  'Kinesiology',
  'Land & Food Systems',
  'Law',
  'Sciences'
];

function ClubsAndOrganizations() {
  const [clubs, setClubs] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState('All'); // Default to "All"
  const [filteredClubs, setFilteredClubs] = useState([]);
  const [selectedSubFaculty, setSelectedSubFaculty] = useState(''); // For sub-tabs in Faculty & Academic

  // Fetch clubs data on component mount
  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await fetch('http://localhost:3001/clubs-organizations');
        const data = await response.json();
        setClubs(data);
      } catch (error) {
        console.error('Error fetching clubs:', error);
      }
    };

    fetchClubs();
  }, []);

  // Handle main faculty tab change
  const handleFacultyChange = (event, newValue) => {
    setSelectedFaculty(newValue);
    setSelectedSubFaculty(''); // Reset sub-tab when main tab changes
    fetchClubsByFaculty(newValue); // Fetch clubs when the tab is changed
  };

  // Handle sub-tabs change under "Faculty & Academic"
  const handleSubFacultyChange = (event, newValue) => {
    setSelectedSubFaculty(newValue);
    fetchClubsByFaculty(newValue); // Fetch clubs when the sub-tab is changed
  };

  // Fetch clubs by faculty
  const fetchClubsByFaculty = async (faculty) => {
    try {
      const query = faculty && faculty !== 'All' ? `?faculty=${faculty}` : '';
      const response = await fetch(`http://localhost:3001/clubs-organizations${query}`);
      const data = await response.json();
      setFilteredClubs(data);
    } catch (error) {
      console.error('Error fetching clubs:', error);
    }
  };

  // Render UI
  return (
    <div className="clubs-container">
      {/* Main Faculty Tabs */}
      <Box sx={{ width: '100%', marginBottom: '20px' }}>
        <Tabs
          value={selectedFaculty}
          onChange={handleFacultyChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable faculty tabs"
          TabIndicatorProps={{ style: { display: 'none' } }} // Remove the blue underline
        >
          {faculties.map((faculty) => (
            <Tab
              key={faculty}
              label={faculty}
              value={faculty}
              sx={{
                backgroundColor: '#5A5A5A',  // Set background color for each tab
                color: '#FFFFFF',            // Set text color to white
                '&.Mui-selected': {
                  backgroundColor: '#6aa6f8', // Set selected tab color
                  color: '#FFFFFF',            // Ensure text is white for selected tab
                  fontWeight: 'bold',          // Bolden the selected tab text
                },
                borderRadius: '4px',          // Add a slight border-radius
                marginRight: '10px',          // Add margin between tabs
                fontWeight: 'normal',         // Normal font weight for unselected tabs
              }}
            />
          ))}
        </Tabs>
      </Box>

      {/* Sub-tabs for Faculty & Academic */}
      {selectedFaculty === 'Faculty & Academic' && (
        <Box sx={{ width: '100%', marginBottom: '20px' }}>
          <Tabs
            value={selectedSubFaculty}
            onChange={handleSubFacultyChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable sub-faculty tabs"
            TabIndicatorProps={{ style: { display: 'none' } }} // Remove the blue underline
          >
            {facultiesAcademic.map((subFaculty) => (
              <Tab
                key={subFaculty}
                label={subFaculty}
                value={subFaculty}
                sx={{
                  backgroundColor: '#5A5A5A',
                  color: '#FFFFFF',
                  '&.Mui-selected': {
                    backgroundColor: '#6aa6f8',
                    color: '#FFFFFF',
                    fontWeight: 'bold',
                  },
                  borderRadius: '4px',
                  marginRight: '10px',
                  fontWeight: 'normal',
                }}
              />
            ))}
          </Tabs>
        </Box>
      )}

      {/* Display Clubs based on selected faculty or sub-faculty */}
      <Stack direction="row" spacing={4} className="avatar-stack" flexWrap="wrap" justifyContent="center">
        {filteredClubs.length > 0 ? (
          filteredClubs.map((club) => (
            <div key={club.title} className="avatar-item" onClick={() => window.open(club.account_link, '_blank')}>
              <Avatar
                alt={club.title}
                src={club.image_link}
                sx={{ width: 150, height: 150 }}
                onError={(e) => {
                  e.target.onerror = null; // Prevents infinite loop if fallback image also fails
                  e.target.src = '/path-to-fallback-image.png'; // Fallback image path
                }}
              />
              <Typography variant="caption" className="avatar-name">
                {club.title}
              </Typography>
            </div>
          ))
        ) : (
          <Typography>No clubs found for the selected category or faculty.</Typography>
        )}
      </Stack>
    </div>
  );
}

export default ClubsAndOrganizations;
