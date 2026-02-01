import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ChefProfile } from './components/ChefProfile';
import { MenuVault } from './components/MenuVault';
import { AdminDashboard } from './components/AdminDashboard';
import { Timeline } from './components/Timeline';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <div className="min-h-screen selection:bg-neonMint selection:text-deepForest">
      <Navbar 
        isDark={isDarkMode} 
        toggleTheme={toggleTheme} 
        onAdminClick={() => setShowDashboard(!showDashboard)}
      />
      
      <main>
        <Hero />
        
        <ChefProfile />

        <Timeline />
        
        <MenuVault />

        <Testimonials />

        <section id="contact" className="py-24 bg-mintCream dark:bg-deepForest">
          <div className="max-w-7xl mx-auto px-6">
             <div className="rounded-3xl overflow-hidden shadow-2xl h-[400px] border border-darkMoss/10 dark:border-neonMint/20">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115132.8610724213!2d85.07300184462615!3d25.60817557124115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed5842f0395995%3A0xad539a2b535d8866!2sPatna%2C%20Bihar!5e0!3m2!1sen!2sin!4v1709123456789!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, filter: isDarkMode ? 'invert(90%) hue-rotate(180deg) brightness(80%)' : 'grayscale(30%)' }} 
                  allowFullScreen 
                  loading="lazy"
                ></iframe>
             </div>
          </div>
        </section>

        <AnimatePresence>
          {showDashboard && (
            <AdminDashboard onClose={() => setShowDashboard(false)} />
          )}
        </AnimatePresence>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default App;