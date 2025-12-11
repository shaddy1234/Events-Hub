import { useState } from 'react';
import { mockEvents } from '../data/mockEvents';
import { useEvents } from '../context/EventContext';
import EventCard from '../components/EventCard';
import EventModal from '../components/EventModal';

export default function SchedulePage() {
  const { savedEvents, toggleSaveEvent, isEventSaved } = useEvents();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const savedEventsList = mockEvents.filter(event => isEventSaved(event.id));

  const handleToggleSave = (eventId) => {
    toggleSaveEvent(eventId);
  };

  const handleViewDetails = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const groupEventsByDate = (events) => {
    const grouped = {};
    events.forEach(event => {
      const date = event.date;
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(event);
    });
    return grouped;
  };

  const groupedEvents = groupEventsByDate(savedEventsList);
  const sortedDates = Object.keys(groupedEvents).sort();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          My Schedule
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Keep track of all your saved events in one place. Never miss out on the experiences that matter to you.
        </p>
      </div>

      {savedEventsList.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📅</div>
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">No saved events yet</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Start exploring and save events you're interested in</p>
          <a href="/" className="btn btn-primary">
            Discover Events
          </a>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {savedEventsList.length} Saved Event{savedEventsList.length !== 1 ? 's' : ''}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedEventsList.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onToggleSave={handleToggleSave}
                isSaved={isEventSaved(event.id)}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        </div>
      )}

      <EventModal
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onToggleSave={handleToggleSave}
        isSaved={selectedEvent && isEventSaved(selectedEvent.id)}
      />
    </div>
  );
}