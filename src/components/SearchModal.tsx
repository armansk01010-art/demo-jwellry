import React, { useState, useMemo } from 'react';
import { Search, X, ShoppingBag, ArrowRight } from 'lucide-react';
import { Product } from '../types/jewellery';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
  onAddToCart,
}) => {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products.slice(0, 6);
    return products.filter((p) =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.occasion.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q)) ||
      p.description.toLowerCase().includes(q)
    );
  }, [query, products]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-20">
      <div
        className="relative bg-[#FDFBF7] max-w-2xl w-full rounded-xl shadow-2xl border border-[#E7DFD5] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-[#EAE3D6] flex items-center gap-3 bg-[#F8F4EC]">
          <Search className="w-5 h-5 text-[#B38F24] shrink-0" />
          <input
            type="text"
            placeholder="Search earrings, jewellery sets, kundan, temple, occasion..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-[#1C1917] placeholder-[#A89F91] text-sm sm:text-base font-medium outline-hidden"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[#A89F91] hover:text-[#1C1917]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="ml-2 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#78716C] hover:text-[#1C1917]"
          >
            Esc
          </button>
        </div>

        {/* Quick Suggestion Tags */}
        <div className="px-5 py-2.5 bg-[#F4EFE6] border-b border-[#EAE3D6] flex items-center gap-2 overflow-x-auto text-xs text-[#78716C]">
          <span className="font-semibold text-[#1C1917] shrink-0">Popular:</span>
          {['Jhumka', 'Kundan Set', 'Chandbali', 'Temple', 'Bridal', 'American Diamond'].map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="hover:text-[#B38F24] transition-colors whitespace-nowrap cursor-pointer text-xs"
            >
              {tag} ·
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-5 space-y-3">
          <div className="text-xs uppercase tracking-wider text-[#A89F91] font-semibold mb-2">
            {query ? `Search results for "${query}" (${filtered.length})` : 'Featured Recommendations'}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-8 text-[#78716C] text-sm">
              No jewellery pieces found matching "{query}". Try searching "earrings", "kundan" or "necklace".
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onSelectProduct(item);
                  onClose();
                }}
                className="flex items-center justify-between p-3 bg-white rounded-lg border border-[#EDE5DA] hover:border-[#B38F24] transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 object-cover rounded-sm bg-[#F4EFE6] shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase font-semibold text-[#B38F24] tracking-wider">
                      {item.category} · {item.occasion}
                    </div>
                    <h4 className="text-sm font-semibold text-[#1C1917] truncate group-hover:text-[#B38F24] transition-colors">
                      {item.name}
                    </h4>
                    <span className="text-xs font-bold text-[#1C1917] font-sans">
                      ₹{item.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(item);
                    }}
                    className="p-2 bg-[#F4EFE6] hover:bg-[#1C1917] text-[#1C1917] hover:text-white rounded-sm transition-colors"
                    title="Add to Bag"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                  <ArrowRight className="w-4 h-4 text-[#A89F91] group-hover:text-[#B38F24] group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
