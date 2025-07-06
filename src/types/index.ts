export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  bio?: string;
  location?: string;
  role: 'user' | 'host' | 'admin';
  interests: string[];
  communities: string[];
  eventsCreated: string[];
  bookings: string[];
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  category: EventCategory;
  images: string[];
  host: {
    id: string;
    name: string;
    avatar?: string;
    verified: boolean;
  };
  datetime: {
    start: string;
    end: string;
  };
  location: {
    venue: string;
    address: string;
    city: string;
    coordinates: [number, number];
  };
  pricing: {
    type: 'free' | 'paid';
    amount: number;
    currency: string;
  };
  capacity: number;
  booked: number;
  tags: string[];
  community?: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  likes: number;
  isLiked: boolean;
  featured: boolean;
  analytics: {
    views: number;
    bookings: number;
    revenue: number;
    checkIns: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Community {
  id: string;
  name: string;
  description: string;
  avatar?: string;
  coverImage?: string;
  category: string;
  location: string;
  memberCount: number;
  members: string[];
  admins: string[];
  events: string[];
  isPrivate: boolean;
  joinCode?: string;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  id: string;
  userId: string;
  eventId: string;
  tickets: number;
  amount: number;
  paymentStatus: 'pending' | 'confirmed' | 'failed' | 'refunded';
  paymentId?: string;
  bookingDate: string;
  status: 'confirmed' | 'cancelled' | 'attended';
  checkInTime?: string;
  feedback?: {
    rating: number;
    comment: string;
  };
}

export interface Analytics {
  id: string;
  userId?: string;
  eventId?: string;
  action: 'view' | 'book' | 'share' | 'like' | 'checkin';
  timestamp: string;
  metadata?: any;
}

export type EventCategory = 
  | 'conferences'
  | 'workshops'
  | 'competitions'
  | 'exhibitions'
  | 'entertainment'
  | 'seminars'
  | 'children'
  | 'networking';

export interface CategoryInfo {
  id: EventCategory;
  name: string;
  count: number;
  background: string;
  gradient: string;
  color: string;
  icon: string;
  description: string;
}

export interface SearchFilters {
  query: string;
  category: EventCategory | '';
  location: string;
  city: string;
  dateRange: {
    start: string;
    end: string;
  };
  priceRange: {
    min: number;
    max: number;
  };
  radius: number;
  sortBy: 'relevance' | 'date' | 'price' | 'popularity';
  featured: boolean;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'event_reminder' | 'community_update' | 'payment_confirmation' | 'new_event' | 'booking_confirmed';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  data?: any;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface DashboardStats {
  totalEvents: number;
  totalBookings: number;
  totalRevenue: number;
  totalUsers: number;
  monthlyGrowth: number;
  popularCategories: { category: string; count: number }[];
  recentActivity: any[];
}

export interface HostStats {
  eventsCreated: number;
  totalBookings: number;
  totalRevenue: number;
  averageRating: number;
  upcomingEvents: number;
  monthlyRevenue: { month: string; revenue: number }[];
  topEvents: Event[];
}