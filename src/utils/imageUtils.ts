/**
 * Jaldhara Jewellery - Image utilities, fallbacks and resolution helpers
 */

// Premium fallback SVG data URI with luxury gold monogram and shimmer
export const JEWELLERY_FALLBACK_IMAGE = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23FDFBF7"/><stop offset="50%" stop-color="%23F4EFE6"/><stop offset="100%" stop-color="%23EBE3D7"/></linearGradient><linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23D4AF37"/><stop offset="50%" stop-color="%23F3E5AB"/><stop offset="100%" stop-color="%23B38F24"/></linearGradient></defs><rect width="600" height="600" fill="url(%23g)"/><circle cx="300" cy="270" r="110" fill="none" stroke="url(%23gold)" stroke-width="2" stroke-dasharray="4 4"/><circle cx="300" cy="270" r="95" fill="none" stroke="%23D4AF37" stroke-width="1.5"/><path d="M300 200 L320 240 L365 245 L330 275 L340 320 L300 295 L260 320 L270 275 L235 245 L280 240 Z" fill="url(%23gold)" opacity="0.85"/><text x="300" y="420" font-family="serif" font-size="24" font-weight="bold" fill="%231C1917" text-anchor="middle" letter-spacing="4">JALDHARA</text><text x="300" y="445" font-family="sans-serif" font-size="12" fill="%2378716C" text-anchor="middle" letter-spacing="2">ARTISAN JEWELLERY</text></svg>`;

export const IMAGE_MAP: Record<string, string> = {
  hero_campaign: '/images/hero_jewellery_campaign.webp',
  earrings_kundan: '/images/earrings_bestseller_kundan.webp',
  jewellery_set: '/images/jewellery_set_heritage.webp',
  editorial_craft: '/images/editorial_craftsmanship.webp',
  special_offer: '/images/special_offer_festive.webp',
  chandbali: '/images/product_chandbali_earrings.webp',
  temple_choker: '/images/product_ruby_temple_choker.webp',
  kundan_bangles: '/images/product_bangles_kundan.webp',
  rose_gold_earrings: '/images/product_rose_gold_earrings.webp',
};

/**
 * Normalizes any legacy or relative image path to direct public path
 */
export function resolveImageUrl(url: string | undefined): string {
  if (!url) return JEWELLERY_FALLBACK_IMAGE;

  // If already clean public url
  if (url.startsWith('/images/')) {
    return url;
  }

  // Convert old /src/assets/images/... to /images/...
  if (url.includes('hero_jewellery_campaign')) return IMAGE_MAP.hero_campaign;
  if (url.includes('earrings_bestseller_kundan')) return IMAGE_MAP.earrings_kundan;
  if (url.includes('jewellery_set_heritage')) return IMAGE_MAP.jewellery_set;
  if (url.includes('editorial_craftsmanship')) return IMAGE_MAP.editorial_craft;
  if (url.includes('special_offer_festive')) return IMAGE_MAP.special_offer;
  if (url.includes('product_chandbali_earrings')) return IMAGE_MAP.chandbali;
  if (url.includes('product_ruby_temple_choker')) return IMAGE_MAP.temple_choker;
  if (url.includes('product_bangles_kundan')) return IMAGE_MAP.kundan_bangles;
  if (url.includes('product_rose_gold_earrings')) return IMAGE_MAP.rose_gold_earrings;

  if (url.startsWith('/src/assets/images/')) {
    const filename = url.replace('/src/assets/images/', '');
    return `/images/${filename}`;
  }

  return url;
}

/**
 * Image error handler fallback
 */
export function handleImageError(
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  fallbackUrl: string = JEWELLERY_FALLBACK_IMAGE
) {
  const target = e.currentTarget;
  if (target.src.endsWith('.webp')) {
    // If webp failed, try JPG fallback
    target.src = target.src.replace('.webp', '.jpg');
  } else if (target.src !== fallbackUrl) {
    target.onerror = null; // Prevent infinite loop
    target.src = fallbackUrl;
  }
}
