import React, { useEffect, useState } from 'react';
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
import useMediaQuery from '@mui/material/useMediaQuery';
import dayjs from 'dayjs';

function App() {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));
  const isMobile = useMediaQuery('(max-width: 600px)');

  useEffect(() => {
    async function fetchEvents(date) {
      try {
        const response = await fetch(`http://localhost:3001/events?date=${date}`);
        const data = await response.json();
        if (Array.isArray(data)) {
          setEvents(data);
        } else {
          console.error('Error: Data is not an array');
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    }

    fetchEvents(selectedDate);
  }, [selectedDate]);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              {isMobile ? (
                <div className="mobile-header">
                  <div className="mobile-button-container">
                    <div className="mobile-button">
                      <MobileMapButton events={events} />
                    </div>
                    <div className="mobile-button">
                      <MobileTimeline selectedDate={selectedDate} onDateChange={setSelectedDate} />
                    </div>
                    <div className="mobile-button">
                      <MobileDatePickerButton selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                    </div>
                  </div>
                  <MobileEventsList events={events} onEventClick={() => {}} />
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
                      <Summary eventCount={events.length} />
                      <MapComponent events={events} />
                    </div>
                  </main>
                </>
              )}
            </>
          }
        />
        <Route path="/add-event" element={<AddEvent />} />
      </Routes>
    </div>
  );
}

export default App;
