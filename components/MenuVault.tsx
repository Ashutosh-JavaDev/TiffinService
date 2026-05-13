import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MenuTab } from '../types';
import { MENU_ITEMS } from '../constants';
import { ShoppingCart, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext.tsx';

export const MenuVault: React.FC = () => {
  const [activeTab, setActiveTab] = useState<MenuTab>(MenuTab.TIFFIN);
  const tabs = Object.values(MenuTab);

  const filtered = MENU_ITEMS.filter(item => item.category === activeTab);

  return (
    <section id="menu" className="py-32 bg-mintCream dark:bg-deepForest">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-5 bg-accentGreen/10 dark:bg-neonMint/10 text-accentGreen dark:text-neonMint">
              Fresh Every Day
            </span>
            <h2 className="text-5xl md:text-6xl font-serif font-bold mb-4 text-darkMoss dark:text-mintCream">
              The <span className="text-accentGreen dark:text-neonMint italic">Categorized</span> Menu
            </h2>
            <p className="text-base opacity-60 max-w-lg mx-auto text-darkMoss dark:text-mintCream">
              Homemade meals spanning every part of your day — breakfast, lunch, dinner, and beyond.
            </p>
          </motion.div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mt-10">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-6 py-2.5 rounded-full text-sm font-bold tracking-wide uppercase transition-all duration-300 overflow-hidden ${
                  activeTab === tab
                    ? 'text-white dark:text-deepForest'
                    : 'bg-transparent text-darkMoss dark:text-mintCream border border-darkMoss/15 dark:border-white/15 hover:border-accentGreen dark:hover:border-neonMint'
                }`}
              >
                <span className="relative z-10">{tab}</span>
                {activeTab === tab && (
                  <motion.div
                    layoutId="menuTab"
                    className="absolute inset-0 bg-accentGreen dark:bg-neonMint"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map(item => (
              <MenuCard key={item.id} item={item} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

const MenuCard: React.FC<{ item: any }> = ({ item }) => {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart({
      id: item.id,
      name: item.title,
      price: item.numericPrice,
      image: item.image,
      category: item.category,
      isVeg: item.isVeg,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.92, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.35 }}
      className="group bg-white dark:bg-white/5 rounded-3xl overflow-hidden border border-darkMoss/10 dark:border-white/10 shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          onError={e => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

        {/* Veg/Non-veg indicator */}
        <div className="absolute top-4 left-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 dark:bg-black/60 backdrop-blur-sm">
          <span className={`w-3 h-3 rounded-full border-2 border-white ${item.isVeg ? 'bg-green-500' : 'bg-red-500'}`} />
          <span className="text-[11px] font-bold text-darkMoss dark:text-mintCream">
            {item.isVeg ? 'Veg' : 'Non-Veg'}
          </span>
        </div>

        {/* Category tag */}
        <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-accentGreen/90 dark:bg-neonMint/90 backdrop-blur-sm">
          <span className="text-[10px] font-black uppercase text-white dark:text-deepForest">{item.category}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-serif font-bold leading-tight text-darkMoss dark:text-mintCream flex-1 pr-3">
            {item.title}
          </h3>
          <span className="text-lg font-black text-accentGreen dark:text-neonMint whitespace-nowrap">{item.price}</span>
        </div>

        <p className="text-sm opacity-60 text-darkMoss dark:text-mintCream mb-6 line-clamp-2 flex-1">
          {item.description}
        </p>

        {/* Add to Cart */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleAdd}
          className={`w-full py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-lg ${
            added
              ? 'bg-green-500 text-white'
              : 'bg-accentGreen dark:bg-neonMint text-white dark:text-deepForest hover:brightness-110'
          }`}
        >
          {added ? (
            <>
              <CheckCircle2 size={16} />
              Added to Cart!
            </>
          ) : (
            <>
              <ShoppingCart size={16} />
              Add to Cart
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};
