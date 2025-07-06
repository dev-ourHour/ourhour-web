import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bars3Icon, 
  XMarkIcon, 
  UserCircleIcon, 
  BellIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';
import { ROUTES } from '../../utils/constants';
import { useAuth } from '../../contexts/AuthContext';
import CitySearchInput from '../UI/CitySearchInput';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isLocationMenuOpen, setIsLocationMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentLocation, setCurrentLocation] = useState('Mumbai');
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: ROUTES.EVENTS, label: 'Events' },
    { path: ROUTES.COMMUNITIES, label: 'Communities' },
    { path: ROUTES.SEARCH, label: 'Search' },
  ];

  const isActivePath = (path: string) => {
    if (path === ROUTES.HOME) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    setIsProfileMenuOpen(false);
    navigate('/');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}&location=${currentLocation}`);
      setSearchQuery('');
    }
  };

  const detectLocation = async () => {
    setIsDetectingLocation(true);
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            const mockCities = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Pune'];
            const detectedCity = mockCities[Math.floor(Math.random() * mockCities.length)];
            setCurrentLocation(detectedCity);
            setIsDetectingLocation(false);
          },
          (error) => {
            console.error('Error detecting location:', error);
            setIsDetectingLocation(false);
          }
        );
      }
    } catch (error) {
      console.error('Geolocation error:', error);
      setIsDetectingLocation(false);
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass-card shadow-2xl shadow-primary-500/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to={ROUTES.HOME} className="flex items-center space-x-2 flex-shrink-0">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-xl md:text-2xl font-bold gradient-text"
            >
              OurHour
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative font-medium transition-colors duration-200 px-3 py-2 rounded-lg text-sm lg:text-base ${
                  isActivePath(link.path)
                    ? 'text-primary-400 bg-primary-500/10'
                    : 'text-gray-300 hover:text-primary-400 hover:bg-white/5'
                }`}
              >
                {link.label}
                {isActivePath(link.path) && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute inset-0 bg-primary-500/20 rounded-lg border border-primary-500/30"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Location Selector - Desktop Only */}
          <div className="hidden lg:flex items-center">
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={() => setIsLocationMenuOpen(!isLocationMenuOpen)}
                className="flex items-center space-x-2 px-3 py-2 glass-card rounded-lg hover:bg-white/10 transition-colors text-sm"
              >
                <span className="text-white">{currentLocation}</span>
                <ChevronDownIcon className="h-3 w-3 text-gray-400" />
              </motion.button>

              <AnimatePresence>
                {isLocationMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full mt-2 w-80 glass-card rounded-lg shadow-2xl border border-white/10 py-2 max-h-80 overflow-y-auto"
                  >
                    <div className="px-4 py-2 border-b border-white/10">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={detectLocation}
                        disabled={isDetectingLocation}
                        className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-primary-400 hover:bg-white/5 rounded-lg transition-colors"
                      >
                        <span>
                          {isDetectingLocation ? 'Detecting...' : 'Detect my location'}
                        </span>
                      </motion.button>
                    </div>
                    <div className="p-2">
                      <CitySearchInput
                        value={currentLocation}
                        onChange={(city) => {
                          setCurrentLocation(city.split(',')[0]);
                          setIsLocationMenuOpen(false);
                        }}
                        placeholder="Search cities..."
                        className="w-full"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Search Bar - Desktop Only */}
          <div className="hidden xl:block flex-1 max-w-md mx-4">
            <form onSubmit={handleSearch} className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 glass-card text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent rounded-lg text-sm"
              />
            </form>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            {/* Search Button - Mobile/Tablet */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate('/search')}
              className="xl:hidden p-2 glass-card rounded-lg hover:bg-white/10 transition-colors"
            >
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-300" />
            </motion.button>

            {/* Authentication */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                {/* Create Event Button */}
                {(user?.role === 'host' || user?.role === 'admin') && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/create-event')}
                    className="hidden sm:flex items-center space-x-2 btn-primary text-sm px-3 py-2"
                  >
                    <PlusIcon className="h-4 w-4" />
                    <span className="hidden lg:block">Create</span>
                  </motion.button>
                )}

                {/* Notifications */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => alert('Notifications feature coming soon!')}
                  className="p-2 glass-card rounded-lg hover:bg-white/10 transition-colors relative"
                >
                  <BellIcon className="h-5 w-5 text-gray-300" />
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse"></span>
                </motion.button>

                {/* Profile Menu */}
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className="flex items-center space-x-2 p-2 glass-card rounded-lg hover:bg-white/10 transition-colors"
                  >
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    ) : (
                      <UserCircleIcon className="h-8 w-8 text-gray-300" />
                    )}
                    <span className="hidden sm:block text-sm font-medium text-gray-300">
                      {user?.name?.split(' ')[0]}
                    </span>
                  </motion.button>

                  {/* Profile Dropdown */}
                  <AnimatePresence>
                    {isProfileMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-2 w-48 glass-card rounded-lg shadow-2xl border border-white/10 py-2"
                      >
                        <Link
                          to="/dashboard"
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                          onClick={() => setIsProfileMenuOpen(false)}
                        >
                          Dashboard
                        </Link>
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                          onClick={() => setIsProfileMenuOpen(false)}
                        >
                          Profile
                        </Link>
                        {user?.role === 'host' && (
                          <Link
                            to="/host"
                            className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                            onClick={() => setIsProfileMenuOpen(false)}
                          >
                            Host Dashboard
                          </Link>
                        )}
                        {user?.role === 'admin' && (
                          <Link
                            to="/admin"
                            className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                            onClick={() => setIsProfileMenuOpen(false)}
                          >
                            Admin Dashboard
                          </Link>
                        )}
                        <hr className="my-2 border-white/10" />
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/10 transition-colors"
                        >
                          Sign out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <Link
                  to={ROUTES.LOGIN}
                  className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-primary-400 transition-colors duration-200"
                >
                  Sign in
                </Link>
                <Link
                  to={ROUTES.REGISTER}
                  className="btn-primary text-sm px-4 py-2"
                >
                  Sign up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleMobileMenuToggle}
              className="md:hidden p-2 glass-card rounded-lg hover:bg-white/10 transition-colors"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6 text-gray-300" />
              ) : (
                <Bars3Icon className="h-6 w-6 text-gray-300" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-card border-t border-white/10"
          >
            <div className="px-4 py-6 space-y-4">
              {/* Mobile Location Selector */}
              <div className="mb-4">
                <CitySearchInput
                  value={currentLocation}
                  onChange={(city) => setCurrentLocation(city.split(',')[0])}
                  placeholder="Select your city..."
                  className="w-full"
                />
              </div>

              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 glass-card text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg"
                />
              </form>

              {/* Navigation Links */}
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 ${
                    isActivePath(link.path)
                      ? 'text-primary-400 bg-primary-500/20'
                      : 'text-gray-300 hover:text-primary-400 hover:bg-white/10'
                  }`}
                >
                  <span>{link.label}</span>
                </Link>
              ))}
              
              {/* Mobile Create Event Button */}
              {isAuthenticated && (user?.role === 'host' || user?.role === 'admin') && (
                <Link
                  to="/create-event"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium btn-primary"
                >
                  <PlusIcon className="h-5 w-5" />
                  <span>Create Event</span>
                </Link>
              )}
              
              {!isAuthenticated && (
                <div className="pt-4 space-y-3 border-t border-white/10">
                  <Link
                    to={ROUTES.LOGIN}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-lg text-base font-medium text-gray-300 hover:text-primary-400 hover:bg-white/10 transition-colors"
                  >
                    Sign in
                  </Link>
                  <Link
                    to={ROUTES.REGISTER}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-lg text-base font-medium text-center btn-primary"
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;