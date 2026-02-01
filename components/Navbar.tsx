
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X, LayoutDashboard } from 'lucide-react';

interface NavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
  onAdminClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isDark, toggleTheme, onAdminClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Chef', href: '#chef' },
    { name: 'Menu', href: '#menu' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-4' : 'py-8'}`}>
      <div className={`max-w-7xl mx-auto px-6`}>
        <div className={`rounded-full transition-all duration-500 flex items-center justify-between px-6 py-2 ${isScrolled ? 'glass shadow-lg scale-100' : 'scale-105'}`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accentGreen dark:bg-neonMint flex items-center justify-center overflow-hidden">
               <span className="text-white dark:text-deepForest font-bold font-serif">T</span>
            </div>
            <span className="text-xl font-serif font-bold tracking-tight hidden md:block">Tasty Tiffin</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink key={link.name} href={link.href}>{link.name}</NavLink>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onAdminClick}
              className="p-2 rounded-full hover:bg-darkMoss/5 dark:hover:bg-neonMint/10 transition-colors"
              title="Admin Dashboard"
            >
              <LayoutDashboard size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-darkMoss/5 dark:hover:bg-neonMint/10 transition-colors"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
            <button 
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-mintCream dark:bg-deepForest z-[60] flex flex-col p-8"
          >
            <div className="flex justify-end">
              <button onClick={() => setMobileMenuOpen(false)}>
                <X size={32} />
              </button>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center gap-8">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-4xl font-serif hover:text-accentGreen dark:hover:text-neonMint transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const NavLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <motion.a
    href={href}
    className="relative group py-2"
    whileHover={{ y: -2 }}
  >
    <span className="text-sm font-medium tracking-wide uppercase">{children}</span>
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accentGreen dark:bg-neonMint transition-all duration-300 group-hover:w-full" />
  </motion.a>
);
