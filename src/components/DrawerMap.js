import React, { useEffect, useRef } from 'react';
import { GoogleMap, LoadScriptNext } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '300px',
};

function DrawerMap({ latitude, longitude }) {
  const mapRef = useRef(null);
  const apiKey = process.env.REACT_APP_DRAWER_MAP_API_KEY;

  useEffect(() => {
    if (latitude && longitude) {
      const position = { lat: parseFloat(latitude), lng: parseFloat(longitude) };
      if (mapRef.current) {
        mapRef.current.panTo(position);

        // Remove previous markers to avoid duplicate markers
        if (mapRef.current.markers) {
          mapRef.current.markers.forEach(marker => marker.setMap(null));
        }
        mapRef.current.markers = [];

        const marker = new window.google.maps.Marker({
          position,
          map: mapRef.current,
        });

        mapRef.current.markers.push(marker);
      }
      
      console.log('Map center set to:', position); // Debugging statement
      console.log('Marker position set to:', position); // Debugging statement
    } else {
      console.log('Invalid latitude or longitude'); // Debugging statement
    }
  }, [latitude, longitude]);

  if (!apiKey) {
    console.error('Google Maps API key is missing');
    return <div>Google Maps API key is missing</div>;
  }

  return (
    <LoadScriptNext googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{ lat: 0, lng: 0 }} // Initial center
        zoom={15}
        onLoad={(map) => {
          mapRef.current = map;
        }}
      >
        {/* Marker will be added dynamically */}
      </GoogleMap>
    </LoadScriptNext>
  );
}

export default DrawerMap;
