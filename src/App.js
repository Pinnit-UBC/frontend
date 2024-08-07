import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import EventsList from './components/EventsList';
import Summary from './components/Summary';
import Header from './components/Header';
import DatePickerComponent from './components/DatePickerComponent';
import Timeline from './components/Timeline';
import MapComponent from './components/Map';
import AddEvent from './components/AddEvent';
import MobileTimeline from './components/MobileTimeline';
import MobileMapButton from './components/MobileMapButton';
import MobileDatePickerButton from './components/MobileDatePickerButton';
import MobileEventsList from './components/MobileEventsList';
import MenuDrawer from './components/MenuDrawer';
import EventDrawer from './components/EventDrawer';
import SubscriptionForm from './components/SubscriptionForm';
import About from './components/About';
import ClubsAndOrganizations from './components/ClubsAndOrganizations';
import News from './components/News';
import AddNews from './components/AddNews';
import Help from './components/Help';
import useMediaQuery from '@mui/material/useMediaQuery';
import dayjs from 'dayjs';

function App() {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [sponsoredEvent, setSponsoredEvent] = useState(null);
  const [isEventDrawerOpen, setIsEventDrawerOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const isMobile = useMediaQuery('(max-width: 600px)');

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
    console.log('Selected date changed:', selectedDate); // Log the selected date

    async function fetchEvents(date) {
      try {
        console.log('Fetching events for date:', date); // Log the date being fetched
        const response = await fetch(`http://localhost:3001/events?date=${date}`);
        const data = await response.json();
        console.log('Response data:', data); // Log the response data
        if (Array.isArray(data)) {
          console.log('Fetched events:', data); // Log the fetched events
          setEvents(data);
        } else {
          console.error('Error: Data is not an array');
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    }

    async function fetchSponsoredEvent(date) {
      try {
        console.log('Fetching sponsored event for date:', date); // Log the date being fetched
        const response = await fetch(`http://localhost:3001/sponsored_event?date=${date}`);
        const data = await response.json();
        console.log('Fetched sponsored event:', data); // Log the fetched sponsored event
        setSponsoredEvent(data);
      } catch (error) {
        console.error('Error fetching sponsored event:', error);
      }
    }

    fetchEvents(selectedDate);
    fetchSponsoredEvent(selectedDate);
  }, [selectedDate]);

  return (
    <div className="App">
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
                    <div className="map-button-container">
                      <MobileMapButton events={events} />
                    </div>
                    <div className="mobile-timeline-container">
                      <MobileTimeline selectedDate={selectedDate} onDateChange={setSelectedDate} />
                    </div>
                    <div className="date-picker-button-container">
                      <MobileDatePickerButton selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                    </div>
                  </div>
                  {events.length > 0 && <MobileEventsList events={events} onEventClick={() => {}} />}
                </div>
              ) : (
                <>
                  <Timeline selectedDate={selectedDate} onDateChange={setSelectedDate} />
                  <main className="main-content">
                    <div className="left-content">
                      <EventsList events={events} />
                    </div>
                    <div className="right-content">
                      <div className="date-picker-box" style={{ width: '100%', display: 'flex' }}>
                        <DatePickerComponent selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                      </div>
                      <Summary
                        eventCount={events.length}
                        sponsoredEvent={sponsoredEvent}
                        onSponsoredEventClick={handleSponsoredEventClick}
                      />
                      <MapComponent events={events} />
                    </div>
                  </main>
                </>
              )}
            </>
          }
        />
        <Route path="/add-event" element={<AddEvent />} />
        <Route path="/subscribe" element={<SubscriptionForm />} />
        <Route path="/about" element={<About />} />
        <Route path="/clubs" element={<ClubsAndOrganizations />} />
        <Route path="/news" element={<News />} />
        <Route path="/help" element={<Help />} />
        <Route path="/addnews" element={<AddNews />} />
      </Routes>
    </div>
  );
}

export default App;
