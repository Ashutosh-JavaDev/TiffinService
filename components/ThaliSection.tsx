import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext.tsx';

interface ThaliItem {
  id: string;
  name: string;
  price: number;
  image: string;
  isVeg: boolean;
  badge: string;
  items: string[];
  description: string;
}

const THALIS: ThaliItem[] = [
  {
    id: 'th1',
    name: 'Mini Veg Thali',
    price: 149,
    isVeg: true,
    badge: 'Best Value',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600',
    description: 'A wholesome mini thali perfect for a light, balanced meal.',
    items: ['2 Roti', 'Dal Fry', 'Steamed Rice', 'Seasonal Sabzi', 'Salad', 'Papad'],
  },
  {
    id: 'th2',
    name: 'Premium Veg Thali',
    price: 249,
    isVeg: true,
    badge: "Chef's Pick",
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=600',
    description: 'Elevated North Indian thali with premium dishes and a sweet.',
    items: ['4 Roti', 'Paneer Curry', 'Dal Makhani', 'Jeera Rice', 'Raita', 'Gulab Jamun'],
  },
  {
    id: 'th3',
    name: 'Non-Veg Thali',
    price: 299,
    isVeg: false,
    badge: 'Popular',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&q=80&w=600',
    description: 'A hearty non-veg thali loaded with succulent chicken and sides.',
    items: ['Chicken Curry', '4 Roti', 'Jeera Rice', 'Dal', 'Raita', 'Salad'],
  },
  {
    id: 'th4',
    name: 'Family Thali',
    price: 499,
    isVeg: true,
    badge: 'Serves 3–4',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=600',
    description: 'A large family-sized spread with multiple curries and dessert.',
    items: ['8 Roti', '2 Sabzi', 'Dal Tadka', 'Rice', 'Kheer', 'Raita', 'Papad', 'Salad'],
  },
  {
    id: 'th5',
    name: 'Premium Non-Veg Thali',
    price: 349,
    isVeg: false,
    badge: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=600',
    description: 'A premium spread with butter chicken, mutton and a rich dessert.',
    items: ['Butter Chicken', 'Mutton Curry', '4 Roti', 'Jeera Rice', 'Raita', 'Dessert'],
  },
  {
    id: 'th6',
    name: 'Deluxe Thali',
    price: 399,
    isVeg: true,
    badge: 'Premium',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=600',
    description: 'Our most premium veg thali — a true feast of North Indian flavours.',
    items: ['6 Roti', 'Paneer Butter Masala', 'Dal Tadka', 'Veg Biryani', 'Gulab Jamun', 'Raita', 'Papad'],
  },
];

const BADGE_COLORS: Record<string, string> = {
  "Best Value": "bg-blue-500",
  "Chef's Pick": "bg-purple-500",
  "Popular": "bg-orange-500",
  "Serves 3–4": "bg-teal-600",
  "Bestseller": "bg-red-500",
  "Premium": "bg-amber-600",
};

export const ThaliSection: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'veg' | 'nonveg'>('all');

  const filtered = THALIS.filter(t =>
    filter === 'all' ? true : filter === 'veg' ? t.isVeg : !t.isVeg
  );

  return (
    <section id="thali" className="py-32 bg-white dark:bg-deepForest">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-5 bg-accentGreen/10 dark:bg-neonMint/10 text-accentGreen dark:text-neonMint">
              Curated Meals
            </span>
            <h2 className="text-5xl md:text-6xl font-serif font-bold mb-5 text-darkMoss dark:text-mintCream">
              Special <span className="text-accentGreen dark:text-neonMint italic">Thali</span> Section
            </h2>
            <p className="text-base opacity-60 max-w-xl mx-auto text-darkMoss dark:text-mintCream">
              Complete, balanced traditional thalis crafted for every appetite — from everyday value to premium feasts.
            </p>
          </motion.div>

          {/* Filter tabs */}
          <div className="flex justify-center gap-3 mt-10">
            {(['all', 'veg', 'nonveg'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`relative px-6 py-2.5 rounded-full text-sm font-bold tracking-wide uppercase transition-all duration-300 overflow-hidden ${
                  filter === f
                    ? 'text-white dark:text-deepForest'
                    : 'bg-transparent text-darkMoss dark:text-mintCream border border-darkMoss/15 dark:border-white/15 hover:border-accentGreen dark:hover:border-neonMint'
                }`}
              >
                <span className="relative z-10">
                  {f === 'all' ? 'All Thalis' : f === 'veg' ? '🟢 Veg' : '🔴 Non-Veg'}
                </span>
                {filter === f && (
                  <motion.div
                    layoutId="thaliFilter"
                    className="absolute inset-0 bg-accentGreen dark:bg-neonMint"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Cards grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map(thali => (
              <ThaliCard key={thali.id} thali={thali} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

const ThaliCard: React.FC<{ thali: ThaliItem }> = ({ thali }) => {
  const { addToCart, setShowCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart({
      id: thali.id,
      name: thali.name,
      price: thali.price,
      image: thali.image,
      category: 'Thali',
      isVeg: thali.isVeg,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const badgeColor = BADGE_COLORS[thali.badge] ?? 'bg-accentGreen';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.92, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 24 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.35 }}
      className="group bg-white dark:bg-white/5 rounded-3xl overflow-hidden border border-darkMoss/10 dark:border-white/10 shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={thali.image}
          alt={thali.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          onError={e => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Veg/Non-veg dot */}
        <div className="absolute top-4 left-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 dark:bg-black/60 backdrop-blur-sm">
          <span className={`w-3 h-3 rounded-full border-2 border-white ${thali.isVeg ? 'bg-green-500' : 'bg-red-500'}`} />
          <span className="text-[11px] font-bold text-darkMoss dark:text-mintCream">
            {thali.isVeg ? 'Veg' : 'Non-Veg'}
          </span>
        </div>

        {/* Badge */}
        <div className={`absolute top-4 right-4 px-2.5 py-1 rounded-full text-[11px] font-black text-white ${badgeColor}`}>
          {thali.badge}
        </div>

        {/* Price */}
        <div className="absolute bottom-4 right-4">
          <span className="text-2xl font-black text-white drop-shadow-lg">₹{thali.price}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-serif font-bold text-darkMoss dark:text-mintCream mb-2">{thali.name}</h3>
        <p className="text-sm opacity-60 text-darkMoss dark:text-mintCream mb-4">{thali.description}</p>

        {/* Includes list */}
        <div className="mb-5 flex-1">
          <p className="text-xs font-bold uppercase tracking-widest text-accentGreen dark:text-neonMint mb-2">Includes</p>
          <ul className="grid grid-cols-2 gap-1">
            {thali.items.map((item, i) => (
              <li key={i} className="flex items-center gap-1.5 text-xs text-darkMoss dark:text-mintCream opacity-70">
                <CheckCircle2 size={11} className="text-accentGreen dark:text-neonMint flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Add to Cart button */}
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
              Add to Cart — ₹{thali.price}
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};
