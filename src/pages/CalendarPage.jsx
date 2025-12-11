import { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { mockEvents } from '../data/mockEvents';
import { useEvents } from '../context/EventContext';
import EventModal from '../components/EventModal';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

export default function CalendarPage() {
  const { isEventSaved, toggleSaveEvent } = useEvents();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Transform events for calendar
  const calendarEvents = mockEvents.map(event => ({
    id: event.id,
    title: event.title,
    start: new Date(`${event.date}T${event.time}`),
    end: new Date(`${event.date}T${event.time}`),
    resource: event,
  }));

  const handleSelectEvent = (calendarEvent) => {
    setSelectedEvent(calendarEvent.resource);
    setIsModalOpen(true);
  };

  const handleToggleSave = (eventId) => {
    toggleSaveEvent(eventId);
  };

  const eventStyleGetter = (event) => {
    const isSaved = isEventSaved(event.id);
    const categoryColors = {
      tech: { bg: '#3b82f6', border: '#2563eb' },
      music: { bg: '#a855f7', border: '#9333ea' },
      sports: { bg: '#22c55e', border: '#16a34a' },
      food: { bg: '#f97316', border: '#ea580c' },
      arts: { bg: '#ec4899', border: '#db2777' },
      outdoors: { bg: '#10b981', border: '#059669' },
    };

    const colors = categoryColors[event.resource.category] || { bg: '#6b7280', border: '#4b5563' };

    return {
      style: {
        backgroundColor: colors.bg,
        borderColor: colors.border,
        borderWidth: isSaved ? '3px' : '1px',
        borderStyle: 'solid',
        color: 'white',
        borderRadius: '5px',
        opacity: 0.9,
        display: 'block',
        fontWeight: isSaved ? '600' : '400',
      }
    };
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Calendar View
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          View all events in a calendar format. Click on any event to see details.
        </p>
      </div>

      {/* Legend */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Categories:</h3>
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded bg-blue-500"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Tech</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded bg-purple-500"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Music</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded bg-green-500"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Sports</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded bg-orange-500"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Food</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded bg-pink-500"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Arts</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded bg-emerald-500"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Outdoors</span>
          </div>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          💡 Bold border = Saved event
        </p>
      </div>

      {/* Calendar */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 calendar-container">
        <Calendar
          localizer={localizer}
          events={calendarEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
          onSelectEvent={handleSelectEvent}
          eventPropGetter={eventStyleGetter}
          views={['month', 'week', 'day', 'agenda']}
          defaultView="month"
          popup
          className="dark:text-white"
        />
      </div>

      {/* Event Modal */}
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
