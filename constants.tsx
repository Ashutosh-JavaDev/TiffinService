
import React from 'react';
import { MenuTab, MenuItem } from './types';

export const MENU_ITEMS: MenuItem[] = [
  // Tiffin
  { id: 't1', title: 'Standard Daily Tiffin', price: '₹120/meal', description: 'Complete balanced North Indian meal with 4 Rotis, Rice, Dal, Sabzi & Raita.', category: MenuTab.TIFFIN, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400' },
  { id: 't2', title: 'Premium Corporate Meal', price: '₹180/meal', description: 'Enhanced menu featuring exotic seasonal veg, Paneer, Premium Basmati & Sweet.', category: MenuTab.TIFFIN, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=400' },
  
  // Namkeen
  { id: 'n1', title: 'Artisanal Bhakarwadi', price: '₹140/250g', description: 'Spicy, tangy, and sweet maharashtrian specialty snack.', category: MenuTab.NAMKEEN, image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=400' },
  { id: 'n2', title: 'Premium Masala Kaju', price: '₹450/250g', description: 'Jumbo cashews roasted with our signature spice blend.', category: MenuTab.NAMKEEN, image: 'https://images.unsplash.com/photo-1623341214825-9f4f963727da?auto=format&fit=crop&q=80&w=400' },
  { id: 'n3', title: 'Roasted Makhana', price: '₹120/100g', description: 'Healthy foxnuts toasted with Himalayan salt and pepper.', category: MenuTab.NAMKEEN, image: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce70?auto=format&fit=crop&q=80&w=400' },
  { id: 'n4', title: 'Special Mixture', price: '₹110/250g', description: 'A crunchy medley of lentils, nuts, and spices.', category: MenuTab.NAMKEEN, image: 'https://images.unsplash.com/photo-1589113103503-496bc7d08891?auto=format&fit=crop&q=80&w=400' },
  
  // Sweets
  { id: 's1', title: 'Traditional Thekua', price: '₹180/500g', description: 'Iconic wheat and jaggery cookies, handcrafted to perfection.', category: MenuTab.SWEETS, image: 'https://images.unsplash.com/photo-1582298538104-fe2e74c27f59?auto=format&fit=crop&q=80&w=400' },
  { id: 's2', title: 'Seasonal Mango Delight', price: '₹220/box', description: 'Fresh seasonal dessert prepared with Alphonso pulp.', category: MenuTab.SWEETS, image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&q=80&w=400' },
];

export const CHEF_EXPERTISE = [
  { label: 'Indian Cuisine', value: 95 },
  { label: 'Flavor Fusion', value: 85 },
  { label: 'Traditional Baking', value: 80 },
];
