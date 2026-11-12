import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { CartItem } from '../types/jewellery';
import { resolveImageUrl, handleImageError } from '../utils/imageUtils';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 999;
  const isFreeShipping = subtotal >= freeShippingThreshold || items.length === 0;
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shippingFee = isFreeShipping ? 0 : 99;
  const total = subtotal + shippingFee;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end">
      <div
        className="relative w-full max-w-md bg-[#FDFBF7] h-full shadow-2xl flex flex-col justify-between border-l border-[#E7DFD5] animate-slideLeft"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#EAE3D6] flex items-center justify-between bg-[#F8F4EC]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#B38F24]" />
            <h2 className="text-lg font-serif font-bold text-[#1C1917] tracking-tight">
              Your Jewellery Bag ({items.reduce((sum, item) => sum + item.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close cart"
            className="p-1.5 rounded-full text-[#78716C] hover:text-[#1C1917] hover:bg-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="px-5 py-3 bg-[#F4EFE6] border-b border-[#EAE3D6] text-xs">
          {items.length === 0 ? (
            <span className="text-[#78716C]">Your bag is currently empty</span>
          ) : isFreeShipping ? (
            <div className="flex items-center gap-1.5 text-emerald-800 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-[#B38F24]" />
              <span>You unlocked <strong>Free Insured Shipping</strong>!</span>
            </div>
          ) : (
            <div>
              <p className="text-[#78716C] mb-1.5">
                Add <strong>₹{amountNeededForFreeShipping}</strong> more for Free Shipping
              </p>
              <div className="w-full h-1.5 bg-[#E2D8C9] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#B38F24] transition-all duration-500 rounded-full"
                  style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-full bg-[#F4EFE6] flex items-center justify-center text-[#B38F24]">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-[#1C1917]">
                Your Shopping Bag is Empty
              </h3>
              <p className="text-xs text-[#78716C] max-w-xs">
                Explore our handcrafted Kundan jhumkas, bridal sets, and antique temple jewelry to begin your collection.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-5 py-2.5 bg-[#1C1917] hover:bg-[#B38F24] text-white text-xs font-semibold tracking-wider uppercase rounded-sm transition-colors"
              >
                Explore Collection
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-4 p-3 bg-white rounded-lg border border-[#EDE5DA] shadow-2xs items-center"
              >
                <img
                  src={resolveImageUrl(item.product.image)}
                  alt={item.product.name}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  onError={handleImageError}
                  className="w-18 h-18 object-cover rounded-sm bg-[#F4EFE6] shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <span className="text-[10px] uppercase font-semibold text-[#B38F24] tracking-wider block">
                    {item.product.category}
                  </span>
                  <h4 className="text-sm font-semibold text-[#1C1917] truncate">
                    {item.product.name}
                  </h4>
                  <div className="text-xs font-bold text-[#1C1917] mt-1 font-sans">
                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    {item.quantity > 1 && (
                      <span className="text-[11px] font-normal text-[#A89F91] ml-1">
                        (₹{item.product.price} each)
                      </span>
                    )}
                  </div>

                  {/* Quantity Stepper & Remove */}
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border border-[#D5CBBF] rounded-xs bg-[#FDFBF7]">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        className="px-2 py-0.5 text-xs text-[#78716C] hover:bg-[#F4EFE6]"
                      >
                        -
                      </button>
                      <span className="px-2 py-0.5 text-xs font-semibold text-[#1C1917] min-w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="px-2 py-0.5 text-xs text-[#78716C] hover:bg-[#F4EFE6]"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="p-1 text-[#A89F91] hover:text-rose-600 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout Action */}
        {items.length > 0 && (
          <div className="p-5 border-t border-[#EAE3D6] bg-[#F8F4EC] space-y-3">
            <div className="space-y-1.5 text-xs text-[#78716C]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[#1C1917] font-sans">
                  ₹{subtotal.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span className="font-semibold text-[#1C1917]">
                  {shippingFee === 0 ? (
                    <span className="text-emerald-700 font-bold">FREE</span>
                  ) : (
                    `₹${shippingFee}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#1C1917] pt-2 border-t border-[#E2D8C9]">
                <span>Total Amount</span>
                <span className="font-sans text-base">₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              onClick={onProceedToCheckout}
              className="w-full py-3 px-4 bg-[#1C1917] hover:bg-[#B38F24] text-[#FDFBF7] text-xs font-semibold uppercase tracking-widest rounded-sm shadow-md transition-colors flex items-center justify-center gap-2 group"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-[#A89F91]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B38F24]" />
              <span>Simulated Demo Store Checkout · Secure Review</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
