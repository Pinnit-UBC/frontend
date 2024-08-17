import { useEffect } from 'react';

const loadScript = (url) => {
  const script = document.createElement('script');
  script.src = url;
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);

  script.onload = () => console.log("Google Maps script loaded successfully.");
  script.onerror = (err) => console.error("Failed to load Google Maps script.", err);
};

const GoogleMapsScriptLoader = ({ apiKey, children }) => {
  useEffect(() => {
    if (!window.google) {
      try {
        const googleMapsUrl = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
        loadScript(googleMapsUrl);
      } catch (error) {
        console.error('Error loading Google Maps script:', error);
      }
    }
  }, [apiKey]);

  return children;
};

export default GoogleMapsScriptLoader;
