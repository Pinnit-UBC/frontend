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
  const markerClustererRef = useRef(null);

  useEffect(() => {
    const initMap = () => {
      if (mapRef.current) {
        const map = new window.google.maps.Map(mapRef.current, {
          center: { lat: 49.263036774736136, lng: -123.24970352478029 },
          zoom: 10,
          mapId: '8882b01a6088871f',
        });

        mapRef.current.mapInstance = map; // Save the map instance to ref

        updateMarkers(map, events);
      }
    };

    const updateMarkers = (map, events) => {
      if (!map) return; // Add this guard clause to ensure map is valid

      if (markerClustererRef.current) {
        markerClustererRef.current.clearMarkers();
      }

      const markers = events.map(event => {
        if (event.latitude && event.longitude) {
          return new window.google.maps.Marker({
            position: { lat: event.latitude, lng: event.longitude },
            title: event.event_name,
          });
        }
        return null;
      }).filter(marker => marker !== null);

      markerClustererRef.current = new MarkerClusterer({ map, markers });

      if (markers.length > 0) {
        const bounds = new window.google.maps.LatLngBounds();
        markers.forEach(marker => bounds.extend(marker.getPosition()));
        map.fitBounds(bounds);
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
  }, [events]); // 'initMap' is now inside useEffect, so no dependency issues

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
