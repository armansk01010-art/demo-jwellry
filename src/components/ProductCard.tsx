import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye, Edit3, Check } from 'lucide-react';
import { Product } from '../types/jewellery';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  onUpdatePrice: (productId: string, newPrice: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onQuickView,
  onToggleWishlist,
  isWishlisted,
  onUpdatePrice,
}) => {
  const [isEditingPrice, setIsEditingPrice] = useState(false);
  const [customPrice, setCustomPrice] = useState(product.price.toString());
  const [justAdded, setJustAdded] = useState(false);

  const handleSavePrice = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseInt(customPrice, 10);
    if (!isNaN(parsed) && parsed > 0) {
      onUpdatePrice(product.id, parsed);
    }
    setIsEditingPrice(false);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleWishlist(product);
  };

  return (
    <div
      onClick={() => onQuickView(product)}
      className="group relative bg-[#FDFBF7] rounded-lg border border-[#E7DFD5]/80 overflow-hidden product-card-hover cursor-pointer flex flex-col justify-between"
    >
      {/* Visual media container */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#F4EFE6] select-none">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Subtle decorative gold light sweep on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 jewellery-shine pointer-events-none" />

        {/* Category & Discount Tag (clean unboxed text or minimal chic badge) */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          {product.discountPercent && (
            <span className="text-[10px] tracking-widest font-semibold uppercase px-2 py-0.5 bg-[#B38F24] text-white rounded-none shadow-sm">
              {product.discountPercent}% OFF
            </span>
          )}
          {product.isBestseller && (
            <span className="text-[10px] tracking-wider font-medium uppercase px-2 py-0.5 bg-[#1C1917]/90 text-[#FDFBF7] backdrop-blur-xs">
              Bestseller
            </span>
          )}
        </div>

        {/* Wishlist floating toggle */}
        <button
          type="button"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          onClick={handleWishlist}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 z-10 ${
            isWishlisted
              ? 'bg-[#B38F24] text-white shadow-md'
              : 'bg-white/90 text-[#78716C] hover:text-[#B38F24] hover:bg-white shadow-xs'
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white stroke-white' : ''}`} />
        </button>

        {/* Quick View Hover Bar */}
        <div className="absolute inset-x-0 bottom-0 py-2.5 px-3 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="text-xs font-medium tracking-wide text-white flex items-center gap-1.5 drop-shadow-xs">
            <Eye className="w-3.5 h-3.5" /> Quick View
          </span>
        </div>
      </div>

      {/* Card Content & Pricing */}
      <div className="p-4 flex flex-col flex-grow justify-between gap-3">
        <div>
          {/* Metadata line without pill box */}
          <div className="flex items-center gap-2 text-[11px] font-medium tracking-wider text-[#A89F91] uppercase mb-1">
            <span>{product.category}</span>
            <span aria-hidden="true">·</span>
            <span>{product.occasion}</span>
          </div>

          <h3 className="text-[15px] font-semibold text-[#1C1917] tracking-tight leading-snug line-clamp-1 group-hover:text-[#B38F24] transition-colors">
            {product.name}
          </h3>

          <p className="text-xs text-[#78716C] line-clamp-1 mt-0.5">
            {product.subtitle}
          </p>
        </div>

        {/* Price Row with Inline Demo Edit capability */}
        <div className="pt-2 border-t border-[#F0E9DD] flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            {isEditingPrice ? (
              <form onSubmit={handleSavePrice} onClick={(e) => e.stopPropagation()} className="flex items-center gap-1">
                <span className="text-xs text-[#78716C]">₹</span>
                <input
                  type="number"
                  value={customPrice}
                  onChange={(e) => setCustomPrice(e.target.value)}
                  className="w-20 px-1 py-0.5 text-xs font-semibold border border-[#B38F24] rounded-sm bg-white"
                  autoFocus
                />
                <button
                  type="submit"
                  title="Save price"
                  className="p-1 bg-[#B38F24] text-white rounded-xs hover:bg-[#8E6E16]"
                >
                  <Check className="w-3 h-3" />
                </button>
              </form>
            ) : (
              <div
                className="flex items-baseline gap-1.5 group/price"
                title="Click edit icon to change demo price"
              >
                <span className="text-base font-bold text-[#1C1917] tracking-tight font-sans">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-[#A89F91] line-through font-sans">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                <button
                  type="button"
                  aria-label="Edit demo price"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEditingPrice(true);
                  }}
                  className="opacity-0 group-hover/price:opacity-100 p-0.5 text-[#A89F91] hover:text-[#B38F24] transition-opacity"
                >
                  <Edit3 className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>

          {/* Add to Cart CTA */}
          <button
            type="button"
            onClick={handleAddToCart}
            className={`px-3 py-1.5 text-xs font-medium tracking-wide flex items-center gap-1.5 rounded-sm transition-all duration-200 shrink-0 ${
              justAdded
                ? 'bg-[#1C1917] text-white'
                : 'bg-[#F4EFE6] text-[#1C1917] hover:bg-[#B38F24] hover:text-white'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
