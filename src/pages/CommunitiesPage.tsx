import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  UserGroupIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  MapPinIcon,
  UsersIcon,
  CalendarIcon,
  CheckBadgeIcon,
  LockClosedIcon
} from '@heroicons/react/24/outline';
import ParallaxBackground from '../components/UI/ParallaxBackground';
import LoadingSkeleton from '../components/UI/LoadingSkeleton';
import { SAMPLE_COMMUNITIES } from '../utils/constants';
import { Community } from '../types';
import { formatNumber } from '../utils/helpers';

const CommunitiesPage: React.FC = () => {
  const [communities, setCommunities] = useState<Community[]>(SAMPLE_COMMUNITIES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    'All',
    'Technology',
    'Business',
    'Arts & Culture',
    'Sports',
    'Education',
    'Health & Wellness',
    'Entertainment'
  ];

  const filteredCommunities = communities.filter(community => {
    const matchesSearch = community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         community.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || selectedCategory === 'All' || 
                           community.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleJoinCommunity = (communityId: string) => {
    setCommunities(prev => prev.map(community => 
      community.id === communityId 
        ? { 
            ...community, 
            memberCount: community.memberCount + 1,
            members: [...community.members, 'current-user-id']
          }
        : community
    ));
  };

  return (
    <ParallaxBackground className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Join Communities
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
            Connect with like-minded people, share experiences, and grow together in vibrant communities
          </p>

          {/* Search and Create */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
            <div className="relative flex-1 w-full">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search communities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 glass-card text-white placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary flex items-center space-x-2 px-6 py-3"
            >
              <PlusIcon className="h-5 w-5" />
              <span>Create Community</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category === 'All' ? '' : category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                  (selectedCategory === category) || (selectedCategory === '' && category === 'All')
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'glass-card text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Communities Grid */}
        {isLoading ? (
          <LoadingSkeleton type="card" count={6} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCommunities.map((community, index) => (
              <motion.div
                key={community.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="glass-card overflow-hidden rounded-2xl group"
              >
                {/* Cover Image */}
                <div className="relative h-48 overflow-hidden">
                  {community.coverImage ? (
                    <img
                      src={community.coverImage}
                      alt={community.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary-500/20 to-secondary-500/20 flex items-center justify-center">
                      <UserGroupIcon className="h-16 w-16 text-white/50" />
                    </div>
                  )}
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex space-x-2">
                    {community.verified && (
                      <span className="px-3 py-1 bg-primary-500/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full flex items-center space-x-1">
                        <CheckBadgeIcon className="h-3 w-3" />
                        <span>Verified</span>
                      </span>
                    )}
                    {community.isPrivate && (
                      <span className="px-3 py-1 bg-gray-500/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full flex items-center space-x-1">
                        <LockClosedIcon className="h-3 w-3" />
                        <span>Private</span>
                      </span>
                    )}
                  </div>

                  {/* Category */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 glass-card text-white text-xs font-medium rounded-full">
                      {community.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Community Info */}
                  <div className="flex items-start space-x-4 mb-4">
                    {community.avatar ? (
                      <img
                        src={community.avatar}
                        alt={community.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                        <span className="text-lg font-bold text-white">
                          {community.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-white group-hover:text-primary-400 transition-colors">
                        {community.name}
                      </h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-400">
                        <MapPinIcon className="h-4 w-4" />
                        <span>{community.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 text-sm mb-6 line-clamp-3 leading-relaxed">
                    {community.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1 text-primary-400 mb-1">
                        <UsersIcon className="h-4 w-4" />
                        <span className="text-lg font-bold">{formatNumber(community.memberCount)}</span>
                      </div>
                      <div className="text-xs text-gray-400">Members</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1 text-secondary-400 mb-1">
                        <CalendarIcon className="h-4 w-4" />
                        <span className="text-lg font-bold">{community.events.length}</span>
                      </div>
                      <div className="text-xs text-gray-400">Events</div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-3">
                    <Link
                      to={`/communities/${community.id}`}
                      className="flex-1 text-center px-4 py-2 glass-card text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    >
                      View Details
                    </Link>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleJoinCommunity(community.id)}
                      className="flex-1 btn-primary text-sm"
                    >
                      {community.isPrivate ? 'Request to Join' : 'Join Community'}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* No Results */}
        {filteredCommunities.length === 0 && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-6">🏘️</div>
            <h3 className="text-2xl font-semibold text-white mb-4">
              No communities found
            </h3>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Try adjusting your search or create a new community to get started
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary flex items-center space-x-2 mx-auto"
            >
              <PlusIcon className="h-5 w-5" />
              <span>Create Community</span>
            </motion.button>
          </motion.div>
        )}

        {/* Featured Communities Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-20"
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Why Join Communities?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ y: -5 }}
              className="text-center glass-card p-8 rounded-2xl"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <UserGroupIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Connect & Network
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Meet like-minded individuals, build meaningful relationships, and expand your professional network.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="text-center glass-card p-8 rounded-2xl"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-accent-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <CalendarIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Exclusive Events
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Get access to community-exclusive events, workshops, and meetups tailored to your interests.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="text-center glass-card p-8 rounded-2xl"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-primary-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <MagnifyingGlassIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Learn & Grow
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Share knowledge, learn from experts, and grow both personally and professionally within your community.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </ParallaxBackground>
  );
};

export default CommunitiesPage;