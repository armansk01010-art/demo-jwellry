import React from 'react';
import { Sparkles, Shield, Compass, Gem } from 'lucide-react';
import { resolveImageUrl, handleImageError } from '../utils/imageUtils';

export const FeaturedEditorialSection: React.FC = () => {
  return (
    <section id="featured-collection" className="py-20 sm:py-28 bg-[#1C1917] text-[#FDFBF7] relative overflow-hidden">
      {/* Decorative subtle golden glow background */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-semibold tracking-[0.3em] uppercase text-[#F3E5AB] mb-3 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>Section 07 · Atelier Editorial</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
            The Rajwada Kundan & Heritage Polki Edit
          </h2>
          <p className="text-sm sm:text-base text-[#D5CBBF] mt-3 leading-relaxed">
            A celebration of India’s grandest jewellery traditions. Where centuries-old Jadau techniques meet high-precision micro-plating to offer authentic royal magnificence.
          </p>
        </div>

        {/* Editorial Split Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: Artisan Craftsmanship Photo */}
          <div className="lg:col-span-7 relative group">
            <div className="aspect-[16/10] rounded-xl overflow-hidden border border-[#D4AF37]/30 bg-[#292524] shadow-2xl relative">
              <img
                src={resolveImageUrl('/images/editorial_craftsmanship.webp')}
                alt="Artisan handcrafting artificial polki jewellery at Jaldhara studio"
                referrerPolicy="no-referrer"
                loading="lazy"
                onError={handleImageError}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              {/* Floating Craftsmanship Note */}
              <div className="absolute bottom-5 left-5 right-5 p-4 bg-black/60 backdrop-blur-md rounded-md border border-white/10">
                <div className="text-[10px] uppercase font-bold tracking-widest text-[#F3E5AB]">
                  Step 04 · Jadau Stone Embellishment
                </div>
                <p className="text-xs text-white/90 mt-1 font-serif">
                  Each polki crystal is carefully hand-set with pure silver foil backing to catch candlelight, producing the distinctive warm fire of heirloom heirlooms.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Technical Mastery & Architectural Pillars */}
          <div className="lg:col-span-5 space-y-6">
            <div className="border-l-2 border-[#D4AF37] pl-4 space-y-2">
              <span className="text-xs uppercase font-bold tracking-widest text-[#F3E5AB]">
                Craftsmanship Standards
              </span>
              <h3 className="text-2xl font-serif font-bold text-white">
                Artisanal Precision, Contemporary Wearability
              </h3>
            </div>

            <div className="space-y-4 text-xs text-[#D5CBBF]">
              <div className="p-4 bg-white/5 rounded-lg border border-white/10 flex gap-3.5 items-start">
                <Shield className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white text-sm">22K Multi-Dip Micron Plating</div>
                  <p className="mt-1 leading-relaxed text-[#A89F91]">
                    Electrolytic gold bath deposits an anti-tarnish micro shield, preventing oxidation, green skin marks, and fading across years of festive celebrations.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-white/5 rounded-lg border border-white/10 flex gap-3.5 items-start">
                <Gem className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white text-sm">Foil-Backed Kundan Crystals</div>
                  <p className="mt-1 leading-relaxed text-[#A89F91]">
                    Reflective mirror foil beneath every stone multiplies natural ambient light, creating depth indistinguishable from heritage gemstones.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-white/5 rounded-lg border border-white/10 flex gap-3.5 items-start">
                <Compass className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white text-sm">Featherlight Ergonomics</div>
                  <p className="mt-1 leading-relaxed text-[#A89F91]">
                    Hollow wire-frame filigree and counter-balanced backings ensure heavy bridal chokers and jhumkas remain effortless from morning pheras to late-night reception dances.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
