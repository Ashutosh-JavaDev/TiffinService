import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingCart, Plus, Minus, X, SlidersHorizontal, ChevronDown } from 'lucide-react';

interface SnackItem {
  id: number;
  name: string;
  weight: string;
  weightGm: number;
  price: number;
  image: string;
  category: string;
}

interface CartItem extends SnackItem {
  quantity: number;
}

const SNACK_ITEMS: SnackItem[] = [
  { id: 1,  name: 'Mini Kachori',           weight: '250 gm', weightGm: 250, price: 90,  category: 'Namkeen', image: '/images/MiniKachori.jpeg' },
  { id: 2,  name: 'Salted Peanuts',          weight: '250 gm', weightGm: 250, price: 70,  category: 'Namkeen', image: '/images/MasalaPeaanuts.jpeg' },
  { id: 3,  name: 'Samosa',                  weight: '250 gm', weightGm: 250, price: 80,  category: 'Snacks',  image: '/images/Samosa.jpeg' },
  { id: 4,  name: 'Bhakarwadi',              weight: '210 gm', weightGm: 210, price: 60,  category: 'Snacks',  image: '/images/Bhakarwadi.jpeg' },
  { id: 5,  name: 'Moong Dal Namkeen',       weight: '250 gm', weightGm: 250, price: 70,  category: 'Namkeen', image: '/images/moong-dal-namkeen.jpeg' },
  { id: 6,  name: 'Namak Para',              weight: '250 gm', weightGm: 250, price: 80,  category: 'Namkeen', image: '/images/Namakpara.jpeg' },
  { id: 7,  name: 'Thekua',                  weight: '200 gm', weightGm: 200, price: 70,  category: 'Sweets',  image: '/images/Thekwaa.jpeg' },
  { id: 8,  name: 'Namkeen Mixture',         weight: '250 gm', weightGm: 250, price: 75,  category: 'Namkeen', image: '/images/Mixture.jpeg' },
  { id: 9,  name: 'Poha Namkeen',            weight: '210 gm', weightGm: 210, price: 90,  category: 'Namkeen', image: '/images/Poha.jpeg' },
  { id: 10, name: 'Moong Dal Mathri',        weight: '200 gm', weightGm: 200, price: 85,  category: 'Namkeen', image: '/images/MoongDal.jpeg' },
  { id: 11, name: 'Mathri',                  weight: '200 gm', weightGm: 200, price: 60,  category: 'Snacks',  image: '/images/Methi.jpeg' },
  { id: 12, name: 'Murmura Mathana Namkeen', weight: '250 gm', weightGm: 250, price: 90,  category: 'Namkeen', image: '/images/Murmur.jpeg' },
  { id: 13, name: 'Roasted Makhana',         weight: '200 gm', weightGm: 200, price: 180, category: 'Healthy', image: '/images/RoastedMakhana.jpeg' },
  { id: 14, name: 'Makhana Namkeen',         weight: '250 gm', weightGm: 250, price: 190, category: 'Healthy', image: '/images/makhana-namkeen.jpg' },
];
const WA_NUMBER = '919534550381';
const GREEN_GRAD = 'linear-gradient(135deg,#2D5A2D,#1A4A1A)';
const GREEN_SOLID = '#2D5A2D';
const GREEN_LIGHT = 'rgba(45,90,45,0.10)';

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'weight-asc' | 'weight-desc';

export const SnacksStore: React.FC = () => {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<SortOption>('default');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [imgErrors, setImgErrors] = useState<Set<number>>(new Set());

  const categories = ['All', 'Namkeen', 'Snacks', 'Sweets', 'Healthy'];

  const filteredItems = useMemo(() => {
    let items = [...SNACK_ITEMS];
    if (search.trim()) {
      items = items.filter(i => i.name.toLowerCase().includes(search.toLowerCase()));
    }
    if (activeCategory !== 'All') {
      items = items.filter(i => i.category === activeCategory);
    }
    switch (sort) {
      case 'price-asc':   items.sort((a, b) => a.price - b.price); break;
      case 'price-desc':  items.sort((a, b) => b.price - a.price); break;
      case 'weight-asc':  items.sort((a, b) => a.weightGm - b.weightGm); break;
      case 'weight-desc': items.sort((a, b) => b.weightGm - a.weightGm); break;
    }
    return items;
  }, [search, sort, activeCategory]);

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  const addToCart = (item: SnackItem) => {
    setCart(prev => {
      const existing = prev.find(c => c.id === item.id);
      if (existing) return prev.map(c => c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c);
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQty = (id: number, delta: number) => {
    setCart(prev =>
      prev.map(c => c.id === id ? { ...c, quantity: c.quantity + delta } : c)
          .filter(c => c.quantity > 0)
    );
  };

  const removeFromCart = (id: number) => setCart(prev => prev.filter(c => c.id !== id));
  const getQty = (id: number) => cart.find(c => c.id === id)?.quantity ?? 0;
  const handleImgError = (id: number) => setImgErrors(prev => new Set(prev).add(id));

  const sortLabels: Record<SortOption, string> = {
    'default':     'Default',
    'price-asc':   'Price: Low → High',
    'price-desc':  'Price: High → Low',
    'weight-asc':  'Weight: Low → High',
    'weight-desc': 'Weight: High → Low',
  };

  const placeOrder = () => {
    const lines = cart.map(c => `${c.name} x${c.quantity} (₹${c.price * c.quantity})`).join('%0A');
    const text = encodeURIComponent(`🛒 Order from Tasty Tiffin Snacks:\n`) + lines + `%0ATotal: ₹${cartTotal}`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${text}`, '_blank');
  };

  return (
    <section id="snacks" className="py-24 bg-white dark:bg-darkMoss/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span
              className="inline-block px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-5"
              style={{ background: GREEN_LIGHT, color: GREEN_SOLID }}
            >
              Fresh &amp; Crunchy
            </span>
            <h2 className="text-5xl md:text-6xl font-serif font-bold mb-4 text-darkMoss dark:text-mintCream">
              Snacks &amp; <span className="text-accentGreen dark:text-neonMint">Namkeen</span>
            </h2>
            <p className="text-base opacity-60 max-w-xl mx-auto">
              Handcrafted traditional snacks made fresh daily — browse, pick and get them delivered.
            </p>
          </motion.div>
        </div>

        {/* Controls row */}
        <div className="flex flex-col md:flex-row gap-3 mb-6 items-start md:items-center">
          {/* Search */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40" size={18} />
            <input
              type="text"
              placeholder="Search snacks…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl border border-darkMoss/10 dark:border-white/10 bg-mintCream dark:bg-white/5 text-darkMoss dark:text-mintCream placeholder:opacity-40 focus:outline-none focus:ring-2 focus:ring-accentGreen/30 transition"
            />
          </div>

          {/* Sort dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl border border-darkMoss/10 dark:border-white/10 bg-mintCream dark:bg-white/5 text-sm font-semibold transition hover:border-accentGreen dark:hover:border-neonMint"
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
                      className={`w-full text-left px-5 py-3 text-sm transition hover:bg-mintCream dark:hover:bg-white/5 ${sort === key ? 'font-bold text-accentGreen dark:text-neonMint' : ''}`}
                    >
                      {sortLabels[key]}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Cart button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCart(true)}
            className="relative flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold text-white shadow-lg transition"
            style={{ background: GREEN_GRAD }}
          >
            <ShoppingCart size={18} />
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-white text-accentGreen text-[10px] font-black flex items-center justify-center shadow">
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
                  ? 'text-white border-accentGreen'
                  : 'bg-transparent border-darkMoss/10 dark:border-white/10 text-darkMoss dark:text-mintCream hover:border-accentGreen/50 dark:hover:border-neonMint/50'
              }`}
              style={activeCategory === cat ? { background: GREEN_GRAD } : {}}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-20 opacity-50"
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
                onImgError={() => handleImgError(item.id)}
                onAdd={() => addToCart(item)}
                onIncrease={() => updateQty(item.id, 1)}
                onDecrease={() => updateQty(item.id, -1)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Cart drawer */}
      <AnimatePresence>
        {showCart && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCart(false)}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            />
            <motion.aside
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="fixed right-0 top-0 h-full w-full max-w-md z-50 bg-white dark:bg-darkMoss shadow-2xl flex flex-col"
            >
              {/* Cart header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-darkMoss/10 dark:border-white/10">
                <div className="flex items-center gap-3">
                  <ShoppingCart size={22} className="text-accentGreen dark:text-neonMint" />
                  <h3 className="text-lg font-bold text-darkMoss dark:text-mintCream">Your Cart</h3>
                  {cartCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold text-white" style={{ background: GREEN_SOLID }}>
                      {cartCount}
                    </span>
                  )}
                </div>
                <button onClick={() => setShowCart(false)} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition">
                  <X size={20} />
                </button>
              </div>

              {/* Cart items */}
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full opacity-40 gap-3">
                    <ShoppingCart size={52} />
                    <p className="font-semibold">Your cart is empty</p>
                  </div>
                ) : cart.map(c => (
                  <motion.div
                    key={c.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 40 }}
                    className="flex items-center gap-4 p-3 rounded-2xl bg-mintCream dark:bg-white/5 border border-darkMoss/5 dark:border-white/5"
                  >
                    <img
                      src={c.image}
                      alt={c.name}
                      className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                      onError={e => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1589113103503-496bc7d08891?auto=format&fit=crop&q=80&w=100'; }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-darkMoss dark:text-mintCream truncate">{c.name}</p>
                      <p className="text-xs opacity-50">{c.weight}</p>
                      <p className="text-sm font-bold mt-0.5 text-accentGreen dark:text-neonMint">₹{c.price * c.quantity}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => updateQty(c.id, -1)}
                        className="w-7 h-7 rounded-full bg-mintCream dark:bg-white/10 flex items-center justify-center hover:bg-neonMint/20 transition"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-6 text-center text-sm font-bold">{c.quantity}</span>
                      <button
                        onClick={() => updateQty(c.id, 1)}
                        className="w-7 h-7 rounded-full flex items-center justify-center text-white transition"
                        style={{ background: GREEN_SOLID }}
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <button onClick={() => removeFromCart(c.id)} className="p-1 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 text-red-400 transition">
                      <X size={15} />
                    </button>
                  </motion.div>
                ))}
              </div>

              {/* Cart footer */}
              {cart.length > 0 && (
                <div className="px-6 py-5 border-t border-darkMoss/10 dark:border-white/10 space-y-4">
                  <div className="flex justify-between text-sm opacity-60">
                    <span>{cartCount} item{cartCount > 1 ? 's' : ''}</span>
                    <span>Subtotal</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold font-serif text-darkMoss dark:text-mintCream">₹{cartTotal}</span>
                    <span className="text-xs opacity-40">+ delivery</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={placeOrder}
                    className="w-full py-4 rounded-2xl text-white font-bold text-base shadow-lg transition"
                    style={{ background: GREEN_GRAD }}
                  >
                    Place Order via WhatsApp
                  </motion.button>
                </div>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
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
      className="group bg-white dark:bg-white/5 rounded-3xl overflow-hidden border border-darkMoss/8 dark:border-white/8 shadow-md hover:shadow-xl transition-all duration-400 flex flex-col"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-mintCream dark:bg-white/5">
        <img
          src={imgError ? fallback : item.image}
          alt={item.name}
          loading="lazy"
          onError={onImgError}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span
            className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase text-white shadow"
            style={{ background: 'rgba(45,90,45,0.88)', backdropFilter: 'blur(4px)' }}
          >
            {item.category}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-sm leading-snug text-darkMoss dark:text-mintCream mb-1 line-clamp-2">{item.name}</h3>
        <p className="text-xs opacity-50 mb-2">{item.weight}</p>
        <p className="text-lg font-black mb-4 text-accentGreen dark:text-neonMint">₹{item.price}</p>

        {/* Add / Qty control */}
        <div className="mt-auto">
          {qty === 0 ? (
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.94 }}
              onClick={onAdd}
              className="w-full py-2.5 rounded-2xl text-white text-sm font-bold shadow-md transition"
              style={{ background: GREEN_GRAD }}
            >
              Add
            </motion.button>
          ) : (
            <div className="flex items-center justify-between bg-mintCream dark:bg-white/5 rounded-2xl p-1">
              <motion.button
                whileTap={{ scale: 0.88 }}
                onClick={onDecrease}
                className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-white shadow transition"
                style={{ background: GREEN_GRAD }}
              >
                <Minus size={14} />
              </motion.button>
              <span className="font-black text-sm text-darkMoss dark:text-mintCream w-6 text-center">{qty}</span>
              <motion.button
                whileTap={{ scale: 0.88 }}
                onClick={onIncrease}
                className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-white shadow transition"
                style={{ background: GREEN_GRAD }}
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