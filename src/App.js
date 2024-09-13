import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import dayjs from 'dayjs';
import useMediaQuery from '@mui/material/useMediaQuery';
import './App.css';
import EventsList from './components/EventsList';
import Summary from './components/Summary';
import Header from './components/Header';
import DatePickerComponent from './components/DatePickerComponent';
import Timeline from './components/Timeline';
import MapComponent from './components/Map';
import AddEvent from './components/AddEvent';
import MobileTimeline from './components/MobileTimeline';
import MobileFilterButton from './components/MobileFilterButton';
import MobileDatePickerButton from './components/MobileDatePickerButton';
import MobileEventsList from './components/MobileEventsList';
import MenuDrawer from './components/MenuDrawer';
import EventDrawer from './components/EventDrawer';
import SubscriptionForm from './components/SubscriptionForm';
import GoogleMapsScriptLoader from './components/GoogleMapsScriptLoader';
import NotFound from './components/NotFound';
import MessageScreen from './components/MessageScreen'; 
import ClubsAndOrganizations from './components/ClubsAndOrganizations'; 


import { cacheEvents, loadCachedEvents, cacheSponsoredEvent, loadCachedSponsoredEvent } from './cache';

function App() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [sponsoredEvent, setSponsoredEvent] = useState(null);
  const [isEventDrawerOpen, setIsEventDrawerOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isPopularEventsActive, setIsPopularEventsActive] = useState(false); 
  const isMobile = useMediaQuery('(max-width: 600px)');
  const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  const toggleMenuDrawer = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSponsoredEventClick = () => {
    if (sponsoredEvent) {
      const matchingEvent = events.find(e => e.event_title.trim() === sponsoredEvent.event_title.trim());
      if (matchingEvent) {
        setSelectedEvent(matchingEvent);
        setIsEventDrawerOpen(true);
      }
    }
  };

  const handleEventDrawerClose = () => {
    setIsEventDrawerOpen(false);
    setSelectedEvent(null);
  };

  useEffect(() => {
    async function fetchEvents(date) {
      if (navigator.onLine) {
        try {
          const response = await fetch(`https://backend-8eis.onrender.com/events?date=${date}`);
          const data = await response.json();
          if (Array.isArray(data)) {
            setEvents(data);
            setFilteredEvents(data);
            await cacheEvents(date, data);
          } else {
            console.error('Error: Data is not an array');
          }
        } catch (error) {
          console.error('Error fetching events:', error);
        }
      } else {
        const cachedData = await loadCachedEvents(date);
        if (cachedData.length > 0) {
          setEvents(cachedData);
          setFilteredEvents(cachedData);
        } else {
          console.log('No cached events found for this date.');
          setEvents([]);
          setFilteredEvents([]);
        }
      }
    }

    async function fetchSponsoredEvent(date) {
      if (navigator.onLine) {
        try {
          const response = await fetch(`https://backend-8eis.onrender.com/sponsored_event?date=${date}`);
          const data = await response.json();
          setSponsoredEvent(data);
          await cacheSponsoredEvent(date, data);
        } catch (error) {
          console.error('Error fetching sponsored event:', error);
          setSponsoredEvent(null);
        }
      } else {
        const cachedData = await loadCachedSponsoredEvent(date);
        if (cachedData) {
          setSponsoredEvent(cachedData);
        } else {
          console.log('No cached sponsored event found for this date.');
          setSponsoredEvent(null);
        }
      }
    }

    fetchEvents(selectedDate);
    fetchSponsoredEvent(selectedDate);
  }, [selectedDate]);

  const normalizeTag = (tag) => tag.toLowerCase().replace(/ & /g, '-');

  const handleFilterChange = (selectedTags, selectedFaculty, selectedDegreeLevel) => {
    const normalizedTags = selectedTags.map(normalizeTag);
    const normalizedFaculty = selectedFaculty.map(normalizeTag);
    const normalizedDegreeLevel = selectedDegreeLevel.map(normalizeTag);

    const filtered = events.filter(event => {
      const eventTags = (event.tags || []).map(normalizeTag);
      const eventFaculty = (event.faculty || []).map(normalizeTag);
      const eventDegreeLevel = (event.degree_level || []).map(normalizeTag);

      const matchTags = normalizedTags.length === 0 || eventTags.some(tag => normalizedTags.includes(tag));
      const matchFaculty = normalizedFaculty.length === 0 || eventFaculty.some(fac => normalizedFaculty.includes(fac));
      const matchDegreeLevel = normalizedDegreeLevel.length === 0 || eventDegreeLevel.some(degree => normalizedDegreeLevel.includes(degree));
      return matchTags && matchFaculty && matchDegreeLevel;
    });

    setFilteredEvents(filtered);
  };

  const handlePopularEventsClick = async () => {
    if (isPopularEventsActive) {
      setFilteredEvents(events);
    } else {
      try {
        const response = await fetch(`https://backend-8eis.onrender.com/popular_events?date=${selectedDate}`);
        const popularEvents = await response.json();
        setFilteredEvents(popularEvents);
      } catch (error) {
        console.error('Error fetching popular events:', error);
        alert('Unable to fetch popular events at this time.');
      }
    }

    setIsPopularEventsActive(!isPopularEventsActive);
  };

  return (
    <GoogleMapsScriptLoader apiKey={googleMapsApiKey}>
      <div className="App">
        <MessageScreen />
        <Header onMenuClick={toggleMenuDrawer} />
        <MenuDrawer open={isMenuOpen} onClose={toggleMenuDrawer} />
        <EventDrawer open={isEventDrawerOpen} onClose={handleEventDrawerClose} event={selectedEvent} />
        <Routes>
          <Route
            path="/"
            element={
              <>
                {isMobile ? (
                  <div className="mobile-header">
                    <div className="mobile-button-container">
                      <div className="filter-button-container">
                        <MobileFilterButton 
                          onFilterChange={handleFilterChange} 
                          onPopularEventsClick={handlePopularEventsClick}
                        />
                      </div>
                      <div className="mobile-timeline-container">
                        <MobileTimeline selectedDate={selectedDate} onDateChange={setSelectedDate} />
                      </div>
                      <div className="date-picker-button-container">
                        <MobileDatePickerButton selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                      </div>
                    </div>
                    {filteredEvents.length > 0 ? (
                      <MobileEventsList events={filteredEvents} onEventClick={(event) => {
                        setSelectedEvent(event);
                        setIsEventDrawerOpen(true);
                      }} />
                    ) : (
                      <div>No events found.</div>
                    )}
                  </div>
                ) : (
                  <>
                    <Timeline selectedDate={selectedDate} onDateChange={setSelectedDate} />
                    <main className="main-content">
                      <div className="left-content">
                        <EventsList events={filteredEvents} />
                      </div>
                      <div className="right-content">
                        <div className="date-picker-box" style={{ width: '100%', display: 'flex' }}>
                          <DatePickerComponent selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                        </div>
                        <Summary
                          eventCount={filteredEvents.length}
                          sponsoredEvent={sponsoredEvent}
                          onSponsoredEventClick={handleSponsoredEventClick}
                        />
                        <MapComponent events={filteredEvents} />
                      </div>
                    </main>
                  </>
                )}
              </>
            }
          />
          {/* Add the clubs-organizations route */}
          <Route path="/clubs-organizations" element={<ClubsAndOrganizations />} /> 
          <Route path="/add-event" element={<AddEvent />} />
          <Route path="/subscribe" element={<SubscriptionForm />} />

          <Route path="/clubs" element={<ClubsAndOrganizations />} />
          <Route path="*" element={<NotFound />} /> {/* Add a catch-all route */}

        </Routes>
      </div>
    </GoogleMapsScriptLoader>
  );
}

export default App;
