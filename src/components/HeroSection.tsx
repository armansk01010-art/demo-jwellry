import React from 'react';
import { ArrowRight, Sparkles, Gem, ShieldCheck } from 'lucide-react';

interface HeroSectionProps {
  onShopClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onShopClick }) => {
  return (
    <section id="home" className="relative min-h-[85vh] lg:min-h-[90vh] bg-[#FDFBF7] flex items-center overflow-hidden border-b border-[#EAE3D6]">
      {/* Subtle ambient luxury backdrop gradient */}
      <div className="absolute inset-0 bg-radial-[at_top_right] from-[#F4EFE6] via-transparent to-transparent opacity-70 pointer-events-none" />

      {/* Decorative Floating Jewellery Elements (Animation 7) */}
      <div className="absolute top-12 left-10 lg:left-24 floating-jewel-slow pointer-events-none hidden sm:flex items-center gap-2 p-2 px-3 bg-white/80 backdrop-blur-xs rounded-full border border-[#E7DFD5] shadow-xs text-[11px] text-[#78716C]">
        <Gem className="w-3.5 h-3.5 text-[#B38F24]" />
        <span>22K Micron Gold Polish</span>
      </div>

      <div className="absolute bottom-16 right-8 lg:right-28 floating-jewel-delay pointer-events-none hidden sm:flex items-center gap-2 p-2 px-3 bg-white/80 backdrop-blur-xs rounded-full border border-[#E7DFD5] shadow-xs text-[11px] text-[#78716C]">
        <Sparkles className="w-3.5 h-3.5 text-[#B38F24]" />
        <span>Uncut Polki & Kundan Stones</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Brand Editorial & Call to Action (Animation 1: Hero Reveal) */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Editorial Kicker */}
            <div className="anim-hero-reveal inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] uppercase text-[#B38F24]">
              <span className="w-6 h-[1px] bg-[#B38F24]" />
              <span>Jaldhara Atelier Collection</span>
            </div>

            {/* Hero Main Headline */}
            <h1 className="anim-hero-reveal-delay-1 text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#1C1917] tracking-tight leading-[1.08] text-balance">
              The Royalty of <span className="italic font-normal font-serif text-[#B38F24]">Kundan & Polki</span>, Crafted For You.
            </h1>

            {/* Description */}
            <p className="anim-hero-reveal-delay-2 text-base sm:text-lg text-[#78716C] leading-relaxed max-w-xl">
              Immerse yourself in handcrafted artificial jewellery where imperial Mughal artistry meets modern durability. 22K micron matte gold polish, hypoallergenic alloy, and eternal radiance.
            </p>

            {/* Action Group with Jewellery Shine Effect (Animation 5) */}
            <div className="anim-hero-reveal-delay-2 pt-2 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onShopClick}
                className="relative px-8 py-4 bg-[#1C1917] hover:bg-[#B38F24] text-[#FDFBF7] text-xs font-bold uppercase tracking-widest rounded-sm transition-all duration-300 shadow-md flex items-center gap-3 jewellery-shine group cursor-pointer"
              >
                <span>Shop Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="https://www.meesho.com/Jaldharastore"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-4 bg-transparent border border-[#1C1917]/20 hover:border-[#B38F24] hover:text-[#B38F24] text-[#1C1917] text-xs font-semibold uppercase tracking-widest rounded-sm transition-colors text-center"
              >
                Visit Meesho Store
              </a>
            </div>

            {/* Trust Markers */}
            <div className="pt-6 border-t border-[#EAE3D6] grid grid-cols-3 gap-4 text-left">
              <div>
                <div className="text-sm font-bold text-[#1C1917] font-serif">Anti-Tarnish</div>
                <div className="text-[11px] text-[#A89F91]">Double-seal protective finish</div>
              </div>
              <div>
                <div className="text-sm font-bold text-[#1C1917] font-serif">Skin-Safe</div>
                <div className="text-[11px] text-[#A89F91]">100% Lead & Nickel free</div>
              </div>
              <div>
                <div className="text-sm font-bold text-[#1C1917] font-serif">India-Wide</div>
                <div className="text-[11px] text-[#A89F91]">Fast door delivery & COD</div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Campaign Artwork (Animation 2: Luxury Image Reveal) */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Outer decorative gold frame accent */}
              <div className="absolute -inset-2 sm:-inset-3 border border-[#D4AF37]/40 rounded-xl pointer-events-none transform -rotate-1" />

              {/* Main Campaign Image */}
              <div className="relative rounded-lg overflow-hidden shadow-2xl bg-[#F4EFE6] aspect-[16/11] anim-luxury-reveal group">
                <img
                  src="/src/assets/images/hero_jewellery_campaign_1794478819927.jpg"
                  alt="Jaldhara Royal Bridal Kundan Choker and Chandbali Earrings Campaign"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
                />

                {/* Champagne Gold Light Sweep (Animation 5) */}
                <div className="absolute inset-0 jewellery-shine pointer-events-none" />

                {/* Editorial Floating Tag */}
                <div className="absolute bottom-4 left-4 bg-black/75 backdrop-blur-sm p-3 px-4 rounded-sm text-left border border-white/10 text-white">
                  <div className="text-[10px] uppercase tracking-widest text-[#F3E5AB] font-semibold">
                    The Noor Bridal Haar
                  </div>
                  <div className="text-xs text-white/90 font-serif">
                    Featuring 22K Kundan Choker & Chandbalis
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
