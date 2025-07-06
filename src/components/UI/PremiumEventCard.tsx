import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  HeartIcon, 
  ShareIcon, 
  CalendarIcon, 
  MapPinIcon, 
  UserGroupIcon,
  StarIcon,
  CheckBadgeIcon,
  PlayIcon,
  ClockIcon,
  TicketIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { Event } from '../../types';
import { formatDate, formatPrice, getAvailableSpots } from '../../utils/helpers';

interface PremiumEventCardProps {
  event: Event;
  onLike?: (eventId: string) => void;
  onShare?: (event: Event) => void;
  index?: number;
  variant?: 'default' | 'large' | 'compact';
  showTrailer?: boolean;
}

const PremiumEventCard: React.FC<PremiumEventCardProps> = ({ 
  event, 
  onLike, 
  onShare, 
  index = 0,
  variant = 'default',
  showTrailer = false
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onLike?.(event.id);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onShare?.(event);
  };

  const availableSpots = getAvailableSpots(event);
  const isAlmostFull = availableSpots <= event.capacity * 0.1;
  const isSoldOut = availableSpots === 0;

  const cardVariants = {
    default: 'aspect-[3/4] w-full',
    large: 'aspect-[16/9] w-full',
    compact: 'aspect-[4/3] w-full'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      whileHover={{ scale: 1.05 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative cursor-pointer responsive-card"
    >
      <Link to={`/events/${event.id}`}>
        <div className="relative overflow-hidden rounded-xl bg-dark-800 shadow-2xl">
          {/* Main Image */}
          <div className={`relative ${cardVariants[variant]} overflow-hidden`}>
            {event.images[0] ? (
              <>
                <img
                  src={event.images[0]}
                  alt={event.title}
                  className={`w-full h-full object-cover transition-all duration-700 ${
                    isHovered ? 'scale-110 brightness-75' : 'scale-100'
                  }`}
                  onLoad={() => setImageLoaded(true)}
                />
                {!imageLoaded && (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 animate-pulse" />
                )}
              </>
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary-500/20 to-secondary-500/20 flex items-center justify-center">
                <span className="text-white text-4xl font-bold opacity-50">
                  {event.title.charAt(0)}
                </span>
              </div>
            )}

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            
            {/* Hover Overlay */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                />
              )}
            </AnimatePresence>

            {/* Play Button for Trailers */}
            {showTrailer && isHovered && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30"
                >
                  <PlayIcon className="w-8 h-8 text-white ml-1" />
                </motion.button>
              </motion.div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex flex-col space-y-2">
            <AnimatePresence>
              {isHovered && (
                <>
                  <motion.button
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ delay: 0.1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleLike}
                    className="p-2 bg-black/60 backdrop-blur-md rounded-full border border-white/20 hover:bg-black/80 transition-colors touch-button"
                  >
                    {event.isLiked ? (
                      <HeartIconSolid className="h-4 w-4 text-red-400" />
                    ) : (
                      <HeartIcon className="h-4 w-4 text-white" />
                    )}
                  </motion.button>
                  <motion.button
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ delay: 0.2 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleShare}
                    className="p-2 bg-black/60 backdrop-blur-md rounded-full border border-white/20 hover:bg-black/80 transition-colors touch-button"
                  >
                    <ShareIcon className="h-4 w-4 text-white" />
                  </motion.button>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Top Badges */}
          <div className="absolute top-4 left-4 flex flex-col space-y-2">
            {event.featured && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="px-3 py-1 bg-gradient-to-r from-accent-500 to-accent-600 text-white text-xs font-bold rounded-full flex items-center space-x-1 shadow-lg"
              >
                <StarIcon className="h-3 w-3" />
                <span>Featured</span>
              </motion.span>
            )}
            
            {isSoldOut ? (
              <span className="px-3 py-1 bg-red-500/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
                Sold Out
              </span>
            ) : isAlmostFull && (
              <motion.span
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="px-3 py-1 bg-red-500/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full"
              >
                Almost Full!
              </motion.span>
            )}

            <span className="px-3 py-1 bg-primary-500/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full capitalize">
              {event.category}
            </span>
          </div>

          {/* Bottom Content */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="space-y-3">
              {/* Title and Rating */}
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="text-responsive-base font-bold text-white line-clamp-2 mb-1">
                    {event.title}
                  </h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-300">
                    <div className="flex items-center space-x-1">
                      <StarIcon className="h-4 w-4 text-yellow-400 fill-current" />
                      <span>4.{Math.floor(Math.random() * 9) + 1}</span>
                    </div>
                    <span>•</span>
                    <span>{event.booked} attending</span>
                  </div>
                </div>
                
                {/* Price */}
                <div className="ml-3">
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className="px-3 py-1 bg-white/10 backdrop-blur-md text-white text-sm font-bold rounded-lg border border-white/20"
                  >
                    {formatPrice(event.pricing.amount, event.pricing.currency)}
                  </motion.span>
                </div>
              </div>

              {/* Event Details */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="space-y-2 text-sm text-gray-300"
                  >
                    <div className="flex items-center space-x-2">
                      <CalendarIcon className="h-4 w-4 text-primary-400" />
                      <span>{formatDate(event.datetime.start, 'MMM dd, yyyy')}</span>
                      <ClockIcon className="h-4 w-4 text-primary-400 ml-2" />
                      <span>{formatDate(event.datetime.start, 'h:mm a')}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPinIcon className="h-4 w-4 text-primary-400" />
                      <span className="truncate">{event.location.venue}, {event.location.city}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <UserGroupIcon className="h-4 w-4 text-primary-400" />
                        <span>{event.capacity} capacity</span>
                      </div>
                      {availableSpots > 0 && (
                        <div className="flex items-center space-x-1">
                          <TicketIcon className="h-4 w-4 text-green-400" />
                          <span className="text-green-400 text-xs font-medium">
                            {availableSpots} left
                          </span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Organizer */}
              <div className="flex items-center space-x-3 pt-2 border-t border-white/10">
                <div className="relative">
                  {event.host.avatar ? (
                    <img
                      src={event.host.avatar}
                      alt={event.host.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-white">
                        {event.host.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  {event.host.verified && (
                    <CheckBadgeIcon className="absolute -bottom-1 -right-1 h-3 w-3 text-primary-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {event.host.name}
                  </p>
                </div>
                <div className="flex items-center space-x-1">
                  <HeartIcon className="h-3 w-3 text-gray-400" />
                  <span className="text-xs text-gray-400">{event.likes}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Shimmer Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatDelay: 3,
            }}
          />
        </div>
      </Link>
    </motion.div>
  );
};

export default PremiumEventCard;