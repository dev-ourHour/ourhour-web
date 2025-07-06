import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  CalendarIcon,
  MapPinIcon,
  UserGroupIcon,
  HeartIcon,
  ShareIcon,
  ClockIcon,
  TicketIcon,
  StarIcon,
  CheckBadgeIcon,
  ArrowLeftIcon,
  CurrencyRupeeIcon,
  UsersIcon,
  BuildingOfficeIcon,
  PhoneIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import ParallaxBackground from '../components/UI/ParallaxBackground';
import PremiumEventCard from '../components/UI/PremiumEventCard';
import { ALL_EVENTS } from '../utils/constants';
import { Event } from '../types';
import { formatDate, formatPrice, getAvailableSpots, shareEvent } from '../utils/helpers';
import { useAuth } from '../contexts/AuthContext';

const EventDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [event, setEvent] = useState<Event | null>(null);
  const [relatedEvents, setRelatedEvents] = useState<Event[]>([]);
  const [isBooking, setIsBooking] = useState(false);
  const [ticketCount, setTicketCount] = useState(1);
  const [activeTab, setActiveTab] = useState<'overview' | 'details' | 'reviews'>('overview');

  useEffect(() => {
    if (id) {
      const foundEvent = ALL_EVENTS.find(e => e.id === id);
      if (foundEvent) {
        setEvent(foundEvent);
        // Get related events from same category
        const related = ALL_EVENTS
          .filter(e => e.id !== id && e.category === foundEvent.category)
          .slice(0, 4);
        setRelatedEvents(related);
      }
    }
  }, [id]);

  if (!event) {
    return (
      <ParallaxBackground className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Event not found</h1>
          <Link to="/events" className="btn-primary">
            Browse Events
          </Link>
        </div>
      </ParallaxBackground>
    );
  }

  const availableSpots = getAvailableSpots(event);
  const isSoldOut = availableSpots === 0;

  const handleLike = () => {
    setEvent(prev => prev ? {
      ...prev,
      isLiked: !prev.isLiked,
      likes: prev.isLiked ? prev.likes - 1 : prev.likes + 1
    } : null);
  };

  const handleShare = () => {
    shareEvent(event);
  };

  const handleBooking = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    setIsBooking(true);
    // Simulate booking process
    setTimeout(() => {
      setIsBooking(false);
      // In real app, redirect to payment
      alert('Booking successful! Redirecting to payment...');
    }, 2000);
  };

  const totalPrice = event.pricing.amount * ticketCount;

  return (
    <ParallaxBackground className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          <span>Back to Events</span>
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Event Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-2xl overflow-hidden"
            >
              {/* Event Image */}
              <div className="aspect-video relative">
                <img
                  src={event.images[0]}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex space-x-2">
                  {event.featured && (
                    <span className="px-3 py-1 bg-gradient-to-r from-accent-500 to-accent-600 text-white text-sm font-bold rounded-full flex items-center space-x-1">
                      <StarIcon className="h-4 w-4" />
                      <span>Featured</span>
                    </span>
                  )}
                  <span className="px-3 py-1 bg-primary-500/90 backdrop-blur-sm text-white text-sm font-semibold rounded-full capitalize">
                    {event.category}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleLike}
                    className="p-3 bg-black/60 backdrop-blur-md rounded-full border border-white/20 hover:bg-black/80 transition-colors"
                  >
                    {event.isLiked ? (
                      <HeartIconSolid className="h-5 w-5 text-red-400" />
                    ) : (
                      <HeartIcon className="h-5 w-5 text-white" />
                    )}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleShare}
                    className="p-3 bg-black/60 backdrop-blur-md rounded-full border border-white/20 hover:bg-black/80 transition-colors"
                  >
                    <ShareIcon className="h-5 w-5 text-white" />
                  </motion.button>
                </div>

                {/* Event Info Overlay */}
                <div className="absolute bottom-6 left-6 right-6">
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    {event.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 text-white/90">
                    <div className="flex items-center space-x-2">
                      <CalendarIcon className="h-5 w-5" />
                      <span>{formatDate(event.datetime.start, 'PPP')}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <ClockIcon className="h-5 w-5" />
                      <span>{formatDate(event.datetime.start, 'p')}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPinIcon className="h-5 w-5" />
                      <span>{event.location.city}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Tab Navigation */}
            <div className="flex space-x-1 glass-card p-1 rounded-xl">
              {[
                { key: 'overview', label: 'Overview' },
                { key: 'details', label: 'Details' },
                { key: 'reviews', label: 'Reviews' }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === tab.key
                      ? 'bg-primary-500 text-white shadow-lg'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-6 md:p-8 rounded-2xl"
            >
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-4">About This Event</h2>
                    <p className="text-gray-300 leading-relaxed text-lg">
                      {event.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">Event Highlights</h3>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-primary-400 rounded-full"></div>
                          <span>Industry-leading speakers</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-primary-400 rounded-full"></div>
                          <span>Networking opportunities</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-primary-400 rounded-full"></div>
                          <span>Hands-on workshops</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-primary-400 rounded-full"></div>
                          <span>Certificate of participation</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">What's Included</h3>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span>Welcome kit & materials</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span>Lunch & refreshments</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span>Access to recordings</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span>Community access</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'details' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-4">Event Details</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <CalendarIcon className="h-6 w-6 text-primary-400 mt-1" />
                        <div>
                          <h4 className="font-semibold text-white">Date & Time</h4>
                          <p className="text-gray-300">{formatDate(event.datetime.start, 'PPPP')}</p>
                          <p className="text-gray-300">{formatDate(event.datetime.start, 'p')} - {formatDate(event.datetime.end, 'p')}</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <MapPinIcon className="h-6 w-6 text-primary-400 mt-1" />
                        <div>
                          <h4 className="font-semibold text-white">Location</h4>
                          <p className="text-gray-300">{event.location.venue}</p>
                          <p className="text-gray-300">{event.location.address}, {event.location.city}</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <UserGroupIcon className="h-6 w-6 text-primary-400 mt-1" />
                        <div>
                          <h4 className="font-semibold text-white">Capacity</h4>
                          <p className="text-gray-300">{event.capacity} attendees</p>
                          <p className="text-gray-300">{event.booked} already registered</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <CurrencyRupeeIcon className="h-6 w-6 text-primary-400 mt-1" />
                        <div>
                          <h4 className="font-semibold text-white">Pricing</h4>
                          <p className="text-gray-300">{formatPrice(event.pricing.amount)}</p>
                          <p className="text-gray-300 text-sm">Per person</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <TicketIcon className="h-6 w-6 text-primary-400 mt-1" />
                        <div>
                          <h4 className="font-semibold text-white">Availability</h4>
                          <p className="text-gray-300">{availableSpots} spots remaining</p>
                          {isSoldOut && (
                            <p className="text-red-400 text-sm">Event is sold out</p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <StarIcon className="h-6 w-6 text-primary-400 mt-1" />
                        <div>
                          <h4 className="font-semibold text-white">Tags</h4>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {event.tags.map((tag, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-primary-500/20 text-primary-300 text-sm rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-4">Reviews & Ratings</h2>
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="text-4xl font-bold text-white">4.8</div>
                      <div>
                        <div className="flex items-center space-x-1 mb-1">
                          {[...Array(5)].map((_, i) => (
                            <StarIcon key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <p className="text-gray-400 text-sm">Based on 247 reviews</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      { name: 'Priya Sharma', rating: 5, comment: 'Excellent event! Great speakers and networking opportunities.', time: '2 days ago' },
                      { name: 'Rajesh Kumar', rating: 5, comment: 'Very well organized and informative. Highly recommended!', time: '1 week ago' },
                      { name: 'Ananya Patel', rating: 4, comment: 'Good content but could have been better organized.', time: '2 weeks ago' }
                    ].map((review, index) => (
                      <div key={index} className="border-b border-white/10 pb-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                              <span className="text-sm font-bold text-white">
                                {review.name.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <h4 className="font-semibold text-white">{review.name}</h4>
                              <div className="flex items-center space-x-1">
                                {[...Array(review.rating)].map((_, i) => (
                                  <StarIcon key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                                ))}
                              </div>
                            </div>
                          </div>
                          <span className="text-gray-400 text-sm">{review.time}</span>
                        </div>
                        <p className="text-gray-300">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Organizer Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-6 md:p-8 rounded-2xl"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Event Organizer</h2>
              <div className="flex items-start space-x-4">
                {event.host.avatar ? (
                  <img
                    src={event.host.avatar}
                    alt={event.host.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                    <span className="text-xl font-bold text-white">
                      {event.host.name.charAt(0)}
                    </span>
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-xl font-semibold text-white">{event.host.name}</h3>
                    {event.host.verified && (
                      <CheckBadgeIcon className="h-6 w-6 text-primary-400" />
                    )}
                  </div>
                  <p className="text-gray-300 mb-4">
                    Professional event organizer with 5+ years of experience in hosting tech conferences and workshops.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <button className="flex items-center space-x-2 px-4 py-2 glass-card text-gray-300 hover:text-white rounded-lg transition-colors">
                      <EnvelopeIcon className="h-4 w-4" />
                      <span>Contact</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 glass-card text-gray-300 hover:text-white rounded-lg transition-colors">
                      <GlobeAltIcon className="h-4 w-4" />
                      <span>Website</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Booking Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-card p-6 rounded-2xl"
              >
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-white mb-2">
                    {formatPrice(event.pricing.amount)}
                  </div>
                  <p className="text-gray-400">per person</p>
                </div>

                {!isSoldOut ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Number of tickets
                      </label>
                      <select
                        value={ticketCount}
                        onChange={(e) => setTicketCount(parseInt(e.target.value))}
                        className="w-full p-3 glass-card text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        {[...Array(Math.min(10, availableSpots))].map((_, i) => (
                          <option key={i + 1} value={i + 1} className="bg-dark-800">
                            {i + 1} {i === 0 ? 'ticket' : 'tickets'}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="border-t border-white/10 pt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-300">Total</span>
                        <span className="text-2xl font-bold text-white">
                          {formatPrice(totalPrice)}
                        </span>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleBooking}
                      disabled={isBooking}
                      className={`w-full py-4 rounded-lg font-semibold text-white transition-all duration-200 ${
                        isBooking
                          ? 'bg-gray-600 cursor-not-allowed'
                          : 'btn-primary'
                      }`}
                    >
                      {isBooking ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Processing...
                        </div>
                      ) : (
                        'Book Now'
                      )}
                    </motion.button>

                    <p className="text-center text-gray-400 text-sm">
                      {availableSpots} spots remaining
                    </p>
                  </div>
                ) : (
                  <div className="text-center">
                    <ExclamationTriangleIcon className="h-16 w-16 text-red-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">Sold Out</h3>
                    <p className="text-gray-400 mb-4">This event is currently sold out</p>
                    <button className="w-full py-3 bg-gray-600 text-gray-300 rounded-lg cursor-not-allowed">
                      Join Waitlist
                    </button>
                  </div>
                )}
              </motion.div>

              {/* Event Stats */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="glass-card p-6 rounded-2xl"
              >
                <h3 className="text-lg font-semibold text-white mb-4">Event Stats</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <UsersIcon className="h-5 w-5 text-primary-400" />
                      <span className="text-gray-300">Attending</span>
                    </div>
                    <span className="text-white font-semibold">{event.booked}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <HeartIcon className="h-5 w-5 text-red-400" />
                      <span className="text-gray-300">Likes</span>
                    </div>
                    <span className="text-white font-semibold">{event.likes}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <StarIcon className="h-5 w-5 text-yellow-400" />
                      <span className="text-gray-300">Rating</span>
                    </div>
                    <span className="text-white font-semibold">4.8</span>
                  </div>
                </div>
              </motion.div>

              {/* Share Event */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-card p-6 rounded-2xl"
              >
                <h3 className="text-lg font-semibold text-white mb-4">Share Event</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center space-x-2 p-3 glass-card hover:bg-white/10 rounded-lg transition-colors">
                    <span className="text-xl">📱</span>
                    <span className="text-sm text-gray-300">WhatsApp</span>
                  </button>
                  <button className="flex items-center justify-center space-x-2 p-3 glass-card hover:bg-white/10 rounded-lg transition-colors">
                    <span className="text-xl">📘</span>
                    <span className="text-sm text-gray-300">Facebook</span>
                  </button>
                  <button className="flex items-center justify-center space-x-2 p-3 glass-card hover:bg-white/10 rounded-lg transition-colors">
                    <span className="text-xl">🐦</span>
                    <span className="text-sm text-gray-300">Twitter</span>
                  </button>
                  <button className="flex items-center justify-center space-x-2 p-3 glass-card hover:bg-white/10 rounded-lg transition-colors">
                    <span className="text-xl">💼</span>
                    <span className="text-sm text-gray-300">LinkedIn</span>
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Related Events */}
        {relatedEvents.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-16"
          >
            <h2 className="text-3xl font-bold text-white mb-8">Related Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedEvents.map((relatedEvent, index) => (
                <PremiumEventCard
                  key={relatedEvent.id}
                  event={relatedEvent}
                  index={index}
                  variant="default"
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </ParallaxBackground>
  );
};

export default EventDetailPage;