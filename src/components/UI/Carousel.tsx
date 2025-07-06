import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface CarouselProps {
  children: React.ReactNode[];
  itemsPerView?: number;
  gap?: number;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showArrows?: boolean;
  showDots?: boolean;
  className?: string;
}

const Carousel: React.FC<CarouselProps> = ({
  children,
  itemsPerView = 4,
  gap = 24,
  autoPlay = false,
  autoPlayInterval = 5000,
  showArrows = true,
  showDots = false,
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout>();

  const totalItems = children.length;
  
  // Responsive items per view
  const getItemsPerView = () => {
    if (typeof window === 'undefined') return itemsPerView;
    
    const width = window.innerWidth;
    if (width < 640) return 1; // Mobile
    if (width < 768) return Math.min(2, itemsPerView); // Small tablet
    if (width < 1024) return Math.min(3, itemsPerView); // Tablet
    if (width < 1280) return Math.min(4, itemsPerView); // Desktop
    return itemsPerView; // Large desktop
  };

  const [responsiveItemsPerView, setResponsiveItemsPerView] = useState(getItemsPerView());
  const maxIndex = Math.max(0, totalItems - responsiveItemsPerView);

  useEffect(() => {
    const handleResize = () => {
      const newItemsPerView = getItemsPerView();
      setResponsiveItemsPerView(newItemsPerView);
      setIsMobile(window.innerWidth < 768);
      
      // Adjust current index if needed
      const newMaxIndex = Math.max(0, totalItems - newItemsPerView);
      if (currentIndex > newMaxIndex) {
        setCurrentIndex(newMaxIndex);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [totalItems, currentIndex]);

  useEffect(() => {
    if (autoPlay && !isHovered && !isMobile) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
      }, autoPlayInterval);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [autoPlay, isHovered, maxIndex, autoPlayInterval, isMobile]);

  const goToSlide = (index: number) => {
    setCurrentIndex(Math.max(0, Math.min(index, maxIndex)));
  };

  const goToPrevious = () => {
    setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') goToPrevious();
    if (e.key === 'ArrowRight') goToNext();
  };

  // Touch handling for mobile
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) goToNext();
    if (isRightSwipe) goToPrevious();
  };

  if (totalItems === 0) return null;

  return (
    <div 
      className={`relative group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div 
        className="overflow-hidden" 
        ref={carouselRef}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <motion.div
          className="flex"
          style={{ gap: `${gap}px` }}
          animate={{
            x: `-${currentIndex * (100 / responsiveItemsPerView + gap / responsiveItemsPerView)}%`
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30
          }}
        >
          {children.map((child, index) => (
            <motion.div
              key={index}
              className="flex-shrink-0"
              style={{ 
                width: `calc(${100 / responsiveItemsPerView}% - ${gap * (responsiveItemsPerView - 1) / responsiveItemsPerView}px)` 
              }}
              whileHover={{ scale: isMobile ? 1 : 1.05, zIndex: 10 }}
              transition={{ duration: 0.2 }}
            >
              {child}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Navigation Arrows - Hidden on mobile */}
      {showArrows && totalItems > responsiveItemsPerView && !isMobile && (
        <>
          <AnimatePresence>
            {(isHovered || currentIndex > 0) && (
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onClick={goToPrevious}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-black/80 hover:bg-black/90 text-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 touch-button"
                aria-label="Previous slide"
              >
                <ChevronLeftIcon className="w-6 h-6" />
              </motion.button>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {(isHovered || currentIndex < maxIndex) && (
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onClick={goToNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-black/80 hover:bg-black/90 text-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 touch-button"
                aria-label="Next slide"
              >
                <ChevronRightIcon className="w-6 h-6" />
              </motion.button>
            )}
          </AnimatePresence>
        </>
      )}

      {/* Dots Indicator - Always visible on mobile */}
      {(showDots || isMobile) && totalItems > responsiveItemsPerView && (
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 touch-button ${
                index === currentIndex
                  ? 'bg-primary-500 w-8'
                  : 'bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Mobile swipe indicator */}
      {isMobile && totalItems > responsiveItemsPerView && (
        <div className="flex justify-center mt-4">
          <div className="flex items-center space-x-2 text-gray-400 text-sm">
            <span>Swipe to navigate</span>
            <div className="flex space-x-1">
              <div className="w-1 h-1 bg-gray-400 rounded-full animate-pulse"></div>
              <div className="w-1 h-1 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-1 h-1 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carousel;