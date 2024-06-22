import React from 'react';
import { GoogleMap, LoadScriptNext, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%', // Adjusted to 100% to fill the container
};

const center = {
  lat: 49.263036774736136, // Initial center position for UBC
  lng: -123.24970352478029,
};

const SimpleMap = ({ markerPosition, handleMapClick }) => {
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  console.log('API Key:', apiKey); // Log API key to ensure it's being used
  console.log('Marker Position:', markerPosition); // Log marker position

  return (
    <LoadScriptNext googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14.5}
        onClick={handleMapClick}
      >
        {markerPosition && <Marker position={markerPosition} />}
      </GoogleMap>
    </LoadScriptNext>
  );
};

export default SimpleMap;