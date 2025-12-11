import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MagnifyingGlassIcon, CalendarIcon, MapPinIcon, Bars3Icon, XMarkIcon, SunIcon, MoonIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';
import { useEvents } from '../context/EventContext';
import { useTheme } from '../context/ThemeContext';

export default function Header() {
  const location = useLocation();
  const { savedEvents } = useEvents();
  const { isDark, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm border-b border-gray-100 dark:border-gray-800 sticky top-0 z-40 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all group-hover:scale-105">
              <MapPinIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">EventHub</span>
              <p className="text-xs text-gray-500 dark:text-gray-400">Kenya</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-2">
            <Link
              to="/"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                isActive('/') 
                  ? 'text-white bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg' 
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <MagnifyingGlassIcon className="w-5 h-5" />
              <span className="font-medium">Discover</span>
            </Link>
            <Link
              to="/schedule"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all relative ${
                isActive('/schedule') 
                  ? 'text-white bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg' 
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <CalendarIcon className="w-5 h-5" />
              <span className="font-medium">My Schedule</span>
              {savedEvents.size > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {savedEvents.size}
                </span>
              )}
            </Link>
            <Link
              to="/calendar"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                isActive('/calendar') 
                  ? 'text-white bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg' 
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <CalendarDaysIcon className="w-5 h-5" />
              <span className="font-medium">Calendar</span>
            </Link>
            
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
              aria-label="Toggle dark mode"
            >
              {isDark ? (
                <SunIcon className="w-5 h-5" />
              ) : (
                <MoonIcon className="w-5 h-5" />
              )}
            </button>
          </nav>

          <div className="md:hidden flex items-center space-x-2">
            {/* Dark Mode Toggle Mobile */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDark ? (
                <SunIcon className="w-5 h-5" />
              ) : (
                <MoonIcon className="w-5 h-5" />
              )}
            </button>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isMenuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-3 border-t border-gray-100 dark:border-gray-800 animate-fade-in">
            <Link
              to="/"
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition-all ${
                isActive('/') ? 'text-white bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <MagnifyingGlassIcon className="w-5 h-5" />
              <span className="font-medium">Discover</span>
            </Link>
            <Link
              to="/schedule"
              className={`flex items-center justify-between px-4 py-3 rounded-lg mb-2 transition-all ${
                isActive('/schedule') ? 'text-white bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center space-x-3">
                <CalendarIcon className="w-5 h-5" />
                <span className="font-medium">My Schedule</span>
              </div>
              {savedEvents.size > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 font-bold">
                  {savedEvents.size}
                </span>
              )}
            </Link>
            <Link
              to="/calendar"
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                isActive('/calendar') ? 'text-white bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <CalendarDaysIcon className="w-5 h-5" />
              <span className="font-medium">Calendar</span>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}