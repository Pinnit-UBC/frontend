import React, { useState, useEffect } from 'react';
import SearchBar from '@mkyy/mui-search-bar';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import '../styles/ClubsAndOrganizations.css';

function ClubsAndOrganizations() {
  const [textFieldValue, setTextFieldValue] = useState('');
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await fetch('http://localhost:3001/clubs-organizations'); // Replace with your server URL
        const data = await response.json();
        setClubs(data);
      } catch (error) {
        console.error('Error fetching clubs:', error);
      }
    };

    fetchClubs();
  }, []);

  const handleSearch = (newValue) => {
    setTextFieldValue(newValue);
  };

  const filteredClubs = clubs.filter((club) =>
    club.name.toLowerCase().includes(textFieldValue.toLowerCase())
  );

  return (
    <div className="clubs-container">
      <SearchBar
        value={textFieldValue}
        onChange={handleSearch}
        onSearch={handleSearch}
        className="search-bar"
      />

      <Stack direction="row" spacing={4} className="avatar-stack" flexWrap="wrap">
        {filteredClubs.map((club) => (
          <div key={club.name} className="avatar-item">
            <Avatar
              alt={club.name}
              src={`https://${process.env.REACT_APP_CLOUDFRONT_DOMAIN_NAME}/${club.image}`}
              sx={{ width: 150, height: 150 }} // Adjust size as needed
            />
            <Typography variant="caption" className="avatar-name">
              {club.name}
            </Typography>
          </div>
        ))}
      </Stack>
    </div>
  );
}

export default ClubsAndOrganizations;
