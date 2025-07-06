import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { 
  MagnifyingGlassIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import EventCard from '../components/UI/EventCard';
import LoadingSkeleton from '../components/UI/LoadingSkeleton';
import ParallaxBackground from '../components/UI/ParallaxBackground';
import { ALL_EVENTS, CATEGORIES } from '../utils/constants';
import { Event } from '../types';
import { searchEvents, getEventRecommendations, debounce } from '../utils/helpers';

const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [searchResults, setSearchResults] = useState<Event[]>([]);
  const [recommendations, setRecommendations] = useState<Event[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [trendingSearches] = useState([
    'Tech Conference',
    'Music Festival',
    'Workshop',
    'Networking Event',
    'Art Exhibition'
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Debounced search function
  const debouncedSearch = debounce((searchQuery: string) => {
    if (searchQuery.trim()) {
      setIsLoading(true);
      setTimeout(() => {
        const results = searchEvents(ALL_EVENTS, searchQuery);
        setSearchResults(results);
        setIsLoading(false);
        setHasSearched(true);
        
        // Add to recent searches
        setRecentSearches(prev => {
          const updated = [searchQuery, ...prev.filter(s => s !== searchQuery)].slice(0, 5);
          localStorage.setItem('recentSearches', JSON.stringify(updated));
          return updated;
        });
      }, 500);
    } else {
      setSearchResults([]);
      setHasSearched(false);
    }
  }, 300);

  useEffect(() => {
    // Load recent searches from localStorage
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }

    // Set recommendations
    setRecommendations(getEventRecommendations(ALL_EVENTS));

    // Initial search if query exists
    if (query) {
      debouncedSearch(query);
    }
  }, []);

  useEffect(() => {
    debouncedSearch(query);
    
    // Update URL
    if (query) {
      setSearchParams({ q: query });
    } else {
      setSearchParams({});
    }
  }, [query]);

  const handleLike = (eventId: string) => {
    setSearchResults(prev => prev.map(event => 
      event.id === eventId 
        ? { ...event, isLiked: !event.isLiked, likes: event.isLiked ? event.likes - 1 : event.likes + 1 }
        : event
    ));
    setRecommendations(prev => prev.map(event => 
      event.id === eventId 
        ? { ...event, isLiked: !event.isLiked, likes: event.isLiked ? event.likes - 1 : event.likes + 1 }
        : event
    ));
  };

  const handleShare = (event: Event) => {
    console.log('Sharing event:', event.title);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
  };

  return (
    <ParallaxBackground className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Search Events
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Discover amazing events tailored to your interests
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
            <input
              type="text"
              placeholder="Search for events, organizers, or topics..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-4 text-lg glass-card text-white placeholder-gray-400 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              autoFocus
            />
          </div>
        </motion.div>

        {/* Search Suggestions */}
        {!hasSearched && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div className="glass-card p-6 rounded-2xl">
                  <div className="flex items-center space-x-2 mb-4">
                    <ClockIcon className="h-5 w-5 text-primary-400" />
                    <h3 className="text-lg font-semibold text-white">Recent Searches</h3>
                  </div>
                  <div className="space-y-2">
                    {recentSearches.map((search, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSuggestionClick(search)}
                        className="w-full text-left px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                      >
                        {search}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Trending Searches */}
              <div className="glass-card p-6 rounded-2xl">
                <div className="flex items-center space-x-2 mb-4">
                  <ArrowTrendingUpIcon className="h-5 w-5 text-accent-400" />
                  <h3 className="text-lg font-semibold text-white">Trending Searches</h3>
                </div>
                <div className="space-y-2">
                  {trendingSearches.map((search, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSuggestionClick(search)}
                      className="w-full text-left px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                    >
                      {search}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Search Results */}
        {hasSearched && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white">
                Search Results for "{query}"
              </h2>
              <span className="text-gray-400">
                {searchResults.length} events found
              </span>
            </div>

            {isLoading ? (
              <LoadingSkeleton type="card" count={6} />
            ) : searchResults.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {searchResults.map((event, index) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    onLike={handleLike}
                    onShare={handleShare}
                    index={index}
                  />
                ))}
              </div>
            ) : (
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
                  Try searching with different keywords or browse our categories
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {CATEGORIES.slice(0, 4).map((category) => (
                    <motion.button
                      key={category.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSuggestionClick(category.name)}
                      className="px-4 py-2 glass-card text-gray-300 hover:text-white rounded-lg transition-colors"
                    >
                      {category.name}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Recommendations */}
        {!hasSearched && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center space-x-2 mb-8">
              <SparklesIcon className="h-6 w-6 text-primary-400" />
              <h2 className="text-2xl font-bold text-white">
                Recommended for You
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recommendations.map((event, index) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onLike={handleLike}
                  onShare={handleShare}
                  index={index}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Categories Quick Access */}
        {!hasSearched && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-16"
          >
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              Browse by Category
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {CATEGORIES.map((category, index) => (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSuggestionClick(category.name)}
                  className="glass-card p-4 rounded-xl text-center group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">
                    {category.icon === 'users' && '👥'}
                    {category.icon === 'wrench' && '🔧'}
                    {category.icon === 'trophy' && '🏆'}
                    {category.icon === 'image' && '🎨'}
                    {category.icon === 'music' && '🎵'}
                    {category.icon === 'microphone' && '🎤'}
                    {category.icon === 'baby' && '👶'}
                    {category.icon === 'network' && '🌐'}
                  </div>
                  <div className="text-sm font-medium text-white group-hover:text-primary-400 transition-colors">
                    {category.name}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {category.count} events
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </ParallaxBackground>
  );
};

export default SearchPage;