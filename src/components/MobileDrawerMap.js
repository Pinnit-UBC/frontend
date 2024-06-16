import React, { useEffect, useState, useRef } from 'react';
import { GoogleMap, LoadScriptNext, Marker } from '@react-google-maps/api';
import '../styles/MobileDrawerMap.css';

const containerStyle = {
  width: '100%',
  height: '200px', // Adjust the height to make it slightly smaller
};

function MobileDrawerMap({ latitude, longitude }) {
  const mapRef = useRef(null);
  const [mapInstance, setMapInstance] = useState(null);
  const apiKey = process.env.REACT_APP_DRAWER_MAP_API_KEY;

  useEffect(() => {
    if (latitude && longitude) {
      const position = { lat: parseFloat(latitude), lng: parseFloat(longitude) };
      if (mapInstance) {
        mapInstance.panTo(position);

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
        center={{ lat: 0, lng: 0 }}
        zoom={15}
        onLoad={(map) => {
          mapRef.current = map;
          setMapInstance(map);
        }}
      >
      </GoogleMap>
    </LoadScriptNext>
  );
}

export default MobileDrawerMap;
