import React from 'react';
import { motion } from 'framer-motion';

const milestones = [
  {
    year: '2010',
    title: 'The First Recipe',
    description: 'Diwakar Kumar serves his first handcrafted tiffin in Patna, focusing on authentic North Indian flavors.',
  },
  {
    year: '2015',
    title: 'Community Favorite',
    description: 'Tasty Tiffin becomes the preferred choice for hundreds of professionals across the city.',
  },
  {
    year: '2020',
    title: 'Namkeen Vault Launch',
    description: 'Expansion into artisanal snacks, bringing traditional Bihar treats like Thekua to the digital age.',
  },
  {
    year: '2024',
    title: 'Gourmet Evolution',
    description: 'Launch of our premium subscription model and ultra-modern culinary web experience.',
  },
];

export const Timeline: React.FC = () => {
  return (
    <section className="py-32 bg-mintCream dark:bg-deepForest overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-4">Our Culinary <span className="text-accentGreen dark:text-neonMint italic">Odyssey</span></h2>
          <p className="opacity-60 max-w-lg mx-auto">From a single kitchen to a gourmet revolution, every step has been seasoned with passion.</p>
        </div>

        <div className="relative">
          {/* Central Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-darkMoss/10 dark:bg-white/10" />

          <div className="space-y-24">
            {milestones.map((item, idx) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className={`relative flex items-center justify-between gap-8 ${idx % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                {/* Content */}
                <div className="w-[45%]">
                  <div className={`p-8 rounded-3xl glass shadow-xl border border-darkMoss/5 dark:border-white/5 ${idx % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <span className="text-3xl font-serif font-bold text-accentGreen dark:text-neonMint mb-2 block">{item.year}</span>
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-sm opacity-70 leading-relaxed">{item.description}</p>
                  </div>
                </div>

                {/* Marker */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-accentGreen dark:bg-neonMint shadow-[0_0_15px_rgba(144,238,144,0.5)] z-10" />

                {/* Spacer */}
                <div className="w-[45%]" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};