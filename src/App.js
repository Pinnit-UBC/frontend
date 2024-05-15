import React, { useEffect, useState } from 'react';
import './App.css';
import EventsList from './components/EventsList';
import Summary from './components/Summary';
import Header from './components/Header';

function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch('http://localhost:3001/events');
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    }

    fetchEvents();
  }, []);

  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <EventsList events={events} />
        <Summary eventCount={events.length} />
      </main>
    </div>
  );
}

export default App;
