import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import '../styles/Map.css';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const MapComponent = ({ events }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const initMap = async () => {
      const { Map } = await window.google.maps.importLibrary('maps');

      const map = new Map(mapRef.current, {
        center: { lat: 49.263036774736136, lng: -123.24970352478029 },
        zoom: 10, // Set initial zoom level further away
        mapId: '8882b01a6088871f',
      });

      const bounds = new window.google.maps.LatLngBounds();

      // Add markers for each event
      if (events && events.length > 0) {
        events.forEach(event => {
          if (event.latitude && event.longitude) {
            const position = { lat: event.latitude, lng: event.longitude };
            const eventMarker = new window.google.maps.Marker({
              map,
              position,
              title: event.event_name,
            });

            eventMarker.addListener('click', () => {
              console.log(`Marker for event "${event.event_name}" clicked`);
            });

            bounds.extend(position);
          }
        });

        // Adjust the map to fit all the markers with some padding
        map.fitBounds(bounds, { padding: 20 });
      } else {
        map.setCenter({ lat: 49.263036774736136, lng: -123.24970352478029 });
        map.setZoom(10);
      }
    };

    if (window.google && window.google.maps) {
      initMap();
    } else {
      const intervalId = setInterval(() => {
        if (window.google && window.google.maps) {
          clearInterval(intervalId);
          initMap();
        }
      }, 1000);
    }
  }, [events]);

  return <div className="map-container" ref={mapRef} style={containerStyle}></div>;
};

MapComponent.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      event_name: PropTypes.string,
    })
  ),
};

export default MapComponent;
