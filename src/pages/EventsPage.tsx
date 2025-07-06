import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { 
  AdjustmentsHorizontalIcon,
  MapIcon,
  ListBulletIcon,
  MagnifyingGlassIcon,
  CalendarIcon,
  MapPinIcon,
  CurrencyRupeeIcon,
  FunnelIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import EventCard from '../components/UI/EventCard';
import LoadingSkeleton from '../components/UI/LoadingSkeleton';
import ParallaxBackground from '../components/UI/ParallaxBackground';
import { CATEGORIES, ALL_EVENTS, CITIES, SORT_OPTIONS } from '../utils/constants';
import { Event, SearchFilters, EventCategory } from '../types';
import { filterEvents, sortEvents } from '../utils/helpers';
import InfiniteScroll from 'react-infinite-scroll-component';

const EventsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [events, setEvents] = useState<Event[]>(ALL_EVENTS);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [displayedEvents, setDisplayedEvents] = useState<Event[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const eventsPerPage = 12;

  const [filters, setFilters] = useState<SearchFilters>({
    query: searchParams.get('q') || '',
    category: (searchParams.get('category') as EventCategory) || '',
    location: searchParams.get('location') || '',
    city: searchParams.get('city') || '',
    dateRange: { start: '', end: '' },
    priceRange: { min: 0, max: 10000 },
    radius: 50,
    sortBy: 'relevance',
    featured: false,
  });

  useEffect(() => {
    const filtered = filterEvents(events, filters);
    const sorted = sortEvents(filtered, filters.sortBy);
    setFilteredEvents(sorted);
    setDisplayedEvents(sorted.slice(0, eventsPerPage));
    setPage(1);
    setHasMore(sorted.length > eventsPerPage);
  }, [events, filters]);

  const loadMoreEvents = () => {
    const nextPage = page + 1;
    const startIndex = nextPage * eventsPerPage;
    const endIndex = startIndex + eventsPerPage;
    const newEvents = filteredEvents.slice(startIndex, endIndex);
    
    if (newEvents.length > 0) {
      setDisplayedEvents(prev => [...prev, ...newEvents]);
      setPage(nextPage);
    }
    
    if (endIndex >= filteredEvents.length) {
      setHasMore(false);
    }
  };

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    // Update URL params
    const params = new URLSearchParams(searchParams);
    if (value && value !== '' && value !== 0) {
      if (key === 'priceRange') {
        params.set('minPrice', value.min.toString());
        params.set('maxPrice', value.max.toString());
      } else if (key === 'dateRange') {
        if (value.start) params.set('startDate', value.start);
        if (value.end) params.set('endDate', value.end);
      } else {
        params.set(key, value.toString());
      }
    } else {
      params.delete(key);
      if (key === 'priceRange') {
        params.delete('minPrice');
        params.delete('maxPrice');
      } else if (key === 'dateRange') {
        params.delete('startDate');
        params.delete('endDate');
      }
    }
    setSearchParams(params);
  };

  const handleLike = (eventId: string) => {
    setEvents(prev => prev.map(event => 
      event.id === eventId 
        ? { ...event, isLiked: !event.isLiked, likes: event.isLiked ? event.likes - 1 : event.likes + 1 }
        : event
    ));
  };

  const handleShare = (event: Event) => {
    console.log('Sharing event:', event.title);
  };

  const resetFilters = () => {
    const newFilters = {
      query: '',
      category: '' as EventCategory | '',
      location: '',
      city: '',
      dateRange: { start: '', end: '' },
      priceRange: { min: 0, max: 10000 },
      radius: 50,
      sortBy: 'relevance' as const,
      featured: false,
    };
    setFilters(newFilters);
    setSearchParams(new URLSearchParams());
  };

  return (
    <ParallaxBackground className="min-h-screen">
      {/* Header */}
      <div className="glass-card border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 lg:mb-0"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Discover Events
              </h1>
              <p className="text-xl text-gray-400">
                Find amazing events happening around you
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4"
            >
              {/* Search Bar */}
              <div className="relative flex-1 min-w-0 sm:max-w-md">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search events..."
                  value={filters.query}
                  onChange={(e) => handleFilterChange('query', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 glass-card text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              
              {/* View Toggle */}
              <div className="flex glass-card rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-primary-500 text-white shadow-lg'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <ListBulletIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'map'
                      ? 'bg-primary-500 text-white shadow-lg'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <MapIcon className="h-5 w-5" />
                </button>
              </div>
              
              {/* Filters Toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-6 py-3 btn-primary"
              >
                <FunnelIcon className="h-5 w-5" />
                <span>Filters</span>
                {Object.values(filters).some(v => v && v !== '' && v !== 0 && (typeof v !== 'object' || Object.values(v).some(val => val !== '' && val !== 0))) && (
                  <span className="w-2 h-2 bg-accent-400 rounded-full"></span>
                )}
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, x: -300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                className="lg:w-80"
              >
                <div className="glass-card p-6 rounded-2xl sticky top-24">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-white">
                      Filters
                    </h3>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={resetFilters}
                        className="text-sm text-primary-400 hover:text-primary-300 transition-colors"
                      >
                        Clear All
                      </button>
                      <button
                        onClick={() => setShowFilters(false)}
                        className="lg:hidden p-1 text-gray-400 hover:text-white"
                      >
                        <XMarkIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {/* Category Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        Category
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {CATEGORIES.map((category) => (
                          <motion.button
                            key={category.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleFilterChange('category', 
                              filters.category === category.id ? '' : category.id
                            )}
                            className={`p-3 text-sm rounded-lg border transition-all duration-200 ${
                              filters.category === category.id
                                ? 'bg-primary-500/20 border-primary-400 text-primary-300'
                                : 'glass-card border-white/10 text-gray-300 hover:border-white/20'
                            }`}
                          >
                            {category.name}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                    
                    {/* City Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        City
                      </label>
                      <select
                        value={filters.city}
                        onChange={(e) => handleFilterChange('city', e.target.value)}
                        className="w-full p-3 glass-card text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="">All Cities</option>
                        {CITIES.map((city) => (
                          <option key={city} value={city} className="bg-dark-800">
                            {city}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    {/* Location Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        Location
                      </label>
                      <div className="relative">
                        <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Enter area or venue"
                          value={filters.location}
                          onChange={(e) => handleFilterChange('location', e.target.value)}
                          className="w-full pl-10 pr-4 py-3 glass-card text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                    </div>
                    
                    {/* Date Range Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        Date Range
                      </label>
                      <div className="grid grid-cols-1 gap-3">
                        <div className="relative">
                          <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <input
                            type="date"
                            value={filters.dateRange.start}
                            onChange={(e) => handleFilterChange('dateRange', {
                              ...filters.dateRange,
                              start: e.target.value
                            })}
                            className="w-full pl-10 pr-3 py-3 glass-card text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                        </div>
                        <div className="relative">
                          <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <input
                            type="date"
                            value={filters.dateRange.end}
                            onChange={(e) => handleFilterChange('dateRange', {
                              ...filters.dateRange,
                              end: e.target.value
                            })}
                            className="w-full pl-10 pr-3 py-3 glass-card text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Price Range Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        Price Range
                      </label>
                      <div className="space-y-3">
                        <input
                          type="range"
                          min="0"
                          max="10000"
                          value={filters.priceRange.max}
                          onChange={(e) => handleFilterChange('priceRange', {
                            ...filters.priceRange,
                            max: parseInt(e.target.value)
                          })}
                          className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
                        />
                        <div className="flex justify-between text-sm text-gray-400">
                          <span>₹0</span>
                          <span>₹{filters.priceRange.max.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Featured Filter */}
                    <div>
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.featured}
                          onChange={(e) => handleFilterChange('featured', e.target.checked)}
                          className="w-4 h-4 text-primary-500 bg-transparent border-white/20 rounded focus:ring-primary-500"
                        />
                        <span className="text-sm font-medium text-gray-300">
                          Featured Events Only
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Events Grid */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 space-y-4 sm:space-y-0">
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-gray-400"
              >
                Found <span className="text-white font-semibold">{filteredEvents.length}</span> events
              </motion.p>
              <select 
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="px-4 py-2 glass-card text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value} className="bg-dark-800">
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            {isLoading ? (
              <LoadingSkeleton type="card" count={6} />
            ) : (
              <InfiniteScroll
                dataLength={displayedEvents.length}
                next={loadMoreEvents}
                hasMore={hasMore}
                loader={<LoadingSkeleton type="card" count={3} className="mt-8" />}
                endMessage={
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-8"
                  >
                    <p className="text-gray-400">You've seen all events!</p>
                  </motion.div>
                }
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {displayedEvents.map((event, index) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      onLike={handleLike}
                      onShare={handleShare}
                      index={index % eventsPerPage}
                    />
                  ))}
                </div>
              </InfiniteScroll>
            )}
            
            {filteredEvents.length === 0 && !isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <div className="text-6xl mb-6">🔍</div>
                <h3 className="text-2xl font-semibold text-white mb-4">
                  No events found
                </h3>
                <p className="text-gray-400 mb-8 max-w-md mx-auto">
                  Try adjusting your filters or search criteria to find more events
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetFilters}
                  className="btn-primary"
                >
                  Clear Filters
                </motion.button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </ParallaxBackground>
  );
};

export default EventsPage;