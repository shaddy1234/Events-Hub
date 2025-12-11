import { useState, useMemo } from 'react';
import { mockEvents } from '../data/mockEvents';
import { useEvents } from '../context/EventContext';
import SearchFilters from '../components/SearchFilters';
import EventCard from '../components/EventCard';
import EventModal from '../components/EventModal';

export default function DiscoverPage() {
  const { savedEvents, toggleSaveEvent, isEventSaved } = useEvents();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredEvents = useMemo(() => {
    return mockEvents.filter(event => {
      // Search filter
      const searchLower = searchTerm.toLowerCase().trim();
      const matchesSearch = !searchLower || 
        event.title.toLowerCase().includes(searchLower) ||
        event.description.toLowerCase().includes(searchLower) ||
        event.location.toLowerCase().includes(searchLower) ||
        event.tags.some(tag => tag.toLowerCase().includes(searchLower));
      
      // Category filter
      const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
      
      // Date filter
      const matchesDate = !selectedDate || event.date === selectedDate;
      
      // Location filter - more flexible matching
      const locationLower = selectedLocation.toLowerCase().trim();
      const matchesLocation = !locationLower || 
        event.location.toLowerCase().includes(locationLower) ||
        event.address.toLowerCase().includes(locationLower) ||
        // Match individual words in location
        locationLower.split(' ').some(word => 
          event.location.toLowerCase().includes(word) ||
          event.address.toLowerCase().includes(word)
        );
      
      return matchesSearch && matchesCategory && matchesDate && matchesLocation;
    });
  }, [searchTerm, selectedCategory, selectedDate, selectedLocation]);

  const handleToggleSave = (eventId) => {
    toggleSaveEvent(eventId);
  };

  const handleViewDetails = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          Discover Amazing Events in Kenya
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Find and join exciting local events happening across Kenya. From tech meetups to music festivals, there's something for everyone.
        </p>
      </div>

      <SearchFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        selectedLocation={selectedLocation}
        onLocationChange={setSelectedLocation}
      />

      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {filteredEvents.length} Event{filteredEvents.length !== 1 ? 's' : ''} Found
          </h2>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {savedEvents.size} saved event{savedEvents.size !== 1 ? 's' : ''}
          </div>
        </div>
      </div>

      {filteredEvents.length === 0 ? (
        <div className="text-center py-16 animate-fade-in">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">No events found</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">Try adjusting your search criteria or filters</p>
          <button 
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
              setSelectedDate('');
              setSelectedLocation('');
            }}
            className="btn btn-primary"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onToggleSave={handleToggleSave}
              isSaved={isEventSaved(event.id)}
              onViewDetails={handleViewDetails}
            />
          ))}
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