import React, { useState } from 'react';
import { Sparkles, Filter } from 'lucide-react';
import { Product } from '../types/jewellery';
import { ProductCard } from './ProductCard';

interface BestsellerEarringsSectionProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: Set<string>;
  onUpdatePrice: (productId: string, newPrice: number) => void;
}

export const BestsellerEarringsSection: React.FC<BestsellerEarringsSectionProps> = ({
  products,
  onAddToCart,
  onQuickView,
  onToggleWishlist,
  wishlistIds,
  onUpdatePrice,
}) => {
  const [activeSubFilter, setActiveSubFilter] = useState<'all' | 'kundan' | 'chandbali' | 'diamond'>('all');

  // Filter earrings
  const allEarrings = products.filter((p) => p.category === 'earrings');

  const filteredEarrings = allEarrings.filter((p) => {
    if (activeSubFilter === 'all') return true;
    if (activeSubFilter === 'kundan') return p.tags.includes('Kundan') || p.tags.includes('Jhumka');
    if (activeSubFilter === 'chandbali') return p.tags.includes('Chandbali');
    if (activeSubFilter === 'diamond') return p.tags.includes('American Diamond') || p.tags.includes('Minimalist');
    return true;
  });

  return (
    <section id="bestselling-earrings" className="py-16 sm:py-24 bg-[#FDFBF7] border-b border-[#EAE3D6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-semibold tracking-[0.25em] uppercase text-[#B38F24] mb-2 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#B38F24]" />
              <span>Section 03 · Signature Masterpieces</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1C1917] tracking-tight">
              Bestselling Earrings Atelier
            </h2>
            <p className="text-sm text-[#78716C] mt-1 max-w-xl">
              Earrings are the soul of Jaldhara. From royal bridal chandbalis to cascading polki jhumkas and American diamond studs, each pair is balanced for lightweight all-day comfort.
            </p>
          </div>

          {/* Interactive Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-[#F4EFE6] rounded-md border border-[#E7DFD5] self-start md:self-auto overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveSubFilter('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-sm transition-colors whitespace-nowrap cursor-pointer ${
                activeSubFilter === 'all'
                  ? 'bg-[#1C1917] text-white shadow-xs'
                  : 'text-[#78716C] hover:text-[#1C1917]'
              }`}
            >
              All Earrings ({allEarrings.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveSubFilter('kundan')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-sm transition-colors whitespace-nowrap cursor-pointer ${
                activeSubFilter === 'kundan'
                  ? 'bg-[#1C1917] text-white shadow-xs'
                  : 'text-[#78716C] hover:text-[#1C1917]'
              }`}
            >
              Kundan & Jhumkas
            </button>
            <button
              type="button"
              onClick={() => setActiveSubFilter('chandbali')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-sm transition-colors whitespace-nowrap cursor-pointer ${
                activeSubFilter === 'chandbali'
                  ? 'bg-[#1C1917] text-white shadow-xs'
                  : 'text-[#78716C] hover:text-[#1C1917]'
              }`}
            >
              Royal Chandbalis
            </button>
            <button
              type="button"
              onClick={() => setActiveSubFilter('diamond')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-sm transition-colors whitespace-nowrap cursor-pointer ${
                activeSubFilter === 'diamond'
                  ? 'bg-[#1C1917] text-white shadow-xs'
                  : 'text-[#78716C] hover:text-[#1C1917]'
              }`}
            >
              CZ & Modern Drops
            </button>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredEarrings.map((product) => (
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
