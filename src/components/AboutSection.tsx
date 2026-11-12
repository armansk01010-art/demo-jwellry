import React from 'react';
import { Award, Feather, ShieldCheck, HeartHandshake } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about-jaldhara" className="py-20 sm:py-28 bg-[#F8F4EC] border-b border-[#EAE3D6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Brand Manifesto */}
          <div className="lg:col-span-6 space-y-6">
            <div className="text-xs font-semibold tracking-[0.25em] uppercase text-[#B38F24] flex items-center gap-2">
              <span className="w-6 h-[1px] bg-[#B38F24]" />
              <span>Section 10 · Brand Narrative</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#1C1917] tracking-tight leading-tight">
              About Jaldhara: Where Heritage Meets Wearable Art.
            </h2>

            <p className="text-sm sm:text-base text-[#78716C] leading-relaxed">
              JALDHARA was conceived with a clear vision: to celebrate the splendor of royal Indian jewellery while offering lightweight, skin-safe, and accessible artificial jewellery for modern celebrations.
            </p>

            <p className="text-sm text-[#78716C] leading-relaxed">
              From our artisan ateliers to your jewellery box, every earring pair, choker necklace, and bridal ensemble is created with uncompromising respect for Indian traditions. By utilizing multi-dip micron gold electroplating over hypoallergenic brass alloys, we deliver the warm glow of solid 22K gold without the exorbitant investment or safety concerns of fine jewellery.
            </p>

            {/* Core Brand Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#E2D8C9]">
              <div className="flex gap-3 items-start">
                <Award className="w-5 h-5 text-[#B38F24] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-serif font-bold text-[#1C1917]">
                    Hand-Set Polki & Kundan
                  </h4>
                  <p className="text-xs text-[#78716C] mt-0.5">
                    Individual stone setting with silver foil backings for authentic candlelight brilliance.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <ShieldCheck className="w-5 h-5 text-[#B38F24] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-serif font-bold text-[#1C1917]">
                    Anti-Tarnish Longevity
                  </h4>
                  <p className="text-xs text-[#78716C] mt-0.5">
                    Coated with protective micro-seal layers to guard against humidity and perspiration.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <Feather className="w-5 h-5 text-[#B38F24] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-serif font-bold text-[#1C1917]">
                    Balanced Featherweight
                  </h4>
                  <p className="text-xs text-[#78716C] mt-0.5">
                    Engineered to prevent earlobe pulling during marathon wedding rituals and dances.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <HeartHandshake className="w-5 h-5 text-[#B38F24] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-serif font-bold text-[#1C1917]">
                    Empowering Artisans
                  </h4>
                  <p className="text-xs text-[#78716C] mt-0.5">
                    Supporting traditional handcrafted jewellery workers and preservation of heritage techniques.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Presentation Collage */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-xl border border-[#D5CBBF] bg-[#F4EFE6] relative">
                <img
                  src="/src/assets/images/jewellery_set_heritage_1794478822284.jpg"
                  alt="Jaldhara Jewellery presentation in atelier"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <div className="text-[10px] tracking-widest uppercase text-[#F3E5AB] font-bold">
                    Jaldhara Signature Craft
                  </div>
                  <div className="text-sm font-serif mt-0.5">
                    Accessible Imperial Grandeur for the Modern Woman
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
