
import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';

export const Hero: React.FC = () => {
  const [typewriterText, setTypewriterText] = useState("");
  const phrases = ["Homemade.", "Hygienic.", "Handcrafted."];
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setTypewriterText(currentPhrase.substring(0, typewriterText.length + 1));
        if (typewriterText === currentPhrase) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setTypewriterText(currentPhrase.substring(0, typewriterText.length - 1));
        if (typewriterText === "") {
          setIsDeleting(false);
          setPhraseIndex((phraseIndex + 1) % phrases.length);
        }
      }
    }, isDeleting ? 50 : 150);
    return () => clearTimeout(timeout);
  }, [typewriterText, isDeleting, phraseIndex]);

  // 3D Tilt Effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-100, 100], [15, -15]));
  const rotateY = useSpring(useTransform(x, [-100, 100], [-15, 15]));

  const handleMouseMove = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section className="min-h-screen pt-32 pb-20 flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accentGreen/10 dark:bg-neonMint/10 text-accentGreen dark:text-neonMint mb-6">
            <Star size={14} fill="currentColor" />
            <span className="text-xs font-bold uppercase tracking-widest">{typewriterText}<span className="animate-pulse">|</span></span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-serif font-bold leading-tight mb-8">
            Gourmet Tiffins for the <span className="text-accentGreen dark:text-neonMint italic">Modern</span> Professional.
          </h1>
          
          <p className="text-lg opacity-80 mb-10 max-w-lg leading-relaxed">
            Experience the warmth of home-cooked meals delivered with luxury precision. 
            Diwakar Kumar's Tasty Tiffin Service combines traditional flavors with ultra-hygienic standards.
          </p>

          <div className="flex flex-wrap gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-accentGreen dark:bg-neonMint text-white dark:text-deepForest rounded-full font-bold flex items-center gap-2"
            >
              Order Now <ArrowRight size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border border-darkMoss/20 dark:border-neonMint/30 rounded-full font-bold"
            >
              Explore Menu
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative perspective-1000"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX, rotateY }}
        >
          <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50 dark:border-neonMint/20">
            <img 
              src="https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&q=80&w=800" 
              alt="Premium Tiffin"
              className="w-full h-auto object-cover transform scale-105 hover:scale-110 transition-transform duration-700"
            />
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-accentGreen/20 dark:bg-neonMint/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-accentGreen/10 dark:bg-neonMint/10 rounded-full blur-3xl" />
        </motion.div>
      </div>
    </section>
  );
};
