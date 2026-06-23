import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Timer, ArrowRight, Tag, ShieldCheck } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Product } from '../../types';

interface OffersSectionProps {
  onSelectProduct: (product: Product) => void;
  onNavigateShop: (category?: any) => void;
}

export const OffersSection: React.FC<OffersSectionProps> = ({ onSelectProduct, onNavigateShop }) => {
  const { offerConfig, products } = useStore();
  const [timeLeft, setTimeLeft] = useState({ days: 4, hours: 18, minutes: 32, seconds: 45 });

  useEffect(() => {
    // Premium countdown animation effect
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!offerConfig.isActive) return null;

  const offerProducts = products.filter(p => offerConfig.productIds.includes(p.id) || p.is_offer_product);

  return (
    <section className="bg-gradient-to-b from-[#161616] via-[#111111] to-[#1a1a1a] text-white py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans border-b border-[#2A2A2A]">
      
      {/* Absolute decorative gold glow spheres */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Upper Announcement Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-black tracking-widest uppercase mb-6 shadow-lg shadow-black/50">
            <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '4s' }} />
            <span>EXCLUSIVELY PRIVILEGED SOIRÉE</span>
          </div>

          <h1 className="font-cinzel text-3xl sm:text-5xl font-extrabold tracking-wider text-white mb-4 leading-tight">
            {offerConfig.title}
          </h1>
          
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-light max-w-2xl mx-auto">
            {offerConfig.subtitle}
          </p>

          {/* Admin Countdown Control Timer Box */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6">
            <div className="flex items-center gap-2 bg-[#222222]/80 border border-[#D4AF37]/30 px-5 py-3 rounded-2xl shadow-xl">
              <Timer className="w-5 h-5 text-[#D4AF37] animate-pulse" />
              <span className="text-xs font-semibold tracking-widest text-gray-300">OFFER EXPIRING IN:</span>
            </div>

            <div className="flex items-center gap-2 font-mono font-bold">
              <div className="bg-[#D4AF37] text-[#111] px-3.5 py-2 rounded-xl text-lg min-w-[50px] text-center shadow-md">
                {timeLeft.days}
                <span className="block text-[9px] font-sans font-extrabold uppercase tracking-widest text-[#222]">Days</span>
              </div>
              <span className="text-xl text-[#D4AF37]">:</span>
              <div className="bg-[#D4AF37] text-[#111] px-3.5 py-2 rounded-xl text-lg min-w-[50px] text-center shadow-md">
                {String(timeLeft.hours).padStart(2, '0')}
                <span className="block text-[9px] font-sans font-extrabold uppercase tracking-widest text-[#222]">Hours</span>
              </div>
              <span className="text-xl text-[#D4AF37]">:</span>
              <div className="bg-[#D4AF37] text-[#111] px-3.5 py-2 rounded-xl text-lg min-w-[50px] text-center shadow-md">
                {String(timeLeft.minutes).padStart(2, '0')}
                <span className="block text-[9px] font-sans font-extrabold uppercase tracking-widest text-[#222]">Mins</span>
              </div>
              <span className="text-xl text-[#D4AF37]">:</span>
              <div className="bg-[#D4AF37] text-[#111] px-3.5 py-2 rounded-xl text-lg min-w-[50px] text-center shadow-md">
                {String(timeLeft.seconds).padStart(2, '0')}
                <span className="block text-[9px] font-sans font-extrabold uppercase tracking-widest text-[#222]">Secs</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Offer Banner Custom Image Layout */}
        {offerConfig.bannerImage && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#D4AF37]/30 mb-16 aspect-[16/7] sm:aspect-[21/9]"
          >
            <img 
              src={offerConfig.bannerImage} 
              alt={offerConfig.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-8 sm:p-12">
              <span className="text-xs font-black tracking-widest text-[#D4AF37] mb-2">ROYAL ARCHIVE SHOWCASE</span>
              <h3 className="font-cinzel text-2xl sm:text-4xl font-extrabold text-white max-w-xl">
                SECURE HEIRLOOM WEAVES AT EXCLUSIVE PRIVILEGE
              </h3>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <button 
                  onClick={() => onNavigateShop('Offers')}
                  className="bg-[#D4AF37] text-[#111111] hover:bg-white transition px-8 py-3.5 rounded-full font-bold text-xs tracking-widest shadow-xl flex items-center gap-2 group"
                >
                  <span>EXPLORE PRIVILEGE ARCHIVE</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </button>
                <div className="flex items-center gap-2 text-xs font-light text-gray-300">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                  <span>100% Certified Handloom Quality</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Admin Offer Products List */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-cinzel text-xl sm:text-2xl font-bold tracking-wider text-white flex items-center gap-2">
              <span>FEATURED SOIRÉE MASTERPIECES</span>
              <Tag className="w-5 h-5 text-[#D4AF37]" />
            </h3>
            <button
              onClick={() => onNavigateShop('Offers')}
              className="text-xs font-bold tracking-widest text-[#D4AF37] hover:text-white transition flex items-center gap-1 group"
            >
              <span>VIEW ALL OFFERS</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {offerProducts.slice(0, 4).map((product, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="group relative bg-[#1A1A1A] rounded-2xl overflow-hidden border border-[#2A2A2A] hover:border-[#D4AF37] transition duration-500 shadow-xl flex flex-col cursor-pointer"
              >
                {/* Product Image Tag */}
                <div className="aspect-[3/4] w-full bg-gray-800 overflow-hidden relative">
                  <img 
                    src={product.images[0]} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700" 
                  />
                  {/* Floating Discount Percentage Label */}
                  <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-black px-2.5 py-1 rounded-full shadow-lg">
                    -{product.discount_percentage}% OFF
                  </div>
                  {/* Premium Hover Overlay Quick Add CTA */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-500 flex items-center justify-center p-4">
                    <span className="bg-white/95 text-[#111] font-bold text-xs px-6 py-3 rounded-full shadow-2xl tracking-widest transform translate-y-4 group-hover:translate-y-0 transition duration-300">
                      SECURE MASTERPIECE
                    </span>
                  </div>
                </div>

                {/* Product Meta */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#D4AF37] block">
                      {product.category} • {product.subcategory}
                    </span>
                    <h4 className="font-bold text-sm text-white line-clamp-2 mt-1 group-hover:text-[#D4AF37] transition">
                      {product.name}
                    </h4>
                  </div>

                  <div className="pt-3 border-t border-[#2A2A2A] flex items-baseline justify-between">
                    <div>
                      <span className="text-xs text-gray-400 block tracking-wider uppercase">Privilege Price</span>
                      <span className="text-lg font-black text-[#D4AF37]">
                        ₹{product.offer_price.toLocaleString('en-IN')}
                      </span>
                    </div>
                    {product.mrp_price > product.offer_price && (
                      <div className="text-right">
                        <span className="text-[10px] text-gray-500 block tracking-wider uppercase">Regular MRP</span>
                        <span className="text-xs text-gray-400 line-through">
                          ₹{product.mrp_price.toLocaleString('en-IN')}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

              </motion.div>
            ))}
          </div>
        </div>

      </div>

    </section>
  );
};
