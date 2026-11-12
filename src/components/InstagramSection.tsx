import React from 'react';
import { Instagram, Heart, MessageCircle, ExternalLink } from 'lucide-react';
import { INSTAGRAM_POSTS } from '../data/catalogue';

export const InstagramSection: React.FC = () => {
  return (
    <section id="instagram-gallery" className="py-16 sm:py-24 bg-[#FDFBF7] border-b border-[#EAE3D6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-semibold tracking-[0.25em] uppercase text-[#B38F24] mb-2 flex items-center gap-2">
              <Instagram className="w-3.5 h-3.5 text-[#B38F24]" />
              <span>Section 09 · Social Atelier</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1C1917] tracking-tight">
              Curated by @jaldhara_jwels
            </h2>
            <p className="text-sm text-[#78716C] mt-1 max-w-xl">
              Follow our daily design experiments, bride features, behind-the-scenes styling, and jewellery pairings.
            </p>
          </div>

          <a
            href="https://www.instagram.com/jaldhara_jwels"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#F4EFE6] hover:bg-[#1C1917] hover:text-white text-[#1C1917] text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors border border-[#E2D8C9] self-start sm:self-auto group"
          >
            <Instagram className="w-4 h-4 text-[#B38F24] group-hover:text-white" />
            <span>Follow on Instagram</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-60" />
          </a>
        </div>

        {/* 4 Square Editorial Instagram Posts Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {INSTAGRAM_POSTS.map((post) => (
            <a
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-lg overflow-hidden bg-[#F0E9DD] border border-[#E7DFD5] shadow-xs block"
            >
              <img
                src={post.image}
                alt={post.caption}
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
              />

              {/* Hover Dark Scrim with Post Engagement & Caption */}
              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-between text-white">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-[#F3E5AB] font-semibold">{post.handle}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>

                <p className="text-xs font-serif line-clamp-3 text-white/90 leading-snug">
                  {post.caption}
                </p>

                <div className="flex items-center gap-4 text-xs font-medium text-[#F3E5AB]">
                  <div className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 fill-[#F3E5AB]" />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>{post.comments}</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
