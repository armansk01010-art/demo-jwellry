import React, { useState } from 'react';
import { Sparkles, Calendar, ArrowRight } from 'lucide-react';
import { OccasionId, Product } from '../types/jewellery';
import { OCCASIONS } from '../data/catalogue';
import { ProductCard } from './ProductCard';

interface OccasionSectionProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: Set<string>;
  onUpdatePrice: (productId: string, newPrice: number) => void;
}

export const OccasionSection: React.FC<OccasionSectionProps> = ({
  products,
  onAddToCart,
  onQuickView,
  onToggleWishlist,
  wishlistIds,
  onUpdatePrice,
}) => {
  const [activeOccasion, setActiveOccasion] = useState<OccasionId>('wedding');

  const currentOccasionMeta = OCCASIONS.find((o) => o.id === activeOccasion) || OCCASIONS[1];

  const filteredProducts = products.filter((p) => p.occasion === activeOccasion);

  return (
    <section id="shop-by-occasion" className="py-16 sm:py-24 bg-[#F8F4EC] border-b border-[#EAE3D6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs font-semibold tracking-[0.25em] uppercase text-[#B38F24] mb-2 flex items-center justify-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-[#B38F24]" />
            <span>Section 06 · Occasion Styling</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1C1917] tracking-tight">
            Shop By Occasion & Sentiment
          </h2>
          <p className="text-sm text-[#78716C] mt-1">
            Choose jewellery calibrated for the lighting, emotion, and aesthetic of your event.
          </p>
        </div>

        {/* Occasion Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {(['wedding', 'festive', 'party', 'everyday'] as OccasionId[]).map((occId) => {
            const occ = OCCASIONS.find((o) => o.id === occId);
            const isActive = activeOccasion === occId;
            return (
              <button
                key={occId}
                type="button"
                onClick={() => setActiveOccasion(occId)}
                className={`px-5 py-2.5 text-xs font-semibold tracking-wider uppercase rounded-sm transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#1C1917] text-[#F3E5AB] shadow-sm'
                    : 'bg-[#FDFBF7] text-[#78716C] hover:text-[#1C1917] border border-[#E7DFD5]'
                }`}
              >
                {occ?.title}
              </button>
            );
          })}
        </div>

        {/* Occasion Editorial Sub-Header */}
        <div className="bg-[#FDFBF7] rounded-lg p-5 mb-8 border border-[#E7DFD5] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#B38F24]">
              Styling Philosophy · {currentOccasionMeta.title}
            </span>
            <p className="text-xs text-[#78716C] mt-0.5">
              {currentOccasionMeta.tagline}
            </p>
          </div>
          {currentOccasionMeta.accent && (
            <div className="text-xs font-medium text-[#1C1917] bg-[#F4EFE6] px-3 py-1.5 rounded-xs self-start sm:self-auto border border-[#E2D8C9]">
              Focus: {currentOccasionMeta.accent}
            </div>
          )}
        </div>

        {/* Occasion Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
              onToggleWishlist={onToggleWishlist}
              isWishlisted={wishlistIds.has(product.id)}
              onUpdatePrice={onUpdatePrice}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
