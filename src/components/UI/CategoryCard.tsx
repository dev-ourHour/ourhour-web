import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CategoryInfo } from '../../types';
import { formatNumber } from '../../utils/helpers';

interface CategoryCardProps {
  category: CategoryInfo;
  index: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, index }) => {
  const getIcon = (iconName: string) => {
    const iconMap = {
      users: '👥',
      wrench: '🔧',
      trophy: '🏆',
      image: '🎨',
      music: '🎵',
      microphone: '🎤',
      baby: '👶',
      network: '🌐'
    };
    return iconMap[iconName as keyof typeof iconMap] || '📅';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ scale: 1.05, y: -10 }}
      className="group relative"
    >
      <Link to={`/events?category=${category.id}`}>
        <div className="category-card relative overflow-hidden rounded-2xl h-40 sm:h-48 md:h-56 cursor-pointer">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            style={{
              backgroundImage: `url(${category.background})`,
            }}
          />
          
          {/* Gradient Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t ${category.gradient} opacity-80 group-hover:opacity-90 transition-opacity duration-300`} />
          
          {/* Glow Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            whileHover={{ opacity: 1 }}
          />
          
          {/* Content */}
          <div className="relative h-full flex flex-col justify-between p-4 md:p-6">
            <div className="flex justify-between items-start">
              <motion.div
                className="glass-card px-3 py-1 md:px-4 md:py-2 rounded-full"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-white text-xs md:text-sm font-semibold">{category.name}</span>
              </motion.div>
              <motion.div
                className="text-2xl md:text-3xl filter drop-shadow-lg"
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {getIcon(category.icon)}
              </motion.div>
            </div>
            
            <div className="space-y-2 md:space-y-3">
              <h3 className="text-lg md:text-2xl font-bold text-white text-shadow-lg group-hover:text-shadow-xl transition-all duration-300">
                {category.name}
              </h3>
              <p className="text-white/80 text-xs md:text-sm leading-relaxed line-clamp-2">
                {category.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-white/90 text-xs md:text-sm font-medium">
                  {formatNumber(category.count)} events
                </span>
                <motion.div
                  className="w-8 h-8 md:w-10 md:h-10 glass-card rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors duration-300"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <svg 
                    className="w-4 h-4 md:w-5 md:h-5 text-white" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 5l7 7-7 7" 
                    />
                  </svg>
                </motion.div>
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

export default CategoryCard;