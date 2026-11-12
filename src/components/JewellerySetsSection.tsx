import React from 'react';
import { Crown, Sparkles, Gem } from 'lucide-react';
import { Product } from '../types/jewellery';
import { ProductCard } from './ProductCard';

interface JewellerySetsSectionProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: Set<string>;
  onUpdatePrice: (productId: string, newPrice: number) => void;
}

export const JewellerySetsSection: React.FC<JewellerySetsSectionProps> = ({
  products,
  onAddToCart,
  onQuickView,
  onToggleWishlist,
  wishlistIds,
  onUpdatePrice,
}) => {
  const sets = products.filter((p) => p.category === 'sets');

  return (
    <section id="jewellery-sets" className="py-16 sm:py-24 bg-[#F8F4EC] border-b border-[#EAE3D6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="text-xs font-semibold tracking-[0.25em] uppercase text-[#B38F24] mb-2 flex items-center justify-center gap-2">
            <Crown className="w-4 h-4 text-[#B38F24]" />
            <span>Section 04 · Complete Bridal & Festive Suites</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1C1917] tracking-tight">
            Premium Artificial Jewellery Sets
          </h2>
          <p className="text-sm text-[#78716C] mt-2">
            Complete synchronized ensembles designed for brides, bridesmaids, and festive celebrations. Intricate Kundan polki, hydro emerald drops, and antique temple motifs.
          </p>
        </div>

        {/* Highlight Feature Banner */}
        <div className="mb-12 bg-[#FDFBF7] rounded-xl border border-[#E2D8C9] p-6 sm:p-8 flex flex-col lg:flex-row items-center gap-8 shadow-sm">
          <div className="lg:w-1/2 aspect-[16/10] rounded-lg overflow-hidden relative shadow-inner bg-[#F4EFE6] w-full">
            <img
              src="/src/assets/images/jewellery_set_heritage_1794478822284.jpg"
              alt="Rajwada Emerald Kundan Bridal Suite"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 jewellery-shine pointer-events-none" />
            <div className="absolute top-4 left-4 bg-[#B38F24] text-white text-[11px] font-bold uppercase tracking-widest px-3 py-1">
              Atelier Flagship Suite
            </div>
          </div>

          <div className="lg:w-1/2 space-y-4 text-left">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#B38F24]">
              <Gem className="w-3.5 h-3.5" />
              <span>Imperial Kundan & Hydro Emeralds</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1C1917]">
              The Rajwada Imperial Bridal Choker Set
            </h3>
            <p className="text-sm text-[#78716C] leading-relaxed">
              Crafted across 180+ meticulous artisan hours, this bridal set combines a dense Jadau Kundan collar with teardrop hydro emeralds, matching chandbalis, and a delicate floral maang tikka. Experience the luxury of a high-jewellery look at true artificial jewellery pricing.
            </p>

            <div className="grid grid-cols-2 gap-3 text-xs border-y border-[#EAE3D6] py-3 text-[#78716C]">
              <div><strong>Includes:</strong> Choker + Chandbalis + Maang Tikka</div>
              <div><strong>Finish:</strong> 24K Double-Dip Gold Coat</div>
              <div><strong>Stones:</strong> Uncut Kundan & Shell Pearls</div>
              <div><strong>Weight:</strong> 165g (Comfort Balanced)</div>
            </div>

            <div className="flex items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => {
                  const targetSet = sets[0];
                  if (targetSet) onQuickView(targetSet);
                }}
                className="px-6 py-3 bg-[#1C1917] hover:bg-[#B38F24] text-white text-xs font-semibold tracking-widest uppercase rounded-sm transition-colors cursor-pointer"
              >
                Inspect Suite Details
              </button>
            </div>
          </div>
        </div>

        {/* Sets Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {sets.map((product) => (
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
