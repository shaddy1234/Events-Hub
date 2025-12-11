import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import toast from 'react-hot-toast';
import { 
  XMarkIcon, 
  CalendarIcon, 
  MapPinIcon, 
  UserGroupIcon,
  ShareIcon,
  HeartIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { format, parseISO } from 'date-fns';

export default function EventModal({ event, isOpen, onClose, onToggleSave, isSaved }) {
  const [showShareMenu, setShowShareMenu] = useState(false);
  
  if (!event) return null;

  const formatDate = (dateString) => {
    try {
      return format(parseISO(dateString), 'EEEE, MMMM dd, yyyy');
    } catch (error) {
      return dateString;
    }
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const shareText = `Check out this event: ${event.title} at ${event.location}`;

  const handleShare = async (platform) => {
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedText = encodeURIComponent(shareText);
    
    const shareLinks = {
      whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      copy: 'copy'
    };

    if (platform === 'copy') {
      try {
        await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
        toast.success('Link copied to clipboard!', { icon: '📋' });
        setShowShareMenu(false);
      } catch (error) {
        toast.error('Failed to copy link');
      }
    } else {
      window.open(shareLinks[platform], '_blank', 'width=600,height=400');
      setShowShareMenu(false);
      toast.success('Opening share window...', { icon: '🚀' });
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: event.title,
          text: shareText,
          url: shareUrl,
        });
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.log('Error sharing:', error);
        }
      }
    } else {
      setShowShareMenu(!showShareMenu);
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
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-xl shadow-2xl">
                <div className="relative">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-64 object-cover rounded-t-xl"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(event.category)}`}>
                      {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <div className="relative">
                      <button
                        onClick={handleNativeShare}
                        className="p-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-colors"
                      >
                        <ShareIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                      </button>
                      
                      {/* Share Menu Dropdown */}
                      {showShareMenu && (
                        <div className="absolute top-12 right-0 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-2 w-48 animate-fade-in z-10">
                          <button
                            onClick={() => handleShare('whatsapp')}
                            className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
                          >
                            <span className="text-xl">💬</span>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">WhatsApp</span>
                          </button>
                          <button
                            onClick={() => handleShare('twitter')}
                            className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
                          >
                            <span className="text-xl">🐦</span>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Twitter</span>
                          </button>
                          <button
                            onClick={() => handleShare('facebook')}
                            className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
                          >
                            <span className="text-xl">📘</span>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Facebook</span>
                          </button>
                          <button
                            onClick={() => handleShare('copy')}
                            className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
                          >
                            <span className="text-xl">📋</span>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Copy Link</span>
                          </button>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => onToggleSave(event.id)}
                      className="p-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-colors"
                    >
                      {isSaved ? (
                        <HeartSolidIcon className="w-5 h-5 text-red-500" />
                      ) : (
                        <HeartIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                      )}
                    </button>
                    <button
                      onClick={onClose}
                      className="p-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-colors"
                    >
                      <XMarkIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <Dialog.Title className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {event.title}
                  </Dialog.Title>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <CalendarIcon className="w-5 h-5 text-gray-400 dark:text-gray-500 mt-0.5" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{formatDate(event.date)}</p>
                          <p className="text-gray-600 dark:text-gray-300 flex items-center mt-1">
                            <ClockIcon className="w-4 h-4 mr-1" />
                            {event.time}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <MapPinIcon className="w-5 h-5 text-gray-400 dark:text-gray-500 mt-0.5" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{event.location}</p>
                          <p className="text-gray-600 dark:text-gray-300">{event.address}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <UserGroupIcon className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                        <p className="text-gray-600 dark:text-gray-300">{event.attendees} people attending</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Price</h4>
                        <p className="text-2xl font-bold text-primary-600">{event.price}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Organizer</h4>
                        <p className="text-gray-600">{event.organizer}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Tags</h4>
                        <div className="flex flex-wrap gap-2">
                          {event.tags.map((tag, index) => (
                            <span 
                              key={index}
                              className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-sm"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">About this event</h4>
                    <p className="text-gray-600 leading-relaxed">{event.description}</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Venue Location</h4>
                    <div className="bg-gray-200 rounded-lg h-32 flex items-center justify-center text-gray-500">
                      📍 Map integration would display here
                      <br />
                      <small className="text-xs mt-1">{event.address}</small>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button className="btn btn-primary flex-1">
                      Get Tickets
                    </button>
                    <button 
                      onClick={() => onToggleSave(event.id)}
                      className={`btn ${isSaved ? 'btn-secondary' : 'btn-secondary'} flex items-center justify-center`}
                    >
                      {isSaved ? (
                        <>
                          <HeartSolidIcon className="w-4 h-4 mr-2 text-red-500" />
                          Saved
                        </>
                      ) : (
                        <>
                          <HeartIcon className="w-4 h-4 mr-2" />
                          Save Event
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}