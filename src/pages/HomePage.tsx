import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MagnifyingGlassIcon, 
  CalendarIcon,
  UserGroupIcon,
  SparklesIcon,
  TrophyIcon,
  HeartIcon,
  StarIcon,
  ArrowRightIcon,
  FireIcon,
  ClockIcon,
  TicketIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import FloatingElements from '../components/UI/FloatingElements';
import CategoryCard from '../components/UI/CategoryCard';
import PremiumEventCard from '../components/UI/PremiumEventCard';
import Carousel from '../components/UI/Carousel';
import CitySearchInput from '../components/UI/CitySearchInput';
import ParallaxBackground from '../components/UI/ParallaxBackground';
import { CATEGORIES, ALL_EVENTS } from '../utils/constants';
import { Event } from '../types';
import { getFeaturedEvents, getEventRecommendations, getEventsByCategory } from '../utils/helpers';

const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [events, setEvents] = useState<Event[]>(ALL_EVENTS);
  const [featuredEvents, setFeaturedEvents] = useState<Event[]>([]);
  const [trendingEvents, setTrendingEvents] = useState<Event[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [eventsByCategory, setEventsByCategory] = useState<Record<string, Event[]>>({});
  const [stats, setStats] = useState({
    totalEvents: 0,
    activeCommunities: 0,
    happyMembers: 0,
    citiesCovered: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Set featured events
    const featured = getFeaturedEvents(ALL_EVENTS).slice(0, 8);
    setFeaturedEvents(featured);
    
    // Set trending events (most liked and booked)
    const trending = ALL_EVENTS
      .filter(event => event.status === 'upcoming')
      .sort((a, b) => (b.likes + b.booked) - (a.likes + a.booked))
      .slice(0, 12);
    setTrendingEvents(trending);
    
    // Set upcoming events
    const upcoming = ALL_EVENTS
      .filter(event => event.status === 'upcoming')
      .sort((a, b) => new Date(a.datetime.start).getTime() - new Date(b.datetime.start).getTime())
      .slice(0, 16);
    setUpcomingEvents(upcoming);

    // Group events by category
    const categorizedEvents: Record<string, Event[]> = {};
    CATEGORIES.forEach(category => {
      categorizedEvents[category.id] = getEventsByCategory(ALL_EVENTS, category.id).slice(0, 12);
    });
    setEventsByCategory(categorizedEvents);
    
    // Animate stats counter
    const animateStats = () => {
      const targetStats = {
        totalEvents: 2847,
        activeCommunities: 486,
        happyMembers: 52340,
        citiesCovered: 94,
      };
      
      const duration = 2000;
      const steps = 50;
      const stepDuration = duration / steps;
      
      let currentStep = 0;
      
      const interval = setInterval(() => {
        const progress = currentStep / steps;
        
        setStats({
          totalEvents: Math.floor(targetStats.totalEvents * progress),
          activeCommunities: Math.floor(targetStats.activeCommunities * progress),
          happyMembers: Math.floor(targetStats.happyMembers * progress),
          citiesCovered: Math.floor(targetStats.citiesCovered * progress),
        });
        
        currentStep++;
        
        if (currentStep > steps) {
          clearInterval(interval);
          setStats(targetStats);
        }
      }, stepDuration);
    };
    
    const timer = setTimeout(animateStats, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleLike = (eventId: string) => {
    setEvents(prev => prev.map(event => 
      event.id === eventId 
        ? { ...event, isLiked: !event.isLiked, likes: event.isLiked ? event.likes - 1 : event.likes + 1 }
        : event
    ));
    setFeaturedEvents(prev => prev.map(event => 
      event.id === eventId 
        ? { ...event, isLiked: !event.isLiked, likes: event.isLiked ? event.likes - 1 : event.likes + 1 }
        : event
    ));
    setTrendingEvents(prev => prev.map(event => 
      event.id === eventId 
        ? { ...event, isLiked: !event.isLiked, likes: event.isLiked ? event.likes - 1 : event.likes + 1 }
        : event
    ));
    setUpcomingEvents(prev => prev.map(event => 
      event.id === eventId 
        ? { ...event, isLiked: !event.isLiked, likes: event.isLiked ? event.likes - 1 : event.likes + 1 }
        : event
    ));
  };

  const handleShare = (event: Event) => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: event.description,
        url: `${window.location.origin}/events/${event.id}`
      });
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/events/${event.id}`);
      alert('Event link copied to clipboard!');
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (location) params.set('location', location);
    navigate(`/search?${params.toString()}`);
  };

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Community Manager',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      content: 'OurHour has transformed how we discover and attend events. The community features are incredible!',
      rating: 5,
    },
    {
      name: 'Rajesh Kumar',
      role: 'Event Organizer',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      content: 'Best platform for organizing events. The analytics and attendee management features are top-notch.',
      rating: 5,
    },
    {
      name: 'Ananya Patel',
      role: 'Tech Enthusiast',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      content: 'I\'ve discovered so many incredible tech events through OurHour. Highly recommended!',
      rating: 5,
    },
  ];

  const features = [
    {
      icon: <MagnifyingGlassIcon className="h-8 w-8" />,
      title: 'Smart Discovery',
      description: 'AI-powered event recommendations based on your interests and location.',
    },
    {
      icon: <UserGroupIcon className="h-8 w-8" />,
      title: 'Community Driven',
      description: 'Join communities, meet like-minded people, and build lasting connections.',
    },
    {
      icon: <CalendarIcon className="h-8 w-8" />,
      title: 'Easy Booking',
      description: 'Seamless event booking with instant confirmations and digital tickets.',
    },
    {
      icon: <SparklesIcon className="h-8 w-8" />,
      title: 'Personalized Experience',
      description: 'Tailored event suggestions that match your preferences and schedule.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <ParallaxBackground className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <FloatingElements count={15} />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Discover Events.{' '}
              <span className="gradient-text">Build Communities.</span>{' '}
              Create Memories.
            </motion.h1>
            
            <motion.p 
              className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              India's premier community-driven platform for discovering amazing events, 
              connecting with like-minded people, and creating unforgettable experiences.
            </motion.p>
            
            {/* Enhanced Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="max-w-5xl mx-auto"
            >
              <form onSubmit={handleSearch} className="glass-card p-4 md:p-6 rounded-2xl shadow-2xl">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1 relative">
                    <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search events, communities, or organizers..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 md:py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white placeholder-gray-400"
                    />
                  </div>
                  <div className="flex-1 lg:max-w-xs">
                    <CitySearchInput
                      value={location}
                      onChange={setLocation}
                      placeholder="Select your city..."
                      className="w-full"
                    />
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold flex items-center justify-center space-x-2 whitespace-nowrap"
                  >
                    <span>Search Events</span>
                    <ArrowRightIcon className="h-5 w-5" />
                  </motion.button>
                </div>
              </form>
            </motion.div>
            
            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/events" className="btn-primary text-lg px-8 py-4 flex items-center justify-center space-x-2">
                <CalendarIcon className="h-5 w-5" />
                <span>Explore Events</span>
              </Link>
              <Link to="/communities" className="btn-secondary text-lg px-8 py-4 flex items-center justify-center space-x-2">
                <UserGroupIcon className="h-5 w-5" />
                <span>Join Communities</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </ParallaxBackground>

      {/* Featured Events Carousel */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-dark-950 to-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between mb-8 md:mb-12"
          >
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <StarIcon className="h-6 md:h-8 w-6 md:w-8 text-accent-400" />
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                  Featured Events
                </h2>
              </div>
              <p className="text-base md:text-lg text-gray-400">
                Handpicked premium events you shouldn't miss
              </p>
            </div>
            <Link 
              to="/events?featured=true" 
              className="hidden md:flex items-center space-x-2 text-primary-400 hover:text-primary-300 transition-colors group"
            >
              <span>View All</span>
              <ChevronRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
          
          <Carousel
            itemsPerView={4}
            gap={24}
            autoPlay={true}
            autoPlayInterval={4000}
            showArrows={true}
            className="mb-8"
          >
            {featuredEvents.map((event, index) => (
              <PremiumEventCard
                key={event.id}
                event={event}
                onLike={handleLike}
                onShare={handleShare}
                index={index}
                variant="default"
                showTrailer={true}
              />
            ))}
          </Carousel>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Explore Event Categories
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              From tech conferences to art exhibitions, find events that match your interests and passions
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16">
            {CATEGORIES.map((category, index) => (
              <CategoryCard
                key={category.id}
                category={category}
                index={index}
              />
            ))}
          </div>

          {/* Events by Category */}
          {CATEGORIES.slice(0, 4).map((category, categoryIndex) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="mb-12 md:mb-16"
            >
              <div className="flex items-center justify-between mb-6 md:mb-8">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl md:text-3xl">
                    {category.icon === 'users' && '👥'}
                    {category.icon === 'wrench' && '🔧'}
                    {category.icon === 'trophy' && '🏆'}
                    {category.icon === 'image' && '🎨'}
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white">
                      {category.name}
                    </h3>
                    <p className="text-sm md:text-base text-gray-400">
                      {category.count}+ events available
                    </p>
                  </div>
                </div>
                <Link 
                  to={`/events?category=${category.id}`}
                  className="flex items-center space-x-2 text-primary-400 hover:text-primary-300 transition-colors group"
                >
                  <span className="hidden sm:block">View All</span>
                  <ChevronRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              
              <Carousel
                itemsPerView={4}
                gap={20}
                showArrows={true}
              >
                {eventsByCategory[category.id]?.map((event, index) => (
                  <PremiumEventCard
                    key={event.id}
                    event={event}
                    onLike={handleLike}
                    onShare={handleShare}
                    index={index}
                    variant="default"
                  />
                )) || []}
              </Carousel>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-20 glass-card border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
              Join India's Largest Event Community
            </h2>
            <p className="text-base md:text-lg text-gray-400">
              Trusted by thousands of event organizers and attendees across the country
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-2">
                {stats.totalEvents.toLocaleString()}+
              </div>
              <div className="text-gray-400 text-base md:text-lg">Events</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-400 mb-2">
                {stats.activeCommunities.toLocaleString()}+
              </div>
              <div className="text-gray-400 text-base md:text-lg">Communities</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-accent-400 mb-2">
                {stats.happyMembers.toLocaleString()}+
              </div>
              <div className="text-gray-400 text-base md:text-lg">Happy Members</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-green-400 mb-2">
                {stats.citiesCovered.toLocaleString()}+
              </div>
              <div className="text-gray-400 text-base md:text-lg">Cities</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trending Events Section */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between mb-8 md:mb-12"
          >
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <FireIcon className="h-6 md:h-8 w-6 md:w-8 text-red-400" />
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                  Trending Now
                </h2>
              </div>
              <p className="text-base md:text-lg text-gray-400">
                Most popular events happening right now
              </p>
            </div>
            <Link 
              to="/events?sort=popularity" 
              className="hidden md:flex items-center space-x-2 text-primary-400 hover:text-primary-300 transition-colors group"
            >
              <span>View All</span>
              <ChevronRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
          
          <Carousel
            itemsPerView={4}
            gap={24}
            autoPlay={true}
            autoPlayInterval={5000}
            showArrows={true}
          >
            {trendingEvents.map((event, index) => (
              <PremiumEventCard
                key={event.id}
                event={event}
                onLike={handleLike}
                onShare={handleShare}
                index={index}
                variant="default"
              />
            ))}
          </Carousel>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Why Choose OurHour?
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Discover the features that make OurHour the perfect platform for event discovery and community building
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="text-center group glass-card p-6 md:p-8 rounded-2xl"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-primary-500 to-secondary-500 text-white rounded-2xl mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-white mb-3 md:mb-4">
                  {feature.title}
                </h3>
                <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 md:py-20 glass-card border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              What Our Community Says
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Join thousands of satisfied users who trust OurHour for their event discovery needs
            </p>
          </motion.div>
          
          <Carousel
            itemsPerView={3}
            gap={32}
            autoPlay={true}
            autoPlayInterval={6000}
            showArrows={true}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5, scale: 1.02 }}
                className="glass-card p-6 md:p-8 rounded-2xl h-full"
              >
                <div className="flex items-center mb-4 md:mb-6">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-white text-base md:text-lg">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                
                <div className="flex mb-3 md:mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="h-4 w-4 md:h-5 md:w-5 text-accent-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-sm md:text-base text-gray-300 italic leading-relaxed">
                  "{testimonial.content}"
                </p>
              </motion.div>
            ))}
          </Carousel>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6 md:space-y-8"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Ready to Join OurHour?
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Start discovering amazing events and connecting with like-minded people today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
              <Link to="/register" className="btn-primary text-base md:text-lg px-6 md:px-8 py-3 md:py-4 inline-flex items-center justify-center space-x-2">
                <UserGroupIcon className="h-5 w-5" />
                <span>Get Started Free</span>
              </Link>
              <Link to="/events" className="btn-secondary text-base md:text-lg px-6 md:px-8 py-3 md:py-4 inline-flex items-center justify-center space-x-2">
                <TicketIcon className="h-5 w-5" />
                <span>Browse Events</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;