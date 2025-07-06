import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  HeartIcon, 
  ShareIcon, 
  CalendarIcon, 
  MapPinIcon, 
  UserGroupIcon,
  StarIcon,
  CheckBadgeIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { Event } from '../../types';
import { formatDate, formatPrice, getAvailableSpots } from '../../utils/helpers';

interface EventCardProps {
  event: Event;
  onLike?: (eventId: string) => void;
  onShare?: (event: Event) => void;
  index?: number;
}

const EventCard: React.FC<EventCardProps> = ({ event, onLike, onShare, index = 0 }) => {
  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    onLike?.(event.id);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    onShare?.(event);
  };

  const availableSpots = getAvailableSpots(event);
  const isAlmostFull = availableSpots <= event.capacity * 0.1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group event-card responsive-card"
    >
      <Link to={`/events/${event.id}`}>
        <div className="relative">
          {/* Event Image */}
          <div className="aspect-video bg-dark-800 overflow-hidden rounded-t-2xl">
            {event.images[0] ? (
              <img
                src={event.images[0]}
                alt={event.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary-500/20 to-secondary-500/20 flex items-center justify-center">
                <span className="text-white text-4xl font-bold opacity-50">
                  {event.title.charAt(0)}
                </span>
              </div>
            )}
          </div>
          
          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleLike}
              className="p-2 glass-card rounded-full shadow-lg hover:shadow-xl transition-shadow touch-button"
            >
              {event.isLiked ? (
                <HeartIconSolid className="h-4 w-4 text-red-400" />
              ) : (
                <HeartIcon className="h-4 w-4 text-white" />
              )}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleShare}
              className="p-2 glass-card rounded-full shadow-lg hover:shadow-xl transition-shadow touch-button"
            >
              <ShareIcon className="h-4 w-4 text-white" />
            </motion.button>
          </div>
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col space-y-2">
            {event.featured && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="px-3 py-1 bg-gradient-to-r from-accent-500 to-accent-600 text-white text-xs font-bold rounded-full flex items-center space-x-1"
              >
                <StarIcon className="h-3 w-3" />
                <span>Featured</span>
              </motion.span>
            )}
            <span className="px-3 py-1 bg-primary-500/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full capitalize">
              {event.category}
            </span>
          </div>
          
          {/* Price Badge */}
          <div className="absolute bottom-4 left-4">
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 glass-card text-white text-sm font-bold rounded-full"
            >
              {formatPrice(event.pricing.amount, event.pricing.currency)}
            </motion.span>
          </div>

          {/* Almost Full Badge */}
          {isAlmostFull && availableSpots > 0 && (
            <div className="absolute bottom-4 right-4">
              <motion.span
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="px-3 py-1 bg-red-500/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full"
              >
                Almost Full!
              </motion.span>
            </div>
          )}
        </div>
        
        {/* Event Details */}
        <div className="p-4 md:p-6 space-y-4">
          <div className="space-y-2">
            <h3 className="text-responsive-lg font-bold text-white group-hover:text-primary-400 transition-colors duration-300 line-clamp-2">
              {event.title}
            </h3>
            <p className="text-gray-400 text-responsive-sm line-clamp-2 leading-relaxed">
              {event.description}
            </p>
          </div>
          
          {/* Event Info */}
          <div className="space-y-3 text-responsive-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <CalendarIcon className="h-4 w-4 text-primary-400 flex-shrink-0" />
              <span className="truncate">{formatDate(event.datetime.start, 'PPP')}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPinIcon className="h-4 w-4 text-primary-400 flex-shrink-0" />
              <span className="truncate">{event.location.venue}, {event.location.city}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <UserGroupIcon className="h-4 w-4 text-primary-400 flex-shrink-0" />
                <span>{event.booked} attending</span>
              </div>
              {availableSpots > 0 && (
                <span className="text-green-400 text-xs font-medium">
                  {availableSpots} spots left
                </span>
              )}
            </div>
          </div>
          
          {/* Organizer */}
          <div className="flex items-center space-x-3 pt-4 border-t border-white/10">
            <div className="relative flex-shrink-0">
              {event.host.avatar ? (
                <img
                  src={event.host.avatar}
                  alt={event.host.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-white">
                    {event.host.name.charAt(0)}
                  </span>
                </div>
              )}
              {event.host.verified && (
                <CheckBadgeIcon className="absolute -bottom-1 -right-1 h-4 w-4 text-primary-400" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-responsive-sm font-medium text-white truncate">
                {event.host.name}
              </p>
              <p className="text-xs text-gray-400">
                Organizer
              </p>
            </div>
            <div className="flex items-center space-x-1 flex-shrink-0">
              <HeartIcon className="h-4 w-4 text-gray-400" />
              <span className="text-xs text-gray-400">{event.likes}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default EventCard;