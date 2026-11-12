import React, { useState } from 'react';
import { X, Heart, ShoppingBag, ShieldCheck, Sparkles, RefreshCw, Truck, Edit3, Check } from 'lucide-react';
import { Product } from '../types/jewellery';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  onUpdatePrice: (productId: string, newPrice: number) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onUpdatePrice,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [isEditingPrice, setIsEditingPrice] = useState(false);
  const [priceInput, setPriceInput] = useState(product ? product.price.toString() : '');
  const [addedNotice, setAddedNotice] = useState(false);

  if (!product) return null;

  const handlePriceSave = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(priceInput, 10);
    if (!isNaN(val) && val > 0) {
      onUpdatePrice(product.id, val);
    }
    setIsEditingPrice(false);
  };

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div
        className="relative bg-[#FDFBF7] max-w-4xl w-full rounded-xl shadow-2xl border border-[#E7DFD5] overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#1C1917] flex items-center justify-center shadow-md transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Product Imagery with Luxury Reveal */}
        <div className="md:w-1/2 bg-[#F4EFE6] relative flex items-center justify-center p-6 sm:p-8 overflow-hidden">
          <div className="relative w-full aspect-square max-w-md rounded-lg overflow-hidden shadow-inner bg-white">
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 jewellery-shine pointer-events-none" />
          </div>

          {product.discountPercent && (
            <div className="absolute top-4 left-4 bg-[#B38F24] text-white text-xs font-semibold uppercase px-2.5 py-1 tracking-wider shadow-sm">
              {product.discountPercent}% Off
            </div>
          )}
        </div>

        {/* Right Side: Product Details & Purchase Module */}
        <div className="md:w-1/2 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Category and Occasion unboxed metadata */}
            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-[#B38F24]">
              <span>{product.category}</span>
              <span aria-hidden="true">·</span>
              <span>{product.occasion} Edit</span>
              {product.isBestseller && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#1C1917]">Bestseller</span>
                </>
              )}
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1C1917] tracking-tight leading-tight">
              {product.name}
            </h2>

            <p className="text-sm text-[#78716C] leading-relaxed">
              {product.description}
            </p>

            {/* Editable Demo Price Display */}
            <div className="p-3 bg-[#F8F4EC] rounded-lg border border-[#EBE3D7] flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#A89F91] block">
                  Demo Store Price
                </span>
                {isEditingPrice ? (
                  <form onSubmit={handlePriceSave} className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-bold">₹</span>
                    <input
                      type="number"
                      value={priceInput}
                      onChange={(e) => setPriceInput(e.target.value)}
                      className="w-24 px-2 py-1 text-sm font-bold border border-[#B38F24] rounded-sm bg-white"
                      autoFocus
                    />
                    <button
                      type="submit"
                      className="px-2 py-1 bg-[#B38F24] text-white text-xs font-semibold rounded-xs hover:bg-[#8E6E16]"
                    >
                      Save
                    </button>
                  </form>
                ) : (
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-2xl font-bold text-[#1C1917]">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-[#A89F91] line-through">
                        ₹{product.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        setPriceInput(product.price.toString());
                        setIsEditingPrice(true);
                      }}
                      className="text-xs text-[#B38F24] hover:underline flex items-center gap-1 ml-2"
                    >
                      <Edit3 className="w-3 h-3" /> Edit Demo Price
                    </button>
                  </div>
                )}
              </div>
              <span className="text-[11px] text-[#A89F91] text-right font-medium">
                Taxes included<br />Free delivery over ₹999
              </span>
            </div>

            {/* Jewellery Specifications */}
            <div className="space-y-2 border-t border-b border-[#F0E9DD] py-3 text-xs">
              <div className="grid grid-cols-2 gap-2 text-[#78716C]">
                <div>
                  <span className="font-semibold text-[#1C1917]">Plating: </span>
                  {product.details.plating}
                </div>
                <div>
                  <span className="font-semibold text-[#1C1917]">Base Metal: </span>
                  {product.details.baseMetal}
                </div>
                <div>
                  <span className="font-semibold text-[#1C1917]">Stone: </span>
                  {product.details.stoneType}
                </div>
                <div>
                  <span className="font-semibold text-[#1C1917]">Weight: </span>
                  {product.details.weight}
                </div>
                <div>
                  <span className="font-semibold text-[#1C1917]">Closure: </span>
                  {product.details.closure}
                </div>
                <div>
                  <span className="font-semibold text-[#1C1917]">Care: </span>
                  Keep in airtight box
                </div>
              </div>
            </div>

            {/* Quality Reassurances */}
            <div className="grid grid-cols-3 gap-2 text-[11px] text-[#78716C] pt-1">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#B38F24] shrink-0" />
                <span>Anti-Tarnish</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#B38F24] shrink-0" />
                <span>Hand-Set Stones</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#B38F24] shrink-0" />
                <span>Fast Dispatched</span>
              </div>
            </div>
          </div>

          {/* Action Module: Quantity, Add to Cart & Wishlist */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              {/* Quantity Controls */}
              <div className="flex items-center border border-[#D5CBBF] rounded-sm bg-white overflow-hidden">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-sm text-[#78716C] hover:bg-[#F4EFE6] transition-colors"
                >
                  -
                </button>
                <span className="px-3 py-2 text-sm font-semibold text-[#1C1917] min-w-8 text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-sm text-[#78716C] hover:bg-[#F4EFE6] transition-colors"
                >
                  +
                </button>
              </div>

              {/* Add to Bag Button */}
              <button
                type="button"
                onClick={handleAdd}
                className="flex-1 py-3 px-6 bg-[#1C1917] hover:bg-[#B38F24] text-[#FDFBF7] text-sm font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 rounded-sm shadow-sm"
              >
                {addedNotice ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag</span>
                  </>
                )}
              </button>

              {/* Wishlist Button */}
              <button
                type="button"
                onClick={() => onToggleWishlist(product)}
                aria-label="Wishlist toggle"
                className={`p-3 rounded-sm border border-[#D5CBBF] transition-colors ${
                  isWishlisted
                    ? 'bg-[#B38F24] text-white border-[#B38F24]'
                    : 'bg-white text-[#78716C] hover:text-[#B38F24]'
                }`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-white' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
