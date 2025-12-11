import { useState } from 'react';
import { MagnifyingGlassIcon, CalendarIcon, MapPinIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { categories } from '../data/mockEvents';

export default function SearchFilters({ 
  searchTerm, 
  onSearchChange, 
  selectedCategory, 
  onCategoryChange,
  selectedDate,
  onDateChange,
  selectedLocation,
  onLocationChange 
}) {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-8">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="input pl-10 pr-4 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 lg:flex-none lg:w-auto">
          <div className="relative">
            <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Location"
              value={selectedLocation}
              onChange={(e) => onLocationChange(e.target.value)}
              className="input pl-10 pr-4 w-full sm:w-48 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
            />
          </div>

          <div className="relative">
            <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => onDateChange(e.target.value)}
              className="input pl-10 pr-4 w-full sm:w-48 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
            />
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn btn-secondary flex items-center justify-center lg:hidden"
          >
            <FunnelIcon className="w-4 h-4 mr-2" />
            Filters
          </button>
        </div>
      </div>

      <div className={`${showFilters ? 'block' : 'hidden'} lg:block mt-6 pt-6 border-t border-gray-100 dark:border-gray-700`}>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center space-x-2 ${
                selectedCategory === category.id
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}