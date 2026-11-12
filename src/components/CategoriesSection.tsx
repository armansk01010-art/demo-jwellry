import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { CategoryId } from '../types/jewellery';

interface CategoriesSectionProps {
  selectedCategory: CategoryId;
  onSelectCategory: (category: CategoryId) => void;
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const categoryCards: { id: CategoryId; name: string; subtitle: string; image: string; tag: string }[] = [
    {
      id: 'earrings',
      name: 'Bestselling Earrings',
      subtitle: 'Jhumkas, Chandbalis, Studs & Hoops',
      image: '/src/assets/images/earrings_bestseller_kundan_1794478820719.jpg',
      tag: 'Primary Focus',
    },
    {
      id: 'sets',
      name: 'Jewellery Sets',
      subtitle: 'Complete Bridal Chokers & Ensembles',
      image: '/src/assets/images/jewellery_set_heritage_1794478822284.jpg',
      tag: 'Grand Ensembles',
    },
    {
      id: 'necklaces',
      name: 'Chokers & Necklaces',
      subtitle: 'Temple Motifs & Emerald Strands',
      image: '/src/assets/images/product_ruby_temple_choker_1794478848051.jpg',
      tag: 'Regal Adornments',
    },
    {
      id: 'bangles',
      name: 'Bangles & Kadas',
      subtitle: 'Kundan Polki Openable Bracelets',
      image: '/src/assets/images/product_bangles_kundan_1794478848780.jpg',
      tag: 'Imperial Cuffs',
    },
  ];

  return (
    <section id="categories" className="py-16 sm:py-24 bg-[#F8F4EC] border-b border-[#EAE3D6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="text-xs font-semibold tracking-[0.25em] uppercase text-[#B38F24] mb-2">
            Section 02 · Curated Categories
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1C1917] tracking-tight">
            Explore Artificial Jewellery Disciplines
          </h2>
          <p className="text-sm text-[#78716C] mt-2">
            Every piece is forged in skin-friendly brass alloy and hand-embellished by traditional jewellery artisans.
          </p>
        </div>

        {/* 4 Clean Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoryCards.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`group relative bg-[#FDFBF7] rounded-lg border overflow-hidden cursor-pointer product-card-hover flex flex-col justify-between transition-all duration-300 ${
                  isSelected ? 'border-[#B38F24] ring-2 ring-[#B38F24]/30' : 'border-[#E2D8C9]'
                }`}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F0E9DD]">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  
                  <div className="absolute top-3 left-3 bg-[#1C1917]/85 text-[#F3E5AB] text-[10px] tracking-wider uppercase font-semibold px-2 py-0.5 rounded-none backdrop-blur-xs">
                    {cat.tag}
                  </div>
                </div>

                <div className="p-5 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-lg font-serif font-bold text-[#1C1917] group-hover:text-[#B38F24] transition-colors flex items-center justify-between">
                      <span>{cat.name}</span>
                      <ArrowUpRight className="w-4 h-4 text-[#A89F91] group-hover:text-[#B38F24] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </h3>
                    <p className="text-xs text-[#78716C] mt-1">
                      {cat.subtitle}
                    </p>
                  </div>

                  <div className="pt-4 mt-3 border-t border-[#F0E9DD] flex items-center justify-between text-xs font-semibold text-[#B38F24]">
                    <span>Browse Collection</span>
                    <span>→</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
