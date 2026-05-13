import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingCart, Plus, Minus, SlidersHorizontal, ChevronDown, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext.tsx';

interface SnackItem {
  id: number;
  name: string;
  weight: string;
  weightGm: number;
  price: number;
  image: string;
  category: string;
  isVeg: boolean;
  description: string;
}

const SNACK_ITEMS: SnackItem[] = [
  { id: 1,  name: 'Mini Kachori',           weight: '250 gm', weightGm: 250, price: 90,  category: 'Namkeen', isVeg: true,  description: 'Crispy, flaky kachoris stuffed with spiced lentils.', image: '/images/MiniKachori.jpeg' },
  { id: 2,  name: 'Masala Peanuts',         weight: '250 gm', weightGm: 250, price: 70,  category: 'Namkeen', isVeg: true,  description: 'Crunchy peanuts coated in a bold masala blend.', image: '/images/MasalaPeaanuts.jpeg' },
  { id: 3,  name: 'Samosa',                 weight: '250 gm', weightGm: 250, price: 80,  category: 'Snacks',  isVeg: true,  description: 'Golden fried pastry pockets filled with spiced potatoes.', image: '/images/Samosa.jpeg' },
  { id: 4,  name: 'Bhakarwadi',             weight: '210 gm', weightGm: 210, price: 60,  category: 'Snacks',  isVeg: true,  description: 'Spicy, tangy Maharashtrian spiral snack — addictively crunchy.', image: '/images/Bhakarwadi.jpeg' },
  { id: 5,  name: 'Moong Dal Namkeen',      weight: '250 gm', weightGm: 250, price: 70,  category: 'Namkeen', isVeg: true,  description: 'Light, crispy fried moong dal seasoned with spices.', image: '/images/MoongDal.jpeg' },
  { id: 6,  name: 'Namak Para',             weight: '250 gm', weightGm: 250, price: 80,  category: 'Namkeen', isVeg: true,  description: 'Classic salted wheat crackers — the perfect tea-time snack.', image: '/images/Namakpara.jpg' },
  { id: 7,  name: 'Thekua',                 weight: '200 gm', weightGm: 200, price: 70,  category: 'Sweets',  isVeg: true,  description: 'Traditional Bihar sweet made with wheat and jaggery.', image: '/images/Thekwaa.jpeg' },
  { id: 8,  name: 'Namkeen Mixture',        weight: '250 gm', weightGm: 250, price: 75,  category: 'Namkeen', isVeg: true,  description: 'A crunchy medley of sev, nuts, and spiced puffs.', image: '/images/Mixture.jpeg' },
  { id: 9,  name: 'Poha Namkeen',           weight: '210 gm', weightGm: 210, price: 90,  category: 'Namkeen', isVeg: true,  description: 'Crispy flattened rice seasoned with turmeric and spices.', image: '/images/Poha.jpeg' },
  { id: 10, name: 'Moong Dal Mathri',       weight: '200 gm', weightGm: 200, price: 85,  category: 'Namkeen', isVeg: true,  description: 'Flaky, flavorful mathris made with moong dal and spices.', image: '/images/MoongDal.jpeg' },
  { id: 11, name: 'Methi Mathri',           weight: '200 gm', weightGm: 200, price: 60,  category: 'Snacks',  isVeg: true,  description: 'Crispy fenugreek-flavored crackers — a North Indian classic.', image: '/images/Methi.jpeg' },
  { id: 12, name: 'Murmura Makhana Mix',    weight: '250 gm', weightGm: 250, price: 90,  category: 'Namkeen', isVeg: true,  description: 'Light puffed rice and lotus seeds tossed in spices.', image: '/images/Murmur.jpeg' },
  { id: 13, name: 'Roasted Makhana',        weight: '200 gm', weightGm: 200, price: 180, category: 'Healthy', isVeg: true,  description: 'Air-roasted lotus seeds with Himalayan salt. Protein-rich & guilt-free.', image: '/images/RostedMakhana.jpeg' },
  { id: 14, name: 'Masala Makhana',         weight: '250 gm', weightGm: 250, price: 190, category: 'Healthy', isVeg: true,  description: 'Spiced foxnuts — a healthy, crunchy snacking alternative.', image: '/images/MasalaMakhana.jpeg' },
  { id: 15, name: 'Khasta Mathri',          weight: '200 gm', weightGm: 200, price: 65,  category: 'Snacks',  isVeg: true,  description: 'Super flaky, layered mathri — best with chai!', image: '/images/KhastaMatri.jpeg' },
];

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'weight-asc' | 'weight-desc';

const sortLabels: Record<SortOption, string> = {
  default:      'Default',
  'price-asc':  'Price: Low → High',
  'price-desc': 'Price: High → Low',
  'weight-asc': 'Weight: Low → High',
  'weight-desc':'Weight: High → Low',
};

export const SnacksStore: React.FC = () => {
  const { addToCart, updateQty, cart, setShowCart, cartCount } = useCart();

  const [search, setSearch]         = useState('');
  const [sort, setSort]             = useState<SortOption>('default');
  const [showFilters, setShowFilters] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [imgErrors, setImgErrors]   = useState<Set<number>>(new Set());

  const categories = ['All', 'Namkeen', 'Snacks', 'Sweets', 'Healthy'];

  const getQty = (id: number) => cart.find(c => c.id === `s-${id}`)?.quantity ?? 0;

  const handleAdd = (item: SnackItem) => {
    addToCart({
      id: `s-${item.id}`,
      name: item.name,
      price: item.price,
      image: imgErrors.has(item.id)
        ? 'https://images.unsplash.com/photo-1589113103503-496bc7d08891?auto=format&fit=crop&q=80&w=400'
        : item.image,
      category: item.category,
      weight: item.weight,
      isVeg: item.isVeg,
    });
  };

  const filteredItems = useMemo(() => {
    let items = [...SNACK_ITEMS];
    if (search.trim()) items = items.filter(i => i.name.toLowerCase().includes(search.toLowerCase()));
    if (activeCategory !== 'All') items = items.filter(i => i.category === activeCategory);
    switch (sort) {
      case 'price-asc':   items.sort((a, b) => a.price - b.price); break;
      case 'price-desc':  items.sort((a, b) => b.price - a.price); break;
      case 'weight-asc':  items.sort((a, b) => a.weightGm - b.weightGm); break;
      case 'weight-desc': items.sort((a, b) => b.weightGm - a.weightGm); break;
    }
    return items;
  }, [search, sort, activeCategory]);

  return (
    <section id="snacks" className="py-24 bg-mintCream dark:bg-darkMoss/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-5 bg-accentGreen/10 dark:bg-neonMint/10 text-accentGreen dark:text-neonMint">
              Fresh &amp; Crunchy
            </span>
            <h2 className="text-5xl md:text-6xl font-serif font-bold mb-4 text-darkMoss dark:text-mintCream">
              Snacks &amp; <span className="text-accentGreen dark:text-neonMint italic">Namkeen</span>
            </h2>
            <p className="text-base opacity-60 max-w-xl mx-auto text-darkMoss dark:text-mintCream">
              Handcrafted traditional snacks made fresh daily — browse, pick and get them delivered.
            </p>
          </motion.div>
        </div>

        {/* Controls row */}
        <div className="flex flex-col md:flex-row gap-3 mb-6 items-start md:items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40" size={18} />
            <input
              type="text"
              placeholder="Search snacks…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl border border-darkMoss/10 dark:border-white/10 bg-white dark:bg-white/5 text-darkMoss dark:text-mintCream placeholder:opacity-40 focus:outline-none focus:ring-2 focus:ring-accentGreen/30 transition"
            />
          </div>

          <div className="relative">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl border border-darkMoss/10 dark:border-white/10 bg-white dark:bg-white/5 text-sm font-semibold transition hover:border-accentGreen dark:hover:border-neonMint text-darkMoss dark:text-mintCream"
            >
              <SlidersHorizontal size={16} />
              {sortLabels[sort]}
              <ChevronDown size={14} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.18 }}
                  className="absolute right-0 mt-2 z-30 w-52 rounded-2xl border border-darkMoss/10 dark:border-white/10 bg-white dark:bg-darkMoss shadow-2xl overflow-hidden"
                >
                  {(Object.keys(sortLabels) as SortOption[]).map(key => (
                    <button
                      key={key}
                      onClick={() => { setSort(key); setShowFilters(false); }}
                      className={`w-full text-left px-5 py-3 text-sm transition hover:bg-mintCream dark:hover:bg-white/5 text-darkMoss dark:text-mintCream ${sort === key ? 'font-bold text-accentGreen dark:text-neonMint' : ''}`}
                    >
                      {sortLabels[key]}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCart(true)}
            className="relative flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold text-white shadow-lg bg-accentGreen dark:bg-neonMint dark:text-deepForest transition hover:brightness-110"
          >
            <ShoppingCart size={18} />
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-white text-accentGreen dark:text-deepForest text-[10px] font-black flex items-center justify-center shadow">
                {cartCount}
              </span>
            )}
          </motion.button>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-bold tracking-wide uppercase transition-all duration-200 border ${
                activeCategory === cat
                  ? 'text-white dark:text-deepForest border-accentGreen bg-accentGreen dark:bg-neonMint dark:border-neonMint'
                  : 'bg-transparent border-darkMoss/10 dark:border-white/10 text-darkMoss dark:text-mintCream hover:border-accentGreen/50 dark:hover:border-neonMint/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-20 opacity-50 text-darkMoss dark:text-mintCream"
              >
                <ShoppingCart size={48} className="mx-auto mb-3 opacity-30" />
                <p className="font-semibold">No items found.</p>
              </motion.div>
            ) : filteredItems.map(item => (
              <SnackCard
                key={item.id}
                item={item}
                qty={getQty(item.id)}
                imgError={imgErrors.has(item.id)}
                onImgError={() => setImgErrors(prev => new Set(prev).add(item.id))}
                onAdd={() => handleAdd(item)}
                onIncrease={() => updateQty(`s-${item.id}`, 1)}
                onDecrease={() => updateQty(`s-${item.id}`, -1)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

interface SnackCardProps {
  item: SnackItem;
  qty: number;
  imgError: boolean;
  onImgError: () => void;
  onAdd: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
}

const SnackCard: React.FC<SnackCardProps> = ({ item, qty, imgError, onImgError, onAdd, onIncrease, onDecrease }) => {
  const fallback = 'https://images.unsplash.com/photo-1589113103503-496bc7d08891?auto=format&fit=crop&q=80&w=400';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.88, y: 16 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="group bg-white dark:bg-white/5 rounded-3xl overflow-hidden border border-darkMoss/8 dark:border-white/8 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
    >
      <div className="relative aspect-square overflow-hidden bg-mintCream dark:bg-white/5">
        <img
          src={imgError ? fallback : item.image}
          alt={item.name}
          loading="lazy"
          onError={onImgError}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {/* Veg dot */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/90 dark:bg-black/70 backdrop-blur-sm">
          <span className={`w-2.5 h-2.5 rounded-full ${item.isVeg ? 'bg-green-500' : 'bg-red-500'}`} />
          <span className="text-[9px] font-bold text-darkMoss dark:text-mintCream">{item.isVeg ? 'Veg' : 'Non-Veg'}</span>
        </div>
        {/* Category */}
        <div className="absolute top-2.5 right-2.5">
          <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase text-white bg-accentGreen/85 dark:bg-neonMint/85 dark:text-deepForest">
            {item.category}
          </span>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-sm leading-snug text-darkMoss dark:text-mintCream mb-1 line-clamp-1">{item.name}</h3>
        <p className="text-[11px] opacity-50 text-darkMoss dark:text-mintCream mb-1 line-clamp-2">{item.description}</p>
        <p className="text-xs opacity-40 text-darkMoss dark:text-mintCream mb-3">{item.weight}</p>
        <p className="text-lg font-black mb-3 text-accentGreen dark:text-neonMint">₹{item.price}</p>

        <div className="mt-auto">
          {qty === 0 ? (
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.94 }}
              onClick={onAdd}
              className="w-full py-2.5 rounded-2xl text-white dark:text-deepForest text-sm font-bold shadow-md bg-accentGreen dark:bg-neonMint hover:brightness-110 transition flex items-center justify-center gap-1.5"
            >
              <ShoppingCart size={14} />
              Add
            </motion.button>
          ) : (
            <div className="flex items-center justify-between bg-mintCream dark:bg-white/5 rounded-2xl p-1">
              <motion.button
                whileTap={{ scale: 0.88 }}
                onClick={onDecrease}
                className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-white bg-accentGreen dark:bg-neonMint dark:text-deepForest shadow transition hover:brightness-110"
              >
                <Minus size={14} />
              </motion.button>
              <span className="font-black text-sm text-darkMoss dark:text-mintCream w-6 text-center">{qty}</span>
              <motion.button
                whileTap={{ scale: 0.88 }}
                onClick={onIncrease}
                className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-white bg-accentGreen dark:bg-neonMint dark:text-deepForest shadow transition hover:brightness-110"
              >
                <Plus size={14} />
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
