import React from 'react';
import { Sparkles } from 'lucide-react';
import { Product } from '../types/jewellery';
import { ProductCard } from './ProductCard';

interface NewArrivalsSectionProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: Set<string>;
  onUpdatePrice: (productId: string, newPrice: number) => void;
}

export const NewArrivalsSection: React.FC<NewArrivalsSectionProps> = ({
  products,
  onAddToCart,
  onQuickView,
  onToggleWishlist,
  wishlistIds,
  onUpdatePrice,
}) => {
  const newArrivals = products.filter((p) => p.isNewArrival);

  return (
    <section id="new-arrivals" className="py-16 sm:py-24 bg-[#FDFBF7] border-b border-[#EAE3D6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-semibold tracking-[0.25em] uppercase text-[#B38F24] mb-2 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#B38F24]" />
              <span>Section 05 · Seasonal Additions</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1C1917] tracking-tight">
              New Arrivals & Contemporary Silhouettes
            </h2>
            <p className="text-sm text-[#78716C] mt-1 max-w-xl">
              Fresh interpretations of Indian aesthetics, featuring pastel meenakari enamelling, rose gold crystal settings, and featherlight party drops.
            </p>
          </div>
          <span className="text-xs font-medium text-[#78716C] self-start md:self-auto">
            Showing {newArrivals.length} freshly released pieces
          </span>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {newArrivals.map((product) => (
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
