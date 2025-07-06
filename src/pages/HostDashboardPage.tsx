import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  CalendarIcon,
  PlusIcon,
  ChartBarIcon,
  UserGroupIcon,
  CurrencyRupeeIcon,
  EyeIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  PencilIcon,
  TrashIcon,
  DocumentTextIcon,
  ShareIcon,
  BellIcon,
  CogIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';
import ParallaxBackground from '../components/UI/ParallaxBackground';
import PremiumEventCard from '../components/UI/PremiumEventCard';
import { ALL_EVENTS } from '../utils/constants';
import { Event } from '../types';
import { formatPrice, formatDate } from '../utils/helpers';

interface EventSubmission {
  id: string;
  event: Event;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  reviewedAt?: string;
  reviewNotes?: string;
  priority: 'low' | 'medium' | 'high';
}

const HostDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [hostEvents, setHostEvents] = useState<Event[]>([]);
  const [eventSubmissions, setEventSubmissions] = useState<EventSubmission[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'events' | 'submissions' | 'analytics'>('overview');
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalBookings: 0,
    totalRevenue: 0,
    averageRating: 0,
    pendingApprovals: 0,
    activeEvents: 0,
    monthlyRevenue: 0,
    conversionRate: 0
  });

  useEffect(() => {
    // Mock host events and submissions
    const mockHostEvents = ALL_EVENTS.filter(event => 
      event.host.id === user?.id || Math.random() > 0.6
    ).slice(0, 8);

    const mockSubmissions: EventSubmission[] = [
      {
        id: '1',
        event: mockHostEvents[0],
        status: 'pending',
        submittedAt: '2024-01-20T10:00:00Z',
        priority: 'high'
      },
      {
        id: '2',
        event: mockHostEvents[1],
        status: 'approved',
        submittedAt: '2024-01-18T14:30:00Z',
        reviewedAt: '2024-01-19T09:15:00Z',
        priority: 'medium'
      },
      {
        id: '3',
        event: mockHostEvents[2],
        status: 'rejected',
        submittedAt: '2024-01-15T16:45:00Z',
        reviewedAt: '2024-01-16T11:20:00Z',
        reviewNotes: 'Event description needs more details about the agenda and speakers. Please provide a comprehensive schedule and speaker bios.',
        priority: 'low'
      },
      {
        id: '4',
        event: mockHostEvents[3],
        status: 'pending',
        submittedAt: '2024-01-22T08:30:00Z',
        priority: 'medium'
      }
    ];

    setHostEvents(mockHostEvents);
    setEventSubmissions(mockSubmissions);

    // Calculate comprehensive stats
    const totalBookings = mockHostEvents.reduce((sum, event) => sum + event.booked, 0);
    const totalRevenue = mockHostEvents.reduce((sum, event) => sum + event.analytics.revenue, 0);
    
    setStats({
      totalEvents: mockHostEvents.length,
      totalBookings,
      totalRevenue,
      averageRating: 4.7,
      pendingApprovals: mockSubmissions.filter(s => s.status === 'pending').length,
      activeEvents: mockHostEvents.filter(e => e.status === 'upcoming').length,
      monthlyRevenue: totalRevenue * 0.3,
      conversionRate: 8.5
    });
  }, [user]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-400 bg-yellow-400/20';
      case 'approved': return 'text-green-400 bg-green-400/20';
      case 'rejected': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-400/20';
      case 'medium': return 'text-yellow-400 bg-yellow-400/20';
      case 'low': return 'text-green-400 bg-green-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <ClockIcon className="h-4 w-4" />;
      case 'approved': return <CheckCircleIcon className="h-4 w-4" />;
      case 'rejected': return <XCircleIcon className="h-4 w-4" />;
      default: return <ExclamationTriangleIcon className="h-4 w-4" />;
    }
  };

  const recentActivity = [
    { type: 'submission', message: 'New event "AI Workshop 2024" submitted for review', time: '2 hours ago' },
    { type: 'approval', message: 'Event "Digital Marketing Summit" was approved', time: '1 day ago' },
    { type: 'booking', message: '15 new bookings for "Tech Conference"', time: '2 days ago' },
    { type: 'review', message: 'Received 5-star review for "Startup Meetup"', time: '3 days ago' }
  ];

  const monthlyData = [
    { month: 'Jan', revenue: 45000, bookings: 120 },
    { month: 'Feb', revenue: 52000, bookings: 145 },
    { month: 'Mar', revenue: 48000, bookings: 135 },
    { month: 'Apr', revenue: 61000, bookings: 168 },
    { month: 'May', revenue: 58000, bookings: 152 },
    { month: 'Jun', revenue: 67000, bookings: 189 }
  ];

  const TabButton = ({ tab, label, icon: Icon }: { tab: string, label: string, icon: any }) => (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => setActiveTab(tab as any)}
      className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
        activeTab === tab
          ? 'bg-primary-500 text-white shadow-lg'
          : 'glass-card text-gray-300 hover:text-white hover:bg-white/10'
      }`}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </motion.button>
  );

  return (
    <ParallaxBackground className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Host Dashboard 🎯
              </h1>
              <p className="text-xl text-gray-400">
                Manage your events and grow your audience
              </p>
            </div>
            <div className="mt-6 lg:mt-0 flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary flex items-center space-x-2"
              >
                <BellIcon className="h-5 w-5" />
                <span>Notifications</span>
                {stats.pendingApprovals > 0 && (
                  <span className="bg-yellow-500 text-white text-xs rounded-full px-2 py-1">
                    {stats.pendingApprovals}
                  </span>
                )}
              </motion.button>
              <Link to="/create-event" className="btn-primary flex items-center space-x-2">
                <PlusIcon className="h-5 w-5" />
                <span>Create Event</span>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-4 mb-8"
        >
          <TabButton tab="overview" label="Overview" icon={ChartBarIcon} />
          <TabButton tab="events" label="My Events" icon={CalendarIcon} />
          <TabButton tab="submissions" label="Submissions" icon={DocumentTextIcon} />
          <TabButton tab="analytics" label="Analytics" icon={EyeIcon} />
        </motion.div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4"
            >
              <div className="glass-card p-4 text-center">
                <CalendarIcon className="h-6 w-6 text-primary-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-white">{stats.totalEvents}</div>
                <div className="text-xs text-gray-400">Total Events</div>
              </div>
              <div className="glass-card p-4 text-center">
                <UserGroupIcon className="h-6 w-6 text-green-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-white">{stats.totalBookings}</div>
                <div className="text-xs text-gray-400">Bookings</div>
              </div>
              <div className="glass-card p-4 text-center">
                <CurrencyRupeeIcon className="h-6 w-6 text-accent-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-white">₹{(stats.totalRevenue / 100000).toFixed(1)}L</div>
                <div className="text-xs text-gray-400">Revenue</div>
              </div>
              <div className="glass-card p-4 text-center">
                <ChartBarIcon className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-white">{stats.averageRating}</div>
                <div className="text-xs text-gray-400">Avg Rating</div>
              </div>
              <div className="glass-card p-4 text-center">
                <ClockIcon className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-white">{stats.pendingApprovals}</div>
                <div className="text-xs text-gray-400">Pending</div>
              </div>
              <div className="glass-card p-4 text-center">
                <EyeIcon className="h-6 w-6 text-purple-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-white">{stats.activeEvents}</div>
                <div className="text-xs text-gray-400">Active</div>
              </div>
              <div className="glass-card p-4 text-center">
                <CurrencyRupeeIcon className="h-6 w-6 text-emerald-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-white">₹{(stats.monthlyRevenue / 1000).toFixed(0)}K</div>
                <div className="text-xs text-gray-400">This Month</div>
              </div>
              <div className="glass-card p-4 text-center">
                <ChartBarIcon className="h-6 w-6 text-cyan-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-white">{stats.conversionRate}%</div>
                <div className="text-xs text-gray-400">Conversion</div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Recent Events */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white">Recent Events</h2>
                    <button 
                      onClick={() => setActiveTab('events')}
                      className="text-primary-400 hover:text-primary-300 transition-colors"
                    >
                      View All
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {hostEvents.slice(0, 4).map((event, index) => (
                      <div key={event.id} className="relative">
                        <PremiumEventCard
                          event={event}
                          index={index}
                          variant="compact"
                        />
                        <div className="absolute top-4 right-4 flex space-x-2">
                          <button className="p-2 bg-black/60 backdrop-blur-md rounded-full border border-white/20 hover:bg-black/80 transition-colors">
                            <PencilIcon className="h-4 w-4 text-white" />
                          </button>
                          <button className="p-2 bg-black/60 backdrop-blur-md rounded-full border border-white/20 hover:bg-black/80 transition-colors">
                            <ChartBarIcon className="h-4 w-4 text-white" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Performance Chart */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="glass-card p-6 rounded-xl"
                >
                  <h3 className="text-xl font-bold text-white mb-6">Monthly Performance</h3>
                  <div className="grid grid-cols-6 gap-4">
                    {monthlyData.map((data, index) => (
                      <div key={data.month} className="text-center">
                        <div className="mb-2">
                          <div 
                            className="bg-gradient-to-t from-primary-500 to-secondary-500 rounded-t mx-auto"
                            style={{ 
                              height: `${(data.revenue / 70000) * 100}px`,
                              width: '20px'
                            }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-400">{data.month}</div>
                        <div className="text-sm text-white font-medium">₹{(data.revenue / 1000).toFixed(0)}K</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Quick Actions */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="glass-card p-6 rounded-xl"
                >
                  <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>
                  <div className="space-y-3">
                    <Link to="/create-event" className="w-full btn-primary text-left flex items-center space-x-3">
                      <PlusIcon className="h-5 w-5" />
                      <span>Create Event</span>
                    </Link>
                    <button 
                      onClick={() => setActiveTab('analytics')}
                      className="w-full btn-secondary text-left flex items-center space-x-3"
                    >
                      <ChartBarIcon className="h-5 w-5" />
                      <span>View Analytics</span>
                    </button>
                    <button className="w-full btn-secondary text-left flex items-center space-x-3">
                      <UserGroupIcon className="h-5 w-5" />
                      <span>Manage Attendees</span>
                    </button>
                    <button className="w-full btn-secondary text-left flex items-center space-x-3">
                      <CurrencyRupeeIcon className="h-5 w-5" />
                      <span>Revenue Reports</span>
                    </button>
                  </div>
                </motion.div>

                {/* Recent Activity */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="glass-card p-6 rounded-xl"
                >
                  <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary-400 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <p className="text-sm text-white">{activity.message}</p>
                          <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Host Tips */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="glass-card p-6 rounded-xl bg-gradient-to-br from-primary-500/20 to-secondary-500/20"
                >
                  <h3 className="text-lg font-bold text-white mb-4">💡 Host Tips</h3>
                  <div className="space-y-3 text-sm">
                    <p className="text-gray-300">
                      • Add high-quality images to increase bookings by 40%
                    </p>
                    <p className="text-gray-300">
                      • Events with detailed descriptions get 60% more views
                    </p>
                    <p className="text-gray-300">
                      • Respond to attendee questions within 2 hours for better ratings
                    </p>
                    <p className="text-gray-300">
                      • Share your events on social media to reach more people
                    </p>
                  </div>
                  <button className="mt-4 text-primary-400 hover:text-primary-300 transition-colors text-sm font-medium">
                    View Complete Host Guide →
                  </button>
                </motion.div>
              </div>
            </div>
          </div>
        )}

        {/* Events Tab */}
        {activeTab === 'events' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-white">My Events</h2>
              <Link to="/create-event" className="btn-primary flex items-center space-x-2">
                <PlusIcon className="h-5 w-5" />
                <span>Create New Event</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hostEvents.map((event, index) => (
                <div key={event.id} className="relative group">
                  <PremiumEventCard
                    event={event}
                    index={index}
                    variant="default"
                  />
                  <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 bg-black/60 backdrop-blur-md rounded-full border border-white/20 hover:bg-black/80 transition-colors">
                      <PencilIcon className="h-4 w-4 text-white" />
                    </button>
                    <button className="p-2 bg-black/60 backdrop-blur-md rounded-full border border-white/20 hover:bg-black/80 transition-colors">
                      <ChartBarIcon className="h-4 w-4 text-white" />
                    </button>
                    <button className="p-2 bg-black/60 backdrop-blur-md rounded-full border border-white/20 hover:bg-black/80 transition-colors">
                      <ShareIcon className="h-4 w-4 text-white" />
                    </button>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="glass-card p-3 rounded-lg">
                      <div className="grid grid-cols-3 gap-2 text-xs text-center">
                        <div>
                          <div className="text-white font-semibold">{event.analytics.views}</div>
                          <div className="text-gray-400">Views</div>
                        </div>
                        <div>
                          <div className="text-white font-semibold">{event.booked}</div>
                          <div className="text-gray-400">Booked</div>
                        </div>
                        <div>
                          <div className="text-white font-semibold">₹{(event.analytics.revenue / 1000).toFixed(0)}K</div>
                          <div className="text-gray-400">Revenue</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Submissions Tab */}
        {activeTab === 'submissions' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-white">Event Submissions</h2>
              <div className="text-sm text-gray-400">
                {eventSubmissions.filter(s => s.status === 'pending').length} pending review
              </div>
            </div>

            <div className="space-y-4">
              {eventSubmissions.map((submission) => (
                <motion.div
                  key={submission.id}
                  whileHover={{ scale: 1.01 }}
                  className="glass-card p-6 rounded-xl"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <img
                        src={submission.event.images[0]}
                        alt={submission.event.title}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-white">
                            {submission.event.title}
                          </h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(submission.priority)}`}>
                            {submission.priority}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                          <span>Submitted: {formatDate(submission.submittedAt, 'MMM dd, yyyy')}</span>
                          {submission.reviewedAt && (
                            <span>Reviewed: {formatDate(submission.reviewedAt, 'MMM dd, yyyy')}</span>
                          )}
                          <span>Price: {formatPrice(submission.event.pricing.amount)}</span>
                        </div>
                        {submission.reviewNotes && (
                          <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg mb-3">
                            <p className="text-sm text-red-300">
                              <strong>Review Notes:</strong> {submission.reviewNotes}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(submission.status)}`}>
                        {getStatusIcon(submission.status)}
                        <span className="capitalize">{submission.status}</span>
                      </span>
                      <div className="flex space-x-2">
                        <button className="p-2 glass-card rounded-lg hover:bg-white/10 transition-colors">
                          <PencilIcon className="h-4 w-4 text-gray-400" />
                        </button>
                        <button className="p-2 glass-card rounded-lg hover:bg-white/10 transition-colors">
                          <EyeIcon className="h-4 w-4 text-gray-400" />
                        </button>
                        {submission.status === 'rejected' && (
                          <button className="p-2 glass-card rounded-lg hover:bg-white/10 transition-colors">
                            <TrashIcon className="h-4 w-4 text-red-400" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-white">Analytics & Insights</h2>
              <div className="flex space-x-2">
                <button className="btn-secondary text-sm px-4 py-2">Export Data</button>
                <button className="btn-primary text-sm px-4 py-2">Generate Report</button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="glass-card p-6 text-center">
                <EyeIcon className="h-8 w-8 text-blue-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">24.5K</div>
                <div className="text-sm text-gray-400">Total Views</div>
                <div className="text-xs text-green-400 mt-1">+12% this month</div>
              </div>
              <div className="glass-card p-6 text-center">
                <UserGroupIcon className="h-8 w-8 text-green-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">2.1K</div>
                <div className="text-sm text-gray-400">Total Bookings</div>
                <div className="text-xs text-green-400 mt-1">+18% this month</div>
              </div>
              <div className="glass-card p-6 text-center">
                <CurrencyRupeeIcon className="h-8 w-8 text-accent-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">₹3.2L</div>
                <div className="text-sm text-gray-400">Total Revenue</div>
                <div className="text-xs text-green-400 mt-1">+25% this month</div>
              </div>
              <div className="glass-card p-6 text-center">
                <ChartBarIcon className="h-8 w-8 text-purple-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">8.5%</div>
                <div className="text-sm text-gray-400">Conversion Rate</div>
                <div className="text-xs text-green-400 mt-1">+2.1% this month</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-xl font-bold text-white mb-6">Revenue Trends</h3>
                <div className="space-y-4">
                  {monthlyData.map((data, index) => (
                    <div key={data.month} className="flex items-center justify-between">
                      <span className="text-gray-400">{data.month} 2024</span>
                      <div className="flex items-center space-x-4">
                        <div className="w-32 bg-white/10 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full"
                            style={{ width: `${(data.revenue / 70000) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-white font-semibold w-16 text-right">
                          ₹{(data.revenue / 1000).toFixed(0)}K
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-xl font-bold text-white mb-6">Top Performing Events</h3>
                <div className="space-y-4">
                  {hostEvents.slice(0, 5).map((event, index) => (
                    <div key={event.id} className="flex items-center space-x-4">
                      <div className="text-lg font-bold text-primary-400">#{index + 1}</div>
                      <img
                        src={event.images[0]}
                        alt={event.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-white truncate">{event.title}</div>
                        <div className="text-xs text-gray-400">{event.booked} bookings</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-white">
                          ₹{(event.analytics.revenue / 1000).toFixed(0)}K
                        </div>
                        <div className="text-xs text-gray-400">revenue</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </ParallaxBackground>
  );
};

export default HostDashboardPage;