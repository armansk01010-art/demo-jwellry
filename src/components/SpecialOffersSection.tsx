import React, { useState } from 'react';
import { Tag, Gift, Copy, Check, ArrowRight } from 'lucide-react';
import { SPECIAL_OFFERS } from '../data/catalogue';
import { CategoryId } from '../types/jewellery';
import { resolveImageUrl, handleImageError } from '../utils/imageUtils';

interface SpecialOffersSectionProps {
  onSelectCategory: (cat: CategoryId) => void;
}

export const SpecialOffersSection: React.FC<SpecialOffersSectionProps> = ({
  onSelectCategory,
}) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <section id="special-offers" className="py-16 sm:py-24 bg-[#F8F4EC] border-b border-[#EAE3D6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-semibold tracking-[0.25em] uppercase text-[#B38F24] mb-2 flex items-center justify-center gap-2">
            <Gift className="w-3.5 h-3.5 text-[#B38F24]" />
            <span>Section 08 · Curated Incentives</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1C1917] tracking-tight">
            Special Offers & Festive Privileges
          </h2>
          <p className="text-sm text-[#78716C] mt-1">
            Exclusive atelier privileges crafted for weddings, family ceremonies, and gifting moments.
          </p>
        </div>

        {/* 3 Distinct Offer Banners */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SPECIAL_OFFERS.map((offer) => (
            <div
              key={offer.id}
              className="bg-[#FDFBF7] rounded-xl border border-[#E2D8C9] overflow-hidden flex flex-col justify-between shadow-xs product-card-hover group"
            >
              {/* Media banner */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#F4EFE6]">
                <img
                  src={resolveImageUrl(offer.image)}
                  alt={offer.title}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  onError={handleImageError}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-3 left-3 bg-[#B38F24] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-none shadow-xs">
                  {offer.badge}
                </div>
              </div>

              {/* Offer Details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-serif font-bold text-[#1C1917]">
                    {offer.title}
                  </h3>
                  <p className="text-xs text-[#78716C] mt-1 leading-relaxed">
                    {offer.subtitle}
                  </p>
                </div>

                <div className="space-y-3 pt-2 border-t border-[#F0E9DD]">
                  {/* Coupon Code Pill-free Box */}
                  <div className="flex items-center justify-between p-2.5 bg-[#F4EFE6] rounded border border-[#E7DFD5]">
                    <div className="flex items-center gap-2">
                      <Tag className="w-3.5 h-3.5 text-[#B38F24]" />
                      <span className="font-mono text-xs font-bold text-[#1C1917] tracking-wider">
                        {offer.code}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCopyCode(offer.code)}
                      className="text-[11px] font-semibold text-[#B38F24] hover:text-[#1C1917] flex items-center gap-1 cursor-pointer"
                    >
                      {copiedCode === offer.code ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-700">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* CTA button */}
                  <button
                    type="button"
                    onClick={() => onSelectCategory(offer.categoryTarget)}
                    className="w-full py-2.5 px-4 bg-[#1C1917] hover:bg-[#B38F24] text-[#FDFBF7] text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>{offer.cta}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
