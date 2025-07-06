import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  CalendarIcon,
  TicketIcon,
  UserGroupIcon,
  HeartIcon,
  TrophyIcon,
  ClockIcon,
  MapPinIcon,
  StarIcon,
  ChartBarIcon,
  BellIcon,
  CogIcon,
  PlayIcon,
  BookmarkIcon,
  ShareIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';
import ParallaxBackground from '../components/UI/ParallaxBackground';
import PremiumEventCard from '../components/UI/PremiumEventCard';
import { ALL_EVENTS } from '../utils/constants';
import { Event, Booking } from '../types';
import { formatPrice, formatDate } from '../utils/helpers';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [userEvents, setUserEvents] = useState<Event[]>([]);
  const [userBookings, setUserBookings] = useState<Booking[]>([]);
  const [favoriteEvents, setFavoriteEvents] = useState<Event[]>([]);
  const [recommendedEvents, setRecommendedEvents] = useState<Event[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'events' | 'bookings' | 'favorites'>('overview');
  const [stats, setStats] = useState({
    eventsAttended: 0,
    upcomingEvents: 0,
    totalSpent: 0,
    favoriteEvents: 0,
    communitiesJoined: 0,
    friendsConnected: 0,
    achievementPoints: 0,
    currentStreak: 0
  });

  useEffect(() => {
    // Mock user data based on bookings
    const mockBookings: Booking[] = [
      {
        id: '1',
        userId: user?.id || '1',
        eventId: '1',
        tickets: 1,
        amount: 2500,
        paymentStatus: 'confirmed',
        bookingDate: '2024-01-15T10:30:00Z',
        status: 'confirmed',
        feedback: { rating: 5, comment: 'Amazing event!' }
      },
      {
        id: '2',
        userId: user?.id || '1',
        eventId: '2',
        tickets: 2,
        amount: 3600,
        paymentStatus: 'confirmed',
        bookingDate: '2024-01-20T14:15:00Z',
        status: 'attended'
      },
      {
        id: '3',
        userId: user?.id || '1',
        eventId: '3',
        tickets: 1,
        amount: 1800,
        paymentStatus: 'confirmed',
        bookingDate: '2024-02-01T09:00:00Z',
        status: 'confirmed'
      }
    ];

    const bookedEventIds = mockBookings.map(booking => booking.eventId);
    const bookedEvents = ALL_EVENTS.filter(event => bookedEventIds.includes(event.id));
    const favorites = ALL_EVENTS.filter(event => event.isLiked).slice(0, 8);
    const recommended = ALL_EVENTS.filter(event => 
      event.status === 'upcoming' && 
      !bookedEventIds.includes(event.id) &&
      (event.category === 'conferences' || event.category === 'workshops')
    ).slice(0, 6);
    
    setUserBookings(mockBookings);
    setUserEvents(bookedEvents);
    setFavoriteEvents(favorites);
    setRecommendedEvents(recommended);

    // Calculate comprehensive stats
    setStats({
      eventsAttended: mockBookings.filter(b => b.status === 'attended').length,
      upcomingEvents: bookedEvents.filter(e => e.status === 'upcoming').length,
      totalSpent: mockBookings.reduce((sum, booking) => sum + booking.amount, 0),
      favoriteEvents: favorites.length,
      communitiesJoined: user?.communities.length || 2,
      friendsConnected: 47,
      achievementPoints: 1250,
      currentStreak: 5
    });
  }, [user]);

  const recentActivity = [
    { 
      type: 'booking', 
      message: 'Successfully booked Tech Innovation Summit 2024', 
      time: '2 hours ago',
      icon: TicketIcon,
      color: 'text-green-400'
    },
    { 
      type: 'like', 
      message: 'Added Digital Marketing Conclave to favorites', 
      time: '1 day ago',
      icon: HeartIcon,
      color: 'text-red-400'
    },
    { 
      type: 'community', 
      message: 'Joined Mumbai Tech Community', 
      time: '3 days ago',
      icon: UserGroupIcon,
      color: 'text-blue-400'
    },
    { 
      type: 'review', 
      message: 'Reviewed AI Workshop - 5 stars', 
      time: '1 week ago',
      icon: StarIcon,
      color: 'text-yellow-400'
    },
    { 
      type: 'achievement', 
      message: 'Earned "Event Explorer" badge', 
      time: '2 weeks ago',
      icon: TrophyIcon,
      color: 'text-purple-400'
    }
  ];

  const achievements = [
    { name: 'Event Explorer', description: 'Attended 5+ events', progress: 100, icon: '🎯' },
    { name: 'Community Builder', description: 'Joined 3+ communities', progress: 67, icon: '🏗️' },
    { name: 'Social Butterfly', description: 'Connected with 50+ people', progress: 94, icon: '🦋' },
    { name: 'Review Master', description: 'Left 10+ reviews', progress: 40, icon: '⭐' }
  ];

  const upcomingEvents = userEvents.filter(event => event.status === 'upcoming');
  const pastEvents = userEvents.filter(event => event.status === 'completed');

  const handleLike = (eventId: string) => {
    setRecommendedEvents(prev => prev.map(event => 
      event.id === eventId 
        ? { ...event, isLiked: !event.isLiked, likes: event.isLiked ? event.likes - 1 : event.likes + 1 }
        : event
    ));
  };

  const handleShare = (event: Event) => {
    console.log('Sharing event:', event.title);
  };

  const TabButton = ({ tab, label, icon: Icon }: { tab: string, label: string, icon: any }) => (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => setActiveTab(tab as any)}
      className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
        activeTab === tab
          ? 'bg-primary-500 text-white shadow-lg'
          : 'glass-card text-gray-300 hover:text-white hover:bg-white/10'
      }`}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </motion.button>
  );

  return (
    <ParallaxBackground className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Welcome back, {user?.name?.split(' ')[0]}! 👋
              </h1>
              <p className="text-xl text-gray-400">
                Your personal event dashboard
              </p>
            </div>
            <div className="mt-6 lg:mt-0 flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary flex items-center space-x-2"
              >
                <BellIcon className="h-5 w-5" />
                <span>Notifications</span>
                <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">3</span>
              </motion.button>
              <Link to="/profile" className="btn-primary flex items-center space-x-2">
                <CogIcon className="h-5 w-5" />
                <span>Profile</span>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-4 mb-8"
        >
          <TabButton tab="overview" label="Overview" icon={ChartBarIcon} />
          <TabButton tab="events" label="My Events" icon={CalendarIcon} />
          <TabButton tab="bookings" label="Bookings" icon={TicketIcon} />
          <TabButton tab="favorites" label="Favorites" icon={HeartIcon} />
        </motion.div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4"
            >
              <div className="glass-card p-4 text-center">
                <CalendarIcon className="h-6 w-6 text-primary-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-white">{stats.upcomingEvents}</div>
                <div className="text-xs text-gray-400">Upcoming</div>
              </div>
              <div className="glass-card p-4 text-center">
                <TicketIcon className="h-6 w-6 text-green-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-white">{stats.eventsAttended}</div>
                <div className="text-xs text-gray-400">Attended</div>
              </div>
              <div className="glass-card p-4 text-center">
                <ChartBarIcon className="h-6 w-6 text-accent-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-white">₹{(stats.totalSpent / 1000).toFixed(1)}K</div>
                <div className="text-xs text-gray-400">Spent</div>
              </div>
              <div className="glass-card p-4 text-center">
                <HeartIcon className="h-6 w-6 text-red-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-white">{stats.favoriteEvents}</div>
                <div className="text-xs text-gray-400">Favorites</div>
              </div>
              <div className="glass-card p-4 text-center">
                <UserGroupIcon className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-white">{stats.communitiesJoined}</div>
                <div className="text-xs text-gray-400">Communities</div>
              </div>
              <div className="glass-card p-4 text-center">
                <TrophyIcon className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-white">{stats.friendsConnected}</div>
                <div className="text-xs text-gray-400">Friends</div>
              </div>
              <div className="glass-card p-4 text-center">
                <StarIcon className="h-6 w-6 text-purple-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-white">{stats.achievementPoints}</div>
                <div className="text-xs text-gray-400">Points</div>
              </div>
              <div className="glass-card p-4 text-center">
                <ClockIcon className="h-6 w-6 text-orange-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-white">{stats.currentStreak}</div>
                <div className="text-xs text-gray-400">Day Streak</div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Upcoming Events */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white">Your Upcoming Events</h2>
                    <button 
                      onClick={() => setActiveTab('events')}
                      className="text-primary-400 hover:text-primary-300 transition-colors"
                    >
                      View All
                    </button>
                  </div>
                  
                  {upcomingEvents.length > 0 ? (
                    <div className="space-y-4">
                      {upcomingEvents.slice(0, 3).map((event) => (
                        <motion.div
                          key={event.id}
                          whileHover={{ scale: 1.02 }}
                          className="glass-card p-6 rounded-xl"
                        >
                          <div className="flex items-start space-x-4">
                            <img
                              src={event.images[0]}
                              alt={event.title}
                              className="w-20 h-20 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-white mb-2">
                                {event.title}
                              </h3>
                              <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                                <div className="flex items-center space-x-1">
                                  <CalendarIcon className="h-4 w-4" />
                                  <span>{formatDate(event.datetime.start, 'MMM dd, yyyy')}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <ClockIcon className="h-4 w-4" />
                                  <span>{formatDate(event.datetime.start, 'h:mm a')}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <MapPinIcon className="h-4 w-4" />
                                  <span>{event.location.city}</span>
                                </div>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-primary-400 font-medium">
                                  {formatPrice(event.pricing.amount)}
                                </span>
                                <div className="flex space-x-2">
                                  <button className="btn-secondary text-sm px-4 py-2">
                                    View Details
                                  </button>
                                  <button className="btn-primary text-sm px-4 py-2">
                                    Get Directions
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="glass-card p-12 text-center">
                      <CalendarIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-white mb-2">
                        No upcoming events
                      </h3>
                      <p className="text-gray-400 mb-6">
                        Discover amazing events happening near you
                      </p>
                      <Link to="/events" className="btn-primary">
                        Browse Events
                      </Link>
                    </div>
                  )}
                </motion.div>

                {/* Recommended Events */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white">Recommended for You</h2>
                    <Link to="/events" className="text-primary-400 hover:text-primary-300 transition-colors">
                      View All
                    </Link>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {recommendedEvents.slice(0, 4).map((event, index) => (
                      <PremiumEventCard
                        key={event.id}
                        event={event}
                        onLike={handleLike}
                        onShare={handleShare}
                        index={index}
                        variant="compact"
                      />
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Recent Activity */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="glass-card p-6 rounded-xl"
                >
                  <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => {
                      const Icon = activity.icon;
                      return (
                        <div key={index} className="flex items-start space-x-3">
                          <Icon className={`h-5 w-5 mt-0.5 ${activity.color}`} />
                          <div className="flex-1">
                            <p className="text-sm text-white">{activity.message}</p>
                            <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>

                {/* Achievements */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="glass-card p-6 rounded-xl"
                >
                  <h3 className="text-xl font-bold text-white mb-6">Achievements</h3>
                  <div className="space-y-4">
                    {achievements.map((achievement, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg">{achievement.icon}</span>
                            <span className="text-sm font-medium text-white">{achievement.name}</span>
                          </div>
                          <span className="text-xs text-gray-400">{achievement.progress}%</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${achievement.progress}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-400">{achievement.description}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Quick Actions */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="glass-card p-6 rounded-xl"
                >
                  <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>
                  <div className="space-y-3">
                    <Link to="/events" className="w-full btn-primary text-left flex items-center space-x-3">
                      <CalendarIcon className="h-5 w-5" />
                      <span>Browse Events</span>
                    </Link>
                    <Link to="/communities" className="w-full btn-secondary text-left flex items-center space-x-3">
                      <UserGroupIcon className="h-5 w-5" />
                      <span>Join Communities</span>
                    </Link>
                    <button 
                      onClick={() => setActiveTab('bookings')}
                      className="w-full btn-secondary text-left flex items-center space-x-3"
                    >
                      <TicketIcon className="h-5 w-5" />
                      <span>My Bookings</span>
                    </button>
                    <button 
                      onClick={() => setActiveTab('favorites')}
                      className="w-full btn-secondary text-left flex items-center space-x-3"
                    >
                      <HeartIcon className="h-5 w-5" />
                      <span>Favorite Events</span>
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        )}

        {/* Events Tab */}
        {activeTab === 'events' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-white">My Events</h2>
              <Link to="/events" className="btn-primary flex items-center space-x-2">
                <PlusIcon className="h-5 w-5" />
                <span>Find More Events</span>
              </Link>
            </div>

            {/* Upcoming Events */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Upcoming Events ({upcomingEvents.length})</h3>
              {upcomingEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcomingEvents.map((event, index) => (
                    <PremiumEventCard
                      key={event.id}
                      event={event}
                      index={index}
                      variant="default"
                    />
                  ))}
                </div>
              ) : (
                <div className="glass-card p-12 text-center">
                  <CalendarIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">No upcoming events</h3>
                  <p className="text-gray-400">Book your next event to see it here</p>
                </div>
              )}
            </div>

            {/* Past Events */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Past Events ({pastEvents.length})</h3>
              {pastEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pastEvents.map((event, index) => (
                    <div key={event.id} className="relative">
                      <PremiumEventCard
                        event={event}
                        index={index}
                        variant="default"
                      />
                      <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center">
                        <span className="text-white font-semibold">Completed</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="glass-card p-12 text-center">
                  <ClockIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">No past events</h3>
                  <p className="text-gray-400">Your attended events will appear here</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-white">My Bookings</h2>
              <div className="text-sm text-gray-400">
                Total: {userBookings.length} bookings
              </div>
            </div>

            <div className="space-y-4">
              {userBookings.map((booking) => {
                const event = ALL_EVENTS.find(e => e.id === booking.eventId);
                if (!event) return null;

                return (
                  <motion.div
                    key={booking.id}
                    whileHover={{ scale: 1.02 }}
                    className="glass-card p-6 rounded-xl"
                  >
                    <div className="flex items-start space-x-4">
                      <img
                        src={event.images[0]}
                        alt={event.title}
                        className="w-24 h-24 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-lg font-semibold text-white">{event.title}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            booking.status === 'confirmed' ? 'bg-green-500/20 text-green-400' :
                            booking.status === 'attended' ? 'bg-blue-500/20 text-blue-400' :
                            'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {booking.status}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-400 mb-4">
                          <div>
                            <span className="block text-white font-medium">Booking ID</span>
                            <span>#{booking.id}</span>
                          </div>
                          <div>
                            <span className="block text-white font-medium">Tickets</span>
                            <span>{booking.tickets}</span>
                          </div>
                          <div>
                            <span className="block text-white font-medium">Amount</span>
                            <span>{formatPrice(booking.amount)}</span>
                          </div>
                          <div>
                            <span className="block text-white font-medium">Booked On</span>
                            <span>{formatDate(booking.bookingDate, 'MMM dd, yyyy')}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button className="btn-secondary text-sm px-4 py-2">
                            View Ticket
                          </button>
                          <button className="btn-secondary text-sm px-4 py-2">
                            Download PDF
                          </button>
                          {booking.status === 'attended' && !booking.feedback && (
                            <button className="btn-primary text-sm px-4 py-2">
                              Leave Review
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Favorites Tab */}
        {activeTab === 'favorites' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-white">Favorite Events</h2>
              <div className="text-sm text-gray-400">
                {favoriteEvents.length} favorites
              </div>
            </div>

            {favoriteEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteEvents.map((event, index) => (
                  <PremiumEventCard
                    key={event.id}
                    event={event}
                    onLike={handleLike}
                    onShare={handleShare}
                    index={index}
                    variant="default"
                  />
                ))}
              </div>
            ) : (
              <div className="glass-card p-12 text-center">
                <HeartIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No favorite events</h3>
                <p className="text-gray-400 mb-6">
                  Start adding events to your favorites to see them here
                </p>
                <Link to="/events" className="btn-primary">
                  Discover Events
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </ParallaxBackground>
  );
};

export default DashboardPage;