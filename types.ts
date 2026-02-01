
// Fix: Import React to provide access to React.ReactNode type
import React from 'react';

export enum MenuTab {
  TIFFIN = 'Tiffin Circle',
  NAMKEEN = 'Namkeen Vault',
  SWEETS = 'The Sweet Spot'
}

export interface MenuItem {
  id: string;
  title: string;
  price: string;
  description: string;
  category: MenuTab;
  image: string;
}

export interface StatCardData {
  label: string;
  value: string;
  trend: string;
  icon: React.ReactNode;
}
