export type CategoryId = 'all' | 'earrings' | 'sets' | 'necklaces' | 'bangles' | 'maangtikka' | 'rings';

export type OccasionId = 'all' | 'wedding' | 'festive' | 'party' | 'everyday';

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: CategoryId;
  occasion: OccasionId;
  price: number; // in INR
  originalPrice?: number;
  discountPercent?: number;
  image: string;
  secondaryImage?: string;
  isBestseller?: boolean;
  isNewArrival?: boolean;
  isFeatured?: boolean;
  rating: number; // e.g. 4.9
  reviewCount: number;
  description: string;
  details: {
    baseMetal: string;
    plating: string;
    stoneType: string;
    weight: string;
    closure: string;
    care: string;
  };
  tags: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CheckoutDetails {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  paymentMethod: 'cod' | 'upi' | 'card';
}

export interface PlacedOrder {
  orderId: string;
  timestamp: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  customer: CheckoutDetails;
  status: 'Confirmed' | 'Processing';
}
