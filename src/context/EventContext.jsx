import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const EventContext = createContext();

export function useEvents() {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvents must be used within EventProvider');
  }
  return context;
}

export function EventProvider({ children }) {
  // Load saved events from localStorage on mount
  const [savedEvents, setSavedEvents] = useState(() => {
    const saved = localStorage.getItem('savedEvents');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  // Load registered events from localStorage on mount
  const [registeredEvents, setRegisteredEvents] = useState(() => {
    const registered = localStorage.getItem('registeredEvents');
    return registered ? new Set(JSON.parse(registered)) : new Set();
  });

  // Persist to localStorage whenever savedEvents changes
  useEffect(() => {
    localStorage.setItem('savedEvents', JSON.stringify([...savedEvents]));
  }, [savedEvents]);

  // Persist to localStorage whenever registeredEvents changes
  useEffect(() => {
    localStorage.setItem('registeredEvents', JSON.stringify([...registeredEvents]));
  }, [registeredEvents]);

  const toggleSaveEvent = (eventId) => {
    setSavedEvents(prev => {
      const newSaved = new Set(prev);
      if (newSaved.has(eventId)) {
        newSaved.delete(eventId);
        toast.success('Event removed from schedule', {
          icon: '📅',
        });
      } else {
        newSaved.add(eventId);
        toast.success('Event saved to your schedule!', {
          icon: '⭐',
        });
      }
      return newSaved;
    });
  };

  const toggleRegisterEvent = (eventId) => {
    setRegisteredEvents(prev => {
      const newRegistered = new Set(prev);
      if (newRegistered.has(eventId)) {
        newRegistered.delete(eventId);
      } else {
        newRegistered.add(eventId);
      }
      return newRegistered;
    });
  };

  const isEventSaved = (eventId) => savedEvents.has(eventId);
  const isEventRegistered = (eventId) => registeredEvents.has(eventId);

  const value = {
    savedEvents,
    registeredEvents,
    toggleSaveEvent,
    toggleRegisterEvent,
    isEventSaved,
    isEventRegistered,
  };

  return (
    <EventContext.Provider value={value}>
      {children}
    </EventContext.Provider>
  );
}
