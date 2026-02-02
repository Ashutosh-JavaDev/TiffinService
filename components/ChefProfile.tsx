import React from 'react';
import { motion } from 'framer-motion';
import { CHEF_EXPERTISE } from '../constants';

export const ChefProfile: React.FC = () => {
  return (
    <section id="chef" className="relative py-32 overflow-hidden bg-white dark:bg-deepForest transition-colors duration-500">
      {/* Parallax-style background texture */}
      <div className="absolute inset-0 z-0 opacity-10 dark:opacity-5 pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1600" 
          className="w-full h-full object-cover grayscale"
          alt=""
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white dark:from-deepForest dark:to-deepForest" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="mb-8">
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block text-accentGreen dark:text-neonMint font-sans font-bold uppercase tracking-[0.2em] text-xs mb-4"
              >
                Culinary Heritage
              </motion.span>
              <h2 className="text-5xl md:text-6xl font-serif font-bold leading-tight mb-6">
                The Mastermind: <br />
                <span className="text-accentGreen dark:text-neonMint italic">Diwakar Kumar</span>
              </h2>
              <div className="h-1.5 w-24 bg-accentGreen dark:bg-neonMint rounded-full mb-8" />
            </div>

            <p className="text-lg text-darkMoss/70 dark:text-mintCream/70 mb-12 leading-relaxed max-w-xl font-sans">
              With decades of experience in perfecting North Indian culinary traditions, 
              Diwakar Kumar founded Tasty Tiffin Service with a simple mission: 
              <span className="text-darkMoss dark:text-mintCream font-semibold"> "No one should miss the taste of their mother's kitchen."</span> 
              Every spice blend is proprietary, and every meal is a testament to authenticity.
            </p>

            {/* Expertise Bars */}
            <div className="space-y-10">
              {CHEF_EXPERTISE.map((skill, idx) => (
                <div key={skill.label} className="group">
                  <div className="flex justify-between items-end mb-3">
                    <span className="font-sans font-bold text-sm uppercase tracking-widest text-darkMoss dark:text-mintCream">
                      {skill.label}
                    </span>
                    <span className="text-accentGreen dark:text-neonMint font-mono font-bold text-lg">
                      {skill.value}%
                    </span>
                  </div>
                  <div className="h-[3px] w-full bg-darkMoss/5 dark:bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.value}%` }}
                      transition={{ duration: 1.5, delay: idx * 0.2, ease: [0.16, 1, 0.3, 1] }}
                      viewport={{ once: true }}
                      className="h-full bg-accentGreen dark:bg-neonMint shadow-[0_0_10px_rgba(144,238,144,0.3)]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Visual Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Main Portrait with Luxury Frame */}
            <div className="relative z-10 aspect-[4/5] rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] border border-white/20">
              <img 
                /* 
                   Vite path for 'public/diwakar.jpeg'.
                   This is the most reliable way to load local assets in Vite.
                */
                src="/diwakar.jpeg"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&q=80&w=800";
                }}
                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                alt="Chef Diwakar Kumar"
              />
              
              {/* Soft overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-darkMoss/40 to-transparent pointer-events-none" />
            </div>

            {/* Floating Glass Quote Card */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute -bottom-8 -right-4 lg:-right-12 z-20 glass p-8 rounded-3xl shadow-2xl max-w-[260px] border border-white/30 dark:border-neonMint/20"
            >
              <div className="text-accentGreen dark:text-neonMint mb-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C14.9124 8 14.017 7.10457 14.017 6V5C14.017 3.89543 14.9124 3 16.017 3H19.017C21.2261 3 23.017 4.79086 23.017 7V15C23.017 18.3137 20.3307 21 17.017 21H14.017ZM1 21L1 18C1 16.8954 1.89543 16 3 16H6C6.55228 16 7 15.5523 7 15V9C7 8.44772 6.55228 8 6 8H3C1.89543 8 1 7.10457 1 6V5C1 3.89543 1.89543 3 3 3H6C8.20914 3 10 4.79086 10 7V15C10 18.3137 7.31371 21 4 21H1Z" />
                </svg>
              </div>
              <p className="font-serif italic text-lg text-darkMoss dark:text-mintCream leading-tight">
                "Food is not just sustenance, it's a memory served on a plate."
              </p>
            </motion.div>

            {/* Decorative Background Elements */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-accentGreen/10 dark:bg-neonMint/10 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-accentGreen/5 dark:bg-neonMint/5 rounded-full blur-3xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};