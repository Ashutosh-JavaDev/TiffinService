import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    name: 'Ananya Sharma',
    role: 'Software Architect',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    content: "The Standard Tiffin is a lifesaver. It tastes exactly like home. Diwakar's attention to hygiene is visible in every delivery.",
    rating: 5
  },
  {
    name: 'Vikram Mehta',
    role: 'Corporate Lawyer',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    content: "Artisanal Bhakarwadi is to die for! I order it every week for my office snacks. The packaging is premium and the flavors are consistent.",
    rating: 5
  },
  {
    name: 'Priya Rai',
    role: 'Food Blogger',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150',
    content: "Finding authentic Bihar Thekua in a modern avatar was a surprise. Tasty Tiffin & Snacks has nailed the tradition-meets-modernity vibe.",
    rating: 5
  }
];

export const Testimonials: React.FC = () => {
  return (
    <section className="py-32 relative overflow-hidden bg-mintCream dark:bg-deepForest">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block p-3 rounded-2xl bg-accentGreen/10 dark:bg-neonMint/10 text-accentGreen dark:text-neonMint mb-6"
          >
            <Quote size={24} fill="currentColor" />
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6">
            The <span className="text-accentGreen dark:text-neonMint">Gourmet</span> Circle
          </h2>
          <p className="opacity-60 max-w-2xl mx-auto italic font-serif text-lg">
            "We don't just deliver food; we deliver satisfaction validated by our premium community."
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="glass p-10 rounded-[2.5rem] border border-darkMoss/5 dark:border-white/5 shadow-xl hover:shadow-2xl transition-all duration-500 relative group"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={16} className="text-accentGreen dark:text-neonMint fill-current" />
                ))}
              </div>

              <p className="text-lg leading-relaxed mb-10 opacity-80 italic">"{review.content}"</p>

              <div className="flex items-center gap-4 border-t border-darkMoss/5 dark:border-white/10 pt-8">
                <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-lg transform group-hover:rotate-6 transition-transform">
                  <img src={review.image} alt={review.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-darkMoss dark:text-mintCream">{review.name}</h4>
                  <p className="text-xs uppercase tracking-widest opacity-40">{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accentGreen/5 dark:bg-neonMint/5 rounded-full blur-[120px] -z-10" />
    </section>
  );
};