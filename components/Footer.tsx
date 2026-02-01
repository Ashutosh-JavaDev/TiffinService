
import React from 'react';
import { Instagram, Twitter, Facebook, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-darkMoss text-mintCream pt-24 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 mb-20">
          <div>
            <h2 className="text-7xl md:text-9xl font-serif font-bold opacity-10 mb-8 select-none">TASTY</h2>
            <div className="space-y-6">
              <a 
                href="tel:9534550381" 
                className="block text-4xl md:text-5xl font-bold hover:text-neonMint transition-colors"
              >
                9534550381
              </a>
              <a 
                href="mailto:tastytiffin77@gmail.com" 
                className="block text-2xl md:text-3xl font-medium opacity-80 hover:text-neonMint transition-colors"
              >
                tastytiffin77@gmail.com
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
            <div>
              <h4 className="font-bold uppercase tracking-widest text-xs mb-6 opacity-40">Navigate</h4>
              <ul className="space-y-4 font-medium">
                <li><a href="#" className="hover:text-neonMint transition-colors">Home</a></li>
                <li><a href="#chef" className="hover:text-neonMint transition-colors">Chef Profile</a></li>
                <li><a href="#menu" className="hover:text-neonMint transition-colors">Menu Vault</a></li>
                <li><a href="#contact" className="hover:text-neonMint transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold uppercase tracking-widest text-xs mb-6 opacity-40">Snacks</h4>
              <ul className="space-y-4 font-medium">
                <li><a href="#" className="hover:text-neonMint transition-colors">Bhakarwadi</a></li>
                <li><a href="#" className="hover:text-neonMint transition-colors">Masala Kaju</a></li>
                <li><a href="#" className="hover:text-neonMint transition-colors">Thekua</a></li>
                <li><a href="#" className="hover:text-neonMint transition-colors">Mathri</a></li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <h4 className="font-bold uppercase tracking-widest text-xs mb-6 opacity-40">Location</h4>
              <p className="opacity-70 leading-relaxed mb-6">
                Premium Tiffin Hub,<br />
                Ranchi, Jharkhand 462022
              </p>
              <div className="flex gap-4">
                <SocialIcon icon={<Instagram size={18} />} />
                <SocialIcon icon={<Twitter size={18} />} />
                <SocialIcon icon={<Facebook size={18} />} />
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-12 border-t border-white/10 flex flex-col md:row items-center justify-between gap-6">
          <p className="text-sm opacity-40">© 2024 Tasty Tiffin & Snacks. Handcrafted by Diwakar Kumar.</p>
          <div className="flex gap-8 text-sm opacity-40">
            <a href="#" className="hover:text-neonMint">Privacy Policy</a>
            <a href="#" className="hover:text-neonMint">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon: React.FC<{ icon: React.ReactNode }> = ({ icon }) => (
  <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-neonMint hover:text-deepForest hover:border-neonMint transition-all duration-300">
    {icon}
  </a>
);
