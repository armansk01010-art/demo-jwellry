import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Product } from '../types/jewellery';
import { resolveImageUrl, handleImageError } from '../utils/imageUtils';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  onRemoveFromWishlist: (productId: string) => void;
  onMoveToCart: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemoveFromWishlist,
  onMoveToCart,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end">
      <div
        className="relative w-full max-w-md bg-[#FDFBF7] h-full shadow-2xl flex flex-col justify-between border-l border-[#E7DFD5] animate-slideLeft"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#EAE3D6] flex items-center justify-between bg-[#F8F4EC]">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#B38F24] fill-[#B38F24]" />
            <h2 className="text-lg font-serif font-bold text-[#1C1917] tracking-tight">
              Wishlist ({wishlist.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close wishlist"
            className="p-1.5 rounded-full text-[#78716C] hover:text-[#1C1917] hover:bg-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wishlist Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {wishlist.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-full bg-[#F4EFE6] flex items-center justify-center text-[#B38F24]">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-[#1C1917]">
                Your Wishlist is Empty
              </h3>
              <p className="text-xs text-[#78716C] max-w-xs">
                Save your favourite Kundan chandbalis, temple necklaces, and bridal sets by clicking the heart icon on any piece.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-5 py-2.5 bg-[#1C1917] hover:bg-[#B38F24] text-white text-xs font-semibold tracking-wider uppercase rounded-sm transition-colors"
              >
                Discover Collection
              </button>
            </div>
          ) : (
            wishlist.map((product) => (
              <div
                key={product.id}
                className="flex gap-4 p-3 bg-white rounded-lg border border-[#EDE5DA] shadow-2xs items-center"
              >
                <img
                  src={resolveImageUrl(product.image)}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  onError={handleImageError}
                  className="w-18 h-18 object-cover rounded-sm bg-[#F4EFE6] shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <span className="text-[10px] uppercase font-semibold text-[#B38F24] tracking-wider block">
                    {product.category}
                  </span>
                  <h4 className="text-sm font-semibold text-[#1C1917] truncate">
                    {product.name}
                  </h4>
                  <div className="text-xs font-bold text-[#1C1917] mt-1 font-sans">
                    ₹{product.price.toLocaleString('en-IN')}
                    {product.originalPrice && (
                      <span className="text-[11px] text-[#A89F91] line-through ml-1.5 font-normal">
                        ₹{product.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => onMoveToCart(product)}
                      className="px-3 py-1 bg-[#1C1917] hover:bg-[#B38F24] text-white text-xs font-medium rounded-xs transition-colors flex items-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Move to Bag</span>
                    </button>

                    <button
                      onClick={() => onRemoveFromWishlist(product.id)}
                      className="p-1 text-[#A89F91] hover:text-rose-600 transition-colors"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {wishlist.length > 0 && (
          <div className="p-4 border-t border-[#EAE3D6] bg-[#F8F4EC] text-center">
            <button
              onClick={() => {
                wishlist.forEach((item) => onMoveToCart(item));
              }}
              className="w-full py-2.5 px-4 bg-[#B38F24] hover:bg-[#8E6E16] text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors shadow-xs"
            >
              Add All to Shopping Bag
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
