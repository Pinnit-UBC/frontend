import React, { useEffect, useState, useRef } from 'react';
import { GoogleMap, LoadScriptNext, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '300px',
};

function DrawerMap({ latitude, longitude }) {
  const mapRef = useRef(null);
  const [mapInstance, setMapInstance] = useState(null);
  const apiKey = process.env.REACT_APP_DRAWER_MAP_API_KEY;

  useEffect(() => {
    if (latitude && longitude) {
      const position = { lat: parseFloat(latitude), lng: parseFloat(longitude) };
      if (mapInstance) {
        mapInstance.panTo(position);

        // Remove previous markers to avoid duplicate markers
        if (mapInstance.markers) {
          mapInstance.markers.forEach(marker => marker.setMap(null));
        }
        mapInstance.markers = [];

        const marker = new window.google.maps.Marker({
          position,
          map: mapInstance,
        });

        mapInstance.markers.push(marker);
      }
      
      console.log('Map center set to:', position); // Debugging statement
      console.log('Marker position set to:', position); // Debugging statement
    } else {
      console.log('Invalid latitude or longitude'); // Debugging statement
    }
  }, [latitude, longitude, mapInstance]);

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
          setMapInstance(map);
        }}
      >
        {/* Marker will be added dynamically */}
      </GoogleMap>
    </LoadScriptNext>
  );
}

export default DrawerMap;
