import React from 'react';
import { motion } from 'framer-motion';
import { CHEF_EXPERTISE } from '../constants';

export const ChefProfile: React.FC = () => {
  return (
    <section id="chef" className="relative py-32 overflow-hidden bg-white dark:bg-deepForest transition-colors duration-500">
      {/* Background Texture */}
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
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="mb-8">
              <span className="inline-block text-accentGreen dark:text-neonMint font-sans font-bold uppercase tracking-[0.2em] text-xs mb-4">
                The Culinary Master
              </span>
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

            <div className="space-y-10">
              {CHEF_EXPERTISE.map((skill, idx) => (
                <div key={skill.label}>
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

          {/* Portrait Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative z-10 aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/20">
              <img 
                /* 
                   Vite serves the 'public' folder at the root path.
                   Using 'diwakar.jpeg' is the correct relative web path.
                */
                src="Diwakar.png"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  // If our local image fails, fall back to a high-quality placeholder
                  if (!target.src.includes('unsplash')) {
                    target.src = "https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&q=80&w=800";
                  }
                }}
                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                alt="Chef Diwakar Kumar"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-darkMoss/40 to-transparent pointer-events-none" />
            </div>

            {/* Quote Card */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute -bottom-8 -right-4 lg:-right-8 z-20 glass p-8 rounded-3xl shadow-2xl max-w-[260px] border border-white/30 dark:border-neonMint/20"
            >
              <p className="font-serif italic text-lg text-darkMoss dark:text-mintCream leading-tight">
                "Food is not just sustenance, it's a memory served on a plate."
              </p>
            </motion.div>

            {/* Decorative Blurs */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-accentGreen/10 dark:bg-neonMint/10 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-accentGreen/5 dark:bg-neonMint/5 rounded-full blur-3xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};