import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { motion } from 'framer-motion';
import FloatingElements from '../UI/FloatingElements';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark-950 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800 -z-20" />
      <FloatingElements count={12} className="-z-10" />
      
      <Header />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="pt-16 relative z-10"
      >
        <Outlet />
      </motion.main>
      <Footer />
    </div>
  );
};

export default Layout;