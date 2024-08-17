import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import '../styles/Map.css';
import { MarkerClusterer } from '@googlemaps/markerclusterer';

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

      const markers = events.map(event => {
        if (event.latitude && event.longitude) {
          return new window.google.maps.Marker({
            position: { lat: event.latitude, lng: event.longitude },
            title: event.event_name,
          });
        }
        return null;
      }).filter(marker => marker !== null);

      // Create a new MarkerClusterer instance and add the markers
      new MarkerClusterer({ map, markers });

      // Adjust the map to fit all the markers with some padding
      if (markers.length > 0) {
        const bounds = new window.google.maps.LatLngBounds();
        markers.forEach(marker => {
          bounds.extend(marker.getPosition());
        });
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
