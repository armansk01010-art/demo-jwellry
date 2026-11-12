import React from 'react';
import { Instagram, ShoppingCart, Mail, Phone, MapPin, ArrowUp, Shield } from 'lucide-react';

export const FooterSection: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer" className="bg-[#151312] text-[#E7DFD5] pt-16 pb-12 border-t border-[#292524]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-[#292524]">
          
          {/* Brand & Store Profile (Col span 5) */}
          <div className="lg:col-span-5 space-y-4">
            <div>
              <span className="font-brand text-2xl font-bold tracking-[0.25em] text-white block">
                JALDHARA
              </span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37]">
                Jaldhara Store · Artificial Jewellery
              </span>
            </div>

            <p className="text-xs text-[#A89F91] leading-relaxed max-w-sm">
              Premium handcrafted artificial jewellery. Specialising in royal Kundan earrings, polki bridal sets, and antique temple chokers created with double-dip micron gold polish.
            </p>

            {/* Social & Marketplace Channels */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/jaldhara_jwels"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#23201E] hover:bg-[#D4AF37] hover:text-[#151312] text-xs font-semibold rounded-sm transition-colors border border-[#332E2B]"
              >
                <Instagram className="w-4 h-4" />
                <span>@jaldhara_jwels</span>
              </a>

              <a
                href="https://www.meesho.com/Jaldharastore"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#23201E] hover:bg-[#D4AF37] hover:text-[#151312] text-xs font-semibold rounded-sm transition-colors border border-[#332E2B]"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Meesho / Jaldharastore</span>
              </a>
            </div>
          </div>

          {/* Quick Categories (Col span 2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white">
              Collections
            </h4>
            <ul className="space-y-2 text-xs text-[#A89F91]">
              <li><a href="#bestselling-earrings" className="hover:text-[#D4AF37] transition-colors">Bestselling Earrings</a></li>
              <li><a href="#jewellery-sets" className="hover:text-[#D4AF37] transition-colors">Bridal Choker Sets</a></li>
              <li><a href="#bestselling-earrings" className="hover:text-[#D4AF37] transition-colors">Royal Chandbalis</a></li>
              <li><a href="#jewellery-sets" className="hover:text-[#D4AF37] transition-colors">Temple Jewellery</a></li>
              <li><a href="#new-arrivals" className="hover:text-[#D4AF37] transition-colors">New Arrivals</a></li>
            </ul>
          </div>

          {/* Customer Care & Policies (Col span 2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white">
              Customer Care
            </h4>
            <ul className="space-y-2 text-xs text-[#A89F91]">
              <li><span>Jewellery Care Guide</span></li>
              <li><span>Anti-Tarnish Plating Guarantee</span></li>
              <li><span>All-India Insured Shipping</span></li>
              <li><span>7-Day Replacement Policy</span></li>
              <li><span>Cash on Delivery (COD)</span></li>
            </ul>
          </div>

          {/* Contact Details (Col span 3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white">
              Contact & Inquiries
            </h4>
            <div className="space-y-2.5 text-xs text-[#A89F91]">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                <span>care@jaldharastore.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                <span>+91 98290 12345 (Mon–Sat, 10am–7pm)</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>Johari Bazar, Heritage Jewellery District, Jaipur, Rajasthan 302003</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Demo Store Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#78716C]">
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>© {new Date().getFullYear()} JALDHARA (Jaldhara Store). All rights reserved. Premium Artificial Jewellery.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[#A89F91]">Demo eCommerce Storefront</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-white hover:text-[#D4AF37] transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
