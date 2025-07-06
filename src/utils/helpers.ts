import { format, isValid, parseISO } from 'date-fns';
import { Event, SearchFilters } from '../types';

export const formatDate = (dateString: string, formatStr: string = 'PPP'): string => {
  try {
    const date = parseISO(dateString);
    if (!isValid(date)) return 'Invalid date';
    return format(date, formatStr);
  } catch (error) {
    return 'Invalid date';
  }
};

export const formatDateTime = (dateString: string): string => {
  try {
    const date = parseISO(dateString);
    if (!isValid(date)) return 'Invalid date';
    return format(date, 'PPP p');
  } catch (error) {
    return 'Invalid date';
  }
};

export const formatPrice = (amount: number, currency: string = 'INR'): string => {
  if (amount === 0) return 'Free';
  
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  
  return formatter.format(amount);
};

export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

export const filterEvents = (events: Event[], filters: SearchFilters): Event[] => {
  return events.filter(event => {
    // Text search
    if (filters.query) {
      const query = filters.query.toLowerCase();
      const searchableText = [
        event.title,
        event.description,
        event.host.name,
        ...event.tags
      ].join(' ').toLowerCase();
      
      if (!searchableText.includes(query)) {
        return false;
      }
    }
    
    // Category filter
    if (filters.category && event.category !== filters.category) {
      return false;
    }
    
    // Location filter
    if (filters.location && !event.location.address.toLowerCase().includes(filters.location.toLowerCase())) {
      return false;
    }
    
    // City filter
    if (filters.city && event.location.city !== filters.city) {
      return false;
    }
    
    // Date range filter
    if (filters.dateRange.start && filters.dateRange.end) {
      const eventDate = parseISO(event.datetime.start);
      const startDate = parseISO(filters.dateRange.start);
      const endDate = parseISO(filters.dateRange.end);
      
      if (eventDate < startDate || eventDate > endDate) {
        return false;
      }
    }
    
    // Price range filter
    if (filters.priceRange.min !== undefined && filters.priceRange.max !== undefined) {
      const eventPrice = event.pricing.amount;
      if (eventPrice < filters.priceRange.min || eventPrice > filters.priceRange.max) {
        return false;
      }
    }
    
    // Featured filter
    if (filters.featured && !event.featured) {
      return false;
    }
    
    return true;
  });
};

export const sortEvents = (events: Event[], sortBy: string): Event[] => {
  const sortedEvents = [...events];
  
  switch (sortBy) {
    case 'date':
      return sortedEvents.sort((a, b) => 
        new Date(a.datetime.start).getTime() - new Date(b.datetime.start).getTime()
      );
    case 'price':
      return sortedEvents.sort((a, b) => a.pricing.amount - b.pricing.amount);
    case 'popularity':
      return sortedEvents.sort((a, b) => 
        (b.likes + b.booked) - (a.likes + a.booked)
      );
    default: // relevance
      return sortedEvents.sort((a, b) => {
        // Featured events first
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        
        // Then by popularity
        return (b.likes + b.booked) - (a.likes + a.booked);
      });
  }
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const throttle = <T extends (...args: any[]) => void>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

export const getAvailableSpots = (event: Event): number => {
  return Math.max(0, event.capacity - event.booked);
};

export const getEventStatus = (event: Event): string => {
  const now = new Date();
  const startDate = parseISO(event.datetime.start);
  const endDate = parseISO(event.datetime.end);
  
  if (now < startDate) return 'upcoming';
  if (now >= startDate && now <= endDate) return 'ongoing';
  return 'completed';
};

export const isEventSoldOut = (event: Event): boolean => {
  return event.booked >= event.capacity;
};

export const getImageUrl = (url: string, size: string = 'medium'): string => {
  if (!url) return '';
  
  // If it's a Pexels URL, add size parameter
  if (url.includes('pexels.com')) {
    const sizeMap = {
      small: 'w=400&h=300',
      medium: 'w=800&h=600',
      large: 'w=1200&h=900'
    };
    return `${url}&${sizeMap[size as keyof typeof sizeMap] || sizeMap.medium}`;
  }
  
  return url;
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  }
};

export const shareEvent = async (event: Event): Promise<void> => {
  const shareData = {
    title: event.title,
    text: event.description,
    url: `${window.location.origin}/events/${event.id}`
  };
  
  try {
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      await copyToClipboard(shareData.url);
    }
  } catch (err) {
    console.error('Error sharing event:', err);
  }
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  // At least 8 characters, one uppercase, one lowercase, one number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

export const getRandomColor = (): string => {
  const colors = [
    '#6366F1', '#8B5CF6', '#F59E0B', '#EF4444', 
    '#10B981', '#06B6D4', '#EC4899', '#64748B'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

export const getTimeAgo = (dateString: string): string => {
  const now = new Date();
  const date = parseISO(dateString);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (seconds < 60) return 'Just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 2592000) return `${Math.floor(seconds / 86400)}d ago`;
  if (seconds < 31536000) return `${Math.floor(seconds / 2592000)}mo ago`;
  return `${Math.floor(seconds / 31536000)}y ago`;
};

export const scrollToTop = (): void => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export const scrollToElement = (elementId: string): void => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

export const getEventRecommendations = (events: Event[], userInterests: string[] = []): Event[] => {
  // Simple recommendation algorithm based on user interests and event popularity
  return events
    .filter(event => event.status === 'upcoming')
    .sort((a, b) => {
      let scoreA = a.likes + a.booked;
      let scoreB = b.likes + b.booked;
      
      // Boost score if event tags match user interests
      if (userInterests.length > 0) {
        const matchesA = a.tags.filter(tag => userInterests.includes(tag)).length;
        const matchesB = b.tags.filter(tag => userInterests.includes(tag)).length;
        scoreA += matchesA * 100;
        scoreB += matchesB * 100;
      }
      
      // Boost featured events
      if (a.featured) scoreA += 50;
      if (b.featured) scoreB += 50;
      
      return scoreB - scoreA;
    })
    .slice(0, 10);
};

export const generateEventAnalytics = (event: Event) => {
  const conversionRate = event.capacity > 0 ? (event.booked / event.analytics.views) * 100 : 0;
  const fillRate = event.capacity > 0 ? (event.booked / event.capacity) * 100 : 0;
  
  return {
    conversionRate: Math.round(conversionRate * 100) / 100,
    fillRate: Math.round(fillRate * 100) / 100,
    revenuePerBooking: event.booked > 0 ? event.analytics.revenue / event.booked : 0,
    popularityScore: event.likes + event.booked + (event.analytics.views / 10)
  };
};

export const formatCurrency = (amount: number, currency: string = 'INR'): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const getEventsByCategory = (events: Event[], category: string): Event[] => {
  return events.filter(event => event.category === category);
};

export const getFeaturedEvents = (events: Event[]): Event[] => {
  return events.filter(event => event.featured && event.status === 'upcoming');
};

export const getUpcomingEvents = (events: Event[]): Event[] => {
  return events
    .filter(event => event.status === 'upcoming')
    .sort((a, b) => new Date(a.datetime.start).getTime() - new Date(b.datetime.start).getTime());
};

export const searchEvents = (events: Event[], query: string): Event[] => {
  if (!query.trim()) return events;
  
  const searchTerm = query.toLowerCase();
  return events.filter(event => {
    const searchableFields = [
      event.title,
      event.description,
      event.host.name,
      event.location.venue,
      event.location.city,
      ...event.tags
    ].join(' ').toLowerCase();
    
    return searchableFields.includes(searchTerm);
  });
};