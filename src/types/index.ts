export type CategoryType = 'Women' | 'Kids' | 'Collections' | 'Wholesale' | 'Offers';

export type WomenSubcategory = 'Sarees' | 'Kurtis' | 'Salwar Sets' | 'Dresses' | 'Tops';
export type KidsSubcategory = 'Shirts' | 'T-Shirts' | 'Sets' | 'Girls Dresses' | 'Party Wear';
export type SubcategoryType = WomenSubcategory | KidsSubcategory | string;

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: CategoryType;
  subcategory: SubcategoryType;
  description: string;
  mrpPrice: number;
  offerPrice: number;
  discountPercentage: number;
  sizes: string[];
  colors: string[];
  stock: number;
  images: string[];
  featured: boolean;
  bestSeller: boolean;
  newArrival: boolean;
  isOfferProduct: boolean;
  rating?: number;
  reviewCount?: number;
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}

export interface Address {
  fullName: string;
  mobile: string;
  email: string;
  addressLine: string;
  city: string;
  state: string;
  pincode: string;
}

export type PaymentMethodType = 'UPI' | 'Razorpay' | 'COD';
export type OrderStatusType = 'Order Placed' | 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'Cancelled';

export interface Order {
  id: string;
  orderId: string; // e.g. JRC-2026-9842
  date: string;
  customer: Address;
  items: CartItem[];
  totalAmount: number;
  subtotal: number;
  discount: number;
  shippingFee: number;
  paymentMethod: PaymentMethodType;
  paymentStatus: 'Paid' | 'Pending COD';
  orderStatus: OrderStatusType;
  orderNotes?: string;
  trackingNumber?: string;
}

export interface ReturnRequest {
  id: string;
  returnId: string;
  orderId: string;
  productName: string;
  customerName: string;
  customerEmail: string;
  customerMobile: string;
  reason: string;
  description: string;
  imageUrl?: string;
  requestDate: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Refunded';
}

export interface User {
  id: string;
  name: string;
  email: string;
  mobile: string;
  isVerified: boolean;
  authType: 'otp-mobile' | 'otp-email' | 'google';
  savedAddresses: Address[];
}

export interface CategoryBanner {
  category: CategoryType | SubcategoryType;
  imageUrl: string;
  title: string;
  description: string;
}

export interface HomepageBanner {
  id: string;
  imageUrl: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  order: number;
}

export interface OfferSectionConfig {
  isActive: boolean;
  bannerImage: string;
  title: string;
  subtitle: string;
  expiryDate: string; // ISO string or target date
  productIds: string[];
}

export interface Review {
  id: string;
  customerName: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  productName: string;
  userImage?: string;
}
