
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MenuTab } from '../types';
import { MENU_ITEMS } from '../constants';
import { ShoppingBag, ChevronRight } from 'lucide-react';

export const MenuVault: React.FC = () => {
  const [activeTab, setActiveTab] = useState<MenuTab>(MenuTab.TIFFIN);

  const tabs = Object.values(MenuTab);

  return (
    <section id="menu" className="py-32 bg-mintCream dark:bg-deepForest">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-serif font-bold mb-6"
          >
            The <span className="text-accentGreen dark:text-neonMint">Categorized</span> Menu Vault
          </motion.h2>
          <div className="flex flex-wrap justify-center gap-4 mt-12">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-3 rounded-full text-sm font-bold tracking-widest uppercase transition-all duration-300 relative overflow-hidden ${
                  activeTab === tab 
                    ? 'text-white dark:text-deepForest' 
                    : 'bg-transparent text-darkMoss dark:text-mintCream hover:bg-darkMoss/5 dark:hover:bg-neonMint/10'
                }`}
              >
                <span className="relative z-10">{tab}</span>
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-accentGreen dark:bg-neonMint"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {MENU_ITEMS.filter(item => item.category === activeTab).map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

const MenuCard: React.FC<{ item: any }> = ({ item }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      whileHover={{ y: -10 }}
      className="group bg-white dark:bg-white/5 rounded-3xl overflow-hidden border border-darkMoss/10 dark:border-white/10 shadow-lg hover:shadow-2xl transition-all duration-500 perspective-1000"
    >
      <div className="relative h-64 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 right-4 glass px-3 py-1 rounded-full">
          <span className="text-xs font-bold uppercase">{item.category}</span>
        </div>
      </div>
      
      <div className="p-8">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-serif font-bold leading-tight">{item.title}</h3>
          <span className="text-accentGreen dark:text-neonMint font-bold whitespace-nowrap">{item.price}</span>
        </div>
        <p className="text-sm opacity-70 mb-8 line-clamp-2">{item.description}</p>
        
        <div className="flex items-center justify-between">
          <motion.button
            whileHover={{ x: 5 }}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accentGreen dark:text-neonMint"
          >
            Details <ChevronRight size={14} />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 bg-accentGreen dark:bg-neonMint rounded-2xl flex items-center justify-center text-white dark:text-deepForest shadow-lg shadow-accentGreen/20"
          >
            <ShoppingBag size={20} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
