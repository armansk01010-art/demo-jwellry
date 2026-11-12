import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, Truck, CreditCard, Banknote, Smartphone, ArrowRight, Package } from 'lucide-react';
import { CartItem, CheckoutDetails, PlacedOrder } from '../types/jewellery';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderCompleted: (order: PlacedOrder) => void;
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderCompleted,
  onClearCart,
}) => {
  const [formData, setFormData] = useState<CheckoutDetails>({
    fullName: 'Pooja Sharma',
    phone: '9876543210',
    address: 'Flat 402, Royal Residency, Palace Road',
    city: 'Jaipur',
    state: 'Rajasthan',
    pincode: '302001',
    paymentMethod: 'cod',
  });

  const [confirmedOrder, setConfirmedOrder] = useState<PlacedOrder | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shipping = subtotal >= 999 || items.length === 0 ? 0 : 99;
  const total = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const orderId = `JD-${Math.floor(100000 + Math.random() * 900000)}`;
      const order: PlacedOrder = {
        orderId,
        timestamp: new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        items: [...items],
        subtotal,
        shipping,
        total,
        customer: { ...formData },
        status: 'Confirmed',
      };

      setConfirmedOrder(order);
      setIsSubmitting(false);
      onOrderCompleted(order);
      onClearCart();
    }, 700);
  };

  const handleClose = () => {
    setConfirmedOrder(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div
        className="relative bg-[#FDFBF7] max-w-2xl w-full rounded-xl shadow-2xl border border-[#E7DFD5] overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#EAE3D6] flex items-center justify-between bg-[#F8F4EC]">
          <div>
            <h2 className="text-xl font-serif font-bold text-[#1C1917] tracking-tight">
              {confirmedOrder ? 'Order Confirmed' : 'Jaldhara Secure Checkout (Demo)'}
            </h2>
            <span className="text-[11px] text-[#A89F91]">
              {confirmedOrder ? 'Thank you for shopping with Jaldhara' : 'Simulated demonstration storefront · No real payment collected'}
            </span>
          </div>
          <button
            onClick={handleClose}
            aria-label="Close checkout"
            className="p-1.5 rounded-full text-[#78716C] hover:text-[#1C1917] hover:bg-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {confirmedOrder ? (
            /* Order Success Receipt View */
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-semibold tracking-widest uppercase text-[#B38F24]">
                  Order Placed Successfully
                </span>
                <h3 className="text-2xl font-serif font-bold text-[#1C1917] mt-1">
                  Reference: #{confirmedOrder.orderId}
                </h3>
                <p className="text-xs text-[#78716C] mt-1">
                  Placed on {confirmedOrder.timestamp}
                </p>
              </div>

              {/* Order Receipt Card */}
              <div className="bg-[#F8F4EC] p-4 rounded-lg border border-[#EAE3D6] text-left text-xs space-y-3">
                <div className="border-b border-[#E2D8C9] pb-2 font-semibold text-[#1C1917] flex justify-between">
                  <span>Shipping Destination</span>
                  <span className="text-[#B38F24]">Standard 3-5 Day Delivery</span>
                </div>
                <div className="text-[#78716C] space-y-0.5">
                  <div className="font-medium text-[#1C1917]">{confirmedOrder.customer.fullName}</div>
                  <div>{confirmedOrder.customer.address}</div>
                  <div>{confirmedOrder.customer.city}, {confirmedOrder.customer.state} - {confirmedOrder.customer.pincode}</div>
                  <div>Phone: +91 {confirmedOrder.customer.phone}</div>
                </div>

                <div className="border-t border-[#E2D8C9] pt-2 space-y-1">
                  <div className="font-semibold text-[#1C1917] mb-1">Purchased Pieces:</div>
                  {confirmedOrder.items.map((i) => (
                    <div key={i.product.id} className="flex justify-between text-[#78716C]">
                      <span>{i.product.name} × {i.quantity}</span>
                      <span className="font-sans font-medium text-[#1C1917]">
                        ₹{(i.product.price * i.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                  <div className="flex justify-between font-bold text-[#1C1917] pt-2 border-t border-[#E2D8C9]">
                    <span>Total Amount ({confirmedOrder.customer.paymentMethod.toUpperCase()})</span>
                    <span className="font-sans text-sm">₹{confirmedOrder.total.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-amber-50/80 border border-amber-200/60 rounded-md text-[11px] text-amber-900 leading-relaxed text-left">
                <strong>Demo Store Notice:</strong> This simulation demonstrates the exact checkout and receipt flow. For genuine brand purchases, you can also explore our official storefront at <a href="https://www.meesho.com/Jaldharastore" target="_blank" rel="noopener noreferrer" className="underline font-bold text-[#B38F24]">meesho.com/Jaldharastore</a>.
              </div>

              <button
                onClick={handleClose}
                className="w-full py-3 bg-[#1C1917] hover:bg-[#B38F24] text-white text-xs font-semibold uppercase tracking-widest rounded-sm transition-colors"
              >
                Continue Exploring Jaldhara
              </button>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Demo Mode Notice Banner */}
              <div className="p-2.5 bg-[#F4EFE6] rounded border border-[#E7DFD5] text-[11px] text-[#78716C] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#B38F24] shrink-0" />
                <span>
                  <strong>Interactive Demo Checkout:</strong> Fill shipping information to simulate order placement. No real payment will be deducted.
                </span>
              </div>

              {/* Customer Contact */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1C1917]">
                  1. Shipping Information
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-[#78716C] mb-1">Full Name</label>
                    <input
                      required
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-[#D5CBBF] rounded-sm bg-white text-[#1C1917] focus:border-[#B38F24] outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#78716C] mb-1">Phone Number (+91)</label>
                    <input
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-[#D5CBBF] rounded-sm bg-white text-[#1C1917] focus:border-[#B38F24] outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-[#78716C] mb-1">Street Address</label>
                  <input
                    required
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-[#D5CBBF] rounded-sm bg-white text-[#1C1917] focus:border-[#B38F24] outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] text-[#78716C] mb-1">City</label>
                    <input
                      required
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-[#D5CBBF] rounded-sm bg-white text-[#1C1917] focus:border-[#B38F24] outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#78716C] mb-1">State</label>
                    <input
                      required
                      type="text"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-[#D5CBBF] rounded-sm bg-white text-[#1C1917] focus:border-[#B38F24] outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#78716C] mb-1">Pincode</label>
                    <input
                      required
                      type="text"
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-[#D5CBBF] rounded-sm bg-white text-[#1C1917] focus:border-[#B38F24] outline-hidden"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-3 pt-2 border-t border-[#EAE3D6]">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1C1917]">
                  2. Select Payment Method (Demo)
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  <label
                    className={`flex flex-col items-center justify-center p-3 border rounded-sm cursor-pointer transition-all ${
                      formData.paymentMethod === 'cod'
                        ? 'border-[#B38F24] bg-[#F4EFE6] text-[#1C1917]'
                        : 'border-[#E2D8C9] bg-white text-[#78716C]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                      className="sr-only"
                    />
                    <Banknote className="w-5 h-5 text-[#B38F24] mb-1" />
                    <span className="text-[11px] font-semibold">Cash on Delivery</span>
                  </label>

                  <label
                    className={`flex flex-col items-center justify-center p-3 border rounded-sm cursor-pointer transition-all ${
                      formData.paymentMethod === 'upi'
                        ? 'border-[#B38F24] bg-[#F4EFE6] text-[#1C1917]'
                        : 'border-[#E2D8C9] bg-white text-[#78716C]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={formData.paymentMethod === 'upi'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'upi' })}
                      className="sr-only"
                    />
                    <Smartphone className="w-5 h-5 text-[#B38F24] mb-1" />
                    <span className="text-[11px] font-semibold">Instant UPI Demo</span>
                  </label>

                  <label
                    className={`flex flex-col items-center justify-center p-3 border rounded-sm cursor-pointer transition-all ${
                      formData.paymentMethod === 'card'
                        ? 'border-[#B38F24] bg-[#F4EFE6] text-[#1C1917]'
                        : 'border-[#E2D8C9] bg-white text-[#78716C]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'card' })}
                      className="sr-only"
                    />
                    <CreditCard className="w-5 h-5 text-[#B38F24] mb-1" />
                    <span className="text-[11px] font-semibold">Card / NetBanking</span>
                  </label>
                </div>
              </div>

              {/* Order Summary Line */}
              <div className="bg-[#F8F4EC] p-3 rounded border border-[#EAE3D6] space-y-1 text-xs">
                <div className="flex justify-between text-[#78716C]">
                  <span>Items Total ({items.reduce((s, i) => s + i.quantity, 0)})</span>
                  <span className="font-sans font-semibold text-[#1C1917]">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-[#78716C]">
                  <span>Shipping Charge</span>
                  <span>{shipping === 0 ? <strong className="text-emerald-700">FREE</strong> : `₹${shipping}`}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#1C1917] pt-1.5 border-t border-[#E2D8C9]">
                  <span>Grand Total</span>
                  <span className="font-sans text-base">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting || items.length === 0}
                className="w-full py-3.5 px-4 bg-[#1C1917] hover:bg-[#B38F24] text-[#FDFBF7] text-xs font-semibold uppercase tracking-widest rounded-sm transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Processing Demo Order...</span>
                ) : (
                  <>
                    <span>Place Order (Demo) · ₹{total.toLocaleString('en-IN')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
