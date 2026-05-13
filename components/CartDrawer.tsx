import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Plus, Minus, MapPin, Loader2, Navigation } from 'lucide-react';
import { useCart } from '../context/CartContext';

const STORE_LAT = 25.5941;
const STORE_LNG = 85.1376;
const WA_NUMBER = '919534550381';
const GST_RATE = 0.05;

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function deliveryFee(km: number): number {
  if (km <= 2) return 0;
  if (km <= 5) return 20;
  if (km <= 10) return 40;
  if (km <= 20) return 60;
  return 80;
}

export const CartDrawer: React.FC = () => {
  const { cart, removeFromCart, updateQty, cartCount, cartTotal, showCart, setShowCart } = useCart();

  const [locState, setLocState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [distance, setDistance] = useState<number | null>(null);
  const [locError, setLocError] = useState('');

  const detectLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocState('error');
      setLocError('Geolocation not supported by your browser.');
      return;
    }
    setLocState('loading');
    navigator.geolocation.getCurrentPosition(
      pos => {
        const d = haversineKm(pos.coords.latitude, pos.coords.longitude, STORE_LAT, STORE_LNG);
        setDistance(d);
        setLocState('done');
      },
      () => {
        setLocState('error');
        setLocError('Unable to detect location. Please allow location access.');
      },
      { timeout: 10000 }
    );
  }, []);

  const delivery = distance !== null ? deliveryFee(distance) : 0;
  const gst = Math.round(cartTotal * GST_RATE);
  const grandTotal = cartTotal + gst + delivery;

  const placeOrder = () => {
    const lines = cart
      .map(c => `${c.isVeg ? '🟢' : '🔴'} ${c.name} x${c.quantity} (₹${c.price * c.quantity})`)
      .join('%0A');
    const bill =
      `%0A----%0ASubtotal: ₹${cartTotal}%0AGST (5%%): ₹${gst}%0ADelivery: ₹${delivery}%0A*Total: ₹${grandTotal}*`;
    const text = `🛒 *Order from Tasty Tiffin Service*%0A%0A${lines}${bill}`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${text}`, '_blank');
  };

  return (
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
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-darkMoss/10 dark:border-white/10">
              <div className="flex items-center gap-3">
                <ShoppingCart size={22} className="text-accentGreen dark:text-neonMint" />
                <h3 className="text-lg font-bold text-darkMoss dark:text-mintCream">Your Cart</h3>
                {cartCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold text-white bg-accentGreen dark:bg-neonMint dark:text-deepForest">
                    {cartCount}
                  </span>
                )}
              </div>
              <button
                onClick={() => setShowCart(false)}
                className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full opacity-40 gap-4">
                  <ShoppingCart size={56} />
                  <p className="font-semibold text-center">Your cart is empty.<br />Add items to get started.</p>
                </div>
              ) : (
                cart.map(c => (
                  <motion.div
                    key={c.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 40 }}
                    className="flex items-center gap-3 p-3 rounded-2xl bg-mintCream dark:bg-white/5 border border-darkMoss/5 dark:border-white/5"
                  >
                    <div className="relative w-14 h-14 flex-shrink-0">
                      <img
                        src={c.image}
                        alt={c.name}
                        className="w-full h-full rounded-xl object-cover"
                        onError={e => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1589113103503-496bc7d08891?auto=format&fit=crop&q=80&w=100'; }}
                      />
                      <span className={`absolute -top-1 -left-1 w-3.5 h-3.5 rounded-full border-2 border-white ${c.isVeg === false ? 'bg-red-500' : 'bg-accentGreen'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-darkMoss dark:text-mintCream truncate">{c.name}</p>
                      {c.weight && <p className="text-xs opacity-50">{c.weight}</p>}
                      <p className="text-sm font-bold text-accentGreen dark:text-neonMint">₹{c.price * c.quantity}</p>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button
                        onClick={() => updateQty(c.id, -1)}
                        className="w-7 h-7 rounded-full bg-accentGreen/10 dark:bg-neonMint/10 flex items-center justify-center hover:bg-accentGreen hover:text-white transition text-accentGreen dark:text-neonMint"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-6 text-center text-sm font-bold text-darkMoss dark:text-mintCream">{c.quantity}</span>
                      <button
                        onClick={() => updateQty(c.id, 1)}
                        className="w-7 h-7 rounded-full bg-accentGreen flex items-center justify-center text-white hover:bg-accentGreen/80 transition"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(c.id)}
                      className="p-1 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 text-red-400 transition ml-1"
                    >
                      <X size={14} />
                    </button>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer with billing */}
            {cart.length > 0 && (
              <div className="px-6 py-5 border-t border-darkMoss/10 dark:border-white/10 space-y-4 bg-white dark:bg-darkMoss">
                {/* Delivery location detector */}
                <div className="rounded-2xl bg-mintCream dark:bg-white/5 p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-semibold text-darkMoss dark:text-mintCream">
                      <MapPin size={15} className="text-accentGreen dark:text-neonMint" />
                      Delivery Charges
                    </div>
                    {locState === 'idle' && (
                      <button
                        onClick={detectLocation}
                        className="flex items-center gap-1.5 text-xs font-bold text-accentGreen dark:text-neonMint hover:underline"
                      >
                        <Navigation size={12} /> Detect Location
                      </button>
                    )}
                    {locState === 'loading' && (
                      <span className="flex items-center gap-1 text-xs text-accentGreen dark:text-neonMint">
                        <Loader2 size={12} className="animate-spin" /> Detecting…
                      </span>
                    )}
                    {locState === 'done' && distance !== null && (
                      <span className="text-xs font-semibold text-accentGreen dark:text-neonMint">
                        {distance.toFixed(1)} km away
                      </span>
                    )}
                  </div>
                  {locState === 'error' && (
                    <p className="text-xs text-red-500">{locError}</p>
                  )}
                  {locState === 'idle' && (
                    <p className="text-xs opacity-50">Detect your location to calculate delivery charges.</p>
                  )}
                  {locState === 'done' && (
                    <div className="grid grid-cols-4 gap-1 mt-1">
                      {[{ label: '0–2 km', val: '₹0 Free' }, { label: '2–5 km', val: '₹20' }, { label: '5–10 km', val: '₹40' }, { label: '10+ km', val: '₹60+' }].map(t => (
                        <div key={t.label} className="text-center text-[10px] bg-white dark:bg-white/10 rounded-lg py-1 px-0.5">
                          <div className="font-bold text-accentGreen dark:text-neonMint">{t.val}</div>
                          <div className="opacity-50 mt-0.5">{t.label}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bill breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="opacity-60">Subtotal ({cartCount} items)</span>
                    <span className="font-semibold text-darkMoss dark:text-mintCream">₹{cartTotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="opacity-60">GST (5%)</span>
                    <span className="font-semibold text-darkMoss dark:text-mintCream">₹{gst}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="opacity-60">
                      Delivery
                      {locState !== 'done' && <span className="ml-1 text-[10px] italic">(detect location)</span>}
                    </span>
                    <span className="font-semibold text-darkMoss dark:text-mintCream">
                      {locState === 'done'
                        ? delivery === 0 ? '🎉 Free' : `₹${delivery}`
                        : '—'}
                    </span>
                  </div>
                  <div className="h-px bg-darkMoss/10 dark:bg-white/10" />
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-darkMoss dark:text-mintCream">Total Payable</span>
                    <span className="text-2xl font-black font-serif text-accentGreen dark:text-neonMint">
                      ₹{locState === 'done' ? grandTotal : cartTotal + gst}
                      {locState !== 'done' && <span className="text-xs font-normal opacity-50 ml-1">+ delivery</span>}
                    </span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={placeOrder}
                  className="w-full py-4 rounded-2xl text-white font-bold text-base shadow-lg bg-accentGreen dark:bg-neonMint dark:text-deepForest transition hover:brightness-110"
                >
                  Place Order via WhatsApp
                </motion.button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};
