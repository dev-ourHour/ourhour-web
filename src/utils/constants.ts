import { CategoryInfo } from '../types';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'conferences',
    name: 'Conferences',
    count: 847,
    background: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    gradient: 'from-purple-900/80 to-blue-900/80',
    color: '#8B5CF6',
    icon: 'users',
    description: 'Professional conferences and industry summits'
  },
  {
    id: 'workshops',
    name: 'Workshops',
    count: 623,
    background: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    gradient: 'from-green-900/80 to-teal-900/80',
    color: '#10B981',
    icon: 'wrench',
    description: 'Hands-on learning and skill development'
  },
  {
    id: 'competitions',
    name: 'Competitions',
    count: 394,
    background: 'https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    gradient: 'from-blue-900/80 to-cyan-900/80',
    color: '#06B6D4',
    icon: 'trophy',
    description: 'Contests and competitive events'
  },
  {
    id: 'exhibitions',
    name: 'Exhibitions',
    count: 456,
    background: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    gradient: 'from-amber-900/80 to-orange-900/80',
    color: '#F59E0B',
    icon: 'image',
    description: 'Art galleries and trade shows'
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    count: 1247,
    background: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    gradient: 'from-pink-900/80 to-red-900/80',
    color: '#EF4444',
    icon: 'music',
    description: 'Concerts, shows and entertainment'
  },
  {
    id: 'seminars',
    name: 'Seminars',
    count: 378,
    background: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    gradient: 'from-indigo-900/80 to-purple-900/80',
    color: '#6366F1',
    icon: 'microphone',
    description: 'Educational talks and presentations'
  },
  {
    id: 'children',
    name: 'Children',
    count: 289,
    background: 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    gradient: 'from-rose-900/80 to-pink-900/80',
    color: '#EC4899',
    icon: 'baby',
    description: 'Family-friendly and kids events'
  },
  {
    id: 'networking',
    name: 'Networking',
    count: 567,
    background: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    gradient: 'from-slate-900/80 to-gray-900/80',
    color: '#64748B',
    icon: 'network',
    description: 'Professional networking events'
  }
];

// Enhanced sample events with more variety and premium content
export const SAMPLE_EVENTS = [
  // Conferences
  {
    id: '1',
    title: 'Tech Innovation Summit 2024',
    description: 'The largest technology conference in India featuring AI, blockchain, and emerging technologies. Join 5000+ developers, entrepreneurs, and tech leaders for 3 days of innovation, networking, and cutting-edge insights.',
    category: 'conferences' as const,
    images: ['https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1'],
    host: {
      id: 'host1',
      name: 'TechCorp India',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      verified: true
    },
    datetime: {
      start: '2024-03-15T09:00:00Z',
      end: '2024-03-17T18:00:00Z'
    },
    location: {
      venue: 'Bombay Exhibition Centre',
      address: 'Goregaon East',
      city: 'Mumbai',
      coordinates: [72.8777, 19.0760] as [number, number]
    },
    pricing: {
      type: 'paid' as const,
      amount: 2500,
      currency: 'INR'
    },
    capacity: 5000,
    booked: 4247,
    tags: ['technology', 'AI', 'blockchain', 'innovation'],
    status: 'upcoming' as const,
    likes: 1845,
    isLiked: false,
    featured: true,
    analytics: {
      views: 25420,
      bookings: 4247,
      revenue: 10617500,
      checkIns: 0
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  },
  {
    id: '2',
    title: 'Digital Marketing Conclave',
    description: 'Learn from industry experts about the latest digital marketing trends, social media strategies, and growth hacking techniques. Network with 800+ marketing professionals.',
    category: 'conferences' as const,
    images: ['https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1'],
    host: {
      id: 'host2',
      name: 'Marketing Gurus',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      verified: true
    },
    datetime: {
      start: '2024-02-20T10:00:00Z',
      end: '2024-02-20T17:00:00Z'
    },
    location: {
      venue: 'ITC Grand Central',
      address: 'Parel',
      city: 'Mumbai',
      coordinates: [72.8311, 19.0176] as [number, number]
    },
    pricing: {
      type: 'paid' as const,
      amount: 1800,
      currency: 'INR'
    },
    capacity: 800,
    booked: 723,
    tags: ['marketing', 'digital', 'social media', 'growth'],
    status: 'upcoming' as const,
    likes: 656,
    isLiked: true,
    featured: false,
    analytics: {
      views: 12920,
      bookings: 723,
      revenue: 1301400,
      checkIns: 0
    },
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-01-20T00:00:00Z'
  }
];

// Generate extensive events for each category with premium content
const generateMoreEvents = () => {
  const additionalEvents = [];
  
  const eventTemplates = {
    conferences: [
      'AI & Machine Learning Summit', 'Startup Founders Conclave', 'Fintech Innovation Conference',
      'Sustainable Tech Summit', 'Women in Tech Conference', 'Cloud Computing Summit',
      'Cybersecurity Conference', 'Data Science Conclave', 'Mobile App Development Summit',
      'E-commerce Growth Conference', 'Digital Transformation Summit', 'Future of Work Conference',
      'Healthcare Innovation Summit', 'EdTech Conference', 'Gaming Industry Summit',
      'Blockchain & Crypto Conference', 'IoT Innovation Summit', 'AR/VR Technology Conference',
      'SaaS Growth Summit', 'DevOps Conference', 'Product Management Summit',
      'UX/UI Design Conference', 'Content Marketing Summit', 'Social Media Conference',
      'Influencer Marketing Summit', 'Brand Strategy Conference', 'Customer Experience Summit',
      'Sales Excellence Conference', 'Leadership Summit', 'Innovation & Entrepreneurship Conference',
      'Global Tech Leaders Summit', 'Quantum Computing Conference', 'Space Technology Summit',
      'Green Energy Conference', 'Smart Cities Summit', 'Robotics & Automation Conference',
      'Biotech Innovation Summit', 'Agritech Conference', 'Mobility & Transportation Summit',
      'Digital Health Conference', 'Retail Technology Summit', 'Banking Innovation Conference'
    ],
    workshops: [
      'UI/UX Design Bootcamp', 'Data Science Workshop', 'Digital Art Masterclass',
      'Content Writing Workshop', 'Public Speaking Training', 'Photography Basics',
      'Video Editing Masterclass', 'Social Media Marketing Workshop', 'SEO Optimization Training',
      'Web Development Bootcamp', 'Mobile App Development Workshop', 'Graphic Design Fundamentals',
      'Digital Illustration Workshop', 'Brand Design Workshop', 'Logo Design Masterclass',
      'Typography Workshop', 'Color Theory Workshop', 'Packaging Design Workshop',
      'Print Design Workshop', 'Motion Graphics Workshop', 'Animation Basics',
      'Character Design Workshop', 'Storyboarding Workshop', 'Creative Writing Workshop',
      'Copywriting Masterclass', 'Email Marketing Workshop', 'Affiliate Marketing Training',
      'Dropshipping Workshop', 'Amazon FBA Training', 'Cryptocurrency Trading Workshop',
      'Machine Learning Bootcamp', 'Python Programming Workshop', 'React Development Training',
      'Node.js Workshop', 'Database Design Training', 'API Development Workshop',
      'Cloud Computing Training', 'Docker & Kubernetes Workshop', 'DevOps Fundamentals',
      'Cybersecurity Training', 'Ethical Hacking Workshop', 'Penetration Testing Training'
    ],
    competitions: [
      'Design Challenge 2024', 'Startup Pitch Competition', 'Gaming Tournament',
      'Photography Contest', 'Dance Battle Championship', 'Coding Hackathon',
      'Business Plan Competition', 'Innovation Challenge', 'Art Competition',
      'Music Battle', 'Poetry Slam', 'Debate Championship',
      'Quiz Competition', 'Science Fair', 'Robotics Competition',
      'App Development Contest', 'Video Making Competition', 'Short Film Festival',
      'Fashion Design Contest', 'Cooking Competition', 'Fitness Challenge',
      'Marathon Event', 'Cycling Competition', 'Swimming Championship',
      'Chess Tournament', 'E-sports Championship', 'Drone Racing',
      'Stand-up Comedy Competition', 'Singing Competition', 'Talent Hunt',
      'AI Innovation Challenge', 'Blockchain Hackathon', 'Sustainability Challenge',
      'Social Impact Competition', 'Tech for Good Contest', 'Green Innovation Challenge',
      'Smart City Solutions Contest', 'Healthcare Innovation Challenge', 'EdTech Competition',
      'Fintech Hackathon', 'AR/VR Development Contest', 'IoT Innovation Challenge'
    ],
    exhibitions: [
      'Contemporary Art Exhibition', 'Tech Innovation Showcase', 'Fashion Week Mumbai',
      'Automobile Expo', 'Food & Culture Festival', 'Photography Exhibition',
      'Sculpture Gallery', 'Digital Art Showcase', 'Craft Fair',
      'Handmade Products Exhibition', 'Vintage Collection Show', 'Antique Fair',
      'Book Fair', 'Comic Con', 'Anime Convention',
      'Gaming Expo', 'Toy Fair', 'Pet Show',
      'Flower Show', 'Garden Exhibition', 'Home Decor Fair',
      'Furniture Exhibition', 'Interior Design Showcase', 'Architecture Exhibition',
      'Real Estate Expo', 'Travel & Tourism Fair', 'Adventure Sports Expo',
      'Health & Wellness Exhibition', 'Fitness Equipment Fair', 'Beauty & Cosmetics Expo',
      'Jewelry Exhibition', 'Wedding Expo', 'Lifestyle Exhibition',
      'Startup Showcase', 'Innovation Fair', 'Science & Technology Exhibition',
      'Green Technology Expo', 'Renewable Energy Fair', 'Smart Home Exhibition',
      'Electric Vehicle Expo', 'Drone Technology Fair', 'Robotics Exhibition'
    ],
    entertainment: [
      'Stand-up Comedy Night', 'Jazz Music Evening', 'Cultural Dance Festival',
      'Film Screening Event', 'Poetry & Literature Meet', 'Rock Concert',
      'Classical Music Concert', 'Folk Dance Performance', 'Theater Play',
      'Musical Theater', 'Opera Performance', 'Ballet Show',
      'Magic Show', 'Circus Performance', 'Puppet Show',
      'Street Performance Festival', 'Open Mic Night', 'Karaoke Night',
      'DJ Night', 'Electronic Music Festival', 'Hip Hop Battle',
      'Bollywood Night', 'Retro Music Night', 'Acoustic Session',
      'Comedy Roast', 'Improv Comedy Show', 'Sketch Comedy',
      'Celebrity Meet & Greet', 'Fan Convention', 'Cosplay Event',
      'Music Festival', 'Food & Music Festival', 'Wine Tasting Event',
      'Beer Festival', 'Cultural Night', 'International Music Festival',
      'Indie Music Concert', 'Fusion Music Night', 'World Music Festival',
      'Dance Competition', 'Singing Reality Show', 'Talent Show'
    ],
    seminars: [
      'Career Development Seminar', 'Investment & Finance Talk', 'Health & Wellness Session',
      'Leadership Masterclass', 'Innovation in Education', 'Personal Branding Seminar',
      'Time Management Workshop', 'Stress Management Session', 'Mindfulness & Meditation',
      'Yoga & Wellness Talk', 'Nutrition & Diet Seminar', 'Mental Health Awareness',
      'Women Empowerment Seminar', 'Youth Development Program', 'Senior Citizen Welfare',
      'Environmental Awareness Talk', 'Sustainability Seminar', 'Climate Change Discussion',
      'Social Impact Seminar', 'Community Development Talk', 'Volunteer Training',
      'NGO Awareness Session', 'Charity Fundraising Event', 'Social Entrepreneurship',
      'Financial Literacy Seminar', 'Tax Planning Workshop', 'Insurance Awareness',
      'Real Estate Investment Talk', 'Stock Market Basics', 'Cryptocurrency Education',
      'Digital Literacy Seminar', 'Cyber Safety Workshop', 'Online Privacy Talk',
      'Parenting Workshop', 'Child Development Seminar', 'Education Planning Session',
      'Career Counseling', 'Skill Development Talk', 'Professional Growth Seminar'
    ],
    children: [
      'Kids Science Fair', 'Children\'s Art Workshop', 'Storytelling Session',
      'Junior Robotics Camp', 'Family Fun Day', 'Kids Cooking Class',
      'Children\'s Theater', 'Puppet Show for Kids', 'Magic Show for Children',
      'Kids Dance Workshop', 'Children\'s Music Class', 'Art & Craft Session',
      'Kids Photography Workshop', 'Junior Entrepreneur Program', 'Children\'s Book Reading',
      'Kids Yoga Session', 'Children\'s Sports Day', 'Junior Chess Tournament',
      'Kids Coding Workshop', 'Children\'s Science Experiment', 'Nature Walk for Kids',
      'Kids Gardening Workshop', 'Children\'s Cooking Competition', 'Junior Fashion Show',
      'Kids Talent Show', 'Children\'s Quiz Competition', 'Junior Debate Competition',
      'Kids Art Competition', 'Children\'s Photography Contest', 'Junior Innovation Fair',
      'Kids Environmental Workshop', 'Children\'s Safety Training', 'Junior First Aid Training',
      'Kids Language Learning', 'Children\'s Cultural Program', 'Junior Leadership Camp',
      'Kids Adventure Camp', 'Children\'s Summer Camp', 'Junior Winter Camp',
      'Kids Swimming Training', 'Children\'s Martial Arts', 'Junior Fitness Program'
    ],
    networking: [
      'Entrepreneurs Meetup', 'Professional Networking Night', 'Industry Connect Event',
      'Mentorship Program Launch', 'Business Leaders Forum', 'Startup Networking',
      'Women in Business Meetup', 'Young Professionals Network', 'Industry Mixer',
      'Business Breakfast Meeting', 'After Work Networking', 'Coffee Chat Meetup',
      'Lunch & Learn Session', 'Speed Networking Event', 'Business Card Exchange',
      'Professional Development Meetup', 'Career Networking Event', 'Industry Roundtable',
      'Business Partnership Forum', 'Investor Meetup', 'Freelancer Networking',
      'Remote Work Meetup', 'Digital Nomad Gathering', 'Coworking Space Event',
      'Business Mastermind Group', 'Accountability Partners Meetup', 'Success Stories Sharing',
      'Business Growth Meetup', 'Sales Networking Event', 'Marketing Professionals Meetup',
      'Tech Professionals Network', 'Healthcare Professionals Meetup', 'Finance Industry Network',
      'Legal Professionals Gathering', 'Real Estate Network', 'Education Professionals Meetup',
      'Creative Professionals Network', 'Consultants Meetup', 'International Business Network',
      'Cross-Industry Networking', 'Alumni Network Event', 'Professional Association Meetup'
    ]
  };

  const cities = [
    'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 
    'Pune', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Lucknow',
    'Kochi', 'Goa', 'Chandigarh', 'Indore', 'Bhopal',
    'Noida', 'Gurgaon', 'Faridabad', 'Nashik', 'Surat',
    'Vadodara', 'Rajkot', 'Coimbatore', 'Madurai', 'Trichy',
    'Mysore', 'Mangalore', 'Hubli', 'Belgaum', 'Vijayawada',
    'Visakhapatnam', 'Guntur', 'Tirupati', 'Warangal', 'Karimnagar',
    'Bhubaneswar', 'Cuttack', 'Rourkela', 'Patna', 'Gaya',
    'Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro', 'Deoghar'
  ];

  const venues = [
    'Convention Center', 'Hotel Grand Ballroom', 'Tech Park Auditorium', 'Cultural Center',
    'Exhibition Hall', 'Conference Center', 'Community Hall', 'Art Gallery',
    'Outdoor Amphitheater', 'Rooftop Venue', 'Coworking Space', 'University Campus',
    'Business Center', 'Resort Conference Hall', 'Stadium', 'Mall Event Space',
    'Luxury Hotel', 'Heritage Palace', 'Modern Auditorium', 'Innovation Hub',
    'Startup Incubator', 'Corporate Office', 'Event Lounge', 'Banquet Hall',
    'Open Air Theater', 'Multiplex Cinema', 'Sports Complex', 'Recreation Center'
  ];

  let eventId = 3;
  
  Object.entries(eventTemplates).forEach(([category, titles]) => {
    titles.forEach((title, index) => {
      const city = cities[Math.floor(Math.random() * cities.length)];
      const venue = venues[Math.floor(Math.random() * venues.length)];
      const isPaid = Math.random() > 0.25;
      const capacity = Math.floor(Math.random() * 3000) + 100;
      const booked = Math.floor(Math.random() * capacity * 0.9);
      const price = isPaid ? Math.floor(Math.random() * 8000) + 300 : 0;
      const likes = Math.floor(Math.random() * 2000) + 50;
      const views = Math.floor(Math.random() * 50000) + 1000;
      
      additionalEvents.push({
        id: eventId.toString(),
        title,
        description: `Join us for an exceptional ${category.slice(0, -1)} event that brings together industry leaders, experts, and enthusiasts. This premium event features world-class speakers, networking opportunities, hands-on workshops, and cutting-edge insights that will transform your perspective and accelerate your growth.`,
        category: category as any,
        images: [CATEGORIES.find(c => c.id === category)?.background || ''],
        host: {
          id: `host${eventId}`,
          name: `${title.split(' ')[0]} ${Math.random() > 0.5 ? 'Events' : 'Organizers'}`,
          avatar: `https://images.pexels.com/photos/${220453 + (eventId % 200)}/pexels-photo-${220453 + (eventId % 200)}.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1`,
          verified: Math.random() > 0.4
        },
        datetime: {
          start: new Date(Date.now() + Math.random() * 120 * 24 * 60 * 60 * 1000).toISOString(),
          end: new Date(Date.now() + Math.random() * 120 * 24 * 60 * 60 * 1000 + (Math.random() * 12 + 2) * 60 * 60 * 1000).toISOString()
        },
        location: {
          venue: `${venue} ${city}`,
          address: `${Math.floor(Math.random() * 999) + 1} ${['MG Road', 'Brigade Road', 'Commercial Street', 'Residency Road', 'Cunningham Road'][Math.floor(Math.random() * 5)]}`,
          city,
          coordinates: [77.5946 + (Math.random() - 0.5) * 15, 12.9716 + (Math.random() - 0.5) * 15] as [number, number]
        },
        pricing: {
          type: isPaid ? 'paid' as const : 'free' as const,
          amount: price,
          currency: 'INR'
        },
        capacity,
        booked,
        tags: [category, 'premium', 'networking', city.toLowerCase(), 'professional'],
        status: 'upcoming' as const,
        likes,
        isLiked: Math.random() > 0.7,
        featured: Math.random() > 0.85,
        analytics: {
          views,
          bookings: booked,
          revenue: booked * price,
          checkIns: 0
        },
        createdAt: new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString()
      });
      eventId++;
    });
  });

  return additionalEvents;
};

export const ALL_EVENTS = [...SAMPLE_EVENTS, ...generateMoreEvents()];

export const SAMPLE_COMMUNITIES = [
  {
    id: '1',
    name: 'Mumbai Tech Community',
    description: 'Largest tech community in Mumbai for developers, designers, and entrepreneurs. Join 5000+ members for exclusive events, workshops, and networking opportunities!',
    avatar: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    coverImage: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&dpr=1',
    category: 'Technology',
    location: 'Mumbai, Maharashtra',
    memberCount: 5847,
    members: ['1', '2', '3'],
    admins: ['1'],
    events: ['1', '2'],
    isPrivate: false,
    verified: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Bangalore Startup Hub',
    description: 'Connect with entrepreneurs and startup enthusiasts in Bangalore. Network, learn, and grow together with India\'s most vibrant startup community.',
    avatar: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    coverImage: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&dpr=1',
    category: 'Business',
    location: 'Bangalore, Karnataka',
    memberCount: 4156,
    members: ['1', '2'],
    admins: ['2'],
    events: ['3', '6'],
    isPrivate: false,
    verified: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    name: 'Delhi Creative Circle',
    description: 'A vibrant community of artists, designers, and creative professionals in Delhi NCR. Showcase your work, collaborate on projects, and get inspired.',
    avatar: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    coverImage: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&dpr=1',
    category: 'Arts & Culture',
    location: 'Delhi, India',
    memberCount: 2834,
    members: ['1', '3'],
    admins: ['3'],
    events: ['4'],
    isPrivate: false,
    verified: false,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
];

export const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://api.ourhour.com' 
  : 'http://localhost:3001/api';

export const ROUTES = {
  HOME: '/',
  EVENTS: '/events',
  EVENT_DETAIL: '/events/:id',
  SEARCH: '/search',
  COMMUNITIES: '/communities',
  COMMUNITY_DETAIL: '/communities/:id',
  DASHBOARD: '/dashboard',
  HOST_DASHBOARD: '/host',
  ADMIN_DASHBOARD: '/admin',
  PROFILE: '/profile',
  LOGIN: '/login',
  REGISTER: '/register',
  CREATE_EVENT: '/create-event',
  MY_EVENTS: '/my-events',
  MY_BOOKINGS: '/my-bookings'
} as const;

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'ourhour_auth_token',
  USER_DATA: 'ourhour_user_data',
  THEME: 'ourhour_theme'
} as const;

export const ANIMATION_DURATION = {
  FAST: 0.2,
  NORMAL: 0.3,
  SLOW: 0.5
} as const;

export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536
} as const;

export const CITIES = [
  'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad',
  'Pune', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Lucknow',
  'Kochi', 'Goa', 'Chandigarh', 'Indore', 'Bhopal',
  'Noida', 'Gurgaon', 'Faridabad', 'Nashik', 'Surat',
  'Vadodara', 'Rajkot', 'Coimbatore', 'Madurai', 'Trichy'
];

export const SORT_OPTIONS = [
  { value: 'relevance', label: 'Most Relevant' },
  { value: 'date', label: 'Date' },
  { value: 'price', label: 'Price' },
  { value: 'popularity', label: 'Popularity' }
];