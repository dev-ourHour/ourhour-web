import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPinIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface City {
  name: string;
  state: string;
  country: string;
  population?: number;
  isPopular?: boolean;
}

interface CitySearchInputProps {
  value: string;
  onChange: (city: string) => void;
  placeholder?: string;
  className?: string;
}

const INDIAN_CITIES: City[] = [
  // Metro Cities
  { name: 'Mumbai', state: 'Maharashtra', country: 'India', population: 12442373, isPopular: true },
  { name: 'Delhi', state: 'Delhi', country: 'India', population: 11007835, isPopular: true },
  { name: 'Bangalore', state: 'Karnataka', country: 'India', population: 8443675, isPopular: true },
  { name: 'Hyderabad', state: 'Telangana', country: 'India', population: 6809970, isPopular: true },
  { name: 'Chennai', state: 'Tamil Nadu', country: 'India', population: 4681087, isPopular: true },
  { name: 'Kolkata', state: 'West Bengal', country: 'India', population: 4496694, isPopular: true },
  { name: 'Pune', state: 'Maharashtra', country: 'India', population: 3124458, isPopular: true },
  { name: 'Ahmedabad', state: 'Gujarat', country: 'India', population: 5633927, isPopular: true },

  // Tier 1 Cities
  { name: 'Jaipur', state: 'Rajasthan', country: 'India', population: 3046163, isPopular: true },
  { name: 'Surat', state: 'Gujarat', country: 'India', population: 4467797, isPopular: true },
  { name: 'Lucknow', state: 'Uttar Pradesh', country: 'India', population: 2817105, isPopular: true },
  { name: 'Kanpur', state: 'Uttar Pradesh', country: 'India', population: 2767031 },
  { name: 'Nagpur', state: 'Maharashtra', country: 'India', population: 2405421 },
  { name: 'Indore', state: 'Madhya Pradesh', country: 'India', population: 1964086, isPopular: true },
  { name: 'Thane', state: 'Maharashtra', country: 'India', population: 1818872 },
  { name: 'Bhopal', state: 'Madhya Pradesh', country: 'India', population: 1798218, isPopular: true },
  { name: 'Visakhapatnam', state: 'Andhra Pradesh', country: 'India', population: 1730320 },
  { name: 'Pimpri-Chinchwad', state: 'Maharashtra', country: 'India', population: 1729359 },
  { name: 'Patna', state: 'Bihar', country: 'India', population: 1684222 },
  { name: 'Vadodara', state: 'Gujarat', country: 'India', population: 1666703 },

  // Tier 2 Cities
  { name: 'Ghaziabad', state: 'Uttar Pradesh', country: 'India', population: 1636068 },
  { name: 'Ludhiana', state: 'Punjab', country: 'India', population: 1618879 },
  { name: 'Agra', state: 'Uttar Pradesh', country: 'India', population: 1585704 },
  { name: 'Nashik', state: 'Maharashtra', country: 'India', population: 1486973 },
  { name: 'Faridabad', state: 'Haryana', country: 'India', population: 1414050 },
  { name: 'Meerut', state: 'Uttar Pradesh', country: 'India', population: 1309023 },
  { name: 'Rajkot', state: 'Gujarat', country: 'India', population: 1286995 },
  { name: 'Kalyan-Dombivli', state: 'Maharashtra', country: 'India', population: 1246381 },
  { name: 'Vasai-Virar', state: 'Maharashtra', country: 'India', population: 1221233 },
  { name: 'Varanasi', state: 'Uttar Pradesh', country: 'India', population: 1201815 },
  { name: 'Srinagar', state: 'Jammu and Kashmir', country: 'India', population: 1180570 },
  { name: 'Aurangabad', state: 'Maharashtra', country: 'India', population: 1175116 },
  { name: 'Dhanbad', state: 'Jharkhand', country: 'India', population: 1161561 },
  { name: 'Amritsar', state: 'Punjab', country: 'India', population: 1132761 },
  { name: 'Navi Mumbai', state: 'Maharashtra', country: 'India', population: 1119477 },
  { name: 'Allahabad', state: 'Uttar Pradesh', country: 'India', population: 1117094 },
  { name: 'Ranchi', state: 'Jharkhand', country: 'India', population: 1073440 },
  { name: 'Howrah', state: 'West Bengal', country: 'India', population: 1072161 },
  { name: 'Coimbatore', state: 'Tamil Nadu', country: 'India', population: 1061447 },
  { name: 'Jabalpur', state: 'Madhya Pradesh', country: 'India', population: 1055525 },
  { name: 'Gwalior', state: 'Madhya Pradesh', country: 'India', population: 1054420 },

  // Popular Tourist/Tech Cities
  { name: 'Goa', state: 'Goa', country: 'India', population: 40017, isPopular: true },
  { name: 'Chandigarh', state: 'Chandigarh', country: 'India', population: 1025682, isPopular: true },
  { name: 'Mysore', state: 'Karnataka', country: 'India', population: 920550 },
  { name: 'Kochi', state: 'Kerala', country: 'India', population: 677381, isPopular: true },
  { name: 'Thiruvananthapuram', state: 'Kerala', country: 'India', population: 957730 },
  { name: 'Bhubaneswar', state: 'Odisha', country: 'India', population: 837737 },
  { name: 'Salem', state: 'Tamil Nadu', country: 'India', population: 826267 },
  { name: 'Warangal', state: 'Telangana', country: 'India', population: 811844 },
  { name: 'Guntur', state: 'Andhra Pradesh', country: 'India', population: 743354 },
  { name: 'Bhiwandi', state: 'Maharashtra', country: 'India', population: 709665 },
  { name: 'Saharanpur', state: 'Uttar Pradesh', country: 'India', population: 703345 },
  { name: 'Gorakhpur', state: 'Uttar Pradesh', country: 'India', population: 674246 },
  { name: 'Bikaner', state: 'Rajasthan', country: 'India', population: 650138 },
  { name: 'Amravati', state: 'Maharashtra', country: 'India', population: 647057 },
  { name: 'Noida', state: 'Uttar Pradesh', country: 'India', population: 642381, isPopular: true },
  { name: 'Jamshedpur', state: 'Jharkhand', country: 'India', population: 629659 },
  { name: 'Bhilai', state: 'Chhattisgarh', country: 'India', population: 625697 },
  { name: 'Cuttack', state: 'Odisha', country: 'India', population: 606007 },
  { name: 'Firozabad', state: 'Uttar Pradesh', country: 'India', population: 603797 },
  { name: 'Kota', state: 'Rajasthan', country: 'India', population: 1001365 },
  { name: 'Dehradun', state: 'Uttarakhand', country: 'India', population: 578420, isPopular: true },
  { name: 'Durgapur', state: 'West Bengal', country: 'India', population: 566937 },
  { name: 'Ajmer', state: 'Rajasthan', country: 'India', population: 551101 },
  { name: 'Rourkela', state: 'Odisha', country: 'India', population: 483418 },
  { name: 'Nanded', state: 'Maharashtra', country: 'India', population: 550564 },
  { name: 'Kolhapur', state: 'Maharashtra', country: 'India', population: 549236 },
  { name: 'Akola', state: 'Maharashtra', country: 'India', population: 498032 },
  { name: 'Gulbarga', state: 'Karnataka', country: 'India', population: 532031 },
  { name: 'Jamnagar', state: 'Gujarat', country: 'India', population: 529308 },
  { name: 'Ujjain', state: 'Madhya Pradesh', country: 'India', population: 515215 },
  { name: 'Loni', state: 'Uttar Pradesh', country: 'India', population: 512296 },
  { name: 'Siliguri', state: 'West Bengal', country: 'India', population: 509709 },
  { name: 'Jhansi', state: 'Uttar Pradesh', country: 'India', population: 507293 },
  { name: 'Ulhasnagar', state: 'Maharashtra', country: 'India', population: 506098 },
  { name: 'Jammu', state: 'Jammu and Kashmir', country: 'India', population: 502197 },
  { name: 'Sangli-Miraj & Kupwad', state: 'Maharashtra', country: 'India', population: 502697 },
  { name: 'Mangalore', state: 'Karnataka', country: 'India', population: 488968 },
  { name: 'Erode', state: 'Tamil Nadu', country: 'India', population: 498129 },
  { name: 'Belgaum', state: 'Karnataka', country: 'India', population: 488292 },
  { name: 'Ambattur', state: 'Tamil Nadu', country: 'India', population: 478134 },
  { name: 'Tirunelveli', state: 'Tamil Nadu', country: 'India', population: 474838 },
  { name: 'Malegaon', state: 'Maharashtra', country: 'India', population: 471312 },
  { name: 'Gaya', state: 'Bihar', country: 'India', population: 470839 }
];

const CitySearchInput: React.FC<CitySearchInputProps> = ({
  value,
  onChange,
  placeholder = "Search cities...",
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(value);
  const [filteredCities, setFilteredCities] = useState<City[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSearchTerm(value);
  }, [value]);

  useEffect(() => {
    if (searchTerm.length === 0) {
      // Show popular cities when no search term
      setFilteredCities(INDIAN_CITIES.filter(city => city.isPopular).slice(0, 8));
    } else if (searchTerm.length >= 1) {
      // Filter cities based on search term
      const filtered = INDIAN_CITIES.filter(city =>
        city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        city.state.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 10);
      setFilteredCities(filtered);
    } else {
      setFilteredCities([]);
    }
    setHighlightedIndex(-1);
  }, [searchTerm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchTerm(newValue);
    setIsOpen(true);
  };

  const handleCitySelect = (city: City) => {
    const cityName = `${city.name}, ${city.state}`;
    setSearchTerm(cityName);
    onChange(cityName);
    setIsOpen(false);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev < filteredCities.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev > 0 ? prev - 1 : filteredCities.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && filteredCities[highlightedIndex]) {
          handleCitySelect(filteredCities[highlightedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        inputRef.current?.blur();
        break;
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    onChange('');
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropdownRef.current && 
      !dropdownRef.current.contains(e.target as Node) &&
      !inputRef.current?.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <MapPinIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-200"
        />
        {searchTerm && (
          <button
            onClick={handleClear}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 hover:bg-white/10 rounded-full transition-colors"
          >
            <XMarkIcon className="h-4 w-4 text-gray-400" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && filteredCities.length > 0 && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2 w-full bg-dark-800/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl z-50 max-h-80 overflow-y-auto"
          >
            {searchTerm.length === 0 && (
              <div className="px-4 py-3 border-b border-white/10">
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <MagnifyingGlassIcon className="h-4 w-4" />
                  <span>Popular Cities</span>
                </div>
              </div>
            )}
            
            <div className="py-2">
              {filteredCities.map((city, index) => (
                <motion.button
                  key={`${city.name}-${city.state}`}
                  whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                  onClick={() => handleCitySelect(city)}
                  className={`w-full text-left px-4 py-3 transition-colors ${
                    index === highlightedIndex
                      ? 'bg-white/10'
                      : 'hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-white">
                        {city.name}
                      </div>
                      <div className="text-sm text-gray-400">
                        {city.state}, {city.country}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {city.isPopular && (
                        <span className="px-2 py-1 bg-primary-500/20 text-primary-300 text-xs rounded-full">
                          Popular
                        </span>
                      )}
                      {city.population && (
                        <span className="text-xs text-gray-500">
                          {(city.population / 100000).toFixed(1)}L
                        </span>
                      )}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CitySearchInput;