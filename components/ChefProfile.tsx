
import React from 'react';
import { motion } from 'framer-motion';
import { CHEF_EXPERTISE } from '../constants';

export const ChefProfile: React.FC = () => {
  return (
    <section id="chef" className="relative py-32 overflow-hidden">
      {/* Parallax-style background */}
      <div className="absolute inset-0 z-0 opacity-10 dark:opacity-5">
        <img 
          src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1600" 
          className="w-full h-full object-cover grayscale"
          alt="Kitchen Background"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">
              The Mastermind: <span className="text-accentGreen dark:text-neonMint">Diwakar Kumar</span>
            </h2>
            <p className="text-lg opacity-80 mb-10 leading-relaxed">
              With decades of experience in perfecting North Indian culinary traditions, 
              Diwakar Kumar founded Tasty Tiffin Service with a simple mission: 
              "No one should miss the taste of their mother's kitchen." 
              Every spice blend is proprietary, and every meal is a testament to authenticity.
            </p>

            <div className="space-y-8">
              {CHEF_EXPERTISE.map((skill, idx) => (
                <div key={skill.label}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold tracking-wide">{skill.label}</span>
                    <span className="text-accentGreen dark:text-neonMint font-mono">{skill.value}%</span>
                  </div>
                  <div className="h-2 w-full bg-darkMoss/10 dark:bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.value}%` }}
                      transition={{ duration: 1.5, delay: idx * 0.2, ease: "easeOut" }}
                      viewport={{ once: true }}
                      className="h-full bg-accentGreen dark:bg-neonMint"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-white/20">
              <img 
                src="https://images.unsplash.com/photo-1577214282222-0347823550d4?auto=format&fit=crop&q=80&w=600" 
                alt="Chef Diwakar Kumar"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 glass p-6 rounded-2xl shadow-xl max-w-[200px]">
              <p className="font-serif italic text-sm">"Food is not just sustenance, it's a memory served on a plate."</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
