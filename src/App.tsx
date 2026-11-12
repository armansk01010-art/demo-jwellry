/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Product, CartItem, PlacedOrder, CategoryId } from './types/jewellery';
import { INITIAL_PRODUCTS } from './data/catalogue';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CategoriesSection } from './components/CategoriesSection';
import { BestsellerEarringsSection } from './components/BestsellerEarringsSection';
import { JewellerySetsSection } from './components/JewellerySetsSection';
import { NewArrivalsSection } from './components/NewArrivalsSection';
import { OccasionSection } from './components/OccasionSection';
import { FeaturedEditorialSection } from './components/FeaturedEditorialSection';
import { SpecialOffersSection } from './components/SpecialOffersSection';
import { InstagramSection } from './components/InstagramSection';
import { AboutSection } from './components/AboutSection';
import { FooterSection } from './components/FooterSection';

import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchModal } from './components/SearchModal';
import { CheckoutModal } from './components/CheckoutModal';
import { CheckCircle2, RotateCcw } from 'lucide-react';
import { resolveImageUrl } from './utils/imageUtils';

export default function App() {
  // 1. Catalog State with editable demo prices and sanitized image URLs
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('jaldhara_products');
    if (saved) {
      try {
        const parsed: Product[] = JSON.parse(saved);
        return parsed.map((p) => ({
          ...p,
          image: resolveImageUrl(p.image),
          secondaryImage: p.secondaryImage ? resolveImageUrl(p.secondaryImage) : undefined,
        }));
      } catch {
        return INITIAL_PRODUCTS;
      }
    }
    return INITIAL_PRODUCTS;
  });

  // 2. Cart State with sanitized image URLs
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('jaldhara_cart');
    if (saved) {
      try {
        const parsed: CartItem[] = JSON.parse(saved);
        return parsed.map((item) => ({
          ...item,
          product: {
            ...item.product,
            image: resolveImageUrl(item.product.image),
            secondaryImage: item.product.secondaryImage ? resolveImageUrl(item.product.secondaryImage) : undefined,
          },
        }));
      } catch {
        return [];
      }
    }
    return [];
  });

  // 3. Wishlist State
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('jaldhara_wishlist');
    if (saved) {
      try {
        return new Set(JSON.parse(saved));
      } catch {
        return new Set();
      }
    }
    return new Set(['jd-ear-01', 'jd-set-01']);
  });

  // 4. Modals & Drawer States
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');

  // 5. Animations & Visual Feedback State
  const [cartAnimated, setCartAnimated] = useState(false);
  const [feedbackToast, setFeedbackToast] = useState<{ message: string; visible: boolean }>({
    message: '',
    visible: false,
  });

  // Persistence side-effects
  useEffect(() => {
    localStorage.setItem('jaldhara_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('jaldhara_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('jaldhara_wishlist', JSON.stringify(Array.from(wishlistIds)));
  }, [wishlistIds]);

  // Show temporary toast feedback
  const showToast = (message: string) => {
    setFeedbackToast({ message, visible: true });
    setTimeout(() => {
      setFeedbackToast((prev) => ({ ...prev, visible: false }));
    }, 2400);
  };

  // Add to Cart handler (with animation trigger)
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });

    // Trigger Cart Icon Animation (#6 in requirements)
    setCartAnimated(true);
    setTimeout(() => setCartAnimated(false), 600);

    showToast(`Added "${product.name}" to shopping bag`);
  };

  // Update Cart item quantity
  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Remove item from Cart
  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Clear Cart
  const handleClearCart = () => {
    setCart([]);
  };

  // Toggle Wishlist
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) => {
      const next = new Set(prev);
      if (next.has(product.id)) {
        next.delete(product.id);
        showToast(`Removed from wishlist`);
      } else {
        next.add(product.id);
        showToast(`Saved to wishlist`);
      }
      return next;
    });
  };

  // Update Demo Price
  const handleUpdatePrice = (productId: string, newPrice: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, price: newPrice } : p))
    );
    // Also update any matching item in cart
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId
          ? { ...item, product: { ...item.product, price: newPrice } }
          : item
      )
    );
    // If current modal is viewing this product, update it too
    if (selectedProduct && selectedProduct.id === productId) {
      setSelectedProduct((prev) => prev ? { ...prev, price: newPrice } : null);
    }
    showToast(`Demo price updated to ₹${newPrice.toLocaleString('en-IN')}`);
  };

  // Reset demo prices back to initial
  const handleResetDemoData = () => {
    setProducts(INITIAL_PRODUCTS);
    localStorage.removeItem('jaldhara_products');
    showToast('Demo catalogue restored to original pricing');
  };

  // Filter products for category jump
  const handleCategorySelect = (category: CategoryId) => {
    setSelectedCategory(category);
    if (category === 'earrings') {
      const el = document.getElementById('bestselling-earrings');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (category === 'sets') {
      const el = document.getElementById('jewellery-sets');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      const el = document.getElementById('bestselling-earrings');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleHeroShopClick = () => {
    const el = document.getElementById('bestselling-earrings');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const cartTotalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistItems = products.filter((p) => wishlistIds.has(p.id));

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1C1917] flex flex-col font-sans selection:bg-[#B38F24] selection:text-white">
      {/* 4. HEADER: Home only, Search, Wishlist, Shopping Bag */}
      <Header
        cartCount={cartTotalCount}
        wishlistCount={wishlistIds.size}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        cartAnimated={cartAnimated}
      />

      {/* Subtle Demo Store Helper Ribbon */}
      <div className="bg-[#F4EFE6] border-b border-[#E7DFD5] py-1.5 px-4 text-center text-[11px] text-[#78716C] flex items-center justify-center gap-3">
        <span>Demo Store: Click on any price to edit demo prices dynamically.</span>
        <button
          onClick={handleResetDemoData}
          className="text-[#B38F24] hover:underline flex items-center gap-1 font-medium cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" /> Reset Catalogue
        </button>
      </div>

      <main className="flex-1">
        {/* 1. HERO SECTION */}
        <HeroSection onShopClick={handleHeroShopClick} />

        {/* 2. FEATURED CATEGORIES SECTION */}
        <CategoriesSection
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
        />

        {/* 3. BESTSELLING EARRINGS SECTION (Primary Focus) */}
        <BestsellerEarringsSection
          products={products}
          onAddToCart={handleAddToCart}
          onQuickView={(p) => setSelectedProduct(p)}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlistIds}
          onUpdatePrice={handleUpdatePrice}
        />

        {/* 4. PREMIUM JEWELLERY SETS SECTION */}
        <JewellerySetsSection
          products={products}
          onAddToCart={handleAddToCart}
          onQuickView={(p) => setSelectedProduct(p)}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlistIds}
          onUpdatePrice={handleUpdatePrice}
        />

        {/* 5. NEW ARRIVALS SECTION */}
        <NewArrivalsSection
          products={products}
          onAddToCart={handleAddToCart}
          onQuickView={(p) => setSelectedProduct(p)}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlistIds}
          onUpdatePrice={handleUpdatePrice}
        />

        {/* 6. SHOP BY OCCASION SECTION */}
        <OccasionSection
          products={products}
          onAddToCart={handleAddToCart}
          onQuickView={(p) => setSelectedProduct(p)}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlistIds}
          onUpdatePrice={handleUpdatePrice}
        />

        {/* 7. FEATURED COLLECTION SECTION (Editorial Showcase) */}
        <FeaturedEditorialSection />

        {/* 8. SPECIAL OFFERS SECTION */}
        <SpecialOffersSection onSelectCategory={handleCategorySelect} />

        {/* 9. INSTAGRAM GALLERY SECTION (@jaldhara_jwels) */}
        <InstagramSection />

        {/* 10. ABOUT JALDHARA SECTION */}
        <AboutSection />

        {/* 11. FOOTER SECTION */}
        <FooterSection />
      </main>

      {/* Interactive Modals & Slide-Out Drawers */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={selectedProduct ? wishlistIds.has(selectedProduct.id) : false}
        onUpdatePrice={handleUpdatePrice}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlistItems}
        onRemoveFromWishlist={(id) => {
          setWishlistIds((prev) => {
            const next = new Set(prev);
            next.delete(id);
            return next;
          });
        }}
        onMoveToCart={(product) => {
          handleAddToCart(product);
          setWishlistIds((prev) => {
            const next = new Set(prev);
            next.delete(product.id);
            return next;
          });
        }}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={products}
        onSelectProduct={(p) => setSelectedProduct(p)}
        onAddToCart={handleAddToCart}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        onOrderCompleted={(order: PlacedOrder) => {
          showToast(`Order #${order.orderId} placed successfully!`);
        }}
        onClearCart={handleClearCart}
      />

      {/* Floating Action Toast for Feedback */}
      {feedbackToast.visible && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1C1917] text-[#FDFBF7] px-4 py-2.5 rounded-sm shadow-xl border border-[#D4AF37]/40 flex items-center gap-2 text-xs font-medium animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
          <span>{feedbackToast.message}</span>
        </div>
      )}
    </div>
  );
}
