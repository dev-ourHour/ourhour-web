import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  CalendarIcon,
  UserGroupIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  EyeIcon,
  CurrencyRupeeIcon,
  ShieldCheckIcon,
  BellIcon,
  Cog6ToothIcon,
  DocumentTextIcon,
  UserIcon,
  BuildingOfficeIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';
import ParallaxBackground from '../components/UI/ParallaxBackground';
import { ALL_EVENTS } from '../utils/constants';
import { Event } from '../types';
import { formatPrice, formatDate } from '../utils/helpers';

interface PendingEvent {
  id: string;
  event: Event;
  submittedBy: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    verified: boolean;
  };
  submittedAt: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  reviewNotes?: string;
}

interface SystemAlert {
  id: string;
  type: 'warning' | 'error' | 'info';
  message: string;
  timestamp: string;
  resolved: boolean;
}

const AdminDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [pendingEvents, setPendingEvents] = useState<PendingEvent[]>([]);
  const [systemAlerts, setSystemAlerts] = useState<SystemAlert[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'approvals' | 'users' | 'system'>('overview');
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalUsers: 0,
    totalRevenue: 0,
    pendingApprovals: 0,
    activeHosts: 0,
    totalCommunities: 0,
    monthlyGrowth: 0,
    conversionRate: 0,
    systemHealth: 99.9,
    dailyActiveUsers: 0
  });

  useEffect(() => {
    // Mock pending events for approval
    const mockPendingEvents: PendingEvent[] = [
      {
        id: '1',
        event: ALL_EVENTS[0],
        submittedBy: {
          id: 'host1',
          name: 'TechCorp India',
          email: 'events@techcorp.in',
          avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
          verified: true
        },
        submittedAt: '2024-01-22T10:30:00Z',
        category: 'conferences',
        priority: 'high'
      },
      {
        id: '2',
        event: ALL_EVENTS[1],
        submittedBy: {
          id: 'host2',
          name: 'Marketing Gurus',
          email: 'hello@marketinggurus.com',
          avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
          verified: true
        },
        submittedAt: '2024-01-21T14:15:00Z',
        category: 'workshops',
        priority: 'medium'
      },
      {
        id: '3',
        event: ALL_EVENTS[2],
        submittedBy: {
          id: 'host3',
          name: 'Creative Studios',
          email: 'info@creativestudios.in',
          verified: false
        },
        submittedAt: '2024-01-20T09:45:00Z',
        category: 'exhibitions',
        priority: 'low'
      },
      {
        id: '4',
        event: ALL_EVENTS[3],
        submittedBy: {
          id: 'host4',
          name: 'Innovation Hub',
          email: 'team@innovationhub.co',
          verified: true
        },
        submittedAt: '2024-01-23T16:20:00Z',
        category: 'networking',
        priority: 'high'
      }
    ];

    const mockSystemAlerts: SystemAlert[] = [
      {
        id: '1',
        type: 'warning',
        message: 'High server load detected - 85% CPU usage',
        timestamp: '2024-01-23T14:30:00Z',
        resolved: false
      },
      {
        id: '2',
        type: 'info',
        message: 'Scheduled maintenance completed successfully',
        timestamp: '2024-01-23T02:00:00Z',
        resolved: true
      },
      {
        id: '3',
        type: 'error',
        message: 'Payment gateway timeout - 3 failed transactions',
        timestamp: '2024-01-22T18:45:00Z',
        resolved: true
      }
    ];

    setPendingEvents(mockPendingEvents);
    setSystemAlerts(mockSystemAlerts);

    // Calculate comprehensive admin stats
    setStats({
      totalEvents: ALL_EVENTS.length,
      totalUsers: 52340,
      totalRevenue: 15600000,
      pendingApprovals: mockPendingEvents.length,
      activeHosts: 1247,
      totalCommunities: 486,
      monthlyGrowth: 18.5,
      conversionRate: 12.3,
      systemHealth: 99.9,
      dailyActiveUsers: 8420
    });
  }, []);

  const handleApproveEvent = (eventId: string, notes?: string) => {
    setPendingEvents(prev => prev.filter(event => event.id !== eventId));
    // In real app, make API call to approve event
    console.log(`Approved event ${eventId}`, notes);
  };

  const handleRejectEvent = (eventId: string, notes: string) => {
    setPendingEvents(prev => prev.map(event => 
      event.id === eventId 
        ? { ...event, reviewNotes: notes }
        : event
    ));
    // In real app, make API call to reject event
    console.log(`Rejected event ${eventId}`, notes);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-400/20 border-red-400/30';
      case 'medium': return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30';
      case 'low': return 'text-green-400 bg-green-400/20 border-green-400/30';
      default: return 'text-gray-400 bg-gray-400/20 border-gray-400/30';
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'error': return 'text-red-400 bg-red-400/20 border-red-400/30';
      case 'warning': return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30';
      case 'info': return 'text-blue-400 bg-blue-400/20 border-blue-400/30';
      default: return 'text-gray-400 bg-gray-400/20 border-gray-400/30';
    }
  };

  const recentActivity = [
    { type: 'approval', message: 'Approved "Tech Innovation Summit 2024"', time: '2 hours ago', user: 'Admin' },
    { type: 'user', message: 'New host registration: Creative Studios', time: '4 hours ago', user: 'System' },
    { type: 'report', message: 'Generated monthly revenue report', time: '1 day ago', user: 'Admin' },
    { type: 'community', message: 'New community created: "AI Enthusiasts"', time: '2 days ago', user: 'System' },
    { type: 'security', message: 'Security scan completed - No threats detected', time: '3 days ago', user: 'System' }
  ];

  const platformMetrics = [
    { label: 'Event Approval Rate', value: '94.2%', trend: '+2.1%' },
    { label: 'User Satisfaction', value: '4.8/5', trend: '+0.2' },
    { label: 'Platform Uptime', value: '99.9%', trend: '0.0%' },
    { label: 'Response Time', value: '1.2s', trend: '-0.3s' }
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
                Admin Dashboard 🛡️
              </h1>
              <p className="text-xl text-gray-400">
                Platform management and system oversight
              </p>
            </div>
            <div className="mt-6 lg:mt-0 flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary flex items-center space-x-2"
              >
                <BellIcon className="h-5 w-5" />
                <span>Alerts</span>
                {systemAlerts.filter(alert => !alert.resolved).length > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
                    {systemAlerts.filter(alert => !alert.resolved).length}
                  </span>
                )}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary flex items-center space-x-2"
              >
                <Cog6ToothIcon className="h-5 w-5" />
                <span>Settings</span>
              </motion.button>
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
          <TabButton tab="approvals" label="Approvals" icon={ExclamationTriangleIcon} />
          <TabButton tab="users" label="Users" icon={UserGroupIcon} />
          <TabButton tab="system" label="System" icon={ShieldCheckIcon} />
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
                <div className="text-xs text-gray-400">Events</div>
              </div>
              <div className="glass-card p-4 text-center">
                <UserGroupIcon className="h-6 w-6 text-green-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-white">{(stats.totalUsers / 1000).toFixed(1)}K</div>
                <div className="text-xs text-gray-400">Users</div>
              </div>
              <div className="glass-card p-4 text-center">
                <CurrencyRupeeIcon className="h-6 w-6 text-accent-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-white">₹{(stats.totalRevenue / 10000000).toFixed(1)}Cr</div>
                <div className="text-xs text-gray-400">Revenue</div>
              </div>
              <div className="glass-card p-4 text-center">
                <ClockIcon className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-white">{stats.pendingApprovals}</div>
                <div className="text-xs text-gray-400">Pending</div>
              </div>
              <div className="glass-card p-4 text-center">
                <ShieldCheckIcon className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-white">{stats.activeHosts}</div>
                <div className="text-xs text-gray-400">Hosts</div>
              </div>
              <div className="glass-card p-4 text-center">
                <BuildingOfficeIcon className="h-6 w-6 text-purple-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-white">{stats.totalCommunities}</div>
                <div className="text-xs text-gray-400">Communities</div>
              </div>
              <div className="glass-card p-4 text-center">
                <ChartBarIcon className="h-6 w-6 text-emerald-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-white">{stats.monthlyGrowth}%</div>
                <div className="text-xs text-gray-400">Growth</div>
              </div>
              <div className="glass-card p-4 text-center">
                <EyeIcon className="h-6 w-6 text-cyan-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-white">{(stats.dailyActiveUsers / 1000).toFixed(1)}K</div>
                <div className="text-xs text-gray-400">Daily Active</div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Platform Metrics */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="glass-card p-6 rounded-xl"
                >
                  <h3 className="text-xl font-bold text-white mb-6">Platform Metrics</h3>
                  <div className="grid grid-cols-2 gap-6">
                    {platformMetrics.map((metric, index) => (
                      <div key={index} className="text-center">
                        <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                        <div className="text-sm text-gray-400 mb-2">{metric.label}</div>
                        <div className={`text-xs font-medium ${
                          metric.trend.startsWith('+') ? 'text-green-400' : 
                          metric.trend.startsWith('-') && metric.label !== 'Response Time' ? 'text-red-400' : 
                          'text-green-400'
                        }`}>
                          {metric.trend}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Recent Activity */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="glass-card p-6 rounded-xl"
                >
                  <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary-400 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <p className="text-sm text-white">{activity.message}</p>
                          <div className="flex items-center space-x-2 text-xs text-gray-400 mt-1">
                            <span>{activity.time}</span>
                            <span>•</span>
                            <span>by {activity.user}</span>
                          </div>
                        </div>
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
                    <button 
                      onClick={() => setActiveTab('approvals')}
                      className="w-full btn-primary text-left flex items-center space-x-3"
                    >
                      <ExclamationTriangleIcon className="h-5 w-5" />
                      <span>Review Pending ({stats.pendingApprovals})</span>
                    </button>
                    <button className="w-full btn-secondary text-left flex items-center space-x-3">
                      <ChartBarIcon className="h-5 w-5" />
                      <span>Analytics Report</span>
                    </button>
                    <button 
                      onClick={() => setActiveTab('users')}
                      className="w-full btn-secondary text-left flex items-center space-x-3"
                    >
                      <UserGroupIcon className="h-5 w-5" />
                      <span>User Management</span>
                    </button>
                    <button 
                      onClick={() => setActiveTab('system')}
                      className="w-full btn-secondary text-left flex items-center space-x-3"
                    >
                      <ShieldCheckIcon className="h-5 w-5" />
                      <span>System Status</span>
                    </button>
                  </div>
                </motion.div>

                {/* System Alerts */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="glass-card p-6 rounded-xl"
                >
                  <h3 className="text-xl font-bold text-white mb-6">System Alerts</h3>
                  <div className="space-y-3">
                    {systemAlerts.slice(0, 3).map((alert) => (
                      <div key={alert.id} className={`p-3 rounded-lg border ${getAlertColor(alert.type)}`}>
                        <div className="flex items-start justify-between">
                          <p className="text-sm">{alert.message}</p>
                          {!alert.resolved && (
                            <div className="w-2 h-2 bg-current rounded-full ml-2 mt-1"></div>
                          )}
                        </div>
                        <p className="text-xs opacity-70 mt-1">
                          {formatDate(alert.timestamp, 'MMM dd, h:mm a')}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* System Health */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="glass-card p-6 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20"
                >
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                    <CheckCircleIcon className="h-5 w-5 text-green-400" />
                    <span>System Health</span>
                  </h3>
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-green-400">{stats.systemHealth}%</div>
                    <div className="text-sm text-gray-300">Uptime</div>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">API Status</span>
                      <span className="text-green-400">Operational</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Database</span>
                      <span className="text-green-400">Healthy</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Payment Gateway</span>
                      <span className="text-green-400">Active</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">CDN</span>
                      <span className="text-green-400">Optimized</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        )}

        {/* Approvals Tab */}
        {activeTab === 'approvals' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-white flex items-center space-x-2">
                <ExclamationTriangleIcon className="h-8 w-8 text-yellow-400" />
                <span>Pending Approvals</span>
                {pendingEvents.length > 0 && (
                  <span className="bg-yellow-400/20 text-yellow-400 text-lg px-3 py-1 rounded-full">
                    {pendingEvents.length}
                  </span>
                )}
              </h2>
              <div className="flex space-x-2">
                <button className="btn-secondary text-sm px-4 py-2">Bulk Actions</button>
                <button className="btn-primary text-sm px-4 py-2">Approval Settings</button>
              </div>
            </div>
            
            {pendingEvents.length > 0 ? (
              <div className="space-y-6">
                {pendingEvents.map((pending) => (
                  <motion.div
                    key={pending.id}
                    whileHover={{ scale: 1.01 }}
                    className="glass-card p-6 rounded-xl border-l-4 border-yellow-400"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <img
                          src={pending.event.images[0]}
                          alt={pending.event.title}
                          className="w-24 h-24 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <h3 className="text-xl font-semibold text-white">
                              {pending.event.title}
                            </h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(pending.priority)}`}>
                              {pending.priority} priority
                            </span>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-400 mb-4">
                            <div>
                              <span className="block text-white font-medium">Category</span>
                              <span className="capitalize">{pending.category}</span>
                            </div>
                            <div>
                              <span className="block text-white font-medium">Submitted</span>
                              <span>{formatDate(pending.submittedAt, 'MMM dd, yyyy')}</span>
                            </div>
                            <div>
                              <span className="block text-white font-medium">Price</span>
                              <span>{formatPrice(pending.event.pricing.amount)}</span>
                            </div>
                            <div>
                              <span className="block text-white font-medium">Capacity</span>
                              <span>{pending.event.capacity} people</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4 mb-4">
                            <div className="flex items-center space-x-2">
                              {pending.submittedBy.avatar ? (
                                <img
                                  src={pending.submittedBy.avatar}
                                  alt={pending.submittedBy.name}
                                  className="w-8 h-8 rounded-full"
                                />
                              ) : (
                                <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                                  <span className="text-xs text-white">
                                    {pending.submittedBy.name.charAt(0)}
                                  </span>
                                </div>
                              )}
                              <div>
                                <span className="text-sm text-white font-medium">{pending.submittedBy.name}</span>
                                {pending.submittedBy.verified && (
                                  <CheckCircleIcon className="inline h-4 w-4 text-green-400 ml-1" />
                                )}
                              </div>
                            </div>
                            <span className="text-sm text-gray-400">{pending.submittedBy.email}</span>
                          </div>
                          <p className="text-sm text-gray-300 line-clamp-2">
                            {pending.event.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-3 ml-6">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleApproveEvent(pending.id)}
                          className="px-6 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors flex items-center space-x-2"
                        >
                          <CheckCircleIcon className="h-4 w-4" />
                          <span>Approve</span>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleRejectEvent(pending.id, 'Needs more information')}
                          className="px-6 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors flex items-center space-x-2"
                        >
                          <XCircleIcon className="h-4 w-4" />
                          <span>Reject</span>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-6 py-2 glass-card text-gray-300 rounded-lg hover:bg-white/10 transition-colors flex items-center space-x-2"
                        >
                          <EyeIcon className="h-4 w-4" />
                          <span>Review</span>
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="glass-card p-12 text-center">
                <CheckCircleIcon className="h-16 w-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  All caught up!
                </h3>
                <p className="text-gray-400">
                  No pending event approvals at the moment
                </p>
              </div>
            )}
          </motion.div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-white">User Management</h2>
              <div className="flex space-x-2">
                <button className="btn-secondary text-sm px-4 py-2">Export Users</button>
                <button className="btn-primary text-sm px-4 py-2">Add User</button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-card p-6 text-center">
                <UserIcon className="h-8 w-8 text-blue-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">45,230</div>
                <div className="text-sm text-gray-400">Regular Users</div>
                <div className="text-xs text-green-400 mt-1">+12% this month</div>
              </div>
              <div className="glass-card p-6 text-center">
                <BuildingOfficeIcon className="h-8 w-8 text-purple-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">1,247</div>
                <div className="text-sm text-gray-400">Event Hosts</div>
                <div className="text-xs text-green-400 mt-1">+8% this month</div>
              </div>
              <div className="glass-card p-6 text-center">
                <ShieldCheckIcon className="h-8 w-8 text-green-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">5,863</div>
                <div className="text-sm text-gray-400">Verified Users</div>
                <div className="text-xs text-green-400 mt-1">+15% this month</div>
              </div>
            </div>

            <div className="glass-card p-6 rounded-xl">
              <h3 className="text-xl font-bold text-white mb-6">User Activity Overview</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Daily Active Users</span>
                  <span className="text-white font-semibold">8,420</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">New Registrations (Today)</span>
                  <span className="text-green-400 font-semibold">+127</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">User Retention Rate</span>
                  <span className="text-blue-400 font-semibold">78.5%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Average Session Duration</span>
                  <span className="text-white font-semibold">12m 34s</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* System Tab */}
        {activeTab === 'system' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-white">System Status</h2>
              <div className="flex space-x-2">
                <button className="btn-secondary text-sm px-4 py-2">System Logs</button>
                <button className="btn-primary text-sm px-4 py-2">Run Diagnostics</button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="glass-card p-6 text-center">
                <GlobeAltIcon className="h-8 w-8 text-green-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">99.9%</div>
                <div className="text-sm text-gray-400">Uptime</div>
                <div className="text-xs text-green-400 mt-1">Excellent</div>
              </div>
              <div className="glass-card p-6 text-center">
                <ChartBarIcon className="h-8 w-8 text-blue-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">1.2s</div>
                <div className="text-sm text-gray-400">Response Time</div>
                <div className="text-xs text-green-400 mt-1">Optimal</div>
              </div>
              <div className="glass-card p-6 text-center">
                <EyeIcon className="h-8 w-8 text-purple-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">45%</div>
                <div className="text-sm text-gray-400">CPU Usage</div>
                <div className="text-xs text-green-400 mt-1">Normal</div>
              </div>
              <div className="glass-card p-6 text-center">
                <DocumentTextIcon className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">2.1GB</div>
                <div className="text-sm text-gray-400">Memory Usage</div>
                <div className="text-xs text-green-400 mt-1">Good</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-xl font-bold text-white mb-6">System Services</h3>
                <div className="space-y-4">
                  {[
                    { name: 'API Gateway', status: 'operational', uptime: '99.9%' },
                    { name: 'Database Cluster', status: 'operational', uptime: '99.8%' },
                    { name: 'Payment Service', status: 'operational', uptime: '99.7%' },
                    { name: 'Email Service', status: 'operational', uptime: '99.9%' },
                    { name: 'File Storage', status: 'operational', uptime: '99.6%' },
                    { name: 'Search Engine', status: 'operational', uptime: '99.8%' }
                  ].map((service, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                        <span className="text-white">{service.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-green-400 capitalize">{service.status}</div>
                        <div className="text-xs text-gray-400">{service.uptime}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-xl font-bold text-white mb-6">Recent System Events</h3>
                <div className="space-y-4">
                  {[
                    { event: 'Database backup completed', time: '2 hours ago', type: 'success' },
                    { event: 'Security scan completed', time: '6 hours ago', type: 'success' },
                    { event: 'Server restart scheduled', time: '1 day ago', type: 'info' },
                    { event: 'SSL certificate renewed', time: '2 days ago', type: 'success' },
                    { event: 'Performance optimization applied', time: '3 days ago', type: 'success' }
                  ].map((event, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        event.type === 'success' ? 'bg-green-400' :
                        event.type === 'warning' ? 'bg-yellow-400' :
                        'bg-blue-400'
                      }`}></div>
                      <div className="flex-1">
                        <p className="text-sm text-white">{event.event}</p>
                        <p className="text-xs text-gray-400 mt-1">{event.time}</p>
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

export default AdminDashboardPage;