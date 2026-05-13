import React from 'react';

export enum MenuTab {
  TIFFIN = 'Tiffin Circle',
  BREAKFAST = 'Breakfast',
  LUNCH = 'Lunch',
  DINNER = 'Dinner',
  SWEETS = 'The Sweet Spot'
}

export interface MenuItem {
  id: string;
  title: string;
  price: string;
  numericPrice: number;
  description: string;
  category: MenuTab;
  image: string;
  isVeg: boolean;
}

export interface StatCardData {
  label: string;
  value: string;
  trend: string;
  icon: React.ReactNode;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
  weight?: string;
  isVeg?: boolean;
}
