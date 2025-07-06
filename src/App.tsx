import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout/Layout';
import ScrollToTop from './components/UI/ScrollToTop';
import HomePage from './pages/HomePage';
import EventsPage from './pages/EventsPage';
import EventDetailPage from './pages/EventDetailPage';
import SearchPage from './pages/SearchPage';
import CommunitiesPage from './pages/CommunitiesPage';
import DashboardPage from './pages/DashboardPage';
import HostDashboardPage from './pages/HostDashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import CreateEventPage from './pages/CreateEventPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { ROUTES } from './utils/constants';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'rgba(15, 23, 42, 0.9)',
                color: '#fff',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#10B981',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 5000,
                iconTheme: {
                  primary: '#EF4444',
                  secondary: '#fff',
                },
              },
            }}
          />
          <Routes>
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path={ROUTES.EVENTS} element={<EventsPage />} />
              <Route path="/events/:id" element={<EventDetailPage />} />
              <Route path={ROUTES.SEARCH} element={<SearchPage />} />
              <Route path={ROUTES.COMMUNITIES} element={<CommunitiesPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/host" element={<HostDashboardPage />} />
              <Route path="/admin" element={<AdminDashboardPage />} />
              <Route path="/create-event" element={<CreateEventPage />} />
              <Route path="/profile" element={<div className="min-h-screen flex items-center justify-center"><div className="text-white text-2xl">Profile Page - Coming Soon</div></div>} />
            </Route>
          </Routes>
          <ScrollToTop />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;