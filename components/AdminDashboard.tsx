
import React from 'react';
import { motion } from 'framer-motion';
import { X, TrendingUp, Users, Package, DollarSign, Activity } from 'lucide-react';

interface AdminDashboardProps {
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose }) => {
  const stats = [
    { label: 'Total Orders', value: '2,482', trend: '+12%', icon: <Package size={20} /> },
    { label: 'Active Subscriptions', value: '458', trend: '+5%', icon: <Users size={20} /> },
    { label: 'Revenue (MTD)', value: '₹1.2L', trend: '+18%', icon: <DollarSign size={20} /> },
    { label: 'Snack Inventory', value: '18+ Items', trend: 'Healthy', icon: <Activity size={20} /> },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-deepForest/95 backdrop-blur-xl flex items-center justify-center p-6"
    >
      <motion.div
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        className="w-full max-w-6xl glass rounded-3xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        <div className="p-8 border-b border-neonMint/20 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-serif font-bold text-neonMint">Executive Suite</h2>
            <p className="text-sm opacity-60">Real-time performance metrics for Diwakar Kumar</p>
          </div>
          <button 
            onClick={onClose}
            className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-neonMint/10 transition-colors"
          >
            <X size={24} className="text-neonMint" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-neonMint/5 border border-neonMint/10 p-6 rounded-2xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-neonMint/10 rounded-xl text-neonMint">
                    {stat.icon}
                  </div>
                  <span className="text-xs font-bold text-neonMint px-2 py-1 bg-neonMint/10 rounded-full">{stat.trend}</span>
                </div>
                <h3 className="text-sm opacity-60 mb-1">{stat.label}</h3>
                <p className="text-3xl font-bold">{stat.value}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-neonMint/5 border border-neonMint/10 p-8 rounded-3xl">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <TrendingUp size={20} className="text-neonMint" /> Growth Trends
                </h3>
                <div className="flex gap-2 text-xs">
                  <span className="px-3 py-1 bg-neonMint/20 rounded-full text-neonMint">Monthly</span>
                </div>
              </div>
              <div className="h-64 flex items-end justify-between gap-4">
                {[40, 65, 50, 80, 70, 95, 85].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className="flex-1 bg-gradient-to-t from-neonMint/40 to-neonMint rounded-t-lg relative group"
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-neonMint text-deepForest px-2 py-1 rounded text-[10px] font-bold">
                      {h}%
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="flex justify-between mt-4 text-[10px] uppercase tracking-widest opacity-40">
                <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span>
              </div>
            </div>

            <div className="bg-neonMint/5 border border-neonMint/10 p-8 rounded-3xl">
              <h3 className="text-xl font-bold mb-8">Popular Categories</h3>
              <div className="space-y-6">
                {[
                  { label: 'Daily Tiffin', val: 75, color: '#90EE90' },
                  { label: 'Snack Vault', val: 45, color: '#4ADE80' },
                  { label: 'Corporate Bulk', val: 30, color: '#10B981' }
                ].map((cat) => (
                  <div key={cat.label}>
                    <div className="flex justify-between text-sm mb-2">
                      <span>{cat.label}</span>
                      <span className="opacity-60">{cat.val}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-neonMint/10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${cat.val}%` }}
                        className="h-full" 
                        style={{ backgroundColor: cat.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
