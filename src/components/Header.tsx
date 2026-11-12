import React from 'react';
import { Search, Heart, ShoppingBag } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  onOpenSearch: () => void;
  onOpenWishlist: () => void;
  onOpenCart: () => void;
  cartAnimated: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  wishlistCount,
  onOpenSearch,
  onOpenWishlist,
  onOpenCart,
  cartAnimated,
}) => {
  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#EAE3D6] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Left Zone: HOME Navigation item (STRICT REQUIREMENT: ONLY HOME) */}
        <nav className="flex items-center">
          <a
            href="#home"
            onClick={handleHomeClick}
            className="text-xs font-semibold tracking-widest uppercase text-[#1C1917] hover:text-[#B38F24] transition-colors py-2 relative group"
          >
            <span>HOME</span>
            <span className="absolute bottom-1 left-0 w-full h-[1.5px] bg-[#B38F24] transform scale-x-100 transition-transform origin-left" />
          </a>
        </nav>

        {/* Center Zone: Premium JALDHARA Text Logo */}
        <div className="flex flex-col items-center justify-center text-center cursor-pointer" onClick={handleHomeClick}>
          <span className="font-brand text-2xl sm:text-3xl font-bold tracking-[0.25em] text-[#1C1917] select-none">
            JALDHARA
          </span>
          <span className="text-[9px] uppercase tracking-[0.3em] text-[#A89F91] -mt-0.5">
            Artisan Jewellery Atelier
          </span>
        </div>

        {/* Right Zone: Interactive Icons (Search, Wishlist, Shopping Bag) */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Search Button */}
          <button
            type="button"
            aria-label="Search collection"
            onClick={onOpenSearch}
            className="p-2 text-[#292524] hover:text-[#B38F24] transition-colors rounded-full hover:bg-[#F4EFE6]"
          >
            <Search className="w-5 h-5 stroke-[1.8]" />
          </button>

          {/* Wishlist Button */}
          <button
            type="button"
            aria-label={`Wishlist (${wishlistCount} items)`}
            onClick={onOpenWishlist}
            className="relative p-2 text-[#292524] hover:text-[#B38F24] transition-colors rounded-full hover:bg-[#F4EFE6]"
          >
            <Heart className={`w-5 h-5 stroke-[1.8] ${wishlistCount > 0 ? 'text-[#B38F24]' : ''}`} />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#B38F24] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Shopping Bag Button */}
          <button
            type="button"
            aria-label={`Shopping bag (${cartCount} items)`}
            onClick={onOpenCart}
            className={`relative p-2 text-[#292524] hover:text-[#B38F24] transition-all rounded-full hover:bg-[#F4EFE6] ${
              cartAnimated ? 'anim-cart-pulse' : ''
            }`}
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.8]" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#1C1917] text-[#F3E5AB] text-[10px] font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
