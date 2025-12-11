import { useState } from 'react';
import { HeartIcon, CalendarIcon, MapPinIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { format, parseISO } from 'date-fns';

export default function EventCard({ event, onToggleSave, isSaved, onViewDetails }) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleSaveClick = (e) => {
    e.stopPropagation();
    onToggleSave(event.id);
  };

  const formatDate = (dateString) => {
    try {
      return format(parseISO(dateString), 'MMM dd, yyyy');
    } catch (error) {
      return dateString;
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      tech: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      music: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      sports: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      food: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      arts: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
      outdoors: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200'
    };
    return colors[category] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
  };

  return (
    <div 
      className="card cursor-pointer group animate-fade-in bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all"
      onClick={() => onViewDetails(event)}
    >
      <div className="relative overflow-hidden rounded-t-xl">
        <div className="aspect-w-16 aspect-h-9 bg-gray-200 dark:bg-gray-700">
          <img
            src={event.image}
            alt={event.title}
            className={`w-full h-48 object-cover transition-all duration-300 group-hover:scale-105 rounded-t-xl ${
              isImageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setIsImageLoaded(true)}
          />
          {!isImageLoaded && (
            <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center">
              <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-gray-400 dark:bg-gray-500 rounded-full"></div>
              </div>
            </div>
          )}
        </div>
        
        <button
          onClick={handleSaveClick}
          className="absolute top-3 right-3 p-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-lg transition-all hover:bg-white dark:hover:bg-gray-700 hover:scale-110"
        >
          {isSaved ? (
            <HeartSolidIcon className="w-5 h-5 text-red-500" />
          ) : (
            <HeartIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          )}
        </button>

        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(event.category)}`}>
            {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {event.title}
        </h3>
        
        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300 mb-3">
          <div className="flex items-center">
            <CalendarIcon className="w-4 h-4 mr-2 text-gray-400 dark:text-gray-500" />
            <span>{formatDate(event.date)} at {event.time}</span>
          </div>
          <div className="flex items-center">
            <MapPinIcon className="w-4 h-4 mr-2 text-gray-400 dark:text-gray-500" />
            <span className="truncate">{event.location}</span>
          </div>
          <div className="flex items-center">
            <UserGroupIcon className="w-4 h-4 mr-2 text-gray-400 dark:text-gray-500" />
            <span>{event.attendees} attending</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-primary-600 dark:text-primary-400">
            <span className="text-blue-600 dark:text-blue-400">{event.price}</span>
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            by {event.organizer}
          </span>
        </div>
      </div>
    </div>
  );
}