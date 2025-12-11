// API Service Layer - Ready for Real API Integration
// Currently using mock data, but structured for easy API swap

import { mockEvents } from '../data/mockEvents';

// Configuration
const API_CONFIG = {
  // Uncomment and add your API key when ready
  // EVENTBRITE_KEY: process.env.VITE_EVENTBRITE_KEY,
  // EVENTBRITE_URL: 'https://www.eventbriteapi.com/v3',
  
  // For future use
  USE_MOCK_DATA: true, // Set to false when API is ready
  MOCK_DELAY: 500, // Simulate network delay
};

// Helper to simulate API calls with mock data
const mockApiCall = (data, delay = API_CONFIG.MOCK_DELAY) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delay);
  });
};

// ==================== EVENT API ====================

/**
 * Fetch all events
 * @param {Object} filters - Filter options (category, location, date, search)
 * @returns {Promise<Array>} Array of events
 */
export async function fetchEvents(filters = {}) {
  if (API_CONFIG.USE_MOCK_DATA) {
    // Using mock data
    let filteredEvents = [...mockEvents];
    
    // Apply filters
    if (filters.category && filters.category !== 'all') {
      filteredEvents = filteredEvents.filter(e => e.category === filters.category);
    }
    
    if (filters.location) {
      const locationLower = filters.location.toLowerCase();
      filteredEvents = filteredEvents.filter(e => 
        e.location.toLowerCase().includes(locationLower) ||
        e.address.toLowerCase().includes(locationLower)
      );
    }
    
    if (filters.date) {
      filteredEvents = filteredEvents.filter(e => e.date === filters.date);
    }
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredEvents = filteredEvents.filter(e =>
        e.title.toLowerCase().includes(searchLower) ||
        e.description.toLowerCase().includes(searchLower) ||
        e.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }
    
    return mockApiCall(filteredEvents);
  }
  
  // TODO: Real API Implementation
  // Example for Eventbrite:
  /*
  try {
    const queryParams = new URLSearchParams({
      'location.address': filters.location || 'Kenya',
      'categories': filters.category || '',
      'start_date.range_start': filters.date || '',
    });
    
    const response = await fetch(
      `${API_CONFIG.EVENTBRITE_URL}/events/search/?${queryParams}`,
      {
        headers: {
          'Authorization': `Bearer ${API_CONFIG.EVENTBRITE_KEY}`,
        },
      }
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch events');
    }
    
    const data = await response.json();
    return transformEventbriteData(data.events); // Transform to our format
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
  */
}

/**
 * Fetch single event by ID
 * @param {string|number} eventId - Event ID
 * @returns {Promise<Object>} Event object
 */
export async function fetchEventById(eventId) {
  if (API_CONFIG.USE_MOCK_DATA) {
    const event = mockEvents.find(e => e.id === eventId);
    if (!event) {
      throw new Error('Event not found');
    }
    return mockApiCall(event);
  }
  
  // TODO: Real API Implementation
  /*
  try {
    const response = await fetch(
      `${API_CONFIG.EVENTBRITE_URL}/events/${eventId}/`,
      {
        headers: {
          'Authorization': `Bearer ${API_CONFIG.EVENTBRITE_KEY}`,
        },
      }
    );
    
    if (!response.ok) {
      throw new Error('Event not found');
    }
    
    const data = await response.json();
    return transformEventbriteData([data])[0];
  } catch (error) {
    console.error('Error fetching event:', error);
    throw error;
  }
  */
}

/**
 * Get event categories
 * @returns {Promise<Array>} Array of categories
 */
export async function fetchCategories() {
  if (API_CONFIG.USE_MOCK_DATA) {
    const categories = [
      { id: 'all', name: 'All Events', icon: '🌟' },
      { id: 'tech', name: 'Technology', icon: '💻' },
      { id: 'music', name: 'Music', icon: '🎵' },
      { id: 'sports', name: 'Sports', icon: '⚽' },
      { id: 'food', name: 'Food & Drink', icon: '🍕' },
      { id: 'arts', name: 'Arts & Culture', icon: '🎨' },
      { id: 'outdoors', name: 'Outdoors', icon: '🏔️' }
    ];
    return mockApiCall(categories);
  }
  
  // TODO: Real API Implementation
}

// ==================== HELPER FUNCTIONS ====================

/**
 * Transform Eventbrite data to our app format
 * @param {Array} eventbriteEvents - Events from Eventbrite API
 * @returns {Array} Transformed events
 */
function transformEventbriteData(eventbriteEvents) {
  // TODO: Implement when using real API
  return eventbriteEvents.map(event => ({
    id: event.id,
    title: event.name.text,
    category: mapEventbriteCategory(event.category_id),
    date: event.start.local.split('T')[0],
    time: event.start.local.split('T')[1].slice(0, 5),
    location: event.venue?.name || 'TBA',
    address: event.venue?.address?.localized_address_display || '',
    description: event.description.text,
    price: event.is_free ? 'Free' : `KES ${event.ticket_availability?.minimum_ticket_price?.major_value || 'TBA'}`,
    attendees: event.capacity || 0,
    image: event.logo?.url || '/default-event.jpg',
    organizer: event.organizer?.name || 'Unknown',
    tags: event.tags || [],
  }));
}

/**
 * Map Eventbrite categories to our categories
 * @param {string} eventbriteCategoryId - Eventbrite category ID
 * @returns {string} Our category
 */
function mapEventbriteCategory(eventbriteCategoryId) {
  // TODO: Create mapping when using real API
  const categoryMap = {
    '102': 'tech',
    '103': 'music',
    '108': 'sports',
    '110': 'food',
    '105': 'arts',
    '109': 'outdoors',
  };
  return categoryMap[eventbriteCategoryId] || 'other';
}

// ==================== FUTURE FEATURES ====================

/**
 * Register for an event (Future implementation)
 * @param {string|number} eventId - Event ID
 * @param {Object} userData - User registration data
 */
export async function registerForEvent(eventId, userData) {
  // TODO: Implement when backend is ready
  console.log('Registration feature coming soon!', { eventId, userData });
  throw new Error('Registration not yet implemented');
}

/**
 * Create a new event (Future implementation)
 * @param {Object} eventData - Event data
 */
export async function createEvent(eventData) {
  // TODO: Implement when backend is ready
  console.log('Event creation coming soon!', eventData);
  throw new Error('Event creation not yet implemented');
}

export default {
  fetchEvents,
  fetchEventById,
  fetchCategories,
  registerForEvent,
  createEvent,
};
