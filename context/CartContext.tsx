import React, { createContext, useContext, useState, useCallback } from 'react';
import { CartItem } from '../types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, delta: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  showCart: boolean;
  setShowCart: (v: boolean) => void;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);

  const addToCart = useCallback((item: Omit<CartItem, 'quantity'>) => {
    setCart(prev => {
      const existing = prev.find(c => c.id === item.id);
      if (existing) return prev.map(c => c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c);
      return [...prev, { ...item, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart(prev => prev.filter(c => c.id !== id));
  }, []);

  const updateQty = useCallback((id: string, delta: number) => {
    setCart(prev =>
      prev.map(c => c.id === id ? { ...c, quantity: c.quantity + delta } : c)
          .filter(c => c.quantity > 0)
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, clearCart, cartCount, cartTotal, showCart, setShowCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
